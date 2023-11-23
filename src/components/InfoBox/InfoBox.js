import { Alert } from "react-bootstrap";

function InfoBox({ show, variant, message, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default InfoBox;
