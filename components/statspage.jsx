import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import urlService from "../services/urlservice";

function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(urlService.getAllUrls());
  }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 2, mt: 3 }}>
      <h2>URL Statistics</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((row) => (
            <TableRow key={row.shortcode}>
              <TableCell>{window.location.origin + "/" + row.shortcode}</TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(row.expiresAt).toLocaleString()}</TableCell>
              <TableCell>{row.clicks.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatsPage;