import {
  REQUEST_MEALS_API,
  REQUEST_MEALS_API_SUCCESS,
  REQUEST_MEALS_API_ERROR,
} from '../Actions';

const INITIAL_STATE = {
  foods: [],
  isLoading: false,
  error: '',
};

function foods(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
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
