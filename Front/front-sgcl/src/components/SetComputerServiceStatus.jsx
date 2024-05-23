import { useState, useEffect } from "react";
import { apiUrls, usersApi } from "./api/userApi";

export function SetComputerServiceStatus(props) {
    const { compr } = props;
    const [currentStatus, setCurrentStatus] = useState(compr.requestServiceStatus);
    const [rejection, setRejection] = useState(compr.rejection || "");

    const status_grey = (status) => status == null ? 'State-grey-s' : 'State-grey';
    const status_yellow = (status) => status === 1 ? 'State-yellow-s' : 'State-yellow';
    const status_red = (status) => status === 2 ? 'State-red-s' : 'State-red';
    const status_green = (status) => status === 3 ? 'State-green-s' : 'State-green';

    const setStatus = async (status) => {
        try {
            const statusData = {
                idRequestService: compr.idRequestService,
                rejection: document.getElementById("reject").value,
                requestServiceStatus: status,
            };
            let token = localStorage.getItem('token');
            if (token) {
                usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await usersApi.post(`${apiUrls.setRequestServiceStatus}`, statusData);
            setCurrentStatus(status);  // Update the local status state
        } catch (error) {
            console.error('Error al asignar status el usuario:', error);
        }
    };

    useEffect(() => {
        console.log(compr);
    }, [compr]);

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
                            <input readOnly value={compr.usersIdUsers.userName || ""} type="text" id="SName" /><br />
                            <input readOnly value={compr.usersIdUsers.email || ""} type="email" id="SEmail" /><br />
                            <input readOnly value={compr.applicantArea || ""} type="text" id="SArea" /><br />
                            <input readOnly value={compr.position || ""} type="text" id="SCargo" /><br />
                        </div>
                    </form>
                    <p>Funcionalidad:</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input readOnly type="text" value={compr.basicFunction ? "Básica: "+compr.basicFunction: "Especial: "+compr.specialFunction} />
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
                            <input value={compr.authorizedName || ""} readOnly type="text" id="AName" /><br />
                            <input value={compr.authorizedEmail || ""} readOnly type="text" id="AEmail" /><br />
                            <input value={compr.authorizedArea || ""} readOnly type="text" id="AArea" /><br />
                            <input value={compr.authorizedPosition || ""} readOnly type="text" id="ACargo" /><br />
                        </div>
                    </form>
                </div>
                <div>
                    <h4>Usuario final</h4>
                    <form className='RequestFormService' action="">
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="FName">Nombre: </label><br />
                            <label htmlFor="FEmail">Email: </label> <br />
                            <label htmlFor="FArea">Área: </label><br />
                            <label htmlFor="FCargo">Cargo: </label> <br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <input value={compr.reciverName || ""} readOnly type="text" id="FName" /><br />
                            <input value={compr.reciverEmail || ""} readOnly type="text" id="FEmail" /><br />
                            <input value={compr.reciverArea || ""} readOnly type="text" id="FArea" /><br />
                            <input value={compr.reciverPosition || ""} readOnly type="text" id="FCargo" /><br />
                        </div>
                    </form>
                    <form className='RequestFormService' action="">
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="Observation">Observación: </label><br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <textarea value={compr.observations || ""} readOnly style={{ resize: 'none' }} name="" rows="3" cols="22" id="Observation" /><br />
                        </div>
                    </form>
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
                            <div className={status_grey(currentStatus)} title="Pendiente" onClick={() => setStatus(null)} />
                            <div className={status_yellow(currentStatus)} title="En proceso" onClick={() => setStatus(1)} />
                            <div className={status_red(currentStatus)} title="Rechazada" onClick={() => setStatus(2)} />
                            <div className={status_green(currentStatus)} title="Finalizada" onClick={() => setStatus(3)} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '50px' }}></div>
        </>
    );
}