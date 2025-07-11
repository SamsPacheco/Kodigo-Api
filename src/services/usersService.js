import axios from "axios";

const loginUser = async (email, password) => {
	try {
		const response = await axios.post(
			"https://apibookingsaccomodations-production.up.railway.app/api/V1/login",
			{
				email,
				password,
			}
		);
		return response.data; // Retorna los datos del usuario o el token
	} catch (error) {
		throw new Error(error.response?.data?.message || "Error al iniciar sesión");
	}
};

const getUsers = async () => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No se encontró el token de autenticación");
		}

		const response = await axios.get(
			"https://apibookingsaccomodations-production.up.railway.app/api/V1/users",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data; // Retorna la lista de usuarios
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Error al obtener los usuarios"
		);
	}
};

export { loginUser, getUsers };
