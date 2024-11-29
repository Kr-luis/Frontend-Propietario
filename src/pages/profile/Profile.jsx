import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [usuario, setUsuario] = useState(null); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [editMode, setEditMode] = useState(false); // Modo de edición
  const [formData, setFormData] = useState({}); // Datos del formulario de actualización

  useEffect(() => {
    const userId = localStorage.getItem("id_usuario"); // Obtener el ID del usuario desde localStorage

    const fetchUsuario = async () => {
      try {
        if (!userId) {
          throw new Error("No se encontró el ID del usuario en localStorage.");
        }
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/usuario/perfil`,
          { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } } // Si usas autenticación con tokens
        );
        setUsuario(response.data); // Guardar datos del usuario
        setFormData(response.data); // Inicializar datos del formulario
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("id_usuario");

    try {
      if (!userId) {
        throw new Error("No se encontró el ID del usuario en localStorage.");
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/usuario/${userId}`,
        formData,
        { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
      );
      Swal.fire("Actualización Exitosa", response.data.msg, "success");
      setEditMode(false); // Salir del modo de edición
      setUsuario({ ...usuario, ...formData }); // Actualizar datos en pantalla
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
    }
  };

  if (loading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileContent">
          <h1 className="title">Perfil del Usuario</h1>
          <div className="profileDetails">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="Foto del Usuario"
              className="profileImg"
            />
            {!editMode ? (
              <div className="details">
                <h1 className="name">{usuario.nombre} {usuario.apellido}</h1>
                <p className="info"><strong>Email:</strong> {usuario.email}</p>
                <p className="info"><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p className="info"><strong>Dirección:</strong> {usuario.direccion}</p>
                <p className="info"><strong>País:</strong> {usuario.pais}</p>
                <p className="info"><strong>Rol:</strong> {usuario.role}</p>
                <p className="info"><strong>Estado:</strong> {usuario.estado ? "Activo" : "Inactivo"}</p>
                <button onClick={() => setEditMode(true)} className="editButton">
                  Editar Perfil
                </button>
              </div>
            ) : (
              <div className="editDetails">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                />
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                />
                <button onClick={handleUpdate} className="saveButton">
                  Guardar Cambios
                </button>
                <button onClick={() => setEditMode(false)} className="cancelButton">
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
