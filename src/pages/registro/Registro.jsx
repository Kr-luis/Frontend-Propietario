import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './registro.scss';
import Swal from 'sweetalert2';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const Registrar = () => {
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    Numero: '',
    email: '',
    password: '',
    alerta_cantidad: '',
    imagen: null,
    Direccion: '',
    Nombre: '',  // Nuevo campo para nombre de tienda
  });
  const [file, setFile] = useState(null); // Estado para vista previa de la imagen
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    setForm({ ...form, imagen: archivo });
    setFile(archivo); // Para la vista previa
  };

  const handleCheckboxChange = (e) => {
    setTerminosAceptados(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!terminosAceptados) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes aceptar los términos y condiciones.',
      });
      return;
    }
  
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });
  
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/propietario/registro`;
      const respuesta = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: respuesta.data.msg,
      });
  
      // Limpia los campos tras un registro exitoso
      setForm({
        nombre: '',
        apellido: '',
        Numero: '',
        email: '',
        password: '',
        Direccion: '',
        Nombre: '',
        imagen: null,
      });
      setFile(null);
      setTerminosAceptados(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.msg || 'Error desconocido',
      });
    }
  };  
  


  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="register-container">
      {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
      <h1 className="register-title">Bienvenido a QuitoTech</h1>
      <p className="register-subtitle">Completa el formulario para registrarte</p>
      <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
        <div className="left">
          <img
            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt="Vista previa"
          />
          <div className="formInput">
            <label htmlFor="imagen">
              Imagen: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="right">
          <div className="input-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="Numero">Teléfono:</label>
            <input
              type="tel"
              id="Numero"
              name="Numero"
              value={form.Numero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="Direccion">Dirección:</label>
            <input
              type="text"
              id="Direccion"
              name="Direccion"
              value={form.Direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="Nombre">Nombre de la tienda:</label>
            <input
              type="text"
              id="Nombre"
              name="Nombre"
              value={form.Nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="terms">
          <input
            type="checkbox"
            id="terminos"
            checked={terminosAceptados}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="terminos">
            Acepto los{' '}
            <span onClick={handleOpenModal} style={{ cursor: 'pointer', color: '#9b4ddb' }}>
              términos y condiciones
            </span>
          </label>
        </div>
        <button type="submit" className="register-button">
          Registrar
        </button>
      </form>
      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/loginmod">Ingresar</Link>
      </p>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: { backgroundColor: '#1a1a1a', color: '#e0e0e0', borderRadius: '10px' },
        }}
      >
        <DialogTitle style={{ color: '#9b4ddb' }}>Términos y Condiciones</DialogTitle>
        <DialogContent>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>1. Aceptación de los Términos:</strong> Al acceder y utilizar los servicios de QuitoTECH, aceptas estos términos y condiciones en su totalidad.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>2. Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones se publicarán en esta página, y se considera que has aceptado los nuevos términos si continúas utilizando nuestros servicios.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>3. Uso de los Servicios:</strong> Te comprometes a utilizar los servicios de manera responsable y a no realizar actividades que puedan dañar o afectar el funcionamiento de la plataforma.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>4. Propiedad Intelectual:</strong> Todos los derechos de propiedad intelectual relacionados con los servicios de QuitoTECH son propiedad de la empresa. Queda prohibido el uso no autorizado de nuestros contenidos.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>5. Limitación de Responsabilidad:</strong> QuitoTECH no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>6. Ley Aplicable:</strong> Estos términos se rigen por las leyes del país en el que operamos. Cualquier disputa se resolverá en los tribunales correspondientes.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            Al aceptar los términos, confirmas que entiendes y estás de acuerdo con los mismos.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} style={{ color: '#9b4ddb' }}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
