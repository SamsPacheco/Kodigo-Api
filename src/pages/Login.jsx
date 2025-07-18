import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { loginUser, getUsers } from "../services/usersService";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";

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
	const [isLoading, setisLoading] = useState(false)
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault()
		setisLoading(true);
		setError("");
		try {
			const response = await loginUser(email, password);
			if (response.token) {
				localStorage.setItem("token", response.token);

      const users = await getUsers();
      const usuario = users.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
      if (usuario) {
        localStorage.setItem("user_id", usuario.id);
      } else {
        localStorage.removeItem("user_id");
      }

			navigate('/dashboard')
		}
	} catch (err) {
		setError(err.message || "Error al iniciar sesión");
	}
	setisLoading(false);
};

	return (
		<>
			{

				!isLoading ?

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

					:
					<section className="d-flex justify-content-center align-items-center vh-100">
						<FadeLoader color='#315283'/>
					</section>
			}

		</>
	);
};
