import ActionTypes from "../Constant/constant";

export const LoginUser = payload => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SAVE_USER,
      payload
    });
  };
};


export const DispatchAction = (payload, type) => {
  return dispatch => {
    dispatch({
      type: ActionTypes[type],
      payload
    });
  };
};
