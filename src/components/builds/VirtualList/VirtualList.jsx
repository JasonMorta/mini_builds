/* UI note: This screen uses a custom virtualized table so the browser only renders the rows in or near view.
   The dataset itself still grows in small chunks as the user scrolls toward the end of the loaded range. */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Checkbox, Loader } from 'rsuite';

const TOTAL_ROW_COUNT = 4000;
const INITIAL_BATCH_SIZE = 40;
const FETCH_BATCH_SIZE = 40;
const ROW_HEIGHT = 56;
const VISIBLE_ROW_COUNT = 10;
const OVERSCAN = 4;
const VIEWPORT_HEIGHT = ROW_HEIGHT * VISIBLE_ROW_COUNT;
const ROW_CACHE_PREFIX = 'mini-builds.virtual-list.chunk';

function buildRow(index) {
  faker.seed(index + 1);

  return {
    id: `id_${index + 1}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}

function buildRowsRange(startIndex, count) {
  return Array.from({ length: count }, (_, offset) => buildRow(startIndex + offset));
}

function readCachedChunk(startIndex, count) {
  try {
    const cached = sessionStorage.getItem(`${ROW_CACHE_PREFIX}.${startIndex}.${count}`);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function cacheChunk(startIndex, count, rows) {
  try {
    sessionStorage.setItem(`${ROW_CACHE_PREFIX}.${startIndex}.${count}`, JSON.stringify(rows));
  } catch {
    // Ignore storage failures and continue with in-memory data only.
  }
}

function VirtualList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [error, setError] = useState('');
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const nextIndexRef = useRef(0);
  const isFetchingRef = useRef(false);

  const fetchNextBatch = useCallback(async (batchSize) => {
    if (isFetchingRef.current || nextIndexRef.current >= TOTAL_ROW_COUNT) return;

    isFetchingRef.current = true;
    const isFirstLoad = nextIndexRef.current === 0;

    if (isFirstLoad) {
      setLoading(true);
    } else {
      setFetchingMore(true);
    }

    try {
      const startIndex = nextIndexRef.current;
      const safeBatchSize = Math.min(batchSize, TOTAL_ROW_COUNT - startIndex);

      const rows = await new Promise((resolve) => {
        window.setTimeout(() => {
          const cachedChunk = readCachedChunk(startIndex, safeBatchSize);
          if (cachedChunk?.length) {
            resolve(cachedChunk);
            return;
          }

          const nextRows = buildRowsRange(startIndex, safeBatchSize);
          cacheChunk(startIndex, safeBatchSize, nextRows);
          resolve(nextRows);
        }, isFirstLoad ? 120 : 80);
      });

      nextIndexRef.current = startIndex + rows.length;
      setData((currentRows) => [...currentRows, ...rows]);
      setError('');
    } catch {
      setError('The virtualized dataset could not be created. Reload and try again.');
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
      setFetchingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchNextBatch(INITIAL_BATCH_SIZE);
  }, [fetchNextBatch]);

  const checked = data.length > 0 && checkedKeys.length === data.length;
  const indeterminate = checkedKeys.length > 0 && checkedKeys.length < data.length;

  const handleCheckAll = (_value, isChecked) => {
    const nextKeys = isChecked ? data.map((item) => item.id) : [];
    setCheckedKeys(nextKeys);
  };

  const handleCheck = (value, isChecked) => {
    setCheckedKeys((currentKeys) =>
      isChecked ? [...new Set([...currentKeys, value])] : currentKeys.filter((item) => item !== value)
    );
  };

  const loadedCount = data.length;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = VISIBLE_ROW_COUNT + OVERSCAN * 2;
  const endIndex = Math.min(loadedCount, startIndex + visibleCount);

  const visibleRows = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight = Math.max(0, (loadedCount - endIndex) * ROW_HEIGHT);

  const handleViewportScroll = (event) => {
    const nextScrollTop = event.currentTarget.scrollTop;
    setScrollTop(nextScrollTop);

    const nearBottom = nextScrollTop + VIEWPORT_HEIGHT >= loadedCount * ROW_HEIGHT - ROW_HEIGHT * 6;
    if (nearBottom && loadedCount < TOTAL_ROW_COUNT) {
      fetchNextBatch(FETCH_BATCH_SIZE);
    }
  };

  return (
    <div className="virtual-list-build">
      <section className="virtual-list-build__intro build-card">
        <h4>
          Virtualized table with {Math.min(loadedCount, TOTAL_ROW_COUNT)} loaded of {TOTAL_ROW_COUNT} total users
        </h4>
        <p>
          The table viewport renders roughly <b>10 rows</b> at a time, with a small overscan buffer for smooth scrolling.
        </p>
        <p>
          More rows are generated in chunks only when you approach the end of the loaded range, keeping the browser much
          lighter than rendering the full dataset at once.
        </p>
      </section>

      <section className="virtual-list-build__table build-card" style={{ minHeight: loading ? '320px' : '0' }}>
        {loading ? (
          <Loader size="md" center content="Loading users..." />
        ) : error ? (
          <div className="virtual-list-build__error">{error}</div>
        ) : (
          <div className="virtual-table-shell">
            <div className="virtual-table-shell__header virtual-table-row">
              <div className="virtual-table-cell virtual-table-cell--checkbox">
                <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
              </div>
              <div className="virtual-table-cell virtual-table-cell--id">Id</div>
              <div className="virtual-table-cell virtual-table-cell--name">Full name</div>
              <div className="virtual-table-cell virtual-table-cell--email">Email</div>
            </div>

            <div
              className="virtual-table-shell__viewport"
              style={{ height: `${VIEWPORT_HEIGHT}px` }}
              onScroll={handleViewportScroll}
            >
              <div style={{ height: `${topSpacerHeight}px` }} aria-hidden="true" />

              {visibleRows.map((row) => (
                <div className="virtual-table-row" key={row.id} style={{ height: `${ROW_HEIGHT}px` }}>
                  <div className="virtual-table-cell virtual-table-cell--checkbox">
                    <Checkbox
                      value={row.id}
                      inline
                      onChange={handleCheck}
                      checked={checkedKeys.includes(row.id)}
                    />
                  </div>
                  <div className="virtual-table-cell virtual-table-cell--id">{row.id}</div>
                  <div className="virtual-table-cell virtual-table-cell--name">{row.name}</div>
                  <div className="virtual-table-cell virtual-table-cell--email">{row.email}</div>
                </div>
              ))}

              <div style={{ height: `${bottomSpacerHeight}px` }} aria-hidden="true" />
            </div>

            {fetchingMore ? <div className="virtual-list-build__fetching">Loading more rows…</div> : null}
          </div>
        )}
      </section>
    </div>
  );
}

export default VirtualList;
