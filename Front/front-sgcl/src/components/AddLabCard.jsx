import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddLabCard(props) {

    const { labName, idLaboratories } = props;

    const update = async (event) => {
        event.preventDefault();
        try {

            const labData = {
                labName: document.getElementById("labName" + idLaboratories).value,
            };
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;
            const response = await usersApi.put(`${apiUrls.updateLab}${idLaboratories}`, labData);
            localStorage.setItem('toastMessage', 'Actualizado correctamente');
            console.log("Actualizar lab")
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar la consola:', error);
        }
    };

    const deleteLab = async (event) => {
        event.preventDefault();
        try {
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const response = await usersApi.put(`${apiUrls.deleteLab}${idLaboratories}`);
            localStorage.setItem('toastMessageW', 'Laboratorio eliminado');
            console.log("Eliminar lab")
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div className="addLab">
            <ToastContainer />
            <div className="addLab-Menu">
                Nombre del laboratorio
            </div>
            <div className="addLab-Input">
                <input type="text" defaultValue={labName} id={"labName" + idLaboratories} />
            </div>
            <div className="addLab-Buttons">
                <button className="bt" onClick={update}>Actualizar</button>
                <button className="bt" onClick={deleteLab}>Eliminar</button>
            </div>
        </div>
    )
}

export default AddLabCard