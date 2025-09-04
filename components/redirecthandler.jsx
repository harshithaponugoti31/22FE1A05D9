import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import urlService from "../services/urlservice";
import logger from "../services/loggerservice";
function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = urlService.getUrl(shortcode);
      if (!data) {
        alert("This short link does not exist.");
        navigate("/");
        return;
      }

      const now = Date.now();
      if (now > data.expiresAt) {
        alert("This short link has expired.");
        navigate("/");
        return;
      }

      urlService.logClick(shortcode);
      window.location.href = data.url;
    } catch (err) {
      logger.error("Redirect failed", { shortcode, err });
      navigate("/");
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;