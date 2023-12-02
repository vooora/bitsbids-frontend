import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MessagesMenu.css";
import { Avatar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

const MessagesMenu = ({ onSessionSelect }) => {
  const [chatSessions, setChatSessions] = useState([]);
  const navigate = useNavigate();
  const fetchUserIdAndChatSessions = useCallback(async () => {
    try {
      const userResponse = await axios.get(`${serverBaseUrl}/user/me`);
      const userId = userResponse.data;

      const chatResponse = await axios.get(
        `${serverBaseUrl}/chat/sessions/user/${userId}`
      );
      const sessionsWithUnreadCounts = await Promise.all(
        chatResponse.data.map(async (session) => {
          const unreadCountResponse = await axios.get(
            `${serverBaseUrl}/chat/unreadCount/${session.id}/${userId}`
          );
          return { ...session, unreadCount: unreadCountResponse.data };
        })
      );

      setChatSessions(sessionsWithUnreadCounts);
    } catch (error) {
      navigate("/", {
        state: { message: "Error fetching data.", variant: "danger" },
      });
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserIdAndChatSessions();
  }, [fetchUserIdAndChatSessions]);

  const handleSessionSelect = (selectedSession) => {
    const updatedSessions = chatSessions.map((session) => {
      if (session.id === selectedSession.id) {
        return { ...session, unreadCount: 0 };
      }
      return session;
    });

    setChatSessions(updatedSessions);

    onSessionSelect(selectedSession);
  };

  return (
    <div className="container p-0">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xl-12 mb-0 mb-md-0">
          <div
            className="card p-0"
            style={{ border: "none", height: "calc(100vh - 6vh)" }}
          >
            <div
              className="card-head d-flex justify-content-center align-items-center"
              style={{ borderBottom: "1px solid rgb(205, 220, 223)" }}
            >
              <p className="mb-3 pt-1 mt-3 ">
                <b className="" style={{ fontSize: "1.5rem" }}>
                  Messages
                </b>
              </p>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                {chatSessions.map((session) => (
                  <li
                    key={session.id}
                    onClick={() => handleSessionSelect(session)}
                    className="p-3"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <a
                      href="#!"
                      className="d-flex justify-content-between"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      <div className="d-flex flex-row">
                        <Avatar
                          className="rounded-circle d-flex align-self-center me-3 shadow-0-strong"
                          width="50"
                        >
                          {session.receiverUsername.charAt(0)}
                        </Avatar>
                        <div className="pt-0">
                          <p
                            className="fw-bold mb-0"
                            style={{ textDecoration: "none" }}
                          >
                            {session.receiverUsername || "Anonymous"}
                          </p>
                          {/* <p className="small mb-1 p-2">
                            {session.latestMessage || "No messages yet"}
                          </p> */}
                        </div>
                      </div>
                      {session.unreadCount > 0 && (
                        <div className="pt-1">
                          <span className="badge bg-black float-end custom-badge px-2.5 p-1.5">
                            {session.unreadCount}
                          </span>
                        </div>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesMenu;
