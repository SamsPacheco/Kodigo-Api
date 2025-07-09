import React from 'react';
import axios from "axios";

const getBooking= async()=>{
    try{
        
        const reponse=await axios.get(`/api/V1/bookings`)
        console.log(reponse)
        const allBookings=reponse.data
        const one = allBookings.find(b => b.id === id);
        if (!one) throw new Error("Reservación no encontrada");
        return one;
    }catch(error){
        console.error("el error al obtener los datos", error)
    }
}
const cancelBooking = async (id) => {
    try{
        const reponse=await axios.patch(`/api/V1/status_booking/${id}`,{status:'CANCELED'})
        console.log(reponse)
        return reponse.data;
    }catch(error){
        console.error("el error al obtener los datos", error)
    }
    
}
export const ModalDetalleReservaciones = ({ cerrarModalDetalleReservaciones, datos }) => {
  const {
    estado = 'Pendiente',
    id = 'N/A',
    nombre = 'Sin nombre',
    direccion = 'Dirección no disponible',
    checkIn = 'Jueves, 24 de octubre de 2024',
    checkOut = 'Jueves, 24 de octubre de 2024',
    huesped = 'Huésped no especificado',
    noches = 0,
  } = datos || {};

  return (
    <>
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalles de la Reservación</h5>
              <button type="button" className="btn-close" onClick={cerrarModalDetalleReservaciones}></button>
            </div>

            <div className="modal-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-warning text-dark">● {estado}</span>
                <small className="text-muted">ID: #{id}</small>
              </div>

              <h6 className="mb-1">{nombre}</h6>
              <p className="text-muted mb-3">
                <i className="bi bi-geo-alt"></i> {direccion}
              </p>

              <div className="bg-light rounded p-3 mb-3" style={{ minHeight: '100px' }}>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <strong>Check-in</strong><br />
                  <span>{checkIn}</span>
                </div>
                <div className="col">
                  <strong>Check-out</strong><br />
                  <span>{checkOut}</span>
                </div>
              </div>

              <div className="mb-2">
                <strong>Información del Huésped</strong><br />
                <span className="text-muted">{huesped}</span>
              </div>

              <div className="bg-light rounded p-2">
                <strong>Resumen de la Estancia</strong><br />
                <span>🌙 {noches} noches</span>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger">Cancelar Reservación</button>
              <button type="button" className="btn btn-secondary" onClick={cerrarModalDetalleReservaciones}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
