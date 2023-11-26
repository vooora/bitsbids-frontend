import styles from "./LeftColumn.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LeftColumnProfile({ userDetails }) {
  const navigate = useNavigate();
  const goToWallet = () => {
    navigate("/wallet", { state: { userDetails } });
  };
  const goToProfile = () => {
    navigate("/user", { state: { userDetails } });
  };
  return (
    <div className={styles.main}>
      <div className={styles.appContainer}>
        <div className={`${styles.leftColumn}`}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="md" onClick={goToProfile}>
              View Profile
            </Button>
            <Button variant="primary" size="md" onClick={goToWallet}>
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
