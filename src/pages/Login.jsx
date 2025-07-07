import React from "react";
import styled from "styled-components";

const BtnLogin = styled.button`
  width: 100%;
  background-color: #0251a4;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    transition: background-color 0.3s ease;
    background-color: #012040;}
  `;

export const Login = () => {
	return (
		<section className="d-flex align-items-center justify-content-center vh-100 bg-light">
			<div className="card shadow-lg p-4" style={{ width: "400px" }}>
				<h2 className="text-center mb-4">Iniciar Sesión</h2>
				<form>

            <label htmlFor="email" className="form-label">Correo Electrónico</label>
					<div className="input-group mb-3">
						<span className="input-group-text opacity-75">
							<i className="bi bi-envelope"></i>
						</span>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Ingrese su correo electrónico"
						/>
					</div>

 <label htmlFor="password" className="form-label">Contraseña</label>
					<div className="input-group mb-3">
						<span className="input-group-text opacity-75">
							<i className="bi bi-lock"></i>

						</span>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Ingrese su contraseña"
						/>
					</div>
					<BtnLogin type="submit" className="btn btn-primary w-100">
						Iniciar Sesión
					</BtnLogin>
				</form>
			</div>
		</section>
	);
};
