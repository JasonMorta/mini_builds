import React, { useContext, useMemo, useState } from 'react';
import CSS from './passGen.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import GeneratorBtn from './GeneratorBtn';
import { StateContext } from '../../../StateManager';

const PRESETS = [
  {
    key: 'balanced',
    label: 'Balanced',
    description: 'Everyday strong password',
    config: {
      count: 16,
      upperCase: true,
      lowerCase: true,
      symbols: true,
      numbers: true,
      excludeAmbiguous: true,
      noRepeatChars: false,
      mustIncludeEachSelected: true,
    },
  },
  {
    key: 'memorable',
    label: 'Memorable',
    description: 'Easier to read and type',
    config: {
      count: 14,
      upperCase: true,
      lowerCase: true,
      symbols: false,
      numbers: true,
      excludeAmbiguous: true,
      noRepeatChars: false,
      mustIncludeEachSelected: true,
    },
  },
  {
    key: 'maximum',
    label: 'Maximum',
    description: 'Long and complex',
    config: {
      count: 24,
      upperCase: true,
      lowerCase: true,
      symbols: true,
      numbers: true,
      excludeAmbiguous: false,
      noRepeatChars: true,
      mustIncludeEachSelected: true,
    },
  },
];

function estimateStrength(pass, settings) {
  if (!pass) {
    return { label: 'Ready', score: 0, percent: 8, tips: 'Choose a preset or tweak options, then generate.' };
  }

  let score = 0;
  if (pass.length >= 12) score += 1;
  if (pass.length >= 16) score += 1;
  if (pass.length >= 24) score += 1;
  if (settings.upperCase) score += 1;
  if (settings.lowerCase) score += 1;
  if (settings.numbers) score += 1;
  if (settings.symbols) score += 1;
  if (settings.excludeAmbiguous) score += 0.5;
  if (settings.noRepeatChars) score += 0.5;
  if (settings.mustIncludeEachSelected) score += 0.5;

  if (score < 3) return { label: 'Weak', score, percent: 28, tips: 'Increase the length and enable more character groups.' };
  if (score < 5) return { label: 'Fair', score, percent: 48, tips: 'Add symbols or numbers for a stronger mix.' };
  if (score < 7) return { label: 'Strong', score, percent: 74, tips: 'Good balance for most accounts.' };
  return { label: 'Very strong', score, percent: 100, tips: 'High complexity with a broader character mix.' };
}

