import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lmod.scss";

const Lmod = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Guardar los datos del usuario en localStorage
        localStorage.setItem("id_usuario", data._id);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
        localStorage.setItem("direccion", data.direccion);
        localStorage.setItem("telefono", data.telefono);
        localStorage.setItem("email", data.email);
        localStorage.setItem("Usuario", data.Usuario); // Booleano del modelo
        localStorage.setItem("token", data.token); // Guardar el token en localStorage

        // Obtener el id de la tienda del usuario
        // const tiendaResponse = await fetch(
        //   `${import.meta.env.VITE_BACKEND_URL}/usuario/tienda/${data._id}`
        // );
        // if (tiendaResponse.ok) {
        //   const tiendaData = await tiendaResponse.json();
        //   localStorage.setItem("id_tienda", tiendaData.tienda._id); // Guardar el id de la tienda en localStorage
        // } else {
        //   console.error("No se encontró la tienda para este usuario");
        // }

        // Redirigir al usuario
        navigate("/home");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Credenciales incorrectas");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">QuitoTech</h1>
        <form onSubmit={handleLogin} className="login-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lmod;
