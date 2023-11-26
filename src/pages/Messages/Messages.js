import MessagesMenu from "../../components/MessagesMenu/MessagesMenu";
import { Container} from "react-bootstrap";
import styles from "./Messages.module.css";


function Messages() {
    return (
     <Container fluid className={`${styles.containerClass} p-0`}>
      <MessagesMenu />
      </Container>
    );
  }
  
  export default Messages;