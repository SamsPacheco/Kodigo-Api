import React from 'react'
import { set } from 'react-hook-form';
import ModalReservaciones from '../components/ModalReservaciones';



export const Accomodations = () => {
  const [mostrarModal, setMostrarModal] = React.useState(false);


  return (
    <div>Accomodations
      <button className="btn btn-dark" onClick={() => setMostrarModal(true)}>
        <i className="bi bi-plus me-1"> </i> Nueva Reservaciones
      </button>

      {mostrarModal && (
          <ModalReservaciones />
        )
      }
    </div >
  )
} 
