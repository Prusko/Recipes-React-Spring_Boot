import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Recipe from '../pages/Recipe';

function NavigationBar() {

  const [search, setSearch] = useState("");
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.length === 0) {
      setSearchedRecipes([])
    } else {
      try {
        await axios.get(`https://recipes-spring-boot.onrender.com/api/v1/recipe/title=${search}`)
          .then(res => { console.log(res.data); setSearchedRecipes(res.data) })
      } catch (error) {
        alert("Valami Hiba történt a lekérdezés során.")
      }
    }
  }

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Receptneked</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" style={{marginTop: "10px"}}>
          <div className="w-100 d-flex justify-content-center" style={{ position: "relative" }}>
            <Form className="d-flex w-50" onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Keresés"
                className="me-2"
                aria-label="Keresés"
                value={search}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onChange={async e => {
                    const value = e.target.value;
                    setSearch(value);
                    if (value === "") {
                        setSearchedRecipes([]);
                    } else {
                        try {
                            const res = await axios.get(`https://recipes-spring-boot.onrender.com/api/v1/recipe/title=${value}`);
                            setSearchedRecipes(res.data);
                        } catch (error) {
                            setSearchedRecipes([]);
                        }
                    }
                }}
              />
            </Form>
            {focused && searchedRecipes.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  width: "100%",
                  maxWidth: "calc(50% + 0.75rem)", // 50% + padding/margin
                  background: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  maxHeight: "300px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  marginTop: "4px",
                  borderRadius: "0 0 8px 8px",
                  paddingLeft: "15px"
                }}
              >
                {searchedRecipes.map(recipe => (
                  <Link to={`/recipe/${recipe.id}`} key={recipe.id}  style={{ padding: "10px 16px", borderBottom: "1px solid #eee", color: "black", textDecoration: "none" }}>
                    <h3 className="search-result-link" style={{ fontSize: "1.1rem", margin: 0, transition: "ease-in-out .13s" }}>{recipe.title}</h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Nav className="text-nowrap new-recipe">
            <Nav.Link as={Link} to="/new-recipe">Új recept</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
