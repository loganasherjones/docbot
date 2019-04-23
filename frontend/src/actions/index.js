export const defaultErrorHandler = (error, dispatch, action) => {
  let newError = error;
  if (error.response) {
    if (error.response.data && error.response.data.message) {
      newError = Error(error.response.data.message);
    }
  }

  if (action) {
    dispatch(action(newError));
  }
  return newError;
};
