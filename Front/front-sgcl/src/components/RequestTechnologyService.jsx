import { RequestServiceStatus } from "./RequestServiceStatus"
import { apiUrls, usersApi, security } from "./api/userApi";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RequestTechnologyService() {

    const [userId, setUserId] = useState('');
    const [selectedOptionBasic, setSelectedOptionBasic] = useState();
    const [selectedOptionSpecial, setSelectedOptionSpecial] = useState();
    const [laboratories, setLaboratories] = useState([]);
    const [selectedlab, setSelectedlab] = useState();
    const [selectedlabName, setSelectedlabName] = useState();
    const [technologyRequest, setTechnologyRequest] = useState([]);


    useEffect(() => {
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            console.log(toastMessage)
            
            if (toastMessage) {
                toast.success(toastMessage)
                localStorage.removeItem('toastMessage');
            }
            if(toastMessageW){
                toast.warn(toastMessageW)
                localStorage.removeItem('toastMessageW');
            }
        }, 1000);
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
        const tokenDecod = jwtDecode(token);
        const data = {
            email: tokenDecod.sub,
        };
        usersApi.post(apiUrls.getUserByEmail, data)
            .then(response => {
                console.log(response.data);
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
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
        if (userId.id != undefined) {
            console.log(userId.id)
            usersApi.get(`${apiUrls.getTechnologyRequest}${userId.id}`)
                .then(response => {
                    console.log(response.data);
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

    const handleChangeLab =(event) => {
        const value = event.target.value;
        const [selectedLabId, selectedLabName] = value.split(',');
        console.log(selectedLabId)
        console.log(selectedLabName)
        setSelectedlab(selectedLabId);
        setSelectedlabName(selectedLabName);
    }

    const cancel = () => {
        window.location.reload()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const requestServData = {
                applicantArea: document.getElementById("SArea").value,
                position: document.getElementById("SCargo").value,
                reciverName: document.getElementById("FName").value,
                reciverEmail: document.getElementById("FEmail").value,
                reciverArea: document.getElementById("FArea").value,
                reciverPosition: document.getElementById("FCargo").value,
                usersIdUsers: userId.id,
                authorizedName: document.getElementById("AName").value ? document.getElementById("AName").value : null,
                authorizedEmail: document.getElementById("AEmail").value ? document.getElementById("AEmail").value : null,
                authorizedArea: document.getElementById("AArea").value ? document.getElementById("AArea").value : null,
                authorizedPosition: document.getElementById("ACargo").value ? document.getElementById("ACargo").value : null,
                basicFunction: selectedOptionBasic ? selectedOptionBasic : null,
                specialFunction: selectedOptionSpecial ? selectedOptionSpecial : null,
                laboratoriesIdLaboratories: selectedlab,
                labName: selectedlabName,
                observations: "Tecnología: " + document.getElementById("Observation").value + " Laboratorio: " + selectedlabName
            };
            console.log(requestServData)
            let token = localStorage.getItem('token');
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
            const response = await usersApi.post(`${apiUrls.createRequestCompService}`, requestServData);
            localStorage.setItem('toastMessage', 'Solicitud enviada');
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            toast.error("Error al enviar la solicitar")
        }
    };

    return (

        <>
            <ToastContainer/>
            <h1>Solicitar servicio de tecnología</h1>
            <div className="AddRequest RequestService">
                <div>
                    <h4>
                        Datos solicitante
                    </h4>
                    <form className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="SName">Nombre: </label><br />
                            <label htmlFor="SEmail">Email: </label><br />
                            <label htmlFor="SArea">Área: </label><br />
                            <label htmlFor="SCargo">Cargo: </label><br />

                        </div>
                        <div className="Row-Space">
                            <input type="text" id="SName" readOnly value={userId && userId.userName} /><br />
                            <input type="text" id="SEmail" readOnly value={userId && userId.email} /><br />
                            <input type="text" id="SArea" /><br />
                            <input type="text" id="SCargo" /><br />

                        </div>
                    </form>
                    <p>Funcionalidad:</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Básica:</label>
                            <select value={selectedOptionBasic} name="" id="Basic" style={{ width: "130px" }} onChange={handleChangeBasic}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Instalacion de dispositivos">Instalación de dispositivos</option>
                                <option value="Reubicacion de dispositivos">Reubicaron de dispositivos</option>
                                <option value="Adecuacion de dispositivos">Adecuación de dispositivos</option>

                            </select>
                        </div>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Especial: </label>
                            <select value={selectedOptionSpecial} name="" id="Special" style={{ width: "130px" }} onChange={handleChangeSpecial}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Adecuaciones Electricas y electronicas">Adecuaciones Eléctricas y electrónicas</option>
                                <option value="Servicio para equipo de audio y video">Servicio para equipo de audio y video</option>
                                <option value="Instalaciones de Voz y/o Datis">Instalaciones de Voz y/o Datos</option>
                            </select>
                        </div>
                    </div>
                    <h4 style={{ marginTop: '30px' }}>
                        Autoriza
                    </h4>
                    <form className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="AName">Nombre: </label><br />
                            <label htmlFor="AEmail">Email: </label><br />
                            <label htmlFor="AArea">Área: </label><br />
                            <label htmlFor="ACargo">Cargo: </label><br />

                        </div>
                        <div className="Row-Space">
                            <input type="text" id="AName" /><br />
                            <input type="text" id="AEmail" /><br />
                            <input type="text" id="AArea" /><br />
                            <input type="text" id="ACargo" /><br />

                        </div>
                    </form>

                </div>
                <div>
                    <h4>
                        Usuario final
                    </h4>
                    <form className='RequestFormService' action="">
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="FName">Nombre: </label><br />
                            <label htmlFor="FEmail">Email: </label> <br />
                            <label htmlFor="FArea">Área: </label><br />
                            <label htmlFor="FCargo">Cargo: </label> <br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <input type="text" id="FName" /><br />
                            <input type="text" id="FEmail" /><br />
                            <input type="text" id="FArea" /><br />
                            <input type="text" id="FCargo" /><br />

                        </div>

                    </form>

                    <form className='RequestFormService' action="">
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="Observation">Observación: </label><br /><br /><br />
                            <label style={{ marginTop: '4px' }} htmlFor="">Laboratorio: </label> <br />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            <textarea style={{ resize: 'none' }} name="" id="Observation" rows="3" cols="22" ></textarea><br />
                            <select name="" id="" style={{ width: "130px" }} onChange={handleChangeLab}>
                                <option value="">Laboratorio</option>
                                {laboratories.map(laboratory => (
                                    <option key={laboratory.idLaboratories} value={`${laboratory.idLaboratories},${laboratory.labName}`}>{laboratory.labName}</option>
                                ))}
                            </select>

                        </div>
                    </form>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ display: "flex", width: '70%', justifyContent: "space-between" }}>
                            <button className='bt' onClick={handleSubmit}>Solicitar</button>
                            <button className='bt' onClick={cancel}>Cancelar</button>
                        </div>
                    </div>
                </div>


            </div>
            <h1>Solicitudes</h1>
            {technologyRequest.map(request => (
                <RequestServiceStatus key={request.idRequestService} reciverName={request.reciverName} observation={request.observations} usersIdUsers={request.usersIdUsers} status={request.requestServiceStatus}/>
            ))}
            <div style={{ height: '50px' }}></div>

        </>
    )
}
export default RequestTechnologyService