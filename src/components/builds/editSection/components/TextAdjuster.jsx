import * as React from "react";
import { Toolbar } from "radix-ui";
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from "@radix-ui/react-icons";
import styles from "./text.module.css";
/* elementId, property, value */
const TextAdjuster = ({element, updateElementCSS}) => {
  console.log('element', element)


  function handleTextData(e, option) {


    if (element.type === 'button' && option === 'textAlign-left') {
      updateElementCSS(element.id, 'justifyContent', 'start')
      return
    } else if (element.type === 'button' && option === 'textAlign-center') {
      updateElementCSS(element.id, 'justifyContent', 'center')
      return
    } else if (element.type === 'button' && option === 'textAlign-right') {
      updateElementCSS(element.id, 'justifyContent', 'end')
      return
    }


    if (element.type === 'text' && option === 'fontWeight') {
      updateElementCSS(element.id, 'fontWeight', element.CSS?.fontWeight === 'bold' ? 'revert' : 'bold')
      return
    }

    if (element.type === 'text' && option === 'textAlign-left') {
      updateElementCSS(element.id, 'textAlign', 'left')
      return
    } else if (element.type === 'text' && option === 'textAlign-center') {
      updateElementCSS(element.id, 'textAlign', 'center')
      return
    } else if (element.type === 'text' && option === 'textAlign-right') {
      updateElementCSS(element.id, 'textAlign', 'right')
      return
    }
    
  }


  return (
    <Toolbar.Root className={styles.Root} aria-label="Formatting options">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="bold"
          data-state={element.CSS?.fontWeight === 'bold' ? 'on' : 'off'} 
          onClick={(e) => handleTextData(e, 'fontWeight')}
          aria-label="Bold"
        >
          <FontBoldIcon />
        </Toolbar.ToggleItem>
        {/* <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="italic"
          onClick={(e) => handleTextData(e)}
          aria-label="Italic"
        >
          <FontItalicIcon />
        </Toolbar.ToggleItem> */}
        {/* <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="strikethrough"
          onClick={(e) => handleTextData(e)}
          aria-label="Strike through"
        >
          <StrikethroughIcon />
        </Toolbar.ToggleItem> */}
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className={styles.Separator} />
      <Toolbar.ToggleGroup
        type="single"
        defaultValue={element.CSS?.textAlign || 'left'}
        aria-label="Text alignment"
      >
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="left"
          onClick={(e) => handleTextData(e, 'textAlign-left')}
          aria-label="Left aligned"
        >
          <TextAlignLeftIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="center"
          onClick={(e) => handleTextData(e, 'textAlign-center')}
          aria-label="Center aligned"
        >
          <TextAlignCenterIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className={styles.ToggleItem}
          value="right"
          onClick={(e) => handleTextData(e, 'textAlign-right')}
          aria-label="Right aligned"
        >
          <TextAlignRightIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      {/* <Toolbar.Separator className={styles.Separator} /> */}
    </Toolbar.Root>
  );
};

export default TextAdjuster;
