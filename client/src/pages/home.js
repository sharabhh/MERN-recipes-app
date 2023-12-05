import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId.js";
import {useCookies} from "react-cookie"

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"])

  const userId = useGetUserId();
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchSavedRecipe() {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes)
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRecipe();
    
  if(cookies.access_token) fetchSavedRecipe(); 

  }, []);

  async function saveRecipe(recipeId) {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeId,
        userId,
      }, {headers: {authorization: cookies.access_token}});
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

function isRecipeSaved(id){
  if(savedRecipes && savedRecipes.length > 0){

    return savedRecipes.includes(id)
  }
  return false
}

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {/* {savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>} */}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id) } disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
            </div>
            <div>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p><strong>Cooking Time:</strong> {recipe.cookingTime} (in minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
