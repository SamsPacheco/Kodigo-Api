import React, { useState } from "react";

export const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <section style={{ backgroundColor: "var(--sidebar-bg)" }} className="p-2">
        <i
          className={`${
            isActive ? "bi bi-x-lg fs-2" : "bi bi-list fs-1"
          } d-lg-none`}
          role="button"
          onClick={() => setIsActive(!isActive)}
        ></i>
        <section
          className={`flex-column p-3 ${
            isActive ? "d-block" : "d-none"
          } d-lg-flex`}
          style={{ width: "250px", height: "98dvh" }}
        >
          <h5 className="mb-4">Panel de Control</h5>

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active text-dark bg-light">
                <i className="bi bi-house-door me-2 fs-5"></i>
                Alojamientos
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-dark">
                <i className="bi bi-calendar-event me-2 fs-5"></i>
                Reservaciones
              </a>
            </li>
          </ul>

          <hr />
          <div className="px-4">
            <a
              href="#"
              className="d-flex align-items-center text-dark text-decoration-none"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-in-left me-2 text-secondary fs-4"></i>
              Cerrar Sesión
            </a>
          </div>
        </section>
      </section>
    </>
  );
};
