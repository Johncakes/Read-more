import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Student } from "../types/type";

export default function Home() {
  const [data, setData] = useState<Student[]>();
  const [text, setText] = useState(" ");
  const [pdf, setPdf] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/db", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFromDb = async (id: string) => {
    try {
      const response = await fetch("/api/db", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        console.log("Student deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const sendToDb = async () => {
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: text }),
      });
      if (response.ok) {
        console.log("Student added successfully");
        fetchData();
      } else {
        console.error("Error adding student:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const uploadPdf = async (id: string) => {
    if (!pdf) {
      return;
    }

    console.log(pdf);
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("id", id);

    console.log("FormData : ", formData);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Pdf uploaded successfully");
        fetchData();
      }
    } catch (error) {
      console.error("Error uploading pdf:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Box
        flexDirection={"column"}
        width={"100%"}
        sx={{
          p: 2,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <TextField sx={{ mr: 2 }} onChange={(e) => setText(e.target.value)} />
          <Button variant="outlined" onClick={sendToDb}>
            Send
          </Button>
        </Box>

        <Button variant="outlined" onClick={fetchData}>
          Fetch{" "}
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Names</TableCell>
                <TableCell align="right">Pdf upload</TableCell>
                <TableCell align="right">Upload</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.map((student: any) => (
                  <TableRow key={student.id} sx={{ width: "100%" }}>
                    <TableCell align="right">{student.name}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" component="label">
                        Upload files
                        <input
                          type="file"
                          accept="application/pdf"
                          hidden
                          onChange={(e) => {
                            if (e.target.files) {
                              setPdf(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => uploadPdf(student.id)}
                      >
                        Upload
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteFromDb(student.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
