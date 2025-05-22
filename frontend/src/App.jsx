import React from 'react';
import './App.css';
import Home from './pages/Home';
import NewRecipePage from './pages/NewRecipe';
import Nav from './Components/Nav';
import {Routes, Route} from 'react-router-dom';
import Recipe from './pages/Recipe';
import RecipeUpdate from './pages/RecipeUpdate';

function App() {
  return (
    <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/new-recipe" element={<NewRecipePage />}></Route>
                <Route path='/recipe/:id' element={<Recipe />}></Route>
                <Route path='/recipe/update/:id' element={<RecipeUpdate />}></Route>
            </Routes>
        </>
  );
}

export default App;
