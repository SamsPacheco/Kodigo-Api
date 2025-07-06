import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components'; 

const TextArea = styled.textarea`
  overflowY: auto;
  resize: none;
`

export const ModalAlojamiento = ({ cerrarModalAlojamientos }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo alojamiento</h5>
              <button type="button" className="btn-close" onClick={cerrarModalAlojamientos}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger" title="Este campo es obligatorio">*</span></label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre del alojamiento" />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección<span className="text-danger" title="Este campo es obligatorio"> *</span></label>
                  <input className="form-control" id="direccion" rows="3" placeholder='Dirección del alojamiento'></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <TextArea type="text" className="form-control" id="descripcion" placeholder='Descripción del alojamiento' rows={4}></TextArea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white" onClick={cerrarModalAlojamientos}>Cancelar</button>
              <button type="button" className="btn btn-dark">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>

      {/* Fondo oscuro del modal */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
