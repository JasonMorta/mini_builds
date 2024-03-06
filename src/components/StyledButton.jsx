import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default function StyledButton(props) {


  // https://github.com/rcaferati/react-awesome-button

  return <AwesomeButton 
  type={props.type} // default:primary = Render a specific button type, styled by the .scss type list
  //Render a button type (facebook, instagram, twitter, github, Youtube, linkedin, pinterest, reddit, messenger, whatsapp)
  disabled={props.disabled}
  onPress={props.onPress}
  //size="medium" // default:medium = Render a specific button size, styled by the .scss size list
  //visible={true} // default:true = Render the button visible or not
  //ripple={true} // default:true = Render the button with ripple effect or not
  //onPressed={function} // default:undefined = Callback function to be called when the button is pressed
  //onRelease={function} // default:undefined = Callback function to be called when the button is released
  //onMouseUp={function} // default:undefined = Callback function to be called when the button mouse is released
  //onMouseDown={function} // default:undefined = Callback function to be called when the button mouse is pressed
  //href={string} // default:undefined = Render the button as a link
  //target={string} // default:undefined = Render the button with a target
  className={props.className} // default:undefined = Render the button with a custom class
  //cssModule={object} // default:undefined = Render the button with a custom css module
  //style={object} // default:undefined = Render the button with a custom style
  //before={node} // default:undefined = Render a custom node before the button; useful for setting icons
  //after={node} // default:undefined = Render a custom node after the button; useful for setting icons
  //between={node} // default:undefined = Render a custom node between the button; useful for setting icons
  //active={boolean} // default:false = Activates the pressIn animation

  >{props.text}</AwesomeButton>;
}