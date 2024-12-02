import { SetComputerServiceStatus } from "./SetComputerServiceStatus";
import { SetTechnologyServiceStatus } from "./SetTechnologyServiceStatus";
import { usersApi, apiUrls, security } from "./api/userApi";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from 'react-router-dom';


export function RequestServiceComp() {
    const location = useLocation();
    const { labName, idLaboratories } = location.state || { labName: "Sin semestre", idLaboratories: 0 }

    const [responseCompWS, setResponseCompWS] = useState([]);
    const [responseCompWOS, setResponseCompWOS] = useState([]);
    const [responseTechWS, setResponseTechWS] = useState([]);
    const [responseTechWOS, setResponseTechWOS] = useState([]);
    const [bgcolorC, setBgcolorC] = useState('#FFF');
    const [bgcolorT, setBgcolorT] = useState('#D9D9D9');
    const [search, setSearch] = useState("");
    const [computerS, setComputerS] = useState(true);



    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            const tokenDecod = jwtDecode(token);
            const data = {
                email: tokenDecod.sub,
            };
            security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;
            usersApi.get(apiUrls.getComputerServiceWithStatus + idLaboratories)
                .then(response => setResponseCompWS(response.data))
                .catch(e => console.log(`Error al obtener solicitudes de cómputo con estatus`, e));
            usersApi.get(apiUrls.getComputerServiceWithoutStatus + idLaboratories)
                .then(response => setResponseCompWOS(response.data))
                .catch(e => console.log(`Error al obtener solicitudes de cómputo sin estatus`, e));

            usersApi.get(apiUrls.getTechnologyServiceWithStatus+ idLaboratories)
                .then(response => setResponseTechWS(response.data))
                .catch(e => console.log(`Error al obtener solicitudes de tecnología con estatus`, e));
            usersApi.get(apiUrls.getTechnologyServiceWithoutStatus+ idLaboratories)
                .then(response => setResponseTechWOS(response.data))
                .catch(e => console.log(`Error al obtener solicitudes de tecnología sin estatus`, e));
        }
    }, []);

    const handleStatusChangeT = (newStatus) => {
        toast.success("Estado actualizado");
        const toastMessageW = localStorage.getItem('toastMessage');
        if (toastMessageW) {
            toast.error(toastMessageW);
            localStorage.removeItem('toastMessage');
        }
    };

    const handleComputer = () => {
        setComputerS(true);
        setBgcolorC('#FFF');
        setBgcolorT('#D9D9D9');
    };

    const handleTechnology = () => {
        setComputerS(false);
        setBgcolorC('#D9D9D9');
        setBgcolorT('#FFF');
    };

    const filter = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>

            <div className='margin-cell'>
                <button style={{ backgroundColor: `${bgcolorC}`, border: '1px solid black' }} onClick={handleComputer}>Cómputo</button>
                <button style={{ backgroundColor: `${bgcolorT}`, border: '1px solid black' }} onClick={handleTechnology}>Tecnología</button>
            </div>
            <div style={{ marginTop: "2%", paddingBottom: "2%" }} className="AddRequest">
                <input type="Buscar" style={{ width: "100%" }} placeholder="Buscar por nombre o correo de solicitante o usuario final" onChange={filter} />
            </div>

            {computerS &&
                <>
                    <h2>Servicio de cómputo: {labName}</h2>
                    <h3>Pendientes</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredWOS = responseCompWOS.filter((comp) => {
                            if (search === "") return true;
                            return comp.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredWOS.length > 0) {
                            hasResults = true;
                            return filteredWOS.map((comp) => (
                                <SetComputerServiceStatus key={comp.idRequestService} compr={comp} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes pendientes</h3>;
                    })()}

                    <h3>Resueltas</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredWS = responseCompWS.filter((comp) => {
                            if (search === "") return true;
                            return comp.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                   comp.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredWS.length > 0) {
                            hasResults = true;
                            return filteredWS.map((comp) => (
                                <SetComputerServiceStatus key={comp.idRequestService} compr={comp} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes resueltas</h3>;
                    })()}
                </>
            }

            {!computerS &&
                <>
                    <h2>Servicio de tecnología: {labName}</h2>

                    <h3>Pendientes</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredTechWOS = responseTechWOS.filter((tech) => {
                            if (search === "") return true;
                            return tech.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                tech.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                tech.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                tech.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredTechWOS.length > 0) {
                            hasResults = true;
                            return filteredTechWOS.map((tech) => (
                                <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes pendientes</h3>;
                    })()}

                    <h3>Resueltas</h3>
                    {(() => {
                        let hasResults = false;
                        const filteredTechWS = responseTechWS.filter((tech) => {
                            if (search === "") return true;
                            return tech.usersIdUsers.userName.toLowerCase().includes(search.toLowerCase()) ||
                                tech.reciverName.toLowerCase().includes(search.toLowerCase()) ||
                                tech.usersIdUsers.email.toLowerCase().includes(search.toLowerCase()) ||
                                tech.reciverEmail.toLowerCase().includes(search.toLowerCase());
                        });

                        if (filteredTechWS.length > 0) {
                            hasResults = true;
                            return filteredTechWS.map((tech) => (
                                <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech} onStatusChange={handleStatusChangeT} />
                            ));
                        }

                        return !hasResults && <h3 style={{ textAlign: "center" }}>Sin solicitudes resueltas</h3>;
                    })()}
                </>
            }

        </>
    );
} export default RequestServiceComp;