/* UI note: This screen uses the shared dark bronze shell so individual mini-builds inherit consistent spacing, readable contrast, and mobile-friendly surfaces. */
import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, Zap } from 'lucide-react';
import { StateContext } from '../StateManager';
import { buildRegistry } from '../config/builds';
import './Main.css';

export default function Main() {
  const [state] = useContext(StateContext);
  const [query, setQuery] = useState('');

  const allBuilds = useMemo(() => buildRegistry.filter((item) => item.path !== '/'), []);

  const filteredBuilds = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return allBuilds;
    }

    return allBuilds.filter(
      (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
    );
  }, [query, allBuilds]);

  return (
    <motion.section
      className="main_dashboard"
      initial={state.motion.initial}
      animate={state.motion.animate}
      exit={state.motion.exit}
      transition={state.motion.transition}
    >
      <div className="main_hero">
        <span className="main_hero__ghost main_hero__ghost--one">01</span>
        <span className="main_hero__ghost main_hero__ghost--two">02</span>

        <div className="main_hero__intro">
          <div className="main_hero__badge">
            <Zap size={12} />
            React Playground
          </div>
          <p className="main_hero__eyebrow">Curated interface experiments</p>
        </div>

        <div className="main_hero__grid">
          <div className="main_hero__copy">
            <h1 className="main_hero__title">
              <span className="main_hero__title--accent">Mini</span>
              <span className="main_hero__title--dot">.</span>
              Builds
            </h1>
            <p className="main_hero__sub">
              A curated collection of React experiments, each one shaped into a focused mini-build with a cleaner shell,
              stronger hierarchy, and a more consistent product feel.
            </p>

            <div className="main_hero__meta">
              <div className="main_hero__stat">
                <span className="main_hero__stat-num">{allBuilds.length}</span>
                <span className="main_hero__stat-label">active builds</span>
              </div>
              <div className="main_hero__divider" />
              <div className="main_hero__stat">
                <span className="main_hero__stat-num">Vite</span>
                <span className="main_hero__stat-label">migrated shell</span>
              </div>
              <div className="main_hero__divider" />
              <div className="main_hero__stat">
                <span className="main_hero__stat-num">Responsive</span>
                <span className="main_hero__stat-label">mobile-first tuning</span>
              </div>
            </div>
          </div>

          <aside className="main_hero__panel" aria-label="Project summary">
            <p className="main_hero__panel-kicker">Project refinements</p>
            <div className="main_hero__panel-block">
              <strong>Unified shell</strong>
              <span>Shared framing for every mini-build with clearer spacing and visual rhythm.</span>
            </div>
            <div className="main_hero__panel-block">
              <strong>Responsive layout</strong>
              <span>Improved stacking, overflow handling, and panel sizing for smaller screens.</span>
            </div>
            <div className="main_hero__panel-block">
              <strong>Safer logic</strong>
              <span>Stabilised a few build-level interactions that previously relied on brittle DOM behaviour.</span>
            </div>
          </aside>
        </div>
      </div>

      <div className="main_catalog">
        <div className="main_catalog__header">
          <div>
            <p className="main_catalog__eyebrow">Catalogue</p>
            <h2 className="main_catalog__heading">All builds</h2>
          </div>
          <label className="main_catalog__search">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search builds…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        {filteredBuilds.length === 0 ? (
          <p className="main_catalog__empty">No builds match “{query}”</p>
        ) : (
          <div className="main_catalog__grid">
            {filteredBuilds.map((item, index) => {
              const Icon = item.icon;
              const cardNumber = String(index + 1).padStart(2, '0');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="build_card"
                  style={{ '--card-accent': item.accent }}
                >
                  <div className="build_card__top">
                    <span className="build_card__index">{cardNumber}</span>
                    <span className="build_card__arrow">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                  <div className="build_card__body">
                    <span className="build_card__icon">
                      <Icon size={16} />
                    </span>
                    <h3 className="build_card__name">{item.name}</h3>
                    <p className="build_card__desc">{item.description}</p>
                  </div>
                  <div className="build_card__glow" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
}
