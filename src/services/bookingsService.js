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

const createBooking = async (
  booking,
  check_in_date,
  check_out_date,
  total_amount,
  accomodation_id,
  user_id
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }
    const response = await axios.post(
      "https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings",

      {
        booking,
        check_in_date,
        check_out_date,
        total_amount,
        accomodation_id,
        user_id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al crear la reserva"
    );
  }
};
const cancelBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token");
    }
    const response = await axios.patch(
      `https://apibookingsaccomodations-production.up.railway.app/api/V1/status_booking/${id}`,
      { status: "CANCELLED" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Respuesta de cancelBooking:", response.data);
    return response.data;
  } catch (error) {
    console.error("eror",error.response)
    throw new Error(
      error.response?.data?.message || "Error cancelar al reservación"
    );
  }
};

export { getBookings, createBooking, cancelBooking };