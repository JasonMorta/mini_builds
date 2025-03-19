import * as React from "react";
import { Slider } from "radix-ui";
import styles from "./FontSlider.module.css";

const FontSlider = ({element, updateElementCSS}) => (
	<form>
		<Slider.Root 
    className={styles.Root} 
    defaultValue={[element.CSS?.fontSize || 15]} 
    max={100} 
    min={5} 
    step={1}
    onValueChange={(value) => updateElementCSS(element.id, 'fontSize', `${value}px`)}
    >
			<Slider.Track className={styles.Track}>
				<Slider.Range className={styles.Range} />
			</Slider.Track>
			<Slider.Thumb className={styles.Thumb} aria-label="Volume" />
		</Slider.Root>
	</form>
);

export default FontSlider;
