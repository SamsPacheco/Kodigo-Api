import React from 'react';

export const AccommodationCard = ({ data }) => {

  return (
    <>
      {
        data.length > 0 ?
          data.map( (acommodation, index) => 
          <article className="card shadow-sm p-3 mb-2 rounded" style={{ backgroundColor: 'var(--background-accommodation)' }} key={index}>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className='fs-md-4'>{acommodation.name}</h5>
                <p className="mb-1 text-muted fs-6 pr-3"><i className="bi bi-geo-alt me-1"></i>{acommodation.address}</p>
                <p className="text-secondary fs-6 pr-3"><i className="bi bi-info-circle me-1"></i>{acommodation.description}</p>
              </div>
              <div className='d-flex gap-2 gap-md-4'>
                <span className="material-symbols-outlined" style={{color: '#0d6efd', fontSize: 25}}>edit</span>
                <span className="material-symbols-outlined" style={{color: '#fd0d0d', fontSize: 25}}>delete</span>
              </div>
            </div>
          </article>
          )

          : <h2 className='text-2xl text-black'>Cargando..</h2>
      }
    </>

  );
};
