import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./ProductCard.module.css";
import "./ProductCard.css";
import { Timer } from "@material-ui/icons";

function ProductCard({ product }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

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

  return (
    <Card style={{ width: "22rem", marginBottom: "2rem" }}>
      <Card.Img
        variant="top"
        src={product.mediaUrls[0]}
        className={styles.cardImage}
      />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        {product.latestBidAmount ? (
          <Card.Text>BID: {product.latestBidAmount}</Card.Text>
        ) : (
          <Card.Text>Asking Price: {product.startingPrice}</Card.Text>
        )}

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
            <Button disabled={hasTimeElapsed}>Bid Now</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
