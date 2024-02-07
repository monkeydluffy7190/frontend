import http from "./http";

export const login = async (username, password) => {
  try {
    const response = await http.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (username, password) => {
  try {
    const response = await http.post("/signup", { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const saveFormData = async (formData) => {
  try {
    const response = await http.post("/formdata", formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};





export const getFormData = async (loggedInUser) => {
  try {
    const response = await http.get(`/formdata/${loggedInUser.id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
