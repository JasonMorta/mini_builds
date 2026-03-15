import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './Truthy.module.css';

function SwitchExample(props) {
  const [flip, setFlip] = useState(false);
  function flipThis(e) {
    setFlip((prev) => !prev);
    e.target.checked = !flip;
  }
  return (
    <Form.Check
      className={styles.formCheck}
      checked={props.checked}
      size="small"
      onClick={props.handleSwitch}
      onChange={flipThis}
      type="switch"
      id="custom-switch"
      label={props.label}
    />
  );
}

export default SwitchExample;
