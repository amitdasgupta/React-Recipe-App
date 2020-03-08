import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const APP_ID = "";
  const APP_KEY = "";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    console.log("use effect called");
    getRecipies();
  }, [query]);
  const getRecipies = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const result = await response.json();
    setRecipes(result.hits);
    console.log(result.hits);
  };
  const handleChange = e => {
    setSearch(e.target.value);
    console.log(search);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={handleChange}
        />
        <input type="submit" className="search-button" value="Search" />
      </form>
      {recipes.map((item, index) => {
        return (
          <Recipe
            title={item.recipe.label}
            calories={item.recipe.calories}
            image={item.recipe.image}
            key={index}
            ingredients={item.recipe.ingredients}
          />
        );
      })}
    </div>
  );
}

export default App;
