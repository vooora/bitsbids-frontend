import MessagesMenu from "../../components/MessagesMenu/MessagesMenu";
import { Container} from "react-bootstrap";
import styles from "./Messages.module.css";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import ChatBox from "../../components/ChatBox/ChatBox"; // Import your ChatBox component

function Messages() {
    return (
      
     <Container fluid className={`${styles.containerClass} p-0`} style={{ width: '100%', position: 'absolute', top: '10%', float : 'centre' }}>
     {/* <Container className={`${styles.containerClass} p-0`} style={{ width: '100%', height: '10%', position: 'absolute', top: '0', float : 'centre' }}>
      <MainNavbar />
      </Container> */}
      
       <Container className={`${styles.containerClass} p-0`} style={{ width: '25%', float : 'left' }}>
       <MessagesMenu />
       </Container>
       <Container className={`${styles.containerClass} p-0`} style={{ width: '75%', float : 'right' }}>
       <ChatBox />
       </Container>
       </Container>
    
    );
  }
  
  export default Messages;