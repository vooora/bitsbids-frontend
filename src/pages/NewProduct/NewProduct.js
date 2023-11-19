import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import styles from "./NewProduct.module.css";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./NewProduct.css";
import { MonetizationOn } from "@material-ui/icons";
import Dropdown from "react-bootstrap/Dropdown";

function NewProduct() {
  const [selected_categories, set_Selected_categories] = useState([]);
  const categories = [
    "Clothing",
    "Jewellery",
    "Educational",
    "Room Accessories",
    "Sports",
    "Electronics",
    "Essentials",
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
      <div className={styles.heading}>
        <h1 className={styles.headingAdd}>ADD</h1>
        <h1>PRODUCT</h1>
      </div>

      <div className={`${styles.mainContent}`}>
        <Form>
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Product Name: </Form.Label>
            <Col md="9">
              <Form.Control
                placeholder="Product Name"
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-md-5 mb-3">
            <Form.Label column>Product Tags: </Form.Label>
            <Col md="2">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Please Select
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
            </Col>
            <Col md="7" className="pt-md-2 pt-3">
              <strong>Selected Tags: </strong>
              {selected_categories.join(", ")}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Product Quality: </Form.Label>
            <Col md="9">
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
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Product Image: </Form.Label>
            <Col md="9">
              <Form.Control
                type="file"
                multiple
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Product Description: </Form.Label>
            <Col md="9">
              <Form.Control
                as="textarea"
                rows="4"
                placeholder="Product Description"
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Asking Price: </Form.Label>
            <Col md="9" className="d-flex">
              <Form.Control
                type="number"
                placeholder="Price"
                className={styles.priceField}
              />
              <MonetizationOn className={styles.paidIcon} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="md-md-5 mb-3">
            <Form.Label column>Bid Closing Time: </Form.Label>
            <Col md="3">
              <Form.Control
                type="number"
                placeholder="Days"
                className={styles.inputField}
              />
            </Col>
            <Col md="3">
              <Form.Control
                type="number"
                placeholder="Hours"
                className={styles.inputField}
              />
            </Col>
            <Col md="3">
              <Form.Control
                type="number"
                placeholder="Minutes"
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <div id="btn-group">
            <Button className="rounded-pill" type="sumbit" id="add-product-btn">
              Add Product
            </Button>
            <Button className="rounded-pill" id="cancel-btn">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default NewProduct;
