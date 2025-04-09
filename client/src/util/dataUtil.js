import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

async function fetchData(endpoint) {
  try {
    const { data } = await api.get(`/${endpoint}`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function postData(endpoint, payload) {
  try {
    const { data } = await api.post(`/${endpoint}`, payload);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data || err.message };
  }
}

async function updateData(endpoint, id, payload) {
  try {
    const { data } = await api.put(`/${endpoint}/${id}`, payload);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data || err.message };
  }
}

async function deleteData(endpoint, id) {
  try {
    const { data } = await api.delete(`/${endpoint}/${id}`);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.response?.data || err.message };
  }
}

export { fetchData, postData, updateData, deleteData };