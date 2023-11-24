import { Container, Form, Button, Col, Row, Dropdown } from "react-bootstrap";
import { useState } from "react";
import styles from "./NewProduct.module.css";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import "./NewProduct.css";
import { MonetizationOn } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfoBox from "../../components/InfoBox/InfoBox";

const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function NewProduct() {
  const [selected_categories, set_Selected_categories] = useState([]);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const [infoBox, setInfoBox] = useState({
    show: false,
    variant: "",
    message: "",
  });

  const showInfoBox = (variant, message) => {
    setInfoBox({ show: true, variant, message });
  };

  const handleCloseInfoBox = () => {
    setInfoBox({ ...infoBox, show: false });
  };

  const categories = [
    "Clothing",
    "Jewellery",
    "Educational",
    "Room Accessories",
    "Sports",
    "Electronics",
    "Essentials",
  ];

  const categoryMappings = {
    Clothing: "CLOTHING",
    Jewellery: "JEWELLERY",
    Educational: "EDUCATIONAL",
    "Room Accessories": "ROOM_ACCESSORIES",
    Sports: "SPORTS",
    Electronics: "ELECTRONICS",
    Essentials: "ESSENTIALS",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;

    const days = form.elements["days"].value;
    const minutes = form.elements["minutes"].value;
    const hours = form.elements["hours"].value;

    const daysValue = parseInt(days, 10);
    const hoursValue = parseInt(hours, 10);
    const minutesValue = parseInt(minutes, 10);
    const startingPriceValue = parseFloat(form.elements["startingPrice"].value);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    const totalDurationInMinutes =
      daysValue * 24 * 60 + hoursValue * 60 + minutesValue;
    if (totalDurationInMinutes <= 0) {
      showInfoBox("danger", "The bidding duration must be greater than 0.");
      return;
    }

    const maxDurationInMinutes = 365 * 24 * 60;
    if (totalDurationInMinutes > maxDurationInMinutes) {
      showInfoBox("danger", "The bidding duration must not exceed 30 days.");
      return;
    }

    if (startingPriceValue <= 0) {
      // SHOULD WE ALLOW 0 STARTING PRICE??????
      showInfoBox("danger", "The starting price must be greater than 0.");
      return;
    }

    const processedCategories = selected_categories.map(
      (category) => categoryMappings[category]
    );

    const formData = new FormData(form);
    const productName = formData.get("productName");
    const productDescription = formData.get("productDescription");
    const startingPrice = formData.get("startingPrice");
    const productQuality = formData.get("productQuality");
    let userId;
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`, {
        withCredentials: true,
      });
      userId = response.data;
    } catch (error) {
      navigate("/", {
        state: { message: "Error creating product.", variant: "danger" },
      });
    }

    const dateNow = new Date();

    const createdAt = `${dateNow.getFullYear()}-${String(
      dateNow.getMonth() + 1
    ).padStart(2, "0")}-${String(dateNow.getDate()).padStart(2, "0")}T${String(
      dateNow.getHours()
    ).padStart(2, "0")}:${String(dateNow.getMinutes()).padStart(
      2,
      "0"
    )}:${String(dateNow.getSeconds()).padStart(2, "0")}`;

    const now = new Date();
    now.setDate(now.getDate() + parseInt(days));
    now.setHours(now.getHours() + parseInt(hours));
    now.setMinutes(now.getMinutes() + parseInt(minutes));

    const formattedDateTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:00`;

    const mediaFiles = form.elements["mediaFiles"].files;
    let mediaUrls = [];
    for (let file of mediaFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      try {
        const response = await axios.post(cloudinaryURL, formData, {
          withCredentials: false,
        });
        mediaUrls.push(response.data.secure_url);
      } catch (error) {
        navigate("/", {
          state: { message: "Error creating product.", variant: "danger" },
        });
      }
    }

    const productData = {
      productName,
      productDescription,
      startingPrice,
      anonymousSeller: null,
      user: {
        userId,
      },
      latestBidAmount: null,
      latest_bid_user: null,
      bidClosingTime: formattedDateTime,
      createdAt,
      lastUpdatedAt: null,
      productQuality,
      productStatus: "ACTIVE",
      mediaUrls,
      categories: processedCategories,
    };

    try {
      await axios.post(`${serverBaseUrl}/products`, productData);
      navigate("/", {
        state: { message: "Product created successfully", variant: "success" },
      });
    } catch (error) {
      navigate("/", {
        state: { message: "Error creating product.", variant: "danger" },
      });
    }
  };

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
      <InfoBox
        show={infoBox.show}
        variant={infoBox.variant}
        message={infoBox.message}
        onClose={handleCloseInfoBox}
      />
      <div className={styles.heading}>
        <h1 className={styles.headingAdd}>ADD</h1>
        <h1>PRODUCT</h1>
      </div>

      <div className={`${styles.mainContent}`}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="mb-md-5 mb-3"
            controlId="validationCustomName"
          >
            <Form.Label column>Product Name: </Form.Label>
            <Col md="9">
              <Form.Control
                required
                placeholder="Product Name"
                className={styles.inputField}
                name="productName"
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
            <Col md="7" className="pt-md-2 pt-3 ps-md-3">
              <strong>Selected Tags: </strong>
              {selected_categories.join(", ")}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-md-5 mb-3">
            <Form.Label column>Product Quality: </Form.Label>
            <Col md="9">
              <div key="inline-radio">
                <Form.Check
                  required
                  inline
                  label="Brand New"
                  type="radio"
                  id="inline-radio-1"
                  name="productQuality"
                  value="Brand New"
                />
                <Form.Check
                  required
                  inline
                  label="Barely Used"
                  type="radio"
                  id="inline-radio-2"
                  name="productQuality"
                  value="Barely Used"
                />
                <Form.Check
                  required
                  inline
                  label="Used"
                  type="radio"
                  id="inline-radio-3"
                  name="productQuality"
                  value="Used"
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-md-5 mb-3"
            controlId="validationCustomMedia"
          >
            <Form.Label column>Product Image: </Form.Label>
            <Col md="9">
              <Form.Control
                required
                accept=".jpg, .jpeg, .png, .gif, .mp4, .mov"
                type="file"
                name="mediaFiles"
                multiple
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-md-5 mb-3"
            controlId="validationCustomDescription"
          >
            <Form.Label column>Product Description: </Form.Label>
            <Col md="9">
              <Form.Control
                required
                as="textarea"
                rows="4"
                placeholder="Product Description"
                name="productDescription"
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-md-5 mb-3"
            controlId="validationCustomPrice"
          >
            <Form.Label column>Asking Price: </Form.Label>
            <Col md="9" className="d-flex">
              <Form.Control
                required
                type="number"
                placeholder="Price"
                name="startingPrice"
                className={styles.priceField}
              />
              <MonetizationOn className={styles.paidIcon} />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-md-5 mb-3"
            controlId="validationCustomTime"
          >
            <Form.Label column>Bid Closing Time: </Form.Label>
            <Col md="3">
              <Form.Control
                required
                name="days"
                type="number"
                placeholder="Days"
                className={styles.inputField}
              />
            </Col>
            <Col md="3">
              <Form.Control
                required
                name="hours"
                type="number"
                placeholder="Hours"
                className={styles.inputField}
              />
            </Col>
            <Col md="3">
              <Form.Control
                required
                type="number"
                name="minutes"
                placeholder="Minutes"
                className={styles.inputField}
              />
            </Col>
          </Form.Group>
          <div id="btn-group">
            <Button className="rounded-pill" type="sumbit" id="add-product-btn">
              Add Product
            </Button>
            <Button href="/" className="rounded-pill" id="cancel-btn">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default NewProduct;
