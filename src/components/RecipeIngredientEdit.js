import React from "react";

function RecipeIngredientEdit({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }
  return (
    <>
      <input
        type="text"
        value={ingredient.name}
        onChange={(e) => handleChange({ name: e.target.value })}
        className="recipe-edit__input"
      />
      <input
        type="text"
        value={ingredient.amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
        className="recipe-edit__input"
      />
      <button
        className="btn btn--danger"
        onClick={() => handleIngredientDelete(ingredient.id)}
        // onClick={() => console.log("i clicked")}
      >
        &times;
      </button>
    </>
  );
}

export default RecipeIngredientEdit;
