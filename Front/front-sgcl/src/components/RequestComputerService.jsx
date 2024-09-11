import { useEffect, useState } from "react"
import { RequestServiceStatus } from "./RequestServiceStatus"
import { apiUrls, usersApi, security } from "./api/userApi";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function RequestComputerService() {
    const [userId, setUserId] = useState('');
    const [selectedOptionBasic, setSelectedOptionBasic] = useState();
    const [selectedOptionSpecial, setSelectedOptionSpecial] = useState();
    const [computerRequest, setComputerRequest] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const toastMessage = localStorage.getItem('toastMessage');
            const toastMessageW = localStorage.getItem('toastMessageW');

            console.log(toastMessage)

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
                console.log(response.data);
                setUserId(response.data);
            })
            .catch(error => {
                console.error('Error fetching userid:', error);
            });
    }, [])

    useEffect(() => {
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        if (userId.id != undefined) {
            usersApi.get(`${apiUrls.getComputerRequest}${userId.id}`)
                .then(response => {
                    console.log(response.data);
                    setComputerRequest(response.data);
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
                    observations: "Computo: " + document.getElementById("Observation").value + " Descripcion: " + document.getElementById("Description").value + " No. inventario: " + document.getElementById("NoInv").value + " Modelo: " + document.getElementById("Model").value + " Marca: " + document.getElementById("Brand").value + " Numero de serie: " + document.getElementById("SeriNu").value

                };
                let token = localStorage.getItem('token');
                security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
                const response = await usersApi.post(`${apiUrls.createRequestCompService}`, requestServData);
                localStorage.setItem('toastMessage', 'Solicitud enviada');
                window.location.reload();
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                toast.error("Error al enviar la solicitar")
            }
        }else{
            toast.error("Error al enviar: Funcionalidad requerida")
        }

    };

    //TODO: validacion de los datos de entrada y no crer petticiones vacias

    return (
        <>
            <ToastContainer />
            <h1>Solicitar servicio de cómputo</h1>
            <form className="AddRequest RequestService" onSubmit={handleSubmit}>
                <div>
                    <h4 title="Datos de la persona que realiza la solicitud">
                        Datos solicitante
                    </h4>
                    <div className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="SName"  >Nombre: </label><br />
                            <label htmlFor="SEmail">Email: </label><br />
                            <label htmlFor="SArea">Área: </label><br />
                            <label htmlFor="SCargo">Cargo: </label><br />

                        </div>
                        <div className="Row-Space">
                            <input type="text" id="SName" readOnly value={userId && userId.userName} /><br />
                            <input type="text" id="SEmail" readOnly value={userId && userId.email} /><br />
                            <input type="text" id="SArea" maxLength={30} required /><br />
                            <input type="text" id="SCargo" maxLength={30} required /><br />
                        </div>
                    </div>
                    <p>Funcionalidad:</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Básica:</label>
                            <select value={selectedOptionBasic} name="Basic" id="Basic" style={{ width: "130px" }} onChange={handleChangeBasic}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Instalacion de Equipo">Instalación de equipo</option>
                                <option value="Reubicacion de equipo">Replicación</option>
                                <option value="Mantenimiento preventivo">Mantenimiento preventivo</option>
                            </select>
                        </div>
                        <div style={{ width: "50%" }}>
                            <label htmlFor="">Especial: </label>
                            <select value={selectedOptionSpecial} name="Special" id="Special" style={{ width: "130px" }} onChange={handleChangeSpecial}>
                                <option value="">-Funcionalidad-</option>
                                <option value="Instalar Software">Instalación de software</option>
                                <option value="Mantenimiento correctivo">Mantenimiento correctivo</option>
                                <option value="Oros dispositivos Periféricos">Oros dispositivos Periféricos</option>
                            </select>
                        </div>
                    </div>
                    <h4 style={{ marginTop: '30px' }}>
                        Autoriza
                    </h4>
                    <div className='RequestFormService' action="" style={{ marginBottom: "20px" }}>
                        <div className="Row-Space">
                            <label htmlFor="AName">Nombre: </label><br />
                            <label htmlFor="AEmail">Email: </label><br />
                            <label htmlFor="AArea">Área: </label><br />
                            <label htmlFor="ACargo">Cargo: </label><br />

                        </div>
                        <div className="Row-Space">
                            <input type="text" id="AName" maxLength={50} /><br />
                            <input type="text" id="AEmail" maxLength={50} /><br />
                            <input type="text" id="AArea" maxLength={30} /><br />
                            <input type="text" id="ACargo" maxLength={30} /><br />

                        </div>
                    </div>

                </div>
                <div>
                    <h4>
                        Usuario final
                    </h4>
                    <div className='RequestFormService' action="">
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="FName">Nombre: </label><br />
                            <label htmlFor="FEmail">Email: </label> <br />
                            <label htmlFor="FArea">Área: </label><br />
                            <label htmlFor="FCargo">Cargo: </label> <br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <input type="text" id="FName" maxLength={30} required /><br />
                            <input type="text" id="FEmail" maxLength={30} required /><br />
                            <input type="text" id="FArea" maxLength={50} required /><br />
                            <input type="text" id="FCargo" maxLength={50} required /><br />

                        </div>

                    </div>

                    <div className='RequestFormService' action="">
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <label htmlFor="Observation">Observación: </label><br />
                            <label htmlFor="Description">Descripción: </label> <br />
                            <label htmlFor="NoInv" title='Número de inventario'>No. Inv: </label><br />
                            <label htmlFor="Model">Modelo: </label> <br />
                            <label htmlFor="Brand">Marca: </label><br />
                            <label htmlFor="SeriNu">No. Serie: </label> <br />
                        </div>
                        <div className="Row-Space" style={{ marginBottom: "20px" }}>
                            <input type="text" id="Observation" maxLength={30} required /><br />
                            <input type="text" id="Description" maxLength={20} /><br />
                            <input type="text" id="NoInv" maxLength={20} /><br />
                            <input type="text" id="Model" maxLength={20} /><br />
                            <input type="text" id="Brand" maxLength={20} /><br />
                            <input type="text" id="SeriNu" maxLength={20} /><br />

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

            {computerRequest.map(request => (
                <RequestServiceStatus key={request.idRequestService} reciverName={request.reciverName} observation={request.observations} usersIdUsers={request.usersIdUsers} status={request.requestServiceStatus} />
            ))}
            {computerRequest.length == 0 && (
                <h3 style={{ textAlign: "center" }}>Sin solicitudes realizadas</h3>
            )}
            <div style={{ height: '50px' }}></div>


        </>
    )
}
export default RequestComputerService