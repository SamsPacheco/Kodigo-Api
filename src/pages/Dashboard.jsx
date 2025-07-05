import React from 'react'
import { AccommodationCard, Sidebar } from '../components';

export const Dashboard = () => {
  return (
    <section className="d-flex" style={{height: '100dvh'}}>
      <Sidebar />
      <main className="p-4 flex-grow-1 position-relative">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Alojamientos</h3>
          <button className="btn btn-dark d-none d-md-block">
            <i className="bi bi-plus me-1"></i> Nuevo Alojamiento
          </button>

          <button className="btn btn-dark d-flex align-items-center rounded-circle position-absolute bottom-0 end-0 m-4 d-md-none">
            <i className="bi bi-plus fs-2 fw-bolder"></i>
          </button>
          
        </div>

        <AccommodationCard />
      </main>
    </section>
  );
}
