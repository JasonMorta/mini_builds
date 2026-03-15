import React, { useMemo, useState } from 'react';
import { ChevronDown, Copy, ExternalLink, Link2, ListChecks, RefreshCcw } from 'lucide-react';
import styles from './DriveLinks.module.css';

const singleCardConfig = [
  {
    type: 'image',
    title: 'Image',
    emoji: '🖼️',
    pill: 'Use for <img src="...">',
    placeholder: 'Paste Google Drive image share link...',
    hint: 'Outputs: https://drive.google.com/uc?export=view&id=FILE_ID',
  },
  {
    type: 'file',
    title: 'File (JSON / ZIP / etc.)',
    emoji: '📦',
    pill: 'Direct download / fetch',
    placeholder: 'Paste Google Drive file share link...',
    hint: 'Outputs: https://drive.google.com/uc?export=download&id=FILE_ID',
  },
  {
    type: 'document',
    title: 'Document (PDF / DOCX stored in Drive)',
    emoji: '📄',
    pill: 'View / embed / download',
    placeholder: 'Paste Google Drive document share link...',
    hint: 'Toggle between view and download output modes.',
  },
  {
    type: 'video',
    title: 'Video',
    emoji: '🎥',
    pill: 'Use for <video src="...">',
    placeholder: 'Paste Google Drive video share link...',
    hint: 'Outputs: https://drive.google.com/uc?export=download&id=FILE_ID',
  },
  {
    type: 'audio',
    title: 'Audio',
    emoji: '🔊',
    pill: 'Use for <audio src="...">',
    placeholder: 'Paste Google Drive audio share link...',
    hint: 'Outputs: https://drive.google.com/uc?export=download&id=FILE_ID',
  },
];

const initialSingleState = singleCardConfig.reduce((acc, item) => {
  acc[item.type] = {
    input: '',
    output: '—',
    error: '',
    ok: false,
    docMode: 'view',
    fileId: '',
    previewOpen: false,
    jsonState: 'idle',
    jsonPreview: '',
    jsonError: '',
  };
  return acc;
}, {});

function extractDriveFileId(url) {
  try {
    const parsedUrl = new URL(url);
    const filePathMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/);
    if (filePathMatch?.[1]) return filePathMatch[1];

    const genericPathMatch = parsedUrl.pathname.match(/\/d\/([^/]+)/);
    if (genericPathMatch?.[1]) return genericPathMatch[1];

    const idParam = parsedUrl.searchParams.get('id');
    if (idParam) return idParam;

    return null;
  } catch {
    return null;
  }
}

function isGoogleDriveUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'drive.google.com' || parsedUrl.hostname.endsWith('.drive.google.com');
  } catch {
    return false;
  }
}

