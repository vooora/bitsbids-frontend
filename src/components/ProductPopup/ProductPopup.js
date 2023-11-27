import React from "react";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
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

const ProductPopup = ({
  show,
  onHide,
  product,
  focusBidInputOnShow,
  onBidUpdate,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [productState, setProductState] = useState(product);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [winningMessage, setWinningMessage] = useState("");
  const [latestBid, setLatestBid] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const bidInputRef = useRef(null);
  const minimumBid = productState.latestBidAmount
    ? productState.latestBidAmount + 1
    : productState.startingPrice + 1;

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/me`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user details:", error);
      setErrorMessage(
        error.response.data || "An error occurred while placing the bid."
      );
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`${serverBaseUrl}/user/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching user by ID:", error);
      setErrorMessage(
        error.response.data || "An error occurred while placing the bid."
      );
    }
  };

  const handleOnHide = () => {
    const recalculatedInitialBidValue = productState.latestBidAmount
      ? productState.latestBidAmount +
        calculateStep(productState.latestBidAmount)
      : productState.startingPrice;

    setBid(recalculatedInitialBidValue);
    setBidSuccess(false);
    setErrorMessage("");
    onHide();
  };

  const fetchLatestBid = useCallback(async () => {
    if (!isLoggedIn || !product.productId) return;

    try {
      const userId = await fetchUserDetails();
      const response = await axios.get(
        `${serverBaseUrl}/bid/latest/${product.productId}/${userId}`
      );

      if (response.data) {
        setLatestBid(response.data);
        onBidUpdate(response.data.bidAmount);

        if (response.data.bidID === productState.latestBid.bidID) {
          setWinningMessage("Hooray! You are currently winning the bid.");
        } else {
          setWinningMessage(
            "Oh no! You were outbid. Place another bid to get back on top."
          );
        }
      }
    } catch (error) {
      console.error("Error fetching latest bid:", error);
    }
  }, [isLoggedIn, product.productId, productState.latestBid, onBidUpdate]);

  useEffect(() => {
    if (show && focusBidInputOnShow && bidInputRef.current) {
      bidInputRef.current.focus();
    }
  }, [show, focusBidInputOnShow]);

  useEffect(() => {
    fetchLatestBid();
  }, [product, isLoggedIn, fetchLatestBid]);

  const handlePlaceBid = async (event) => {
    event.preventDefault();

    if (bid < minimumBid) {
      setErrorMessage("Your bid must be higher than the current bid.");
      setBidSuccess(false);
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
    const userId = await fetchUserDetails();
    const userDetails = await fetchUserById(userId);

    const bidObject = {
      bidderAnonymous: null,
      product: product,
      user: userDetails,
      bidAmount: bid,
      bidTime: createdAt,
    };

    try {
      const response = await axios.post(
        `${serverBaseUrl}/bid/create/${product.productId}`,
        bidObject
      );
      console.log(response.data);
      setBidSuccess(true);
      const updatedProductResponse = await axios.get(
        `${serverBaseUrl}/products/${product.productId}`
      );
      const updatedProduct = updatedProductResponse.data;
      setProductState(updatedProduct);

      setLatestBid({
        ...bidObject,
        bidID: response.data.bidID,
      });

      if (response.data.bidID === updatedProduct.latestBid.bidID) {
        setWinningMessage("Hooray! You are currently winning the bid.");
      } else {
        setWinningMessage(
          "Oh no! You were outbid. Place another bid to get back on top."
        );
      }

      const newMinimumBid = updatedProduct.latestBidAmount
        ? updatedProduct.latestBidAmount +
          calculateStep(updatedProduct.latestBidAmount)
        : updatedProduct.startingPrice + 1;
      setBid(newMinimumBid);
      setErrorMessage("");
    } catch (error) {
      console.error("Error placing bid:", error);
      setBidSuccess(false);
      setErrorMessage(
        error.response.data || "An error occurred while placing the bid."
      );
    }
  };

  useEffect(() => {
    setProductState(product);
  }, [product]);

  const calculateStep = (latestBidAmount) => {
    if (latestBidAmount < 50) return 1;
    if (latestBidAmount < 100) return 5;
    if (latestBidAmount < 2000) return 100;
    return 500;
  };

  const initialBidValue = productState.latestBidAmount
    ? productState.latestBidAmount
    : productState.startingPrice;
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
    const bidClosingTime = new Date(productState.bidClosingTime).getTime();

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
    productState.productDescription.length > maxDescriptionLength;
  const displayDescription =
    needsShortening && !showFullDescription
      ? productState.productDescription.slice(0, maxDescriptionLength)
      : productState.productDescription;
  const formattedCategories = productState.categories.map(formatCategory);

  let bidText;
  if (hasTimeElapsed) {
    bidText = productState.latestBid
      ? `Winning Bid: ${productState.latestBidAmount}`
      : `Asking Price: ${productState.startingPrice}`;
  } else {
    bidText = productState.latestBid
      ? `Current Bid: ${productState.latestBidAmount}`
      : `Asking Price: ${productState.startingPrice}`;
  }

  return (
    <Modal show={show} onHide={handleOnHide} centered>
      <Modal.Header closeButton style={{ border: "none" }} />
      <Modal.Body style={{ paddingTop: 0 }}>
        <Form onSubmit={handlePlaceBid}>
          <Row className={styles.modalRow}>
            <div className={styles.flexContainer}>
              <Col lg={6} className={styles.carouselCol}>
                <Carousel>
                  {productState.mediaUrls.map((url, index) => (
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
                    {productState.productName}
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
                        {productState.anonymousSeller.anonUsername}
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
                      {productState.productQuality}
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
                  {latestBid && (
                    <p>
                      Your latest bid: {latestBid.bidAmount}
                      <MonetizationOn />
                    </p>
                  )}
                  {winningMessage && (
                    <p style={{ paddingBottom: "3px" }}>{winningMessage}</p>
                  )}
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
                        ref={bidInputRef}
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
                        // isInvalid={bid < minimumBid}
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
                  {bidSuccess && (
                    <p style={{ color: "green" }}>Bid placed successfully!</p>
                  )}
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}

                  <p>
                    <span>
                      Product listing started at {productState.startingPrice}
                    </span>
                    <MonetizationOn className={styles.paidIcon} />
                    <span>
                      . There have been{" "}
                      {productState.numberOfBids
                        ? productState.numberOfBids
                        : 0}{" "}
                      bids on this product.
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
