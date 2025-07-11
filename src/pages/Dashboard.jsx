import React, {useState} from 'react'
import { AccommodationCard, Sidebar, ModalAlojamiento } from '../components';
import { getBookings } from '../services/bookingsService';
import { getAccomodation } from '../services/accomodationsService';


export const Dashboard = () => {

  const [mostrarModalAlojamientos, setMostrarModalAlojamientos] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [accomodations, setAccomodations] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      const data2 = await getAccomodation();
      setAccomodations(data2);
      setBookings(data);
      console.log("Bookings fetched successfully:", data);
      console.log("Accomodations fetched successfully:", data2);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <section className="d-flex" style={{height: '100dvh'}}>
      <Sidebar />
      <main className="p-4 flex-grow-1 position-relative">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Alojamientos</h3>
          <button className="btn btn-dark d-none d-md-block" onClick={() => {setMostrarModalAlojamientos(true)}} >
            <i className="bi bi-plus me-1"></i> Nuevo Alojamiento
          </button>
          <button className="btn btn-dark d-none d-md-block" onClick={fetchBookings}>
            <i className="bi bi-arrow-clockwise me-1"></i> Actualizar
            </button>
          <button className="btn btn-dark d-flex align-items-center rounded-circle position-absolute bottom-0 end-0 m-4 d-md-none">
            <i className="bi bi-plus fs-2 fw-bolder"></i>
          </button>
          
        </div>

        <AccommodationCard />
      </main>

      {mostrarModalAlojamientos && (
        <ModalAlojamiento cerrarModalAlojamientos={() => setMostrarModalAlojamientos(false)} />
      )}
    </section>
  );
}