function buildOutputUrl({ type, fileId, docMode = 'view' }) {
  if (type === 'image') {
    return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
  }

  if (type === 'document') {
    const mode = docMode === 'download' ? 'download' : 'view';
    return `https://drive.google.com/uc?export=${mode}&id=${encodeURIComponent(fileId)}`;
  }

  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

function extractAllUrls(text) {
  const matches = text.match(/(https?:\/\/[^\s"'<>\]]+)/g) || [];
  const seen = new Set();

  return matches.reduce((acc, rawValue) => {
    const cleaned = rawValue.replace(/[),.;]+$/g, '');

    if (!seen.has(cleaned)) {
      seen.add(cleaned);
      acc.push(cleaned);
    }

    return acc;
  }, []);
}

function viewUrl(fileId) {
  return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`;
}

function downloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

function thumbUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w800-h800`;
}

function directUrlFor(fileId, kind) {
  return kind === 'image' ? viewUrl(fileId) : downloadUrl(fileId);
}

function displayName(fileId) {
  return `${fileId.slice(0, 8)}…${fileId.slice(-6)}`;
}

function probeImage(url, timeoutMs = 3500) {
  return new Promise((resolve) => {
    const image = new Image();
    const timer = window.setTimeout(() => cleanup(false), timeoutMs);

    function cleanup(result) {
      window.clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve(result);
    }

    image.onload = () => cleanup(true);
    image.onerror = () => cleanup(false);
    image.src = `${url}${url.includes('?') ? '&' : '?'}cb=${Date.now()}`;
  });
}

function probeMediaTag(fileId, tagName, timeoutMs = 3500) {
  return new Promise((resolve) => {
    const mediaElement = document.createElement(tagName);
    const timer = window.setTimeout(() => cleanup(false), timeoutMs);

    function cleanup(result) {
      window.clearTimeout(timer);
      mediaElement.onloadedmetadata = null;
      mediaElement.onerror = null;
      resolve(result);
    }

    mediaElement.preload = 'metadata';
    mediaElement.onloadedmetadata = () => cleanup(true);
    mediaElement.onerror = () => cleanup(false);
    mediaElement.src = downloadUrl(fileId);
  });
}

async function detectKind(fileId) {
  if (await probeImage(thumbUrl(fileId))) return 'image';
  if (await probeImage(viewUrl(fileId))) return 'image';
  if (await probeMediaTag(fileId, 'video')) return 'video';
  if (await probeMediaTag(fileId, 'audio')) return 'audio';
  return 'doc';
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function likelyJsonLink(rawValue) {
  return /\.json(?:$|[?#])/i.test(rawValue);
}

function BatchResultSection({ title, count, actionLabel, onCopy, children, icon }) {
  return (
    <section className={styles.batchSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrap}>
          <span className={styles.sectionIcon}>{icon}</span>
          <div>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <p className={styles.sectionCount}>{count} item(s)</p>
          </div>
        </div>
        <button type="button" className={styles.secondaryButton} onClick={onCopy}>
          <Copy size={14} />
          {actionLabel}
        </button>
      </div>
      {children}
    </section>
  );
}

function MediaPreview({ type, src, label }) {
  if (!src || src === '—') return null;

  if (type === 'image') {
    return (
      <div className={styles.previewSurface}>
        <div className={styles.previewHeader}><span>Preview</span><span>{label}</span></div>
        <img className={styles.previewImage} src={src} alt={label} loading="lazy" />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className={styles.previewSurface}>
        <div className={styles.previewHeader}><span>Preview</span><span>{label}</span></div>
        <video className={styles.previewVideo} controls preload="metadata" src={src} />
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div className={styles.previewSurface}>
        <div className={styles.previewHeader}><span>Preview</span><span>{label}</span></div>
        <audio className={styles.previewAudio} controls preload="metadata" src={src} />
      </div>
    );
  }

  return null;
}

export default function DriveLinks() {
  const [singleConverters, setSingleConverters] = useState(initialSingleState);
  const [batchInput, setBatchInput] = useState('');
  const [batchItems, setBatchItems] = useState([]);
  const [batchMeta, setBatchMeta] = useState('Ready.');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [forceType, setForceType] = useState('auto');
  const [unknownAsImage, setUnknownAsImage] = useState(true);
  const [toast, setToast] = useState('');

  const groupedBatchItems = useMemo(
    () => ({
      images: batchItems.filter((item) => item.kind === 'image'),
      videos: batchItems.filter((item) => item.kind === 'video'),
      audio: batchItems.filter((item) => item.kind === 'audio'),
      docs: batchItems.filter((item) => item.kind === 'doc'),
    }),
    [batchItems],
  );

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 1800);
  }

  function updateSingleConverter(type, patch) {
    setSingleConverters((current) => ({
      ...current,
      [type]: {
        ...current[type],
        ...patch,
      },
    }));
  }

  function convertSingleValue(type, rawValue, docMode = singleConverters[type].docMode) {
    const value = rawValue.trim();

    if (!value) {
      updateSingleConverter(type, {
        input: rawValue,
        output: '—',
        error: '',
        ok: false,
        docMode,
        fileId: '',
        previewOpen: false,
        jsonState: 'idle',
        jsonPreview: '',
        jsonError: '',
      });
      return;
    }

    if (!isGoogleDriveUrl(value)) {
      updateSingleConverter(type, {
        input: rawValue,
        output: '—',
        error: 'This converter expects a Google Drive link (drive.google.com).',
        ok: false,
        docMode,
        fileId: '',
        previewOpen: false,
        jsonState: 'idle',
        jsonPreview: '',
        jsonError: '',
      });
      return;
    }

    const fileId = extractDriveFileId(value);

    if (!fileId) {
      updateSingleConverter(type, {
        input: rawValue,
        output: '—',
        error: 'Could not detect a Google Drive FILE_ID in that link.',
        ok: false,
        docMode,
        fileId: '',
        previewOpen: false,
        jsonState: 'idle',
        jsonPreview: '',
        jsonError: '',
      });
      return;
    }

    updateSingleConverter(type, {
      input: rawValue,
      output: buildOutputUrl({ type, fileId, docMode }),
      error: '',
      ok: true,
      docMode,
      fileId,
      previewOpen: ['image', 'video', 'audio'].includes(type),
      jsonState: 'idle',
      jsonPreview: '',
      jsonError: '',
    });
  }

  async function loadSingleJsonPreview() {
    const state = singleConverters.file;
    if (!state.ok || !state.output || state.output === '—') return;

    updateSingleConverter('file', {
      jsonState: 'loading',
      jsonError: '',
      previewOpen: true,
    });

    try {
      const response = await fetch(state.output);
      const data = await response.json();
      updateSingleConverter('file', {
        jsonState: 'done',
        jsonPreview: JSON.stringify(data, null, 2),
        jsonError: '',
        previewOpen: true,
      });
    } catch {
      updateSingleConverter('file', {
        jsonState: 'error',
        jsonPreview: '',
        jsonError: 'JSON preview failed. The file may not be JSON or Drive may be blocking direct preview.',
        previewOpen: true,
      });
    }
  }

  async function handleSingleCopy(type) {
    const value = singleConverters[type].output;
    if (!value || value === '—') return;

    const copied = await copyToClipboard(value);
    showToast(copied ? 'Converted link copied.' : 'Copy failed.');
  }

  function handleSingleOpen(type) {
    const value = singleConverters[type].output;
    if (!value || value === '—') return;
    window.open(value, '_blank', 'noopener,noreferrer');
  }

  async function processBatchLinks() {
    const rawValue = batchInput.trim();

    if (!rawValue) {
      setBatchMeta('Paste links first.');
      showToast('Paste links first.');
      return;
    }

    const urls = extractAllUrls(rawValue).filter(isGoogleDriveUrl);
    const detectedLinks = urls
      .map((url) => ({ originalUrl: url, fileId: extractDriveFileId(url) }))
      .filter((item) => item.fileId);

    const seenIds = new Set();
    const uniqueItems = detectedLinks.filter((item) => {
      if (seenIds.has(item.fileId)) return false;
      seenIds.add(item.fileId);
      return true;
    });

    if (!uniqueItems.length) {
      setBatchMeta('No valid Drive file links detected.');
      showToast('No valid Drive file links detected.');
      return;
    }

    setIsProcessingBatch(true);
    setBatchMeta(
      forceType === 'auto'
        ? `Detected ${uniqueItems.length} Drive file(s). Detecting types...`
        : `Detected ${uniqueItems.length} Drive file(s). Forcing type: ${forceType}.`,
    );

    const results = [];
    const concurrency = 4;
    let processedCount = 0;

    async function handleItem(item) {
      let kind = forceType;

      if (forceType === 'auto') {
        kind = await detectKind(item.fileId);
        if (kind === 'doc' && unknownAsImage) {
          kind = 'image';
        }
      }

      results.push({
        ...item,
        kind,
        previewUrl: kind === 'image' ? thumbUrl(item.fileId) : downloadUrl(item.fileId),
        directUrl: directUrlFor(item.fileId, kind),
        displayName: displayName(item.fileId),
        jsonPreview: '',
        jsonState: 'idle',
        previewOpen: ['image', 'video', 'audio'].includes(kind),
      });

      processedCount += 1;
      setBatchMeta(`Processing... ${processedCount}/${uniqueItems.length}`);
    }

    for (let index = 0; index < uniqueItems.length; index += concurrency) {
      const slice = uniqueItems.slice(index, index + concurrency);
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(slice.map(handleItem));
    }

    const orderMap = new Map(uniqueItems.map((item, index) => [item.fileId, index]));
    results.sort((a, b) => (orderMap.get(a.fileId) ?? 0) - (orderMap.get(b.fileId) ?? 0));

    setBatchItems(results);
    setBatchMeta(
      `Done. Converted ${results.length} item(s). Images: ${results.filter((item) => item.kind === 'image').length}, ` +
        `Videos: ${results.filter((item) => item.kind === 'video').length}, ` +
        `Audio: ${results.filter((item) => item.kind === 'audio').length}, ` +
        `Docs/Other: ${results.filter((item) => item.kind === 'doc').length}.`,
    );
    setIsProcessingBatch(false);
    showToast('Batch conversion complete.');
  }

  function clearBatch() {
    setBatchInput('');
    setBatchItems([]);
    setBatchMeta('Ready.');
    showToast('Cleared.');
  }

  async function copyLinksFor(kind = null) {
    const links = (kind ? batchItems.filter((item) => item.kind === kind) : batchItems)
      .map((item) => item.directUrl)
      .join('\n');

    if (!links) {
      showToast('Nothing to copy.');
      return;
    }

    const copied = await copyToClipboard(links);
    showToast(copied ? 'Converted links copied.' : 'Copy failed.');
  }

  function updateBatchItem(fileId, patch) {
    setBatchItems((current) => current.map((item) => (item.fileId === fileId ? { ...item, ...patch } : item)));
  }

  async function loadBatchJsonPreview(item) {
    updateBatchItem(item.fileId, { jsonState: 'loading', previewOpen: true });

    try {
      const response = await fetch(item.directUrl);
      const data = await response.json();
      updateBatchItem(item.fileId, {
        jsonState: 'done',
        jsonPreview: JSON.stringify(data, null, 2),
        previewOpen: true,
      });
    } catch {
      updateBatchItem(item.fileId, {
        jsonState: 'error',
        jsonPreview: '',
        previewOpen: true,
      });
    }
  }

  return (
    <div className={styles.driveLinks}>
      <section className={styles.heroPanel}>
        <div>
          <p className={styles.eyebrow}>Google Drive utilities</p>
          <h2>Single-link converter + batch preview in one mini-build</h2>
          <p className={styles.heroCopy}>
            Convert Google Drive share links into website-usable URLs for images, files, documents, videos, and audio.
            Use the quick single converter at the top, then drop into the batch workflow below for previews and copy-ready
            outputs.
          </p>
        </div>
        <div className={styles.heroMeta}>
          <div className={styles.heroMetaCard}>
            <Link2 size={16} />
            <div>
              <strong>Single conversion</strong>
              <span>Convert one Drive link instantly with copy, open, and inline preview support.</span>
            </div>
          </div>
          <div className={styles.heroMetaCard}>
            <ListChecks size={16} />
            <div>
              <strong>Batch processing</strong>
              <span>Paste many links, preview media, and copy grouped outputs.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.singleSection}>
        <div className={styles.sectionLead}>
          <div>
            <p className={styles.sectionKicker}>Single converter</p>
            <h3>Convert one Drive link by type</h3>
          </div>
          <p className={styles.sectionNote}>
            Drive sharing must be set to <strong>Anyone with the link</strong> → <strong>Viewer</strong>.
          </p>
        </div>

        <div className={styles.singleGrid}>
          {singleCardConfig.map((item) => {
            const state = singleConverters[item.type];
            const showMediaPreview = ['image', 'video', 'audio'].includes(item.type) && state.ok && !state.error;
            const canTryJsonPreview = item.type === 'file' && state.ok && (likelyJsonLink(state.input) || state.previewOpen);

            return (
              <article key={item.type} className={styles.singleCard}>
                <div className={styles.cardRow}>
                  <div className={styles.cardLabel}>
                    <span>{item.emoji}</span>
                    <span>{item.title}</span>
                  </div>
                  <span className={styles.cardPill}>{item.pill}</span>
                </div>

                <input
                  className={styles.input}
                  type="url"
                  value={state.input}
                  onChange={(event) => convertSingleValue(item.type, event.target.value, state.docMode)}
                  placeholder={item.placeholder}
                />

                <p className={styles.hint}>{item.hint}</p>

                {item.type === 'document' ? (
                  <div className={styles.docModeToggle}>
                    <label>
                      <input
                        type="radio"
                        name="docmode"
                        checked={state.docMode === 'view'}
                        onChange={() => convertSingleValue(item.type, state.input, 'view')}
                      />
                      view
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="docmode"
                        checked={state.docMode === 'download'}
                        onChange={() => convertSingleValue(item.type, state.input, 'download')}
                      />
                      download
                    </label>
                  </div>
                ) : null}

                <div className={styles.outputBox}>
                  <span className={styles.outputText}>{state.output}</span>
                  <div className={styles.outputActions}>
                    <button type="button" className={styles.iconButton} onClick={() => handleSingleCopy(item.type)}>
                      <Copy size={14} />
                    </button>
                    <button type="button" className={styles.iconButton} onClick={() => handleSingleOpen(item.type)}>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                {showMediaPreview ? <MediaPreview type={item.type} src={state.output} label={item.title} /> : null}

                {canTryJsonPreview ? (
                  <div className={styles.previewSurface}>
                    <button
                      type="button"
                      className={styles.previewToggle}
                      onClick={() => {
                        if (!state.previewOpen) {
                          updateSingleConverter('file', { previewOpen: true });
                        } else if (state.jsonState === 'done' || state.jsonState === 'error') {
                          updateSingleConverter('file', { previewOpen: false });
                        } else {
                          loadSingleJsonPreview();
                        }
                      }}
                    >
                      <span>JSON preview</span>
                      <ChevronDown size={15} className={state.previewOpen ? styles.rotate : ''} />
                    </button>

                    {state.previewOpen ? (
                      <div className={styles.jsonPreviewWrap}>
                        {state.jsonState === 'idle' ? (
                          <button type="button" className={styles.secondaryButton} onClick={loadSingleJsonPreview}>
                            Load JSON preview
                          </button>
                        ) : null}
                        {state.jsonState === 'loading' ? <p className={styles.hint}>Loading JSON preview…</p> : null}
                        {state.jsonState === 'done' ? <pre className={styles.codeBlock}>{state.jsonPreview}</pre> : null}
                        {state.jsonState === 'error' ? <p className={styles.error}>{state.jsonError}</p> : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {state.error ? <p className={styles.error}>{state.error}</p> : null}
                {state.ok && !state.error ? <p className={styles.success}>Converted.</p> : null}
              </article>
            );
          })}

          <article className={`${styles.singleCard} ${styles.exampleCard}`}>
            <div className={styles.cardRow}>
              <div className={styles.cardLabel}>
                <span>⚡</span>
                <span>Examples</span>
              </div>
              <span className={styles.cardPill}>Copy / paste ideas</span>
            </div>

            <div className={styles.codeBlock}>
              {'<img src="PASTE_CONVERTED_URL_HERE" alt="..." />'}
            </div>
            <div className={styles.codeBlock}>{'<video controls src="PASTE_CONVERTED_URL_HERE"></video>'}</div>
            <div className={styles.codeBlock}>{'<audio controls src="PASTE_CONVERTED_URL_HERE"></audio>'}</div>
            <div className={styles.codeBlock}>
              {'fetch("PASTE_CONVERTED_URL_HERE")\n  .then((response) => response.json())\n  .then((data) => console.log(data));'}
            </div>
            <p className={styles.footerNote}>
              If a file fails to preview, the usual cause is Drive permissions or hotlink limits rather than the generated
              URL format.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.batchShell}>
        <div className={styles.sectionLead}>
          <div>
            <p className={styles.sectionKicker}>Batch version</p>
            <h3>Preview and copy many Drive links at once</h3>
          </div>
          <p className={styles.sectionNote}>Detection is best-effort and does not use the Drive API.</p>
        </div>

        <div className={styles.batchCard}>
          <label className={styles.batchLabel} htmlFor="drive-batch-input">
            Paste Drive links
          </label>
          <textarea
            id="drive-batch-input"
            className={styles.textarea}
            rows={8}
            value={batchInput}
            onChange={(event) => setBatchInput(event.target.value)}
            placeholder="Paste multiple Google Drive share links here..."
          />

          <div className={styles.batchControls}>
            <div className={styles.buttonRow}>
              <button type="button" className={styles.primaryButton} onClick={processBatchLinks} disabled={isProcessingBatch}>
                <ListChecks size={15} />
                {isProcessingBatch ? 'Processing…' : 'Process links'}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={clearBatch}>
                <RefreshCcw size={14} />
                Clear
              </button>
              <button type="button" className={styles.secondaryButton} onClick={() => copyLinksFor()}>
                <Copy size={14} />
                Copy all converted links
              </button>
            </div>

            <div className={styles.controlGroup}>
              <label className={styles.selectWrap}>
                <span>Force type</span>
                <select value={forceType} onChange={(event) => setForceType(event.target.value)}>
                  <option value="auto">Auto detect</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                  <option value="doc">Docs / Other</option>
                </select>
              </label>

              <label className={styles.checkboxWrap}>
                <input
                  type="checkbox"
                  checked={unknownAsImage}
                  onChange={(event) => setUnknownAsImage(event.target.checked)}
                />
                If detection is unsure, treat it as an image.
              </label>
            </div>
          </div>

          <p className={styles.batchMeta}>{batchMeta}</p>
        </div>

        <div className={styles.batchSections}>
          <BatchResultSection
            title="Images"
            count={groupedBatchItems.images.length}
            actionLabel="Copy image links"
            onCopy={() => copyLinksFor('image')}
            icon="🖼️"
          >
            <div className={styles.mediaGrid}>
              {groupedBatchItems.images.map((item) => (
                <article key={item.fileId} className={styles.mediaCard}>
                  <img className={styles.previewImage} src={item.previewUrl} alt={item.displayName} loading="lazy" />
                  <div className={styles.mediaMeta}>
                    <strong>{item.displayName}</strong>
                    <span>{item.directUrl}</span>
                  </div>
                  <button type="button" className={styles.tileButton} onClick={() => copyToClipboard(item.directUrl).then((ok) => showToast(ok ? 'Image URL copied.' : 'Copy failed.'))}>
                    Copy image URL
                  </button>
                </article>
              ))}
            </div>
          </BatchResultSection>

          <BatchResultSection
            title="Videos"
            count={groupedBatchItems.videos.length}
            actionLabel="Copy video links"
            onCopy={() => copyLinksFor('video')}
            icon="🎥"
          >
            <div className={styles.mediaGrid}>
              {groupedBatchItems.videos.map((item) => (
                <article key={item.fileId} className={styles.mediaCard}>
                  <video className={styles.video} controls muted preload="metadata" src={item.previewUrl} />
                  <div className={styles.mediaMeta}>
                    <strong>{item.displayName}</strong>
                    <span>{item.directUrl}</span>
                  </div>
                  <button type="button" className={styles.tileButton} onClick={() => copyToClipboard(item.directUrl).then((ok) => showToast(ok ? 'Video URL copied.' : 'Copy failed.'))}>
                    Copy video URL
                  </button>
                </article>
              ))}
            </div>
          </BatchResultSection>

          <BatchResultSection
            title="Audio"
            count={groupedBatchItems.audio.length}
            actionLabel="Copy audio links"
            onCopy={() => copyLinksFor('audio')}
            icon="🔊"
          >
            <div className={styles.mediaGrid}>
              {groupedBatchItems.audio.map((item) => (
                <article key={item.fileId} className={styles.mediaCard}>
                  <audio controls preload="none" src={item.previewUrl} className={styles.previewAudio} />
                  <div className={styles.mediaMeta}>
                    <strong>{item.displayName}</strong>
                    <span>{item.directUrl}</span>
                  </div>
                  <button type="button" className={styles.tileButton} onClick={() => copyToClipboard(item.directUrl).then((ok) => showToast(ok ? 'Audio URL copied.' : 'Copy failed.'))}>
                    Copy audio URL
                  </button>
                </article>
              ))}
            </div>
          </BatchResultSection>

          <BatchResultSection
            title="Documents & Other"
            count={groupedBatchItems.docs.length}
            actionLabel="Copy doc links"
            onCopy={() => copyLinksFor('doc')}
            icon="📄"
          >
            <div className={styles.listStack}>
              {groupedBatchItems.docs.map((item) => (
                <article key={item.fileId} className={styles.listItem}>
                  <div className={styles.listMeta}>
                    <strong>{item.displayName}</strong>
                    <span>{item.directUrl}</span>
                  </div>
                  <div className={styles.listActions}>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => (item.previewOpen ? updateBatchItem(item.fileId, { previewOpen: false }) : updateBatchItem(item.fileId, { previewOpen: true }))}
                    >
                      <ChevronDown size={14} className={item.previewOpen ? styles.rotate : ''} />
                      Preview
                    </button>
                    <button type="button" className={styles.tileButton} onClick={() => copyToClipboard(item.directUrl).then((ok) => showToast(ok ? 'Link copied.' : 'Copy failed.'))}>
                      Copy link
                    </button>
                  </div>
                  {item.previewOpen ? (
                    <div className={styles.docPreviewArea}>
                      <button type="button" className={styles.secondaryButton} onClick={() => loadBatchJsonPreview(item)}>
                        Load JSON preview
                      </button>
                      {item.jsonState === 'loading' ? <p className={styles.hint}>Loading JSON preview…</p> : null}
                      {item.jsonState === 'done' ? <pre className={styles.codeBlock}>{item.jsonPreview}</pre> : null}
                      {item.jsonState === 'error' ? (
                        <p className={styles.hint}>JSON preview unavailable. This file may not be JSON or direct access may be blocked.</p>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </BatchResultSection>
        </div>
      </section>

      {toast ? <div className={styles.toast}>{toast}</div> : null}
    </div>
  );
}
