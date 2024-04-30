import { useState, useEffect } from "react";
import { usersApi, apiUrls } from "./api/userApi";


export function RequestLabCard(props) {

    const { startHorary, endHorary, day, idteacher, idLaboratory, requiredsoft, idRequestLab, status } = props;

    const [teachername, setTeacherName] = useState('');
    const [labname, setLabName] = useState('');
    const [statusText, setStatusText] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        console.log(status)
        if (status === true) {
            setStatusText('Solicitud aprobada');
            setColor('green')
        } else if (status === false) {
            setStatusText('Solicitud rechazada');
            setColor('red')

        }
    }, [status]);


    const dia = (day) => {
        if (day == "Lu") {
            return "Lunes"
        } if (day == "Ma") {
            return "Martes"
        } if (day == "Mi") {
            return "Miercoles"
        } if (day == "Ju") {
            return "Juves"
        } if (day == "Vi") {
            return "Viernes"
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        usersApi.get(`${apiUrls.getUserById}${idteacher}`)
            .then(response => {
                console.log(response.data); // Aquí puedes ver la respuesta del servidor
                setTeacherName(response.data.userName); // Asumiendo que la respuesta del servidor contiene el nombre del docente
            })
            .catch(error => {
                console.error('Error fetching teacher name:', error);
            });
        usersApi.get(`${apiUrls.getLab}${idLaboratory}`)
            .then(responselab => {
                console.log(responselab.data); // Aquí puedes ver la respuesta del servidor
                setLabName(responselab.data.labName);
            })
            .catch(error => {
                console.error('Error fetching teacher name:', error);
            });
    }, []);

    const accept = async (event) => {
        event.preventDefault();
        try {
            const updateData = {
                rRejection: document.getElementById("reyection" + idRequestLab).value,
                status: 1
            };
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.put(`${apiUrls.updateRequestLab}${idRequestLab}`, updateData);
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    const reject = async (event) => {
        event.preventDefault();
        try {
            const updateData = {
                rRejection: document.getElementById("reyection" + idRequestLab).value,
                status: 0
            };
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.put(`${apiUrls.updateRequestLab}${idRequestLab}`, updateData);
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <>
            <form className="usrsCard">
                <div>
                    <label htmlFor="Name">Nombre del docente</label>
                    <input readOnly type="text" id="Name" name="name" value={teachername} placeholder="Nombre completo" />
                </div>
                <div>
                    <label htmlFor="Email">Laboratorio</label>
                    <input readOnly type="text" id="Email" name="email" value={labname} placeholder="Correo" />
                </div>
                <div>
                    <label htmlFor="NoEmployee">Horario</label>
                    <input readOnly type="text" id="NoEmployee" value={dia(day) + " " + startHorary + "-" + endHorary} name="employeeNumber" placeholder="Numero de empleado" />
                </div>

                <div style={{ width: '95%' }}>
                    <label htmlFor="software">Software solicitado</label>
                    <textarea readOnly name="software" id="software" cols="15" rows="2" className="RequestLabTextArea" value={requiredsoft}></textarea>
                </div>

                {status === null && (
                    <>
                        <div style={{ width: '63%' }}>
                            <label htmlFor="reyection">Motivo de rechazo (opcional)</label>
                            <textarea name="reyection" id={"reyection" + idRequestLab} cols="15" rows="2" className="RequestLabTextArea"></textarea>
                        </div>
                        <div className="usrs-button">
                            <button type="submit" onClick={accept}>Aceptar</button>
                            <button type="button" onClick={reject}>Rechazar</button>
                        </div>
                    </>
                )}

                {status === true || status === false ? (
                    <div style={{ width: '63%' }}>
                        <label style={{ color: color }}>{statusText}</label>
                    </div>
                ) : null}

            </form>
        </>

    )
}