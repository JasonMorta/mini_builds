import React, { useContext, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { StateContext } from '../StateManager';
import './menu.css';

export default function Menu() {
  const [state] = useContext(StateContext);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return state.menuItems;
    }

    return state.menuItems.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
  }, [query, state.menuItems]);

  return (
    <aside className={`menu_section${isCollapsed ? ' menu_section--collapsed' : ''}`}>
      <div className="menu_branding">
        <div>
          <p className="menu_branding__eyebrow">Mini builds</p>
          <h1>Mini Builds</h1>
        </div>
        <button
          type="button"
          className="menu_collapse_button"
          onClick={() => setIsCollapsed((current) => !current)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={18} className={isCollapsed ? 'rotated' : ''} />
        </button>
      </div>

      <div className="menu_workspace">
        <span className="menu_workspace__badge">M</span>
        <div>
          <p className="menu_workspace__label">Workspace</p>
          <strong>MortaDev</strong>
        </div>
      </div>

      <label className="menu_search">
        <Search size={16} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a build"
        />
      </label>

      <nav className="menu_links" aria-label="Mini-build navigation">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              data-mini={item.name}
              key={item.path}
              to={item.path}
              className={`menu_items${isActive ? ' active_build' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              <span className="menu_items__icon">
                <Icon size={18} />
              </span>
              {!isCollapsed && (
                <span className="menu_items__content">
                  <span className="menu_items__name">{item.name}</span>
                </span>
              )}
              <span className="menu_items__accent" style={{ background: item.accent }} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
