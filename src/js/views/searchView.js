import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // Return the new title
        return `${newTitle.join(' ')} ...`;
    } 
    return title;
};

export const hightlightSelected = id => {
    
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    // Select the link including class = "results__link" and value has content including id
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');

};

export const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderPageButton(page, recipes.length, resPerPage);
};

// type = 'prev' : 'next'
const createPageButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderPageButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button; 

    if (page === 1 && pages > 1){
        // Only go to next page
        button = createPageButton(1, 'next');
    } else if (page < pages) {
        // Display both button
        button = `
            ${createPageButton(page, 'prev')}
            ${createPageButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1){
        // Only go to prev page
        button = createPageButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}