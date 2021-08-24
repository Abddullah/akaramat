import ActionTypes from "../Constant/constant";

export const SearchData = payload => {
  return dispatch => {
    dispatch({
    type: ActionTypes.SEARCHDATA,
      payload
    });
  };
};
