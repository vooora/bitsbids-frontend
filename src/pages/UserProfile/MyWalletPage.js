import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MonetizationOn, AccountBalanceWallet } from "@material-ui/icons";
import "./UserProfilePage.css";
import axios from "axios";

const serverBaseUrl = "http://localhost:8080";

function MyWalletPage() {
  const location = useLocation();
  // const userDetails = location.state?.userDetails;
  const [userDetails, setUserDetails] = useState(location.state?.userDetails);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSetAmount = (amount) => {
    setInputValue(amount);
  };
  const toggleDrawer = () => {
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleAddMoney = async () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const requestBody = {
        amount: amount,
      };
      const response = await axios.post(
        `${serverBaseUrl}/user/${userDetails.userId}/wallet`,
        requestBody
      );

      // Assuming the backend returns the updated wallet balance
      const updatedBalance = response.data.newBalance;

      // Update the userDetails state with the new balance
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        walletBalance: updatedBalance,
      }));

      // Optionally, clear the input field
      setInputValue("");

      alert("Money added to wallet successfully.");
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      alert(
        "There was an error adding money to your wallet. Please try again later."
      );
    }
  };

  return (
    <>
      <MainNavbar />
      <div className={styles.main}>
        <Button
          className={`${styles.menuButton} d-md-none`}
          onClick={toggleDrawer}
          aria-controls="basic-navbar-nav"
          aria-expanded={isDrawerOpen}
        >
          {isDrawerOpen ? <span>&#9660;</span> : <span>&#9654;</span>}{" "}
        </Button>
        <div className={styles.appContainer}>
          <div class={`${isDrawerOpen ? "open" : "closed"}`}>
            <LeftColumnProfile userDetails={userDetails} />
          </div>
          {!isDrawerOpen ? (
            <div
              className={`${styles.rightColumn} d-flex justify-content-center`}
            >
              <div
                className={`${styles.centeredContent} d-flex flex-column align-items-center justify-content-center`}
              >
                <div className="d-flex align-items-end">
                  <AccountBalanceWallet
                    style={{
                      fontSize: "4rem",
                      marginRight: "2rem",
                      marginBottom: "0.7rem",
                    }}
                  />
                  <div className="d-flex flex-column ml-2">
                    <span className={styles.walletName}>{`${
                      userDetails.firstName.charAt(0).toUpperCase() +
                      userDetails.firstName.slice(1).toLowerCase()
                    } ${
                      userDetails.lastName.charAt(1).toUpperCase() +
                      userDetails.lastName.slice(2).toLowerCase()
                    }'s`}</span>
                    <span className={styles.walletLabel}>Wallet</span>
                  </div>
                </div>
                <h1
                  className="display-8 mb-4"
                  style={{ marginRight: "6rem", marginTop: "1rem" }}
                >
                  Balance: {userDetails.walletBalance}
                  <MonetizationOn />
                </h1>
                <Form
                  className="mb-3 d-flex"
                  style={{ width: "32rem", justifyContent: "flex-end" }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddMoney();
                  }}
                >
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    className={styles.enterMoneyForm1}
                    min="0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    className={styles.mediumButton}
                    type="submit"
                  >
                    Add Money
                  </Button>
                </Form>
                <Row className="mt-3" style={{ paddingLeft: "4rem" }}>
                  <Button
                    variant="primary"
                    size="sm"
                    className={styles.smallButton}
                    onClick={() => handleSetAmount(100)}
                  >
                    100
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className={styles.smallButton}
                    onClick={() => handleSetAmount(500)}
                  >
                    500
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className={styles.smallButton}
                    onClick={() => handleSetAmount(1000)}
                  >
                    1000
                  </Button>
                </Row>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MyWalletPage;