export default function PassGen() {
  const value = useContext(StateContext);
  const [options, setOptions] = value;
  const [copied, setCopied] = useState(false);

  const settings = {
    count: Number(options.passGen.count ?? 12),
    upperCase: options.passGen.upperCase ?? true,
    lowerCase: options.passGen.lowerCase ?? true,
    symbols: options.passGen.symbols ?? true,
    numbers: options.passGen.numbers ?? true,
    excludeAmbiguous: options.passGen.excludeAmbiguous ?? true,
    noRepeatChars: options.passGen.noRepeatChars ?? false,
    mustIncludeEachSelected: options.passGen.mustIncludeEachSelected ?? true,
    pass: options.passGen.pass ?? '',
  };

  const enabledGroups = [settings.upperCase, settings.lowerCase, settings.symbols, settings.numbers].filter(Boolean).length;
  const strength = useMemo(() => estimateStrength(settings.pass, settings), [settings.pass, settings.count, settings.upperCase, settings.lowerCase, settings.symbols, settings.numbers, settings.excludeAmbiguous, settings.noRepeatChars, settings.mustIncludeEachSelected]);

  function updatePassGen(partial) {
    setOptions((prev) => ({
      ...prev,
      passGen: { ...prev.passGen, ...partial },
    }));
  }

  async function copyToClipboard() {
    if (!settings.pass) return;
    await navigator.clipboard.writeText(settings.pass);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function applyPreset(config) {
    updatePassGen({ ...config, pass: '' });
  }

  return (
    <section className={CSS.shell}>
      <div className={CSS.hero}>
        <div className={CSS.heroCopy}>
          <p className={CSS.eyebrow}>Password utility</p>
          <h2>Create stronger passwords faster</h2>
          <p className={CSS.copy}>
            Build a password with clearer presets, live strength feedback, and more control over complexity while keeping the flow simple.
          </p>
        </div>

        <div className={CSS.heroStats}>
          <article className={CSS.statCard}>
            <span>Length</span>
            <strong>{settings.count}</strong>
            <small>characters</small>
          </article>
          <article className={CSS.statCard}>
            <span>Groups</span>
            <strong>{enabledGroups}</strong>
            <small>enabled sets</small>
          </article>
          <article className={CSS.statCard}>
            <span>Strength</span>
            <strong>{strength.label}</strong>
            <small>{strength.tips}</small>
          </article>
        </div>
      </div>

      <div className={CSS.layout}>
        <div className={CSS.primaryPanel}>
          <div className={CSS.outputCard}>
            <div className={CSS.outputHeaderRow}>
              <div>
                <p className={CSS.sectionLabel}>Generated password</p>
                <h3>Ready to copy</h3>
                <p className={CSS.mutedCopy}>Generate once, then copy or adjust the rules before making another one.</p>
              </div>
              <div className={CSS.badge}>{copied ? 'Copied' : strength.label}</div>
            </div>

            <InputGroup className={CSS.outputGroup}>
              <Form.Control
                id="pass"
                name="pass"
                readOnly
                aria-label="Generated password"
                value={settings.pass}
                placeholder="Generate a password"
                className={CSS.passwordInput}
              />
              <Button variant="dark" className={CSS.secondaryAction} onClick={copyToClipboard}>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </InputGroup>

            <div className={CSS.strengthRow}>
              <div className={CSS.strengthTrack} aria-hidden="true">
                <div className={CSS.strengthFill} style={{ width: `${strength.percent}%` }} />
              </div>
              <span>{strength.label}</span>
            </div>

            <div className={CSS.outputActions}>
              <GeneratorBtn data={settings} className={CSS.primaryAction} />
              <Button
                variant="outline-light"
                className={CSS.secondaryAction}
                onClick={() => updatePassGen({ pass: '' })}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className={CSS.panel}>
            <div className={CSS.panelHeader}>
              <div>
                <p className={CSS.sectionLabel}>Quick presets</p>
                <h4>Choose a starting point</h4>
              </div>
            </div>
            <div className={CSS.presetGrid}>
              {PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.key}
                  className={CSS.presetCard}
                  onClick={() => applyPreset(preset.config)}
                >
                  <strong>{preset.label}</strong>
                  <span>{preset.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className={CSS.controlsPanel}>
          <div className={CSS.panel}>
            <div className={CSS.panelHeader}>
              <div>
                <p className={CSS.sectionLabel}>Core controls</p>
                <h4>Adjust the mix</h4>
              </div>
            </div>

            <div className={CSS.sliderBlock}>
              <div className={CSS.sliderHeader}>
                <span>Password length</span>
                <strong>{settings.count}</strong>
              </div>
              <Form.Range
                max="64"
                min="6"
                value={settings.count}
                onChange={(e) => updatePassGen({ count: Number(e.target.value) })}
              />
            </div>

            <div className={CSS.optionGrid}>
              <label className={CSS.optionCard}>
                <Form.Check
                  type="switch"
                  checked={settings.upperCase}
                  onChange={(e) => updatePassGen({ upperCase: e.target.checked })}
                  label="Uppercase letters"
                />
                <small>Add A–Z</small>
              </label>
              <label className={CSS.optionCard}>
                <Form.Check
                  type="switch"
                  checked={settings.lowerCase}
                  onChange={(e) => updatePassGen({ lowerCase: e.target.checked })}
                  label="Lowercase letters"
                />
                <small>Add a–z</small>
              </label>
              <label className={CSS.optionCard}>
                <Form.Check
                  type="switch"
                  checked={settings.numbers}
                  onChange={(e) => updatePassGen({ numbers: e.target.checked })}
                  label="Numbers"
                />
                <small>Add 0–9</small>
              </label>
              <label className={CSS.optionCard}>
                <Form.Check
                  type="switch"
                  checked={settings.symbols}
                  onChange={(e) => updatePassGen({ symbols: e.target.checked })}
                  label="Symbols"
                />
                <small>Add punctuation</small>
              </label>
            </div>
          </div>

          <div className={CSS.panel}>
            <div className={CSS.panelHeader}>
              <div>
                <p className={CSS.sectionLabel}>Advanced rules</p>
                <h4>Make it more complex</h4>
              </div>
            </div>

            <div className={CSS.optionStack}>
              <label className={CSS.optionRow}>
                <Form.Check
                  type="switch"
                  checked={settings.mustIncludeEachSelected}
                  onChange={(e) => updatePassGen({ mustIncludeEachSelected: e.target.checked })}
                  label="Require every selected group"
                />
                <small>Guarantees at least one character from each enabled set.</small>
              </label>

              <label className={CSS.optionRow}>
                <Form.Check
                  type="switch"
                  checked={settings.excludeAmbiguous}
                  onChange={(e) => updatePassGen({ excludeAmbiguous: e.target.checked })}
                  label="Exclude ambiguous characters"
                />
                <small>Avoid characters like O, 0, I, l, and 1.</small>
              </label>

              <label className={CSS.optionRow}>
                <Form.Check
                  type="switch"
                  checked={settings.noRepeatChars}
                  onChange={(e) => updatePassGen({ noRepeatChars: e.target.checked })}
                  label="Avoid repeated characters"
                />
                <small>Helps reduce patterns such as double letters or repeated digits.</small>
              </label>
            </div>
          </div>

          <div className={CSS.panel}>
            <div className={CSS.panelHeader}>
              <div>
                <p className={CSS.sectionLabel}>Tips</p>
                <h4>Generation guidance</h4>
              </div>
            </div>
            <ul className={CSS.tipList}>
              <li>Longer passwords are usually stronger than short complex ones.</li>
              <li>Use the memorable preset for fast manual typing.</li>
              <li>Use the maximum preset for account recovery or vault storage.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
