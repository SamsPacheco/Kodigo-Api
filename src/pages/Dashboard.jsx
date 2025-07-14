import React, {useEffect, useState} from 'react'
import { AccommodationCard, Sidebar, ModalAlojamiento } from '../components';
import { getAccomodation } from '../services/accomodationsService';

export const Dashboard = () => {

  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
      getData();
  }, [])
  

  const getData = async() => {
    const data = await getAccomodation();
    setAccommodations(data)
  }

  const [mostrarModalAlojamientos, setMostrarModalAlojamientos] = useState(false);

  return (
    <section className="d-flex" style={{height: '100dvh'}}>
      <Sidebar />
      <main className="py-3 px-md-4 flex-grow-1 position-relative overflow-y-auto">
        <section className="d-flex justify-content-between align-items-center mb-3 px-1 px-md-3">
          <h3 className='fw-semibol px-2'>Alojamientos</h3>
          <button className="btn btn-dark mx-2 mx-md-0" onClick={() => {setMostrarModalAlojamientos(true)}} >
            <i className="bi bi-plus me-1"></i> Nuevo Alojamiento
          </button>
          
        </section>

        <AccommodationCard data = {accommodations}/>
      </main>

      {mostrarModalAlojamientos && (
        <ModalAlojamiento cerrarModalAlojamientos={() => setMostrarModalAlojamientos(false)} />
      )}
    </section>
  );
}
