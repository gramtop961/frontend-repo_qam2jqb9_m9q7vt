const API_BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '/api';

async function request(path, { method = 'GET', body, token, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Public
  getProducts: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/products${q ? `?${q}` : ''}`);
  },
  getProduct: (id) => request(`/product?id=${id}`),
  getCategories: () => request('/categories'),
  getBrands: () => request('/brands'),
  sendContact: (payload) => request('/contact-message', { method: 'POST', body: payload }),

  // Admin
  login: (payload) => request('/login', { method: 'POST', body: payload }),
  addProduct: (payload, token) => request('/add-product', { method: 'POST', body: payload, token }),
  updateProduct: (payload, token) => request('/update-product', { method: 'POST', body: payload, token }),
  deleteProduct: (id, token) => request('/delete-product', { method: 'POST', body: { id }, token }),
  uploadImage: async (file, token) => {
    const form = new FormData();
    form.append('image', file);
    return request('/upload-image', { method: 'POST', body: form, token, isForm: true });
  },
};
