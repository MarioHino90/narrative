import {
  CssBaseline,
  Typography,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import CSVDisplay from "./components/CSVDisplay";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            CSS Uploader Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px"}}>
        <Typography variant="h4" gutterBottom>
          Welcome to the CSV Uploader Tool!
        </Typography>
        <Typography variant="body1" marginBottom={2}>
          This CSV Uploader Tool is designed to map CSV file uploads to a
          specified database structure, allowing for dynamic adjustment to
          different CSV headers and database schemas.
        </Typography>
        <CSVDisplay />
      </Container>
    </>
  );
}

export default App;
