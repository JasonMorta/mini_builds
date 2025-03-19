import * as React from "react";
import { DropdownMenu } from "radix-ui";
import {
	HamburgerMenuIcon,
	DotFilledIcon,
	CheckIcon,
	ChevronRightIcon,
} from "@radix-ui/react-icons";
import styles from "./AddSectionBtn.module.css";

const AddSectionButton = ({elements, setElements, toggleEditMode, initialSection}) => {
	const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
	const [urlsChecked, setUrlsChecked] = React.useState(false);
	const [person, setPerson] = React.useState("pedro");

	function AddSectionButton() {
		console.log('Add Section Button Clicked');
		//setElements([...elements, initialSection]);
	}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className={styles.IconButton} aria-label="Customise options">
					<HamburgerMenuIcon />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className={styles.Content} sideOffset={5}>
				<DropdownMenu.Separator className={styles.Separator} />

					<DropdownMenu.Item 
					className={styles.Item}
					onClick={() => toggleEditMode()}
					>
						Edit Sections 
					</DropdownMenu.Item>

					<DropdownMenu.Item
					 className={styles.Item}
					 onClick={() => AddSectionButton()}
					 >
						Add NEW Section
					</DropdownMenu.Item>

					<DropdownMenu.Separator className={styles.Separator} />


					<DropdownMenu.Arrow className={styles.Arrow} />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default AddSectionButton;
