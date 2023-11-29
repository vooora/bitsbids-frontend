import MessagesMenu from "../../components/MessagesMenu/MessagesMenu";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./Messages.module.css";
import ChatBox from "../../components/ChatBox/ChatBox";
import MainNavbar from "../../components/MainNavbar/MainNavbar";

function Messages() {
  return (
    <div style={{ height: "100vh" }}>
      <Container
        fluid
        className={`${styles.containerClass} p-0`}
        style={{
          width: "100%",
        }}
      >
        <MainNavbar />
        <Row>
          <Col md={4} className="pe-0">
            <Container
              className={`${styles.containerClass} p-0`}
              style={{ width: "100%", border: "0" }}
            >
              <MessagesMenu />
            </Container>
          </Col>
          <Col md={8} className="ps-0">
            <Container
              className={`${styles.containerClass} p-0`}
              style={{ width: "100%" }}
            >
              <ChatBox />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Messages;
