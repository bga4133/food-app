import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
//styles
import "./styles/App.css";
// components
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

function App() {
  //states
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  //api key
  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  //getdata function
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Plase fill the form");
    }
  };

  //on change function
  const onChange = e => {
    setQuery(e.target.value);
  };
  //on submit function
  const onSubmit = e => {
    e.preventDefault();
    getData();
  };
  return (
    <div className="app">
      <h1>Food search app</h1>
      <form action="" className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
