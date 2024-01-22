import axios from 'axios';

const API_URL = 'novolo/api/users/';

// Login
const login = async (userData) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data.data.user;
};

// Logout
const logout = async () => {
	localStorage.removeItem('user');
};

// Register
const register = async (userData) => {
	const response = await axios.post(API_URL + 'register', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Get user information
const getUserInformation = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + 'information', config);

	return response.data.data.user;
};

// Update user information
const updateUserInformation = async (userData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.patch(API_URL + 'information', userData, config);
	return response.data.data.updatedUser;
};

const authService = {
	login,
	logout,
	register,
	getUserInformation,
	updateUserInformation,
};

export default authService;
