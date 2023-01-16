import Form from 'react-bootstrap/Form';

function Slider(props) {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1.875rem'
        }}>
        <Form.Label>{props.text}</Form.Label>
        <Form.Range 
          value={props.value}
          onChange={props.onChange}
          className={props.className}
          min={20}
        />
      </div>
    </>
  );
}

export default Slider;