import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { loginUser } from "../services/usersService";

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
		background-color: #012040;
	}
`;

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const response = await loginUser(email, password);
			if (response.token) {
				localStorage.setItem("token", response.token);
				window.location.href = "/dashboard"; // Redirigir al dashboard
			}
		} catch (err) {
			setError(err.message || "Error al iniciar sesión");
		}
	};

	return (
		<section className="d-flex align-items-center justify-content-center vh-100 bg-light">
			<div className="card shadow-lg p-4" style={{ width: "400px" }}>
				<h2 className="text-center mb-4">Iniciar Sesión</h2>
				<form onSubmit={handleLogin}>
					<label htmlFor="email" className="form-label">
						Correo Electrónico
					</label>
					<div className="input-group mb-3">
						<span className="input-group-text opacity-75">
							<i className="bi bi-envelope"></i>
						</span>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Ingrese su correo electrónico"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<label htmlFor="password" className="form-label">
						Contraseña
					</label>
					<div className="input-group mb-3">
						<span className="input-group-text opacity-75">
							<i className="bi bi-lock"></i>
						</span>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Ingrese su contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="alert alert-danger py-2">{error}</div>}
					<BtnLogin type="submit" className="btn btn-primary w-100">
						Iniciar Sesión
					</BtnLogin>
				</form>
			</div>
		</section>
	);
};
