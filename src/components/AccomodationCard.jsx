import React, { useState } from 'react';
import { FadeLoader } from 'react-spinners';

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
                <p className="mb-1 text-muted fs-6 pr-3"><i className="bi bi-geo-alt me-2"></i>{acommodation.address}</p>
                <p className="text-secondary fs-6 pr-3"><i className="bi bi-info-circle me-2"></i>{acommodation.description}</p>
              </div>
              <div className='d-flex gap-2 gap-md-4'>
                <span className="material-symbols-outlined" style={{color: '#0d6efd', fontSize: 25}}>edit</span>
                <span className="material-symbols-outlined" style={{color: '#fd0d0d', fontSize: 25}}>delete</span>
              </div>
            </div>
          </article>
          )

          : <section className=' h-100 w-100 d-flex justify-content-center align-items-center'>
              <FadeLoader color='#315283'/>
            </section>
      }
    </>

  );
};
