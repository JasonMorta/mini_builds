import { TableRows } from "@mui/icons-material";
import DataTable, { defaultThemes } from "react-data-table-component";


export const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	table: {
		style: {
			maxHeight: '60vh', // Adjust as needed
			fontFamily: 'system-ui',
		}
	},
	rows: {
		style: {
			fontSize: '12px', // Set font size
			}
	}
};

