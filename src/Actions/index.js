export const REQUEST_MEALS_API = 'REQUEST_MEALS_API';
export const REQUEST_MEALS_API_SUCCESS = 'REQUEST_MEALS_API_SUCCESS';
export const REQUEST_MEALS_API_ERROR = 'REQUEST_MEALS_API_ERROR';
export const REQUEST_MEALS_FILTERS = 'REQUEST_MEALS_FILTERS';
export const REQUEST_MEAL_DETAILS = 'REQUEST_MEAL_DETAILS';
export const REQUEST_COCK_TAILS_API = 'REQUEST_COCK_TAILS_API';
export const REQUEST_COCK_TAILS_API_SUCCESS = 'REQUEST_COCK_TAILS_API_SUCCESS';
export const REQUEST_COCK_TAILS_API_ERROR = 'REQUEST_COCK_TAILS_API_ERROR';
export const REQUEST_COCK_TAILS_FILTERS = 'REQUEST_COCK_TAILS_FILTERS';
export const REQUEST_DRINK_DETAILS = 'REQUEST_DRINK_DETAILS';

export const requestMealsApi = (payload) => ({
  type: REQUEST_MEALS_API,
  payload,
});

export const requestMealApiSuccess = (payload) => ({
  type: REQUEST_MEALS_API_SUCCESS,
  payload,
});

export const requestMealApiError = (payload) => ({
  type: REQUEST_MEALS_API_ERROR,
  payload,
});

export const requestMealsFilters = (payload) => ({
  type: REQUEST_MEALS_FILTERS,
  payload,
});

export const requestMealDetails = (payload) => ({
  type: REQUEST_MEAL_DETAILS,
  payload,
});

export const fetchMealFilters = (callback) => async (dispatch) => {
  dispatch(requestMealsApi());
  try {
    const response = await callback();
    dispatch(requestMealsFilters(response.meals));
  } catch (errorMessage) {
    dispatch(requestMealApiError(errorMessage));
  }
};

export const fetchMealDetails = (callback, id) => async (dispatch) => {
  dispatch(requestMealsApi());
  try {
    const response = await callback(id);
    dispatch(requestMealDetails(response.meals));
  } catch (errorMessage) {
    dispatch(requestMealApiError(errorMessage));
  }
};

export const fetchMealsAPI = (callback, value) => async (dispatch) => {
  dispatch(requestMealsApi());
  try {
    const response = await callback(value);
    if (response.meals === null) {
      window.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    } else dispatch(requestMealApiSuccess(response.meals));
  } catch (errorMessage) {
    dispatch(requestMealApiError(errorMessage));
  }
};

export const requestCockTailsApi = (payload) => ({
  type: REQUEST_COCK_TAILS_API,
  payload,
});

export const requestCockTailsApiSuccess = (payload) => ({
  type: REQUEST_COCK_TAILS_API_SUCCESS,
  payload,
});

export const requestCockTailsApiError = (payload) => ({
  type: REQUEST_COCK_TAILS_API_ERROR,
  payload,
});

export const requestCockTailsFilters = (payload) => ({
  type: REQUEST_COCK_TAILS_FILTERS,
  payload,
});

export const requestDrinkDetails = (payload) => ({
  type: REQUEST_DRINK_DETAILS,
  payload,
});

export const fetchDrinkDetails = (callback, id) => async (dispatch) => {
  dispatch(requestCockTailsApi());
  try {
    const response = await callback(id);
    dispatch(requestDrinkDetails(response.drinks));
  } catch (errorMessage) {
    dispatch(requestCockTailsApiError(errorMessage));
  }
};

export const fetchDrinkFilters = (callback) => async (dispatch) => {
  dispatch(requestCockTailsApi());
  try {
    const response = await callback();
    dispatch(requestCockTailsFilters(response.drinks));
  } catch (errorMessage) {
    dispatch(requestCockTailsApiError(errorMessage));
  }
};

export const fetchCockTailsAPI = (callback, value) => async (dispatch) => {
  dispatch(requestCockTailsApi());
  try {
    const response = await callback(value);
    if (response.drinks === null) {
      window.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    } else dispatch(requestCockTailsApiSuccess(response.drinks));
  } catch (errorMessage) {
    dispatch(requestCockTailsApiError(errorMessage));
  }
};
