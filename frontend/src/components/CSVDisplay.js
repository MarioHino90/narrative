import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Alert,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  IconButton,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import Papa from "papaparse";
import axios from "axios";

const CSVTableHeader = styled(TableHead)({
  textTransform: "capitalize",
});

const CSVDisplay = () => {
  const [data, setData] = useState([]);
  const [alertOpen, setAlertOpen] = useState();
  const theme = useTheme();

  const onFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8000/upload/", formData, config)
      .then((response) => {
        console.log("File uploaded successfully");
        setData(response.data.result);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setAlertOpen(true);
        },
        header: true,
      });

      onFileUpload(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {alertOpen && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Uploaded the CSV file successfully.
        </Alert>
      )}
      <TableContainer component={Paper} style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <CSVTableHeader>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((header) => (
                  <TableCell key={header}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {header}
                    </Typography>
                  </TableCell>
                ))}
            </TableRow>
          </CSVTableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((cell, i) => (
                  <TableCell key={i}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CSVDisplay;
