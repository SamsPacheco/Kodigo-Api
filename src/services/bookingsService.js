import axios from "axios";

const getBookings = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No se encontró el token de autenticación");
        }
        const response = await axios.get(
            "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al obtener los Bookings"
        );
    }
};

const createBooking = async (bookingData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No se encontró el token de autenticación");
        }
        const response = await axios.post(
            "https://apibookingsaccomodations-production.up.railway.app/api/V1/booking", 
            bookingData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = response.data;
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            return { message: "Reserva creada exitosamente" };
        }
        return data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Error al crear la reserva"
        );
    }
};

export { getBookings, createBooking };
