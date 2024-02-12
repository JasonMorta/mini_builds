import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function StyledButton(props) {


  return <AwesomeButton 
  type={props.type}
  onPress={props.onclick}
  >{props.text}</AwesomeButton>;
}