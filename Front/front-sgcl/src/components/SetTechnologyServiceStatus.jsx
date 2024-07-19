import { useState, useEffect } from "react";
import { apiUrls, usersApi, security } from "./api/userApi";


export function SetTechnologyServiceStatus(props) {
    const { techr, onStatusChange } = props;
    const [currentStatus, setCurrentStatus] = useState(techr.requestServiceStatus);
    const [rejection, setRejection] = useState(techr.rejection || "");

    const status_grey = (status) => (status == 0 || status == null) ? 'State-grey-s' : 'State-grey';
    const status_yellow = (status) => status === 1 ? 'State-yellow-s' : 'State-yellow';
    const status_red = (status) => status === 2 ? 'State-red-s' : 'State-red';
    const status_green = (status) => status === 3 ? 'State-green-s' : 'State-green';

    const setStatus = async (status) => {
        try {
            const statusData = {
                idRequestService: techr.idRequestService,
                rejection: rejection,
                requestServiceStatus: status,
            };
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
            const response = await usersApi.post(`${apiUrls.setRequestServiceStatus}`, statusData);
            setCurrentStatus(status);
            onStatusChange(status)
        } catch (error) {
            localStorage.setItem('toastMessage', 'Error al actualizar estatus');
            console.error('Error al asignar estatus:', error);
        }
    };

    return (
        <>
            <div className="AddRequest RequestService">
                <div>
                    <h4>Datos solicitante</h4>
                    <form className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="SName">Nombre: </label><br />
                            <label htmlFor="SEmail">Email: </label><br />
                            <label htmlFor="SArea">Área: </label><br />
                            <label htmlFor="SCargo">Cargo: </label><br />
                        </div>
                        <div className="Row-Space">
                            <input readOnly value={techr.usersIdUsers.userName || ""} type="text" id="SName" /><br />
                            <input readOnly value={techr.usersIdUsers.email || ""} type="email" id="SEmail" /><br />
                            <input readOnly value={techr.applicantArea || ""} type="text" id="SArea" /><br />
                            <input readOnly value={techr.position || ""} type="text" id="SCargo" /><br />
                        </div>
                    </form>
                    <p>Funcionalidad:</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input readOnly type="text" value={techr.basicFunction ? "Básica: " + techr.basicFunction : "Especial: " + techr.specialFunction} />
                    </div>
                    <h4 style={{ marginTop: '30px' }}>Autoriza</h4>
                    <form className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="AName">Nombre: </label><br />
                            <label htmlFor="AEmail">Email: </label><br />
                            <label htmlFor="AArea">Área: </label><br />
                            <label htmlFor="ACargo">Cargo: </label><br />
                        </div>
                        <div className="Row-Space">
                            <input value={techr.authorizedName || ""} readOnly type="text" id="AName" /><br />
                            <input value={techr.authorizedEmail || ""} readOnly type="text" id="AEmail" /><br />
                            <input value={techr.authorizedArea || ""} readOnly type="text" id="AArea" /><br />
                            <input value={techr.authorizedPosition || ""} readOnly type="text" id="ACargo" /><br />
                        </div>
                    </form>
                </div>
                <div>
                    <h4>Usuario final</h4>
                    <form className='RequestFormService' >
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="FName">Nombre: </label><br />
                            <label htmlFor="FEmail">Email: </label> <br />
                            <label htmlFor="FArea">Área: </label><br />
                            <label htmlFor="FCargo">Cargo: </label> <br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <input value={techr.reciverName || ""} readOnly type="text" id="FName" /><br />
                            <input value={techr.reciverEmail || ""} readOnly type="text" id="FEmail" /><br />
                            <input value={techr.reciverArea || ""} readOnly type="text" id="FArea" /><br />
                            <input value={techr.reciverPosition || ""} readOnly type="text" id="FCargo" /><br />
                        </div>
                    </form>
                    <form className='RequestFormService'>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="Observation">Observación: </label><br />

                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <textarea value={techr.observations || ""} readOnly style={{ resize: 'none' }} name="" rows="3" cols="22" id="Observation" /><br />
                        </div>
                    </form>
                    <label htmlFor="">Laboratorio</label>

                    <div className="Row-Space">
                        <input type="text" readOnly value={techr.laboratoriesIdLaboratories.labName} />
                    </div>
                    <label htmlFor="">Razón de rechazo:</label> <br />
                    <textarea
                        name=""
                        defaultValue={rejection}
                        readOnly={currentStatus === 2 || currentStatus === 3}
                        id="reject"
                        cols={35}
                        onChange={(e) => setRejection(e.target.value)}
                    ></textarea>
                    <h4>Asignar estado:</h4>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="Row-Space" style={{ display: "flex", width: '70%', justifyContent: "space-between" }}>
                            <div className={status_grey(currentStatus)} title="Pendiente" onClick={() => setStatus(0)} />
                            <div className={status_yellow(currentStatus)} title="En proceso" onClick={() => setStatus(1)} />
                            <div className={status_red(currentStatus)} title="Rechazada" onClick={() => setStatus(2)} />
                            <div className={status_green(currentStatus)} title="Finalizada" onClick={() => setStatus(3)} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '50px' }}></div>
        </>
    )
}
export default SetTechnologyServiceStatus;