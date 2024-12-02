import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import notfound from '../../assets/consulting.png';
import './confirmemail.scss';

export const Confirmar = () => {
    const { token } = useParams();

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/propietario/confirmar/${token}`;
            const respuesta = await axios.get(url);
            // Usar SweetAlert2 para mostrar el mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Confirmación exitosa!',
                text: respuesta.data.msg,
                confirmButtonText: 'Iniciar sesión'
            }).then(() => {
                // Redirigir después de hacer clic en el botón de confirmación
                window.location.href = '/loginmod';
            });
        } catch (error) {
            // Usar SweetAlert2 para mostrar el mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.msg || 'Error desconocido',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="confirmar-container">
            <div className="confirmar-card">
                <img className="confirmar-image" src={notfound} alt="Confirmation" />
                <h1 className="confirmar-title">Muchas Gracias</h1>
                <p className="confirmar-text">Tu email ha sido confirmado. Ya puedes iniciar sesión.</p>
                <Link to="/ingresar" className="confirmar-button">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};
