import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Papa from "papaparse";

const CSVDisplay = () => {
  const [data, setData] = useState([]);
  const theme = useTheme();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setData(results.data);
        },
        header: true,
      });
    }
  };

  return (
    <div style={{ padding: theme.spacing(2) }}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <TableContainer component={Paper} style={{ marginTop: theme.spacing(2) }}>
        <Table>
          <TableHead>
            <TableRow>
              {data[0] &&
                Object.keys(data[0]).map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
            </TableRow>
          </TableHead>
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
    </div>
  );
};

export default CSVDisplay;
