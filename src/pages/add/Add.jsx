import "./add.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const Add = ({ inputs, title }) => {
  const [file, setFile] = useState(null); // Estado para la imagen
  const [formData, setFormData] = useState({}); // Estado para los datos del formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza los datos del formulario
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFormData((prevData) => ({ ...prevData, imagenUrl: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("imagen", file);
    }

    try {
      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/producto/registro`;

      // Obtén el token desde localStorage
      const token = localStorage.getItem("token");

      // Si el token no existe, puedes manejarlo de la forma que prefieras (redirigir, mostrar mensaje de error, etc.)
      if (!token) {
        alert("No estás autenticado. Por favor, inicia sesión.");
        return;
      }

      // Envía la solicitud POST con el token en los encabezados
      const response = await axios.post(backendUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Añade el token en el encabezado Authorization
        },
      });

      alert("Producto registrado exitosamente");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error al registrar el producto");
    }
  };

  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="imagen-producto"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Imagen del Producto:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      name={input.name || input.label.toLowerCase()} // Usa el nombre del campo o label
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={input.type}
                      name={input.name || input.label.toLowerCase()} // Usa el nombre correcto
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Registrar Producto</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
