const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
    async request(endpoint: string, options: RequestInit = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return response.json();
    },

    auth: {
        login: (data: any) => api.request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
        register: (data: any) => api.request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    },

    skills: {
        getAll: () => api.request('/skills'),
        create: (data: any) => api.request('/skills', { method: 'POST', body: JSON.stringify(data) }),
        verify: (id: string, githubUrl: string) => api.request(`/skills/${id}/verify`, { method: 'POST', body: JSON.stringify({ githubUrl }) }),
        delete: (id: string) => api.request(`/skills/${id}`, { method: 'DELETE' }),
    },

    matches: {
        discover: () => api.request('/matches/discover'),
        getMyMatches: () => api.request('/matches/my-matches'),
        request: (userId: string) => api.request(`/matches/${userId}`, { method: 'POST' }),
        updateStatus: (id: string, status: string) => api.request(`/matches/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    },

    users: {
        getAll: () => api.request('/users'),
        getProfile: () => api.request('/users/profile'),
        updateProfile: (data: any) => api.request('/users/profile', { method: 'PATCH', body: JSON.stringify(data) }),
    }
};
