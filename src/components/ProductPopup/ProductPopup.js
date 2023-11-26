import React from "react";
import { useState, useEffect, useContext } from "react";
import { Modal, Button, Carousel, Row, Col, Form } from "react-bootstrap";
import styles from "./ProductPopup.module.css";
import "./ProductPopup.css";
import { Person, MonetizationOn, Timer } from "@material-ui/icons";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const serverBaseUrl = "http://localhost:8080";

const formatCategory = (category) => {
  return category
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ProductPopup = ({ show, onHide, product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const minimumBid = product.currentBid
    ? product.currentBid + 1
    : product.startingPrice + 1;
  const [validated, setValidated] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const handlePlaceBid = async () => {
    if (bid < minimumBid) {
      alert("Your bid must be higher than the current bid.");
      return;
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

    const user = await fetchUserDetails();
    console.log(user);

    const bidObject = {
      bidderAnonymous: null,
      product: product,
      user: {
        userId: user,
      },
      bidAmount: bid,
      bidTime: createdAt,
    };

    try {
      const response = await axios.post(
        `${serverBaseUrl}/bid/create/${product.productId}`,
        bidObject
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const calculateStep = (currentBid) => {
    if (currentBid < 50) return 1;
    if (currentBid < 100) return 5;
    if (currentBid < 2000) return 100;
    return 500;
  };

  const initialBidValue = product.currentBid
    ? product.currentBid
    : product.startingPrice;
  const initialStep = calculateStep(initialBidValue);
  const initialBid = initialBidValue + initialStep;

  const [bid, setBid] = useState(initialBid);

  const incrementBid = () => {
    const step = calculateStep(bid);
    setBid(bid + step);
  };

  const decrementBid = () => {
    const step = calculateStep(bid);
    setBid(Math.max(minimumBid, bid - step));
  };

  const handleBidChange = (e) => {
    const newBid = Number(e.target.value);
    setBid(newBid);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || bid < minimumBid) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });
  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const bidClosingTime = new Date(product.bidClosingTime).getTime();

    const timeDifference = bidClosingTime - now;

    if (timeDifference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const hasTimeElapsed =
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0;

  const maxDescriptionLength = 100;
  const needsShortening =
    product.productDescription.length > maxDescriptionLength;
  const displayDescription =
    needsShortening && !showFullDescription
      ? product.productDescription.slice(0, maxDescriptionLength)
      : product.productDescription;
  const formattedCategories = product.categories.map(formatCategory);

  let bidText;
  if (hasTimeElapsed) {
    bidText = product.latestBid
      ? `Winning Bid: ${product.latestBid}`
      : `Asking Price: ${product.startingPrice}`;
  } else {
    bidText = product.currentBid
      ? `Current Bid: ${product.currentBid}`
      : `Asking Price: ${product.startingPrice}`;
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ border: "none" }} />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className={styles.modalRow}>
            <div className={styles.flexContainer}>
              <Col lg={6} className={styles.carouselCol}>
                <Carousel>
                  {product.mediaUrls.map((url, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className={`d-block ${styles.imgStyle}`}
                        src={url}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col lg={6} className={styles.contentCol}>
                <div className={styles.topContent}>
                  <Modal.Title className={styles.productName}>
                    {product.productName}
                  </Modal.Title>

                  <div className={styles.sellerAndCategory}>
                    <div className={styles.sellerInfo}>
                      <Person
                        style={{
                          paddingRight: "5px",
                          paddingBottom: "3px",
                          marginLeft: "0",
                        }}
                      />
                      <a href="/" className={styles.anonSellerLink}>
                        {product.anonymousSeller.anonUsername}
                      </a>
                    </div>
                    <div className={styles.categoryLabels}>
                      {formattedCategories.map((category, index) => (
                        <span key={index} className={styles.categoryLabel}>
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.productDescription}>
                    <p className={styles.description}>
                      {displayDescription}
                      {needsShortening && !showFullDescription && (
                        <span
                          className={styles.readMore}
                          onClick={() => setShowFullDescription(true)}
                        >
                          ...
                        </span>
                      )}
                    </p>
                    {showFullDescription && (
                      <Button
                        variant="link"
                        onClick={() => setShowFullDescription(false)}
                        className={styles.seeMoreButton}
                      >
                        See Less
                      </Button>
                    )}
                    <span key="quality" className={styles.categoryLabel}>
                      {product.productQuality}
                    </span>
                  </div>
                </div>
                <div className={styles.bottomContent}>
                  <div className={styles.currentBidSection}>
                    <p className={styles.currentBidText}>
                      <b>{bidText}</b>
                      <MonetizationOn className={styles.paidIcon} />
                    </p>
                    <div className={styles.timerWrapper}>
                      <Timer
                        style={{
                          marginBottom: "4px",
                          marginRight: "12px",
                          transform: "scale(1.5)",
                        }}
                      />
                      <div className={styles.timeUnits}>
                        <div className={styles.timeUnit}>
                          <span className={styles.timeValue}>
                            {timeRemaining.days.toString().padStart(2, "0")}
                          </span>
                          <span className={styles.timeLabel}>Days</span>
                        </div>
                        <div className={styles.timeUnit}>
                          <span className={styles.timeValue}>
                            {timeRemaining.hours.toString().padStart(2, "0")}
                          </span>
                          <span className={styles.timeLabel}>Hrs</span>
                        </div>
                        <div className={styles.timeUnit}>
                          <span className={styles.timeValue}>
                            {timeRemaining.minutes.toString().padStart(2, "0")}
                          </span>
                          <span className={styles.timeLabel}>Mins</span>
                        </div>
                        <div className={styles.timeUnit}>
                          <span className={styles.timeValue}>
                            {timeRemaining.seconds.toString().padStart(2, "0")}
                          </span>
                          <span className={styles.timeLabel}>Secs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!hasTimeElapsed && isLoggedIn && (
                    <div className={styles.bidControls}>
                      <Button
                        variant="outline-secondary"
                        onClick={decrementBid}
                        style={{ height: "3rem" }}
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        value={bid}
                        onChange={handleBidChange}
                        className={styles.bidInput}
                        min={minimumBid}
                        required
                        style={{
                          margin: 0,
                          borderRadius: 0,
                          width: "7rem",
                          height: "3rem",
                        }}
                        isInvalid={bid < minimumBid}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={incrementBid}
                        style={{
                          height: "3rem",
                        }}
                      >
                        +
                      </Button>
                      <Button variant="primary" onClick={handlePlaceBid}>
                        BID
                      </Button>
                    </div>
                  )}

                  <p>
                    <span>
                      Product listing started at {product.startingPrice}
                    </span>
                    <MonetizationOn className={styles.paidIcon} />
                    <span>
                      . There have been{" "}
                      {product.numberOfBids ? product.numberOfBids : 0} bids on
                      this product.
                    </span>
                  </p>
                </div>
              </Col>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductPopup;
