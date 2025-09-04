import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import urlService from "../services/urlservice";
import logger from "../services/loggerservice";

function UrlForm() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = () => {
    try {
      const shortUrl = urlService.createShortUrl(url, validity, shortcode || null);
      logger.info("URL Created", { url, shortUrl });
      alert("Short URL: " + shortUrl);
      setUrl("");
      setValidity(30);
      setShortcode("");
    } catch (err) {
      logger.error("Error creating URL", { message: err.message });
      alert(err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <h2>Shorten a URL</h2>
      <TextField
        fullWidth
        label="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        type="number"
        fullWidth
        label="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Custom Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>
    </Box>
  );
}

export default UrlForm;