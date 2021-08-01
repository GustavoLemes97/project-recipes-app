import {
  REQUEST_MEALS_API,
  REQUEST_MEALS_API_SUCCESS,
  REQUEST_MEALS_API_ERROR,
  REQUEST_MEALS_FILTERS,
} from '../Actions';

const INITIAL_STATE = {
  foods: [],
  filters: [],
  isLoading: false,
  error: '',
};

function foods(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_MEALS_FILTERS:
    return {
      ...state,
      filters: payload,
    };
  case REQUEST_MEALS_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_MEALS_API_SUCCESS:
    return {
      ...state,
      foods: payload,
      isLoading: false,
    };
  case REQUEST_MEALS_API_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    };
  default:
    return state;
  }
}

export default foods;
