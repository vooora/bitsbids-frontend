import styles from "./InfoForm.module.css";

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

const InfoForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("Select");
  const [roomNumber, setRoomNumber] = useState("");
  const [showInvalidFeedback, setShowInvalidFeedback] = useState(false);
  const navigate = useNavigate();
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const validateForm = () => {
    return (
      phoneNumber.length === 10 &&
      selectedHostel !== "Select" &&
      roomNumber.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowInvalidFeedback(false);

      // Retrieve user details from localStorage
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (userDetails && userDetails.userId) {
        try {
          // API call to update user info
          await updateUserInfo(
            userDetails.userId,
            phoneNumber,
            selectedHostel,
            roomNumber
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              ...userDetails,
              phoneNo: phoneNumber,
              hostel: selectedHostel + " " + roomNumber,
            })
          );
          navigate("/user", {
            state: {
              message: "Profile updated successfully!",
              variant: "success",
            },
          });
        } catch (error) {
          navigate("/user", {
            state: { message: "Error updating profile.", variant: "danger" },
          });
        }
      } else {
        navigate("/user", {
          state: { message: "Error updating profile.", variant: "danger" },
        });
      }
    } else {
      setShowInvalidFeedback(true);
    }
  };

  const updateUserInfo = async (
    userId,
    phoneNo,
    selectedHostel,
    roomNumber
  ) => {
    const url = `${serverBaseUrl}/user/${userId}/info`;
    const data = {
      phoneNo,
      hostel: selectedHostel + " " + roomNumber,
    };

    // Send a request to your API
    await axios.put(url, data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              size="sm"
            />
          </Form.Group>

          <Form.Group controlId="hostel" className="mb-3">
            <Form.Label>Select Hostel</Form.Label>
            <Form.Control
              as="select"
              value={selectedHostel}
              onChange={handleHostelChange}
              size="sm"
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="Malaviya">Malaviya</option>
              <option value="Gandhi">Gandhi</option>
              <option value="Meera">Meera</option>
              <option value="Viswakarma">Viswakarma</option>
              <option value="Valmiki">Valmiki</option>
              <option value="Gautam">Gautam</option>
              <option value="Budh">Budh</option>
              <option value="Shankar">Shankar</option>
              <option value="Vyas">Vyas</option>
              <option value="Krishna">Krishna</option>
              <option value="Ram">Ram</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="roomNumber" className="mb-3">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your room number"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              size="sm"
            />
          </Form.Group>
          {showInvalidFeedback && (
            <Alert variant="danger" className="mb-3">
              Please fill out all fields correctly with a 10-digit phone number.
            </Alert>
          )}

          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className={`${styles.button} button`}
              // disabled={!isFormValid}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InfoForm;
