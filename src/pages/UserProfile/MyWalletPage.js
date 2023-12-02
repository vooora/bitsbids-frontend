import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { Button, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AccountBalanceWallet } from "@material-ui/icons";
import "./UserProfilePage.css";
import axios from "axios";

const serverBaseUrl = process.env.REACT_APP_BACKEND_URL;

function MyWalletPage() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedDetails = localStorage.getItem("userDetails");
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleSetAmount = (amount) => {
    setInputValue(amount);
  };
  const toggleDrawer = () => {
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  useEffect(() => {
    if (!userDetails) {
      const storedDetails = localStorage.getItem("userDetails");
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
      }
    } else {
    }
  }, [userDetails]);

  const handleAddMoney = async () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      navigate("/wallet", {
        replace: true,
        state: {
          message: "Please enter a valid amount.",
          variant: "danger",
        },
      });
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

      const updatedBalance = response.data.newBalance;

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        walletBalance: updatedBalance,
      }));

      setInputValue("");

      navigate("/", {
        state: { message: "Error getting products.", variant: "danger" },
      });
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      navigate("/", {
        state: { message: "Error getting products.", variant: "danger" },
      });
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
                  Balance: ₹{userDetails.walletBalance}
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
