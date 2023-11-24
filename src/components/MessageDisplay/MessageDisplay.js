import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function MessageDisplay() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setVariant(location.state.variant || "info");
      setShow(true);
    }
  }, [location]);

  if (!show) return null;

  return (
    <Alert
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
      style={{ marginBottom: 0 }}
    >
      {message}
    </Alert>
  );
}

export default MessageDisplay;
