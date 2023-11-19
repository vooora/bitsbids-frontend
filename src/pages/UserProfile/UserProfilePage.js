import MainNavbar from "../../components/MainNavbar/MainNavbar";
import bids_logo from "../../assets/bids.png";
import styles from "./UserProfilePage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";

function UserProfilePage() {
  return (
    <>
      <MainNavbar />
      <LeftColumnProfile />
      <div
        className={`${styles.rightColumn} d-flex justify-content-center`}
      ></div>
    </>
  );
}

export default UserProfilePage;
