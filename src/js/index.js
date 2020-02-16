import Search from './modules/Search';
import Recipe from './modules/Recipe';
import List from './modules/List';
import Like from './modules/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object 
 * - Current recipe object 
 * - Shopping list object 
 * - Liked recipes
 */
const state = {};


/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get query from view (when user submit)
    const query = searchView.getInput();


    if (query){
        // 2. Create new search object and add to state
        state.search = new Search(query);
        try {
            // 3. Prepare UI for the results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);

            // 4. Get the recipes 
            await state.search.getResults();

            // 5. Render the result (recipes) to UI
            clearLoader();
            searchView.renderResults(state.search.results);
        } catch(error) {
            alert("Something wrong with Search Controller!");
            clearLoader();
        }
    }
}; 

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //prevent page load when user submit
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn= e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
    
});



/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    // Get the recipe-id
    const id = window.location.hash.replace('#','');
    //console.log(id);

    if(id){

        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        //  Hightlight selected search
        if (state.search) searchView.hightlightSelected(id);

        // Create new current recipe object and add to state
        state.recipe = new Recipe(id);
        //console.log(state.recipe);
        
        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);

            
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );


        } catch(error){
            alert("Something wrong with controlRecipe!");
        }
    }
};

['hashchange', 'load'].forEach(event => addEventListener(event, controlRecipe));


/**
 * LIST CONTROLLER
 */

const controlList = () => {
    // Create a new list IF there is not yet
    if (!state.list) state.list = new List();

    // Add each ingredient to list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    
    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


/**
 * LIKE CONTROLLER
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Like(); 
    const currentID = state.recipe.id;

    // User has not YET liked current recipe
    if (!state.likes.isLiked(currentID)){
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.author, 
            state.recipe.title,
            state.recipe.img
        );

        // Toggle the like button 
        likesView.toggleLikeBtn(true);

        // Add like to UI 
        likesView.renderLike(newLike);

    // User HAS liked current recipe    
    } else {
        // Delete like from state
        state.likes.deleteLike(currentID);

        // Toggle the like button 
        likesView.toggleLikeBtn(false);
        
        // Delete like from UI
        likesView.deleteLike(currentID);
    }

    // Toggle Like Menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
    
    state.likes = new Like();

    // Restore likes from storage
    state.likes.readStorage();

    // Toggle like menu button 
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes 
    state.likes.likes.forEach(like => likesView.renderLike(like));
});

// Handling the recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // Add ingredients to shopping list 
        controlList();

    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});