import {
  BRAND_LOADING,
  BRANDS_SUCCESS,
  BRAND_FAIL,
  BRAND_SUCCESS,
} from "../action/brandAction";

const initialState = {
  brands: [],
  brand: {},
  loading: false,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BRAND_LOADING:
      return {
        ...state,
        loading: true,
      };
    case BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loading: false,
      };
    case BRAND_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        loading: false,
      };
    case BRAND_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
