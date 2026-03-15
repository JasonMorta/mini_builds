export const customStyles = {
  header: { style: { minHeight: "56px", backgroundColor: "rgba(17, 20, 24, 0.98)", color: "rgba(246, 239, 230, 0.94)" } },
  table: { style: { maxHeight: "60vh", fontFamily: "system-ui", backgroundColor: "rgba(17, 20, 24, 0.98)", color: "rgba(246, 239, 230, 0.94)" } },
  headRow: { style: { backgroundColor: "rgba(23, 27, 32, 0.98)", color: "rgba(246, 239, 230, 0.94)", borderTopStyle: "solid", borderTopWidth: "1px", borderTopColor: "rgba(255,255,255,0.08)" } },
  headCells: { style: { color: "rgba(246, 239, 230, 0.94)", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", '&:not(:last-of-type)': { borderRightStyle: 'solid', borderRightWidth: '1px', borderRightColor: 'rgba(255,255,255,0.06)' } } },
  rows: { style: { fontSize: "12px", minHeight: "44px", backgroundColor: "rgba(17, 20, 24, 0.98)", color: "rgba(246, 239, 230, 0.92)", '&:not(:last-of-type)': { borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'rgba(255,255,255,0.06)' } } },
  cells: { style: { color: "rgba(246, 239, 230, 0.92)", '&:not(:last-of-type)': { borderRightStyle: 'solid', borderRightWidth: '1px', borderRightColor: 'rgba(255,255,255,0.04)' } } },
  pagination: { style: { backgroundColor: "rgba(17, 20, 24, 0.98)", color: "rgba(246, 239, 230, 0.8)", borderTop: '1px solid rgba(255,255,255,0.06)' } },
  expanderRow: { style: { backgroundColor: "rgba(13, 16, 20, 0.98)", color: "rgba(246, 239, 230, 0.9)" } }
};
