import React from 'react';
import './buildShell.css';

/**
 * Shared layout shell used to make each mini-build feel like part of one product.
 * A route-level theme key lets each build keep the shared structure while still
 * using colours that match its purpose.
 */
export default function BuildShell({ title, description, accent, children, compact = false, themeKey = 'default' }) {
  return (
    <section className={`build-shell build-shell--${themeKey}${compact ? ' build-shell--compact' : ''}`}>
      <header className="build-shell__header">
        <span className="build-shell__accent" style={{ background: accent }} />
        <div>
          <p className="build-shell__eyebrow">Mini-build</p>
          <h1>{title}</h1>
          {description ? <p className="build-shell__description">{description}</p> : null}
        </div>
      </header>
      <div className="build-shell__content">{children}</div>
    </section>
  );
}
