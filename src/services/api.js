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

export const updateFormData = async (formData, id) => {
  try {
    const response = await http.put(`/formdata/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteFormData = async (id) => {
  try {
    const response = await http.delete(`/formdata/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllFormData = async () => {
  try {
    const response = await http.get("/formdata");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
