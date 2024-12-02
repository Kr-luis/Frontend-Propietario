// import logoDarkMode from '../assets/dark.png';
// import logoFacebook from '../assets/facebook.png';
// import logoGithub from '../assets/github.png';
// import logoLinkedin from '../assets/linkedin.png';
// import logoGamer from '../assets/gamer.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './paginainicial.scss';
import Opciones from './opciones/opciones';
import Page from './page/Page';

const PaginaInicial = () => {
    // const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     // Verificar si los datos necesarios están en localStorage
    //     const token = localStorage.getItem('token');
    //     const userId = localStorage.getItem('id_usuario');
        
    //     if (!token || !userId) {
    //         // Si no están presentes, redirige al login
    //         navigate("/loginmod");
    //     } else {
    //         setIsAuthenticated(true);  // Si están presentes, se establece como autenticado
    //     }
    // }, [navigate]);

    // if (!isAuthenticated) {
    //     return null; // Si no está autenticado, no se renderiza nada (se redirige al login)
    // }

    return (
        <div className="home">
            <div className="homeContainer">
                <Opciones />
                 <Page/>
                {/* <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div> */}
                {/* <div className="charts"> */}
                    {/* <Featured /> */}
                    {/* <Chart />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Últimos Agregados</div>
                    <List />
                </div> */}
            </div>
        </div>
    );
};

export default PaginaInicial;
