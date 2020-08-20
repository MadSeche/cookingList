import React, { useState, useEffect } from "react";
import "./css/App.css";
import { v4 as uuidv4 } from "uuid";
import RecipeList from "./components/RecipeList";
import RecipeEdit from "./components/RecipeEdit";

/* --------------------------------- Samples -------------------------------- */
const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    serving: 3,
    cookTime: "1:45",
    instructions: "1. Put salt on Chicken\n2. Fry the chicken\n3. Eat chicken",
    ingredients: [
      { id: 1, name: "Chicken", amount: "2 Pounds" },
      { id: 2, name: "Salt", amount: "1 Tbs" },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    serving: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on pork \n2. Fry the porc\n3. Eat porc",
    ingredients: [
      { id: 1, name: "Porc", amount: "3 Pounds" },
      { id: 2, name: "Paprika", amount: "2 Tbs" },
    ],
  },
];
/* ----------------------------- Create context ----------------------------- */
export const RecipeContext = React.createContext();
/* ------------------------------------ App ----------------------------------- */
function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  /* -------------------------- Define context value -------------------------- */
  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  /* -------------------------------- UseEffect ------------------------------- */
  const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  /* -------------------------------- Functions ------------------------------- */
  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      serving: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  /* --------------------------------- RETURN --------------------------------- */
  return (
    <div className="App">
      <header>
        <h1>Time to Cook !</h1>
      </header>

      <RecipeContext.Provider value={recipeContextValue}>
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
