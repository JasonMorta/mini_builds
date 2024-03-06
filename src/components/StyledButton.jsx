import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function StyledButton(props) {


  return <AwesomeButton 
  type={props.type}
  disabled={props.disabled}
  onPress={props.onPress}
  onclick={props.onClick}
  >{props.text}</AwesomeButton>;
}