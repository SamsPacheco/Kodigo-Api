import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components'; 
import { createAccomodation } from '../services/accomodationsService';
import Swal from 'sweetalert2';


const TextArea = styled.textarea`
  overflowY: auto;
  resize: none;
`

export const ModalAlojamiento = ({ cerrarModalAlojamientos }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const saveData = async (data) => {
    try {  
      await createAccomodation(data.nombre, data.direccion, data.descripcion);
      await Swal.fire({
        icon: "success",
        title: "Alojamiento creado",
        text: "El alojamiento se ha creado correctamente",
        confirmButtonText: "Aceptar",
      });
     console.log(data);
      cerrarModalAlojamientos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el alojamiento",
        confirmButtonText: "Aceptar",
      });
    }
  }

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
              <form onSubmit={handleSubmit(saveData)}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre <span className="text-danger" title="Este campo es obligatorio">*</span></label>
                  <input {...register('nombre', {required : true})} type="text" className="form-control" id="nombre" placeholder="Nombre del alojamiento" />
                  {errors.nombre && <small className="text-danger text-center">El nombre es obligatorio</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección<span className="text-danger" title="Este campo es obligatorio"> *</span></label>
                  <input {...register('direccion', {required : true})} className="form-control" id="direccion" rows="3" placeholder='Dirección del alojamiento'></input>
                  {errors.direccion && <small className="text-danger text-center">La descripción es obligatoria</small>}
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <TextArea {...register('descripcion')} type="text" className="form-control" id="descripcion" placeholder='Descripción del alojamiento' rows={4}></TextArea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-white" onClick={cerrarModalAlojamientos}>Cancelar</button>
                  <input type="submit" className="btn btn-dark" value = "Guardar Cambios"></input>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Fondo oscuro del modal */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
