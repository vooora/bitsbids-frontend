import MessagesMenu from "../../components/MessagesMenu/MessagesMenu";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./Messages.module.css";
import ChatBox from "../../components/ChatBox/ChatBox";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function Messages() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const fetchCurrentUserId = useCallback(async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`);
      setCurrentUserId(response.data);
    } catch (error) {
      navigate("/", {
        state: { message: "Some error occured.", variant: "danger" },
      });
    }
  }, [navigate]);

  useEffect(() => {
    fetchCurrentUserId();
  }, [fetchCurrentUserId]);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Container
        fluid
        className={`${styles.containerClass} p-0`}
        style={{ width: "100%" }}
      >
        <MainNavbar />
        <Row>
          <Col md={4} className="pe-0">
            <Container
              className={`${styles.containerClass} p-0`}
              style={{ width: "100%", border: "0" }}
            >
              <MessagesMenu
                onSessionSelect={handleSessionSelect}
                currentUserId={currentUserId}
              />
            </Container>
          </Col>
          <Col md={8} className="ps-0">
            <Container
              className={`${styles.containerClass} p-0`}
              style={{ width: "100%" }}
            >
              <ChatBox
                receiverUsername={selectedSession?.receiverUsername}
                selectedSession={selectedSession}
                currentUserId={currentUserId}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Messages;
