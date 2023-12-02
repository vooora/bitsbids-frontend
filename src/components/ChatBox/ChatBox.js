import React from "react";
import "./ChatBox.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Send } from "@material-ui/icons";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./ChatBox.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const serverBaseUrl = "http://localhost:8080";

const ChatBox = ({ receiverUsername, selectedSession, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const socket = new SockJS(`${serverBaseUrl}/ws`);
    const client = Stomp.over(socket);
    const subscribeUrl = selectedSession?.id
      ? `/topic/${selectedSession?.id}`
      : `/topic/`;
    client.connect({}, () => {
      client.subscribe(subscribeUrl, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);
  }, [selectedSession?.id]);

  const isCurrentUserReceiver = useCallback(
    (messages) => {
      return messages.some(
        (message) => message.recipient.user.userId === currentUserId
      );
    },
    [currentUserId]
  );

  const fetchMessagesForSession = useCallback(
    async (sessionId) => {
      try {
        const response = await axios.get(
          `${serverBaseUrl}/chat/messages/session/${sessionId}`
        );
        setMessages(response.data);
        if (isCurrentUserReceiver(response.data)) {
          markMessagesAsRead(response.data);
        }
      } catch (error) {
        navigate("/", {
          state: { message: "Some error occured.", variant: "danger" },
        });
      }
    },
    [navigate, isCurrentUserReceiver]
  );

  useEffect(() => {
    if (selectedSession?.id) {
      fetchMessagesForSession(selectedSession.id);
    }
  }, [selectedSession, fetchMessagesForSession]);

  const handleNameClick = async () => {
    if (selectedSession && selectedSession.isProductSold) {
      const latestBid = selectedSession.latestBid;
      const isCurrentUserWinner =
        latestBid && latestBid.user.userId === selectedSession.actualBuyerId;
      if (isCurrentUserWinner) {
        try {
          const response = await axios.get(
            `${serverBaseUrl}/user/${latestBid.user.userId}`
          );
          const userDetails = response.data;

          setPopupData({
            name: userDetails.firstName + " " + userDetails.lastName,
            username: userDetails.username,
          });

          setShowPopup(true);
        } catch (error) {
          navigate("/", {
            state: { message: "Some error occured.", variant: "danger" },
          });
        }
      }
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newMessage.trim() !== "") {
      sendMessage();
    }
  };

  const isMessageFromCurrentUser = (message) => {
    return message.isSent || message.sender.user.userId === currentUserId;
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      let senderAnonId, recipientAnonId;
      if (currentUserId === selectedSession.actualBuyerId) {
        senderAnonId = selectedSession.anonBuyerId;
        recipientAnonId = selectedSession.anonSellerId;
      } else if (currentUserId === selectedSession.actualSellerId) {
        senderAnonId = selectedSession.anonSellerId;
        recipientAnonId = selectedSession.anonBuyerId;
      } else {
        navigate("/", {
          state: { message: "Some error occured.", variant: "danger" },
        });
        return;
      }

      const messagePayload = {
        sessionId: selectedSession.id,
        senderAnonId: senderAnonId,
        recipientAnonId: recipientAnonId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      stompClient.send(
        `/app/chat.sendMessage/${selectedSession.id}`,
        {},
        JSON.stringify(messagePayload)
      );

      setNewMessage("");
    }
  };

  const markMessagesAsRead = async (messages) => {
    const messagesToMark = messages.filter((message) => !message.isRead);
    const updatedMessages = [...messages];

    for (const message of messagesToMark) {
      try {
        await axios.post(
          `${serverBaseUrl}/chat/markMessageAsRead/${message.id}`
        );
        const messageIndex = updatedMessages.findIndex(
          (m) => m.id === message.id
        );
        if (messageIndex !== -1) {
          updatedMessages[messageIndex].isRead = true;
        }
      } catch (error) {}
    }

    setMessages(updatedMessages);
  };

  return (
    <div className="container p-0">
      <div className="row d-flex justify-content-center">
        <div
          className="col-md-12 col-lg-12 col-xl-12 p-0"
          style={{ height: "calc(100vh - 6vh)" }}
        >
          <div className="card" id="chat1" style={{ height: "100%" }}>
            <div
              className="card-header d-flex justify-content-between align-items-center p-0 bg-#CDDCDF text-#CDDCDF border-bottom-0"
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
              }}
              onClick={handleNameClick}
            >
              <i className="fas fa-angle-left"></i>
              <p
                className="mb-0 p-4 fw-bold"
                style={{
                  color: "#000000",
                  backgroundColor: "#CDDCDF",
                  width: "100%",
                  height: "100%",
                }}
              >
                {receiverUsername || "Select a chat"}
              </p>
            </div>
            {showPopup && (
              <Modal
                show={showPopup}
                onHide={handleClosePopup}
                className="d-flex justify-content-center align-items-center"
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <h4>{popupData.name}</h4>
                  <p>Username: {popupData.username}</p>
                </Modal.Body>
              </Modal>
            )}
            <div className="card-body chat-messages">
              {messages.map((message, index) => (
                <>
                  <div
                    key={index}
                    className={`message-row ${
                      isMessageFromCurrentUser(message)
                        ? "user-message"
                        : "other-message"
                    }`}
                  >
                    <div
                      className={`message-text ${
                        isMessageFromCurrentUser(message)
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </>
              ))}
            </div>

            {selectedSession && (
              <div className="chat-input d-flex align-items-center">
                <input
                  type="text"
                  className="form-control rounded form-control-lg flex-grow-1"
                  placeholder="Type something"
                  aria-label="Type something"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  className="btn ms-2"
                  style={{ border: "none" }}
                  onClick={sendMessage}
                >
                  <Send />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
