import MainNavbar from "../../components/MainNavbar/MainNavbar";
import LeftColumnProfile from "../../components/UserProfileLeftColumn/LeftColumn";
import styles from "./UserProfilePage.module.css";
import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import SalesProductCard from "../../components/ProductCard/SalesProductCard";

function MySalesPage() {
  return (
    <>
      <MainNavbar />
      <LeftColumnProfile />
    </>
  );
}

export default MySalesPage;
