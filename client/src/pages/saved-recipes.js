import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId.js";

export default function SavedRecipes() {
//   const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserId();
  useEffect(() => {
  
    async function fetchSavedRecipe() {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );
        setSavedRecipes(response.data.savedRecipes)
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSavedRecipe();
  }, []);




  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            {/* {savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>} */}
            <div>
              <h2>{recipe.name}</h2>
              {/* <button onClick={() => saveRecipe(recipe._id) } disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button> */}
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
