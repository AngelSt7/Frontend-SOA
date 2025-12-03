// Crear una instancia de axios
const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
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

// PUT
api.patchRequest = (endpoint, body) => {
    return api.patch(endpoint, body);
};


// DELETE
api.deleteRequest = (endpoint) => {
    return api.delete(endpoint);
};

