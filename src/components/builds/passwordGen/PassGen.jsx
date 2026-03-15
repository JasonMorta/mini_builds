import React, { useContext } from 'react';
import CSS from './passGen.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import GeneratorBtn from './GeneratorBtn';
import { StateContext } from '../../../StateManager';

export default function PassGen() {
  const value = useContext(StateContext);
  const [options, setOptions] = value;

  function copyTo() {
    navigator.clipboard.writeText(options.passGen.pass);
    alert(`Password ${options.passGen.pass} copied`);
  }

  return (
    <div className={CSS.box}>
      <div className={CSS.header}>
        <p className={CSS.eyebrow}>Utility</p>
        <h3>Generate a random password</h3>
        <p className={CSS.copy}>
          Adjust the mix of characters, then generate and copy a stronger password for quick use.
        </p>
      </div>

      <label htmlFor="pass">Password</label>
      <InputGroup className={CSS.outputGroup}>
        <Form.Control
          id="pass"
          name="pass"
          readOnly
          aria-label="Generated password"
          value={options.passGen.pass === '' ? '' : options.passGen.pass}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={copyTo}>
          Copy
        </Button>
      </InputGroup>

      <div className={CSS.pass_options}>
        <h5>Include characters</h5>
        <div className={`${CSS.check_container} mb-3`}>
          <Form.Label>
            Character amount <b>{options.passGen.count}</b>
          </Form.Label>
          <Form.Range
            max="20"
            min="3"
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                passGen: { ...prev.passGen, count: e.target.value },
              }));
            }}
          />

          <Form.Check
            type="checkbox"
            id="default-checkbox1"
            label="Uppercase letters"
            name="group1"
            className={CSS.upperC}
            defaultChecked={options.passGen.upperCase}
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                passGen: { ...prev.passGen, upperCase: e.target.checked },
              }));
            }}
          />
          <Form.Check
            type="checkbox"
            id="default-checkbox2"
            label="Lowercase letters"
            name="group2"
            className={CSS.upperC}
            defaultChecked={options.passGen.lowerCase}
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                passGen: { ...prev.passGen, lowerCase: e.target.checked },
              }));
            }}
          />
          <Form.Check
            type="checkbox"
            id="default-checkbox3"
            label="Symbols"
            className={CSS.upperC}
            defaultChecked={options.passGen.symbols}
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                passGen: { ...prev.passGen, symbols: e.target.checked },
              }));
            }}
          />
          <Form.Check
            type="checkbox"
            id="default-checkbox4"
            label="Numbers"
            className={CSS.upperC}
            defaultChecked={options.passGen.numbers}
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                passGen: { ...prev.passGen, numbers: e.target.checked },
              }));
            }}
          />
        </div>
        <GeneratorBtn data={options.passGen} />
      </div>
    </div>
  );
}
