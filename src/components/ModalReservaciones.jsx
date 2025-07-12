import React from 'react'

const ModalReservaciones = () => {
  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content rounded-3">
          <div className="modal-header border-0">
            <h5 className="modal-title">Nueva Reservación</h5>
            <button type="button" className="btn-close" aria-label="Close" ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Alojamiento</label>
              <select className="form-select">
                <option>Apartamento Centro</option>
                <option>Apartamento Exterior</option>
                <option>Apartamento Interior</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Huésped</label>
              <input type="text" className="form-control" placeholder="Nombre del huésped" />
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Fecha de inicio</label>
                <input
                  type="date"
                  className="form-control"

                  
                />
              </div>
              <div className="col">
                <label className="form-label">Fecha de fin</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Fecha de fin"
                  min={new Date().toISOString().split('T')[0]} //evita seleccionar una fecha pasada
                />
              </div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-light">Cancelar</button>
            <button type="button" className="btn btn-dark">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReservaciones;