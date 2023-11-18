import { Container, Form, Button, Col, Row, Dropdown } from "react-bootstrap";
import { useState } from "react";
import styles from "./NewProduct.module.css";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
function NewProduct() {
  const [selected_categories, set_Selected_categories] = useState([]);
  const categories = [
    "CLOTHING",
    "JEWELLERY",
    "EDUCATIONAL",
    "ROOM_ACCESSORIES",
    "SPORTS",
    "ELECTRONICS",
    "ESSENTIALS",
  ];
  const toggleCategory = (option) => {
    if (selected_categories.includes(option)) {
      set_Selected_categories(
        selected_categories.filter((item) => item !== option)
      );
    } else {
      set_Selected_categories([...selected_categories, option]);
    }
  };
  return (
    <Container fluid className={`${styles.containerClass} p-0`}>
      <MainNavbar />
      <h1 className={styles.heading}>ADD PRODUCT</h1>
      <div className={`${styles.mainContent}`}>
        <Form>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Product Name</Form.Label>
            <Col sm="10">
              <Form.Control placeholder="Product Name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Product Tags</Form.Label>
            <Col sm="10">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Options
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => toggleCategory(option)}
                      active={selected_categories.includes(option)}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div className="pt-4">
                <strong>Selected Categories: </strong>
                {selected_categories.join(", ")}
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Product Quality</Form.Label>
            <Col sm="10">
              <div key="inline-radio">
                <Form.Check
                  inline
                  label="Brand New"
                  type="radio"
                  id="inline-radio-1"
                  name="radio-group"
                />
                <Form.Check
                  inline
                  label="Barely Used"
                  type="radio"
                  id="inline-radio-2"
                  name="radio-group"
                />
                <Form.Check
                  inline
                  label="Used"
                  type="radio"
                  id="inline-radio-3"
                  name="radio-group"
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Product Image</Form.Label>
            <Col sm="10">
              <Form.Control type="file" multiple />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Product Description</Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" placeholder="Product Description" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-5">
            <Form.Label column>Asking Price</Form.Label>
            <Col sm="10">
              <Form.Control type="number"></Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}

export default NewProduct;
