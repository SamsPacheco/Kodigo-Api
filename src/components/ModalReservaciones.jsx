import React, { useState, useEffect } from 'react'
import { createBooking } from '../services/bookingsService'
import { getUsers } from "../services/usersService";
import Swal from 'sweetalert2';
 

const ModalReservaciones = ({ cerrarModal, onReservaCreada }) => {
  const [accomodation, setAccomodation] = useState('Hotel Villa del Sol El salvador');
  const [guest, setGuest] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //obtener el nombre del usuario logueado
  useEffect(() => {
    const fetchUserName = async () => {
      const user_id = Number(localStorage.getItem("user_id")) || 1;
      try {
        const users = await getUsers();
        const usuario = users.find(u => u.id === user_id);
        if (usuario) {
          setGuest(usuario.name);
        }
      } catch (err) {
        setGuest("");
      }
    };
    fetchUserName();
  }, []);

  const accomodationMap = {
    'Hotel Villa del Sol El salvador': 1,
    'Hotel Sevilla': 2,
    'Villas Playa El Espino': 3,
    'Eco Glamping El Pinar': 4,
    'Hotel Fuertes Oscuras': 5,
    'Decameron Salinitas': 6
  };
  //datos a enviar 

  const user_id = Number(localStorage.getItem("user_id")) || 1;
  const total_amount = 500; 
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
      
      const response = await createBooking(bookingData);
      
      Swal.fire({
        icon: 'success',
        title: '¡Reserva creada exitosamente!',
        text: response.message || 'La reservación fue registrada correctamente.'
      });
      
      if (onReservaCreada) await onReservaCreada();
      cerrarModal();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la reservación',
        text: err.message || 'Ocurrió un error inesperado.'
      });
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
                  <option>Hotel Villa del Sol El salvador</option>
                  <option>Hotel Sevilla</option>
                  <option>Villas Playa El Espino</option>
                  <option>Eco Glamping El Pinar</option>
                  <option>Hotel Fuertes Oscuras</option>
                  <option>Decameron Salinitas</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Huésped</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del huésped"
                  value={guest}
                  disabled
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