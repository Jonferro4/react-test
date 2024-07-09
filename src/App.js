import { useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  const submitRecipe = (event) => {
    event.preventDefault();

    const newRecipeName = event.target.elements.newRecipeName.value;
    const newRecipeInstructions = event.target.elements.newRecipeInstructions.value;
    
    setRecipes([...recipes, {
      name: newRecipeName,
      instructions: newRecipeInstructions
    }]);

    showRecipeForm(false);
  };

  const toggleRecipe = (index) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      {recipes.length === 0 ? (
        <p>There are no recipes to list.</p>
      ) : (
        <div>
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe">
              <h2 onClick={() => toggleRecipe(index)}>Name: {recipe.name}</h2>
              {expandedRecipe === index && (
                <p>Instructions: {recipe.instructions}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {recipeFormShown ? (
        <form id="recipe-form" name='recipe-form' onSubmit={submitRecipe}>
          <label htmlFor="newRecipeName">Recipe name: </label>
          <input type="text" id="newRecipeName" required />
          <label htmlFor="newRecipeInstructions">Instructions:</label>
          <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." required />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <button onClick={() => showRecipeForm(true)}>Add Recipe</button>
      )}
    </div>
  );
}

export default App;