const formatCurrency = (value) =>
  `R${Number(value).toLocaleString("en-ZA")}`;


export { formatCurrency };