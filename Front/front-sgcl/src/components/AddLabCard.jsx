import { usersApi, apiUrls, security } from "./api/userApi";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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

    const deleteLab = async () => {
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

    const alert = (event)=>{
        event.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que lo quieres eliminar?',
            html: '<span style="font-size: 20px;">Al eliminar el laboratorio se eliminarán sus solicitudes, horarios, estadísticas y todos sus datos relacionados.</span>',
            icon: 'warning',
            width: '70%',
            customClass: {
                title: 'custom-title',
                htmlContainer: 'custom-html-container',
                popup: 'custom-popup',
                confirmButton: 'custom-confirm-button',
                denyButton: 'custom-deny-button',
                icon: 'custom-icon'
            },
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("deleted")
                    deleteLab();
                }
        })
    }

    return (
        <form className="addLab" onSubmit={update}>
            <ToastContainer />
            <div className="addLab-Menu">
                Nombre del laboratorio
            </div>
            <div className="addLab-Input">
                <input type="text" defaultValue={labName} id={"labName" + idLaboratories} required maxLength={50}/>
            </div>
            <div className="addLab-Buttons">
                <button className="bt" type="submit">Actualizar</button>
                <button className="bt" onClick={alert}>Eliminar</button>
            </div>
        </form>
    )
}

export default AddLabCard