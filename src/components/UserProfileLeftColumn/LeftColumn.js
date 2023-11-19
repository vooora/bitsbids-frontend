import styles from "./LeftColumn.module.css";
import { Button } from "react-bootstrap";

function LeftColumnProfile() {
  return (
    <div className={styles.main}>
      <div className={styles.appContainer}>
        <div className={styles.leftColumn}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="md">
              View Profile
            </Button>
            <Button variant="primary" size="md">
              My Wallet
            </Button>
            <Button variant="primary" size="md">
              My Sales
            </Button>
            <Button variant="primary" size="md">
              My Bids
            </Button>
            <Button variant="primary" size="md">
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftColumnProfile;
