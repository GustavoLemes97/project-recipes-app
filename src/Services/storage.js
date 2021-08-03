export const getItemLocalStorage = (item) => JSON.parse(localStorage.getItem(item));

export const removeToFavorite = (id) => {
  const newFavoriteArray = localStorage.favoriteRecipes
  && getItemLocalStorage('favoriteRecipes')
    .filter(({ id: idItem }) => idItem !== id);
  localStorage.favoriteRecipes = JSON.stringify(newFavoriteArray);
};
