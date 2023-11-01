import { Container, Form, Button } from "react-bootstrap";
import landing_page from "../../assets/landing-page.svg";
import logo from "../../assets/whitelogo.png";
import MainNavbar from "../MainNavbar/MainNavbar";
import { Search } from "@material-ui/icons";
import "./LandingPage.css";

function LandingPage() {
  return (
    <Container fluid className="container-class p-0">
      <MainNavbar />
      <div className="main-div">
        <div className="main-img">
          <img
            src={landing_page}
            alt="landing page background"
            className="bg-image"
          />
        </div>
        <div className="main-form">
          {/* - TODO: logo for mobile */}
          <img src={logo} alt="Logo" className="logo" />
          <Form inline className="search-form">
            <Form.Control
              type="text"
              placeholder="Search"
              className="search-input mr-sm-2"
            />
            <Button type="submit" className="search-button">
              <Search />
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
