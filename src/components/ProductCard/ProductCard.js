import { Card, Button } from "react-bootstrap";
import img from "../../assets/img.png";
import styles from "./ProductCard.module.css";
import "./ProductCard.css";
import { Timer } from "@material-ui/icons";

function ProductCard() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Some Product</Card.Title>
        <Card.Text>BID: 3</Card.Text>

        <div className={styles.bottomSection}>
          <div className={styles.timer}>
            <Timer />
            <div className="ms-2">
              <Card.Text style={{ marginBottom: "0", paddingLeft: "4px" }}>
                00:02:03:04
              </Card.Text>
              <div className={styles.timeLabels}>
                <span>DAYS</span>
                <span>HRS</span>
                <span>MINS</span>
                <span>SECS</span>
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
