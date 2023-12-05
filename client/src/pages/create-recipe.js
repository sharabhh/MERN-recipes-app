import React, { useState } from "react";
import axios from "axios"
import { useGetUserId } from "../hooks/useGetUserId";
import {useNavigate} from 'react-router-dom'
import { useCookies } from "react-cookie";

export default function CreateRecipe() {
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }
  function handleIngredientChange(event, idx) {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  }

  function addIngredients() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

async function onSubmit(event){
event.preventDefault();
try{
  await axios.post('http://localhost:3001/recipes',recipe, {
    headers: {authorization: cookies.access_token}
  });
  alert('recipe created')
  navigate('/')
}
catch(err){
  console.error(err)
}
}

  // console.log(recipe);
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        {/* <label htmlFor="description">Description</label>
                <textarea id="description" name="description"></textarea> */}
        <label htmlFor="ingredients">Ingredients</label>
        <button onClick={addIngredients} type="button">
          Add Ingredients
        </button>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          name="cookingTime"
          id="cookingTime"
          onChange={handleChange}
        />
        <button type="submit" onClick={onSubmit}>Create Recipe</button>
      </form>
    </div>
  );
}
