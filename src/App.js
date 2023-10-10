import MyRoutes from "./routes";
import "./App.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { SnackbarProvider } from "notistack";
function App() {
  const theme = createTheme();
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <MyRoutes />
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
