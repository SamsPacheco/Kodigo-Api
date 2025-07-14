import React, { useState } from 'react'
import { createBooking } from '../services/bookingsService'

const ModalReservaciones = ({ cerrarModal }) => {
  const [accomodation, setAccomodation] = useState('Apartamento Centro');
  const [guest, setGuest] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accomodationMap = {
    'Apartamento Centro': 1,
    'Apartamento Exterior': 2,
    'Apartamento Interior': 3
  };
  // Datos fijos o generados desde el código
  const user_id = 1; // Puedes obtenerlo dinámicamente si tienes autenticación
  const total_amount = 500; // Puedes calcularlo según lógica de negocio
  const booking = 'BK' + Math.floor(Math.random() * 1000000); // Genera un código aleatorio

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const bookingData = {
        booking: booking,
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_amount: total_amount,
        accomodation_id: accomodationMap[accomodation],
        user_id: user_id
      };
      
      console.log('Datos a enviar:', bookingData);
      
      const response = await createBooking(bookingData);
      
      console.log('Reserva creada exitosamente:', response);
      
      // Mostrar mensaje de éxito con respuesta del servidor
      alert(response.message || 'Reserva creada exitosamente');
      
      cerrarModal();
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || 'Error al crear la reservación');
    }
    setLoading(false);
  };

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <form onSubmit={handleSubmit}>
          <div className="modal-content rounded-3">
            <div className="modal-header border-0">
              <h5 className="modal-title">Nueva Reservación</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={cerrarModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Alojamiento</label>
                <select
                  className="form-select"
                  value={accomodation}
                  onChange={e => setAccomodation(e.target.value)}
                  required
                >
                  <option>Apartamento Centro</option>
                  <option>Apartamento Exterior</option>
                  <option>Apartamento Interior</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Huésped</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del huésped"
                  value={guest}
                  onChange={e => setGuest(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">Fecha de inicio</label>
                  <input
                    type="date"
                    className="form-control"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Fecha de fin</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Fecha de fin"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light" onClick={cerrarModal}>Cancelar</button>
              <button type="submit" className="btn btn-dark" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalReservaciones;