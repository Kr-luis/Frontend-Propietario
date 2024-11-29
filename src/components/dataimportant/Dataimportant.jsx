import "./dataimportant.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [productosActivos, setProductosActivos] = useState([]);
  const [productosInactivos, setProductosInactivos] = useState([]);

  // Función para listar productos activos
  const listarProductosActivos = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/productos/enstock`;
      const respuesta = await axios.get(url);
      setProductosActivos(
        respuesta.data.map((producto) => ({
          id: producto._id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          estado: producto.Estado ? "Activo" : "Inactivo",
        }))
      );
    } catch (error) {
      console.error("Error al obtener los productos activos:", error);
    }
  };

  // Función para listar productos inactivos
  const listarProductosInactivos = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/productos/inactivos`;
      const respuesta = await axios.get(url);
      setProductosInactivos(
        respuesta.data.map((producto) => ({
          id: producto._id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          estado: producto.Estado ? "Activo" : "Inactivo",
        }))
      );
    } catch (error) {
      console.error("Error al obtener los productos inactivos:", error);
    }
  };

  // Cambiar estado del producto
  const cambiarEstadoProducto = async (idProducto) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/estado/${idProducto}`;
      const respuesta = await axios.put(url);
      Swal.fire("Estado cambiado", respuesta.data.msg, "success");
      listarProductosActivos();
      listarProductosInactivos();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (idProducto) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/${idProducto}`;
      await axios.delete(url);
      Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
      listarProductosActivos();
      listarProductosInactivos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Confirmar eliminación
  const confirmarEliminacion = (idProducto) => {
    Swal.fire({
      title: "¿Desea realmente eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(idProducto);
      }
    });
  };

  useEffect(() => {
    listarProductosActivos();
    listarProductosInactivos();
  }, []);

  // Configuración de columnas
  const columns = [
    { field: "id", headerName: "ID de Producto", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "descripcion", headerName: "Descripción", width: 300 },
    { field: "precio", headerName: "Precio", width: 100 },
    { field: "estado", headerName: "Estado", width: 120 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/producto/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Detalle</div>
          </Link>
          <Link to={`/producto/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="updateButton">Actualizar</div>
          </Link>
          <div
            className="stateButton"
            onClick={() => cambiarEstadoProducto(params.row.id)}
          >
            Cambiar Estado
          </div>
          <div
            className="deleteButton"
            onClick={() => confirmarEliminacion(params.row.id)}
          >
            Eliminar
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Productos Activos
        <Link to="/productos/add" className="link">
          Registrar Nuevo Producto
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={productosActivos}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />

      <div className="datatableTitle" style={{ marginTop: "20px" }}>
        Productos Inactivos
      </div>
      <DataGrid
        className="datagrid"
        rows={productosInactivos}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
