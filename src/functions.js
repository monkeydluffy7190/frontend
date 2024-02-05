export const getErrorMessage = (error) => {
  if (error.response) {
    // Axios error with response
    return error.response.data.message || "API error";
  } else if (error.request) {
    // Axios error without response
    return "No response received from the server";
  } else {
    // Non-Axios error
    return error.message || "Unknown error";
  }
};
