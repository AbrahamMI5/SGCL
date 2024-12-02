import { useState, useEffect } from "react";
import { apiUrls, usersApi, security } from "./api/userApi";


export function SetTechnologyServiceStatus(props) {
    const { techr, onStatusChange } = props;
    const [currentStatus, setCurrentStatus] = useState(techr.requestServiceStatus);
    const [rejection, setRejection] = useState(techr.rejection || "");
    const [authorizers, setAuthorizers] = useState([]);
    const [authorizerName, setAuthorizerName] = useState(techr.authorizedName || "");
    const [authorizerEmail, setAuthorizerEmail] = useState(techr.authorizedEmail || "");
    const [authorizerArea, setAuthorizerArea] = useState(techr.authorizedArea || "");
    const [authorizerPosition, setAuthorizerPosition] = useState(techr.authorizedPosition || "");

    const status_grey = (status) => (status == 0 || status == null) ? 'State-grey-s' : 'State-grey';
    const status_yellow = (status) => status === 1 ? 'State-yellow-s' : 'State-yellow';
    const status_red = (status) => status === 2 ? 'State-red-s' : 'State-red';
    const status_green = (status) => status === 3 ? 'State-green-s' : 'State-green';

    const setStatus = async (status) => {

        try {
            const statusData = {
                idRequestService: techr.idRequestService,
                rejection: status === 2 ? rejection : null,
                requestServiceStatus: status,
                authorizedName: authorizerName,
                authorizedEmail: authorizerEmail,
                authorizedArea: authorizerArea,
                authorizedPosition: authorizerPosition
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

    const actualAuth = (authId) => {
        const auth = authorizers.find((auth) => auth.idAuthorizers === parseInt(authId));
        if (auth) {
            setAuthorizerArea(auth.area);
            setAuthorizerEmail(auth.email);
            setAuthorizerName(auth.name);
            setAuthorizerPosition(auth.position);
        } else {
            console.log("No se encontró el autorizador con id:", authId);
        }
    };


    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllAuthorizers)
            .then(respAuth => {
                setAuthorizers(respAuth.data)
                console.log(respAuth.data)
            })
            .catch(error => {
                console.error('Error fetching authorizers:', error);
            })
    }, []);

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
                    {techr.specialFunction && <>
                        <div style={{ marginTop: '30px' }}>
                            <div>
                                Selecciona quien autoriza:
                            </div>
                            <select onChange={(e) => actualAuth(e.target.value)} disabled={currentStatus === 2 || currentStatus === 3}>
                                <option value="">{authorizerPosition ? authorizerPosition : "Seleccione quien autoriza"}</option>
                                {authorizers.map(auth => (
                                    <option key={auth.idAuthorizers} value={auth.idAuthorizers} >{auth.position}</option>
                                ))}

                            </select>
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
                                <input value={authorizerName} readOnly type="text" id="AName" /><br />
                                <input value={authorizerEmail} readOnly type="text" id="AEmail" /><br />
                                <input value={authorizerArea} readOnly type="text" id="AArea" /><br />
                                <input value={authorizerPosition} readOnly type="text" id="ACargo" /><br />
                            </div>
                        </form>
                    </>}
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
                        style={{ resize: "none" }}
                        onChange={(e) => setRejection(e.target.value)}
                    ></textarea>
                    <h4>Asignar estado:</h4>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {currentStatus === 2 || currentStatus === 3 ?
                            <div className="Row-Space" style={{ display: "flex", width: '70%', justifyContent: "space-between" }}>
                                <div className={status_grey(currentStatus)} style={{ cursor: "default", pointerEvents: "none" }} title="Pendiente" />
                                <div className={status_yellow(currentStatus)} style={{ cursor: "default", pointerEvents: "none" }} title="En proceso" />
                                <div className={status_red(currentStatus)} style={{ cursor: "default", pointerEvents: "none" }} title="Rechazada" />
                                <div className={status_green(currentStatus)} style={{ cursor: "default", pointerEvents: "none" }} title="Finalizada" />
                            </div>
                            :
                            <div className="Row-Space" style={{ display: "flex", width: '70%', justifyContent: "space-between" }}>
                                <div className={status_grey(currentStatus)} title="Pendiente" onClick={() => setStatus(0)} />
                                <div className={status_yellow(currentStatus)} title="En proceso" onClick={() => setStatus(1)} />
                                <div className={status_red(currentStatus)} title="Rechazada" onClick={() => setStatus(2)} />
                                <div className={status_green(currentStatus)} title="Finalizada" onClick={() => setStatus(3)} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ height: '50px' }}></div>
        </>
    )
}
export default SetTechnologyServiceStatus;