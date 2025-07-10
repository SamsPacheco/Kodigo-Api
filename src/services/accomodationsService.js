import axios from "axios";

const getAccomodation = async () => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No se encontró el token de autenticación");
		}
		const response = await axios.get(
			"https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Error al obtener los Bookings"
		);
	}
};

const createAccomodation = async (name, description, address) => {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			throw new Error("No se encontró el token de autenticación");
		}
		const response = await axios.post(
			"https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation",

			{
				name,
				description,
				address,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Error al crear la accommodation"
		);
	}
};

export { getAccomodation, createAccomodation };
