export const REQUEST_MEALS_API = 'REQUEST_MEALS_API';
export const REQUEST_MEALS_API_SUCCESS = 'REQUEST_MEALS_API_SUCCESS';
export const REQUEST_MEALS_API_ERROR = 'REQUEST_MEALS_API_ERROR';
export const REQUEST_COCK_TAILS_API = 'REQUEST_COCK_TAILS_API';
export const REQUEST_COCK_TAILS_API_SUCCESS = 'REQUEST_COCK_TAILS_API_SUCCESS';
export const REQUEST_COCK_TAILS_API_ERROR = 'REQUEST_COCK_TAILS_API_ERROR';

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

export const fetchMealsAPI = (callback, value) => async (dispatch) => {
  dispatch(requestMealsApi());
  try {
    const response = await callback(value);
    dispatch(requestMealApiSuccess(response.meals));
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

export const fetchCockTailsAPI = (callback, value) => async (dispatch) => {
  dispatch(requestCockTailsApi());
  try {
    const response = await callback(value);
    dispatch(requestCockTailsApiSuccess(response.drinks));
  } catch (errorMessage) {
    dispatch(requestCockTailsApiError(errorMessage));
  }
};
