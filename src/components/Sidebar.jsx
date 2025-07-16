import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate()
	const location = useLocation();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/')
	};

	return (
		<>
			<section style={{ backgroundColor: "var(--sidebar-bg)" }} className="px-1 py-2">
				<i
					className={`bi bi-list fs-1 ${isActive && 'd-none'} d-md-none`}
					role="button"
					onClick={() => (isActive ? setIsActive(false) : setIsActive(true))}
				></i>
				<section
					className={`sidebar-overlay flex-column p-3 ${isActive ? "d-block" : "d-none"} d-lg-flex`}
				>
					<i className={`bi bi-x-lg fs-2 ${ !isActive && 'd-none' }`} role="button" onClick={() => (isActive ? setIsActive(false) : setIsActive(true))}></i>
					<div>

						<h4 className="mb-3 fw-semibold">Panel de Control</h4>

						<ul className="nav nav-pills flex-column mb-auto">
							<Link
                                to='/dashboard'
                                className={`nav-item nav-link ${location.pathname === '/dashboard' ? 'active text-white bg-secondary' : 'text-black'}`}>
                                <i className="bi bi-house-door me-1 fs-5"></i>
                                Alojamientos
                            </Link>
							<Link 
                                to='/bookings'
                                className={`nav-link text-dark ${ location.pathname === '/bookings' ? 'active text-white bg-secondary' : 'text-black'}`}>
                                <i className="bi bi-calendar-event me-1 fs-5"></i>
                                Reservaciones
                            </Link>
						</ul>

					</div>

					<div className="px-4 position-absolute bottom-0">
						<i className="bi bi-box-arrow-in-left me-2 text-secondary fs-4" role="button" onClick={handleLogout}></i>
						Cerrar Sesión
					</div>
				</section>
			</section>
		</>
	);
};
