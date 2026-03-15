import React from "react";
import styles from "./Loaders.module.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";

export default function DataLoader() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [buttonColor, setButtonColor] = React.useState("primary");
  const [buttonText, setButtonText] = React.useState("Fetch Data");

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": { bgcolor: green[700] },
    }),
  };

  const handleButtonClick = async () => {
    setButtonText("Loading...");
    if (data.length > 0) {
      setButtonText("Data already loaded");
      setButtonColor("secondary");
      return;
    }

    if (!loading) {
      setSuccess(false);
      setLoading(true);

      await fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((payload) => {
          setTimeout(() => {
            setData(payload);
            setSuccess(true);
            setLoading(false);
            setButtonText("Success");
            setButtonColor("success");
          }, 2000);
        })
        .catch((error) => {
          setTimeout(() => {
            setSuccess(false);
            setLoading(false);
            setButtonText(error?.message);
            setButtonColor("error");
          }, 1000);
        });
    }
  };

  return (
    <section className={styles.dataLoadSection}>
      <h4>DataLoader</h4>
      <p>Click the button to load data from an API.</p>
      <p>API requests are normally quick, so a 2 second interval was added.</p>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button variant="contained" color={buttonColor} sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
          {buttonText}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{ color: green[500], position: "absolute", top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
          />
        )}
      </Box>
    </section>
  );
}
