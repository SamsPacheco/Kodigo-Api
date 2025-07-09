import React from 'react';

export const AccommodationCard = ({onClick}) => {
  return (
    <div className="card shadow-sm p-2 mb-3 rounded" style={{ backgroundColor: 'var(--background-accommodation)' }} onClick={onClick}> 
      <div className="d-flex justify-content-between">
        <div>
          <h5>Casa de Playa</h5>
          <p className="mb-1 text-muted"><i className="bi bi-geo-alt me-1"></i>Av. Costa 123</p>
          <p className="text-secondary"><i className="bi bi-info-circle me-1"></i> Hermosa casa frente al mar</p>
        </div>
        <div>
          <i className="bi bi-pencil text-primary me-3 fs-5" role='button'></i>
          <i className="bi bi-trash-fill text-danger fs-5" role='button'></i>
        </div>
      </div>
    </div>
  );
};
