import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import notfound from '../../assets/consulting.png';
import './confirmtienda.scss';

export const Confirmartienda = () => {
    const { tokentienda } = useParams();

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmartienda/${tokentienda}`;
            const respuesta = await axios.get(url);
            // Mostrar SweetAlert2 para éxito
            Swal.fire({
                icon: 'success',
                title: '¡Tienda Verificada!',
                text: respuesta.data.msg,
                confirmButtonText: 'Registrar Productos',
            }).then(() => {
                // Redirigir después de hacer clic en el botón de confirmación
                window.location.href = '/loginmod';
            });
        } catch (error) {
            // Mostrar SweetAlert2 para error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.msg || 'Error desconocido',
                confirmButtonText: 'Intentar de nuevo',
            });
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="confirmar-tienda-container">
            <div className="confirmar-tienda-card">
                <img className="confirmar-tienda-image" src={notfound} alt="Tienda Verificada" />
                <h1 className="confirmar-tienda-title">Tu tienda ya se encuentra verificada</h1>
                <p className="confirmar-tienda-text">Ahora puedes registrar tus productos</p>
                <Link to="/loginmod" className="confirmar-tienda-button">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );
};
