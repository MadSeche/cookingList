import React, { useContext } from "react";
import { RecipeContext } from "../App";
import IngredientsList from "./IngredientsList";

function Recipe(props) {
  const { id, name, cookTime, serving, instructions, ingredients } = props;
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div>
          <button
            onClick={() => handleRecipeSelect(id)}
            className="btn btn--primary mr-1"
          >
            Edit
          </button>
          <button
            onClick={() => handleRecipeDelete(id)}
            className="btn btn--danger"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time :</span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Serving :</span>
        <span className="recipe__value">{serving}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Instructions :</span>
        <div className="recipe__value recipe__instructions recipe__value--indented">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients :</span>
        <div className="recipe__value">
          <IngredientsList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
