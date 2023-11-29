import { Card } from "react-bootstrap";
import styles from "./MessagesUnitChat.module.css";

function MessagesUnitChat() {
  return (
    <Card style={{ width: "22rem", marginBottom: "0rem" }}>
      <Card.Body>
        <div className={styles.messageUnit}>
          <Card.User>Name of User</Card.User>
          <Card.Text>Latest message...</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MessagesUnitChat;
