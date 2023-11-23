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
    const bidClosingTime = new Date(product.bidClosingTime).getTime();
    const now = new Date().getTime();
    const timeDifference = bidClosingTime - now;

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

  return (
    <Card style={{ width: "22rem", marginBottom: "2rem" }}>
      <Card.Img
        variant="top"
        src={product.mediaUrls[0]}
        className={styles.cardImage}
      />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>BID: {product.latestBidAmount}</Card.Text>
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
                <span>HRS</span>
                <span style={{ paddingLeft: "4px" }}>MINS</span>
                <span style={{ paddingLeft: "2px" }}>SECS</span>
              </div>
            </div>
          </div>

          <div className="bidButton">
            <Button>Bid Now</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
