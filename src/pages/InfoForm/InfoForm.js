/* eslint-disable no-undef */
import styles from "./InfoForm.module.css";

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

<p>Please fill in the form to continue</p>
const InfoForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedHostel, setSelectedHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="phoneNumber" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
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
              type="tel"
              placeholder="Enter your room number"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              size="sm"
            />
          </Form.Group>

          <CustomColoredButton />
        </Form>
      </div>
    </div>
  );
};

const CustomColoredButton = () => {
    return (
      <div className="d-flex justify-content-center">
        <Button className={`${styles.button} button`}>
          Submit
        </Button>
      </div>
    );
  };
  

export default InfoForm;
