import { RequestServiceStatus } from "./RequestServiceStatus"
import { apiUrls, usersApi, security } from "./api/userApi";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import question from './img/question.svg'
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

export function RequestTechnologyService() {

    const [userId, setUserId] = useState('');
    const [selectedOptionBasic, setSelectedOptionBasic] = useState();
    const [selectedOptionSpecial, setSelectedOptionSpecial] = useState();
    const [laboratories, setLaboratories] = useState([]);
    const [selectedlab, setSelectedlab] = useState();
    const [selectedlabName, setSelectedlabName] = useState();
    const [technologyRequest, setTechnologyRequest] = useState([]);
    const [finalUser, setFinalUser] = useState(false);



    useEffect(() => {
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
            }
            if (toastMessageW) {
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
            }
        }, 1000);
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        const tokenDecod = jwtDecode(token);
        const data = {
            email: tokenDecod.sub,
        };
        usersApi.post(apiUrls.getUserByEmail, data)
            .then(response => {
                setUserId(response.data);
            })
            .catch(error => {
                console.error('Error fetching userid:', error);
            });

        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLaboratories => {
                setLaboratories(respLaboratories.data);
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });
    }, [])

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        if (userId.id != undefined) {
            usersApi.get(`${apiUrls.getTechnologyRequest}${userId.id}`)
                .then(response => {
                    setTechnologyRequest(response.data);
                })
                .catch(error => {
                    console.error('Error fetching computer request:', error);
                });
        }

    }, [userId])

    const handleChangeBasic = (event) => {
        setSelectedOptionBasic(event.target.value);
        setSelectedOptionSpecial(null);
        setSelectedOptionSpecial("")
    };
    const handleChangeSpecial = (event) => {
        setSelectedOptionSpecial(event.target.value);
        setSelectedOptionBasic(null);
        setSelectedOptionBasic("")

    };

    const handleChangeLab = (event) => {
        const value = event.target.value;
        const [selectedLabId, selectedLabName] = value.split(',');
        setSelectedlab(selectedLabId);
        setSelectedlabName(selectedLabName);
    }

    const cancel = () => {
        window.location.reload()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedOptionBasic || selectedOptionSpecial) {
            try {
                const requestServData = {
                    applicantArea: document.getElementById("SArea").value,
                    position: document.getElementById("SCargo").value,
                    reciverName: finalUser ? document.getElementById("FName").value : userId && userId.userName,
                    reciverEmail: finalUser ? document.getElementById("FEmail").value : userId && userId.email,
                    reciverArea: finalUser ? document.getElementById("FArea").value : document.getElementById("SArea").value,
                    reciverPosition: finalUser ? document.getElementById("FCargo").value : document.getElementById("SCargo").value,
                    usersIdUsers: userId.id,
                    basicFunction: selectedOptionBasic ? selectedOptionBasic : null,
                    specialFunction: selectedOptionSpecial ? selectedOptionSpecial : null,
                    laboratoriesIdLaboratories: selectedlab,
                    labName: selectedlabName,
                    observations: 
                        (document.getElementById("Observation").value ? "TECNOLOGÍA: " + document.getElementById("Observation").value : "")
                };
                let token = localStorage.getItem('token');
                security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
                const response = await usersApi.post(`${apiUrls.createRequestCompService}`, requestServData);
                localStorage.setItem('toastMessage', 'Solicitud enviada');
                window.location.reload();
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                toast.error("Error al enviar la solicitar")
            }
        }else{
            toast.error("Error al enviar: Funcionalidad requerida")
        }


    };

    return (

        <>
            <Tooltip id="my-tooltip" type="dark" delayShow={200} border={true} place="bottom"/>
            <ToastContainer />
            <h1 className='margin-cell'>Solicitar servicio de tecnología <img className="info" src={question} data-tooltip-id="my-tooltip" data-tooltip-content="Solicitar servicios de mantenimiento y adecuaciones a los laboratorios"/></h1>
            <form className="AddRequest RequestService" onSubmit={handleSubmit}>
                <div>
                    <h4>
                        Datos solicitante
                    </h4>
                    <div className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="SName">Nombre: </label><br />
                            <label htmlFor="SEmail">Email: </label><br />
                            <label htmlFor="SArea">Área: </label><br />
                            <label htmlFor="SCargo">Cargo: </label><br />

                        </div>
                        <div className="Row-Space">
                            <input type="text" id="SName" readOnly value={userId && userId.userName} /><br />
                            <input type="email" id="SEmail" aria-describedby="emailHelp" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" readOnly value={userId && userId.email} /><br />
                            <input type="text" id="SArea" maxLength={30} required /><br />
                            <input type="text" id="SCargo" maxLength={30} required /><br />

                        </div>
                    </div>
                    <div style={{marginBottom: "20px"}}>
                        <label htmlFor="checkbx" style={{ marginRight: "20px" }}>¿El servicio es para alguien más?</label>
                        <input type="checkbox" id="checkbx" onChange={() => { setFinalUser(!finalUser) }} />
                        <div style={{ display: finalUser ? "inline" : "none" }}>
                            <h4>
                                Usuario final <img className="info-sm" src={question} data-tooltip-id="my-tooltip" data-tooltip-content="Datos del usuario que recibirá el servicio" />
                            </h4>
                            <div className='RequestFormService' action="">
                                <div className="Row-Space" style={{ marginBottom: "20px" }}>
                                    <label htmlFor="FName" >Nombre: </label><br />
                                    <label htmlFor="FEmail">Email: </label> <br />
                                    <label htmlFor="FArea">Área: </label><br />
                                    <label htmlFor="FCargo">Cargo: </label> <br />
                                </div>
                                <div className="Row-Space" style={{ marginBottom: "20px" }}>
                                    <input type="text" id="FName" maxLength={30}  disabled={!finalUser} required={!!finalUser}/><br />
                                    <input type="email" id="FEmail" pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}" aria-describedby="emailHelp" maxLength={30} disabled={!finalUser} required={!!finalUser} /><br />
                                    <input type="text" id="FArea" maxLength={50} disabled={!finalUser} required={!!finalUser} /><br />
                                    <input type="text" id="FCargo" maxLength={50} disabled={!finalUser} required={!!finalUser} /><br />

                                </div>

                            </div>
                        </div>
                    </div>
                    <p>Funcionalidad:</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Básica: <img className="info-sm" src={question} data-tooltip-id="my-tooltip" data-tooltip-content="Esta funcionalidad NO requiere de aprobación por parte de un directivo"/></label>
                            <select value={selectedOptionBasic} name="" id="Basic" style={{ width: "130px" }} onChange={handleChangeBasic}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Instalacion de dispositivos">Instalación de dispositivos</option>
                                <option value="Reubicacion de dispositivos">Reubicaron de dispositivos</option>
                                <option value="Adecuacion de dispositivos">Adecuación de dispositivos</option>

                            </select>
                        </div>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Especial: <img className="info-sm" src={question} data-tooltip-id="my-tooltip" data-tooltip-content="Esta funcionalidad REQUIERE de aprobación por parte de un directivo, esta aprobación la solicitara el administrador de los laboratorios"/></label>
                            <select value={selectedOptionSpecial} name="" id="Special" style={{ width: "130px" }} onChange={handleChangeSpecial}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Adecuaciones Electricas y electronicas">Adecuaciones Eléctricas y electrónicas</option>
                                <option value="Servicio para equipo de audio y video">Servicio para equipo de audio y video</option>
                                <option value="Instalaciones de Voz y/o Datis">Instalaciones de Voz y/o Datos</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='RequestFormService' action="">
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="Observation">Observación: </label><br /><br /><br />
                            <label style={{ marginTop: '4px' }} htmlFor="">Laboratorio: </label> <br />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <textarea type="text" style={{ resize: 'none' }} name="" id="Observation" rows="3" cols="22" maxLength={30} required></textarea><br />
                            <select name="" id="" style={{ width: "130px" }} onChange={handleChangeLab} required>
                                <option value="">Laboratorio</option>
                                {laboratories.map(laboratory => (
                                    <option key={laboratory.idLaboratories} value={`${laboratory.idLaboratories},${laboratory.labName}`}>{laboratory.labName}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex", width: '70%', justifyContent: "space-between" }}>
                            <button className='bt' type="submit">Solicitar</button>
                            <button className='bt' onClick={cancel}>Cancelar</button>
                        </div>
                    </div>
                </div>


            </form>
            <h1>Solicitudes</h1>
            {technologyRequest.map(request => (
                <RequestServiceStatus key={request.idRequestService} reciverName={request.reciverName} observation={request.observations} usersIdUsers={request.usersIdUsers} status={request.requestServiceStatus} rejection={request.rejection} />
            ))}
            {technologyRequest.length == 0 && (
                <h3 style={{ textAlign: "center" }}>Sin solicitudes realizadas</h3>
            )}
            <div style={{ height: '50px' }}></div>

        </>
    )
}
export default RequestTechnologyService