import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./boxes.css"

function SwitchExample(props) {

  const [flip, setFlip] = useState(false)

  function flipThis(e){
    setFlip(prev=> !prev)
    e.target.checked = !flip
  }

  return (
   
      <Form.Check 
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