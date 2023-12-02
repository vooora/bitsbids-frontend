import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./ProductCard.module.css";
import "./ProductCard.css";
import { Timer } from "@material-ui/icons";
import ProductPopup from "../ProductPopup/ProductPopup";
import { useLocation } from "react-router-dom";

function ProductCard({ product }) {
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [showPopup, setShowPopup] = useState(false);
  const [shouldFocusBidInput, setShouldFocusBidInput] = useState(false);

  const [currentBid, setCurrentBid] = useState(product.latestBidAmount);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const handleCardClick = () => {
    setShouldFocusBidInput(false);
    setShowPopup(true);
  };

  const handleBidButtonClick = (e) => {
    if (e) e.stopPropagation();
    setShouldFocusBidInput(true);
    setShowPopup(true);
  };

  const handleBidUpdate = (newBid) => {
    setCurrentBid(newBid);
  };

  function calculateTimeRemaining() {
    const now = new Date().getTime();

    const getYear = parseInt(product.bidClosingTime[0], 10);
    const getMonth = parseInt(product.bidClosingTime[1], 10) - 1;
    const getDay = parseInt(product.bidClosingTime[2], 10);
    const getHours = parseInt(product.bidClosingTime[3], 10);
    const getMinutes = parseInt(product.bidClosingTime[4], 10);
    const getSeconds = parseInt(product.bidClosingTime[5], 10);

    const bidClosingTime = new Date(
      getYear,
      getMonth,
      getDay,
      getHours,
      getMinutes,
      getSeconds
    ).getTime();
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

  const isProductActive = product.productStatus === "ACTIVE";

  const getStatusColor = (status) => {
    switch (status) {
      case "SOLD":
        return "green";
      case "WITHDRAWN":
        return "grey";
      case "UNSOLD":
        return "red";
      default:
        return "black";
    }
  };
  const getFirstMediaUrl = () => {
    const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
    const videoRegex = /\.(mp4|mov)$/i;

    let firstImageUrl = product.mediaUrls.find((url) => imageRegex.test(url));
    let firstVideoUrl = product.mediaUrls.find((url) => videoRegex.test(url));

    return firstImageUrl || firstVideoUrl;
  };

  const firstMediaUrl = getFirstMediaUrl();
  const isVideo = /\.(mp4|mov)$/i.test(firstMediaUrl);

  const hasTimeElapsed =
    timeRemaining.days === 0 &&
    timeRemaining.hours === 0 &&
    timeRemaining.minutes === 0 &&
    timeRemaining.seconds === 0;

  return (
    <>
      <Card
        style={{ width: "22rem", marginBottom: "2rem", cursor: "pointer" }}
        onClick={handleCardClick}
      >
        {isVideo ? (
          <video className={styles.cardImage} controls>
            <source src={firstMediaUrl} type="video/mp4" /> Your browser does
            not support the video tag.
          </video>
        ) : (
          <Card.Img
            variant="top"
            src={firstMediaUrl}
            className={styles.cardImage}
          />
        )}
        <Card.Body>
          <Card.Title>{product.productName}</Card.Title>
          {currentBid ? (
            <Card.Text>BID: ₹{currentBid}</Card.Text>
          ) : (
            <Card.Text>Asking Price: ₹{product.startingPrice}</Card.Text>
          )}
          {isProductActive && location.pathname !== "/sales" ? (
            <div className={styles.bottomSection}>
              <div className={styles.timer}>
                <Timer />
                <div className="ms-2">
                  <Card.Text style={{ marginBottom: "0", paddingLeft: "4px" }}>
                    {`${timeRemaining.days
                      .toString()
                      .padStart(2, "0")} : ${timeRemaining.hours
                      .toString()
                      .padStart(2, "0")} : ${timeRemaining.minutes
                      .toString()
                      .padStart(2, "0")} : ${timeRemaining.seconds
                      .toString()
                      .padStart(2, "0")}`}
                  </Card.Text>
                  <div className={styles.timeLabels}>
                    <span>DAYS</span>
                    <span style={{ paddingLeft: "3px" }}>HRS</span>
                    <span style={{ paddingLeft: "5px" }}>MINS</span>
                    <span style={{ paddingLeft: "3px" }}>SECS</span>
                  </div>
                </div>
              </div>

              <div className="bidButton">
                <Button
                  disabled={hasTimeElapsed}
                  onClick={handleBidButtonClick}
                >
                  Bid Now
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.productStatus}>
              <span
                style={{
                  color: getStatusColor(product.productStatus),
                  fontWeight: "bold",
                }}
              >
                {product.productStatus}
              </span>
            </div>
          )}
        </Card.Body>
      </Card>
      <ProductPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        product={product}
        focusBidInputOnShow={shouldFocusBidInput}
        onBidUpdate={handleBidUpdate}
      />
    </>
  );
}

export default ProductCard;
