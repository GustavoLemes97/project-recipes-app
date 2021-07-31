import {
  REQUEST_COCK_TAILS_API,
  REQUEST_COCK_TAILS_API_SUCCESS,
  REQUEST_COCK_TAILS_API_ERROR,
  REQUEST_COCK_TAILS_FILTERS,
} from '../Actions';

const INITIAL_STATE = {
  drinks: [],
  filters: [],
  isLoading: false,
  error: '',
};

function drinks(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_COCK_TAILS_FILTERS:
    return {
      ...state,
      filters: payload,
    };
  case REQUEST_COCK_TAILS_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_COCK_TAILS_API_SUCCESS:
    return {
      ...state,
      drinks: payload,
      isLoading: false,
    };
  case REQUEST_COCK_TAILS_API_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    };
  default:
    return state;
  }
}

export default drinks;
