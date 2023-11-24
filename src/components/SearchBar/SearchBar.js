import React from "react";
import { Form, Button } from "react-bootstrap";
import { Search } from "@material-ui/icons";
import styles from "./SearchBar.module.css";

function SearchBar({ searchQuery, setSearchQuery, handleSubmit }) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };
  return (
    <Form inline className={styles.searchForm} onSubmit={handleFormSubmit}>
      <Form.Control
        type="text"
        placeholder="Search"
        className={`${styles.searchInput} mr-sm-2`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" className={styles.searchButton}>
        <Search />
      </Button>
    </Form>
  );
}

export default SearchBar;
