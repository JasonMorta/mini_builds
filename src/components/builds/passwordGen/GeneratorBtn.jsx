import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { StateContext } from '../../../StateManager';
import CSS from './passGen.module.css';

const UPPERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWERS = 'abcdefghijkmnopqrstuvwxyz';
const NUMBERS = '23456789';
const SYMBOLS = ':<%=$>?@]^_`!|#~&*-+!';
const AMBIGUOUS = new Set(['O', '0', 'I', 'l', '1', '|']);

function shuffle(chars) {
  const arr = [...chars];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
  }
  return arr.join('');
}

function pickChar(pool, used, avoidRepeats) {
  const available = avoidRepeats ? [...pool].filter((char) => !used.has(char)) : [...pool];
  const source = available.length ? available : [...pool];
  const next = source[Math.floor(Math.random() * source.length)];
  used.add(next);
  return next;
}

export default function GeneratorBtn(props) {
  const { count, numbers, lowerCase, symbols, upperCase, excludeAmbiguous, noRepeatChars, mustIncludeEachSelected } = props.data;
  const extraClass = props.className ? ` ${props.className}` : "";
  const value = useContext(StateContext);
  const [, setOptions] = value;

  function makePass() {
    const groups = [];
    const clean = (pool) => (excludeAmbiguous ? [...pool].filter((char) => !AMBIGUOUS.has(char)).join('') : pool);

    if (upperCase) groups.push(clean(UPPERS));
    if (lowerCase) groups.push(clean(LOWERS));
    if (numbers) groups.push(clean(NUMBERS));
    if (symbols) groups.push(clean(SYMBOLS));

    if (!groups.length) {
      setOptions((prev) => ({
        ...prev,
        passGen: { ...prev.passGen, pass: '' },
      }));
      return;
    }

    const targetLength = Number(count);
    const used = new Set();
    const chars = [];

    // Force one character from each selected group when the stricter rule is enabled.
    if (mustIncludeEachSelected) {
      groups.forEach((group) => {
        if (chars.length < targetLength) {
          chars.push(pickChar(group, used, noRepeatChars));
        }
      });
    }

    const combinedPool = groups.join('');
    while (chars.length < targetLength) {
      chars.push(pickChar(combinedPool, used, noRepeatChars));
    }

    const password = shuffle(chars.join('')).slice(0, targetLength);

    setOptions((prev) => ({
      ...prev,
      passGen: { ...prev.passGen, pass: password },
    }));
  }

  return (
    <Button variant="dark" className={`${CSS.primaryAction}${extraClass}`} onClick={makePass}>
      Generate password
    </Button>
  );
}
