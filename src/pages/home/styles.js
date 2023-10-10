import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#2c383a",
    padding: theme.spacing(8, 0, 6),
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  childContainer: {
    display: "flex !important",
    justifyContent: "space-between",
    gap: "32px"
  },
  inputBox: {
    backgroundColor: "#cfe8fc",
    height: "80vh",
    width: "30vw",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column !important",
    padding: "16px",
    gap: "32px",
    overflow: "hidden",
  },
  title: {},
  inputGrid: {
    display: "flex",
    flexDirection: "column !important",
    gap: "16px",
  },
  submitBtn: {
    textTransform: "none !important",
    fontSize: "16px",
    height: "40px",
  },
  listBox: {
    backgroundColor: "#cfe8fc",
    height: "80vh",
    width: "60vw",
    borderRadius: "8px",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: "#888888 #f0f0f0",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f0f0f0",   
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888888",
      borderRadius: "5px",
    },
  },
  listGrid: {
    padding: "8px 16px"
  },
  listItem: {
    marginTop: "16px !important",
  },
}));
export default useStyles;
