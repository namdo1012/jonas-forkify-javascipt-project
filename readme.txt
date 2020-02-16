1. Call APIs get recipes
2. Building the Search Model: Search.js /** The model's name file always be upcase */
3. Building the Search Controller:
	-> index.js
	-> Create state object to save the app's state
	 	* - Search object 
 		* - Current recipe object 
 		* - Shopping list object 
 		* - Liked recipes
	-> Add event-listener to submit (*Note: prevent page loading when submit)
	-> Build function: controlSearch: 
		1. Get query from UI (when user submit)
		2. Create new search object and add to state
       		3. Prepare UI for the results
         	4. Get the recipes 
       		5. Render the result (recipes) to UI
4. Building the Search View: 
	-> searchView.js
	-> Create base.js to save all elements
	-> Write function to get query from user: getInput
	-> Write function to render result to UI: renderResults, renderRecipe, getInput
	-> Write fucntion to limit the length of title: limitRecipeTitle
	-> Write function create loader when waiting for data: renderLoader, clearLoader (*Note: in base.js) (*Note: create elementStrings) 
5. Manipulate with PageButton
	-> Write function: "createPageButton" return markup for button and "renderPageButton" to display 
------------------------------------------------
1. Search.js: class Search (getResult(query));

2. Recipe.js: class Recipe (getRecipe(), calcTime(), calcServings(), parseIngredients(), updateServings(type) );

3. List.js: class List (addItem(count, unit, ingredient), deleteItem(id), updateCount(id, newCount) );

4. Like.js: class Like (addLike(id, author, title, img), deleteItem(id), isLiked(id), getNumLikes() );

5. searchView.js: getInput(), clearInput(), clearResults(), limitRecipeTitle(title, limit = 17), hightlightSeleted(id), renderRecipe(recipe), 
   renderResults(recipes, page = 1, resPerPage = 10), createPageButton(page, type), renderPageButton(page, numResults, resPerPage)

6. recipeView.js: clearRecipe(), formatCount(count), createIngredient(ingredient), renderRecipe(recipe), updateServingsIngredients(recipe)

7. listView.js: renderItem(item), deleteItem(id)

8. likesView.js: toggleLikeBtn(isLiked), toggleLikeMenu(numLikes), renderLike(like), deleteLike(id)

*** config.js: export key, proxy
*** base.js: export elements(
    searchForm,
    searchInput,
    searchRes,
    searchResList,
    recipe,
    searchResPages,
    shopping,
    likesMenu,
    likesList
), export renderLoader(parent), clearLoader();

9. PERSIST DATA TO STORAGE
--> Build function in Likes.js to save likes data when the page load: persistData(), readStorage() (*Note: use JSON.stringify and JSON.parse);









