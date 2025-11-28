// Crear una instancia de axios
const api = axios.create({
    baseURL: "http://localhost:4000/api",
});

// GET
api.getRequest = (endpoint, params = {}) => {
    return api.get(endpoint, { params });
};

// POST
api.postRequest = (endpoint, body) => {
    return api.post(endpoint, body);
};

// PUT
api.putRequest = (endpoint, body) => {
    return api.put(endpoint, body);
};

// DELETE
api.deleteRequest = (endpoint) => {
    return api.delete(endpoint);
};

