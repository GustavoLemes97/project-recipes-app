export function checkedIngredient(
  { target: { checked, parentNode } },
  setIngredients,
  verify,
  ingredient,
) {
  const checkIngredient = ingredient.map((ing) => {
    if (parentNode.innerText === ing.ingredient) ing.checked = checked;
    return ing;
  });

  setIngredients(checkIngredient);
  verify();
}

export function changeIngredients(setIngredients, mealOrDrink) {
  const { pathname } = window.location;
  const id = pathname.match(/\d+/)[0];

  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (store && store[mealOrDrink] && store[mealOrDrink][id]) {
    setIngredients(store[mealOrDrink][id]);
  }
}

export function changeFavorite(setFavorited) {
  const { pathname } = window.location;
  const id = pathname.match(/\d+/)[0];
  const store = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (store) {
    const actualFood = store.find((item) => item.id === id);
    if (actualFood) setFavorited(true);
  }
}

export function copyToClipBoard(setCopied) {
  const { pathname } = window.location;
  navigator.clipboard.writeText(
    `http://localhost:3000${pathname.replace(/\/in-progress/, '')}`,
  );
  setCopied(true);
}

export function saveProgressInLocalStorage(mealOrDrink, ingredient) {
  const { pathname } = window.location;
  const id = pathname.match(/\d+/)[0];
  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (store) {
    console.log(store);
    store[mealOrDrink][id] = ingredient;
    localStorage.setItem('inProgressRecipes', JSON.stringify(store));
  } else {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        cocktails: {},
        meals: {},
        [mealOrDrink]: {
          [id]: ingredient,
        },
      }),
    );
  }
}

export function verifyAllInputs(
  ingredient,
  mealOrDrink,
  setDisable,
  saveProgress,
) {
  const settingDisabled = ingredient.every(({ checked }) => checked);
  setDisable(!settingDisabled);
  saveProgress(mealOrDrink, ingredient);
}
