import Form from 'react-bootstrap/Form';

function Slider(props) {
  return (
    <div style={{ display: 'grid', gap: '0.45rem', width: '100%', margin: 0 }}>
      <Form.Label style={{ margin: 0, color: 'rgba(246, 239, 230, 0.82)' }}>{props.text}</Form.Label>
      <Form.Range value={props.value} onChange={props.onChange} className={props.className} min={20} />
    </div>
  );
}

export default Slider;
