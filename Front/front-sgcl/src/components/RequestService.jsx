import { useEffect, useState } from "react";
import { SetComputerServiceStatus } from "./SetComputerServiceStatus";
import { SetTechnologyServiceStatus } from "./SetTechnologyServiceStatus";
import { apiUrls, usersApi, security } from './api/userApi';
import { jwtDecode } from "jwt-decode";

export function RequestService() {

    const [responseCompWS, setResponseCompWS] = useState([]);
    const [responseCompWOS, setResponseCompWOS] = useState([]);
    const [responseTechWS, setResponseTechWS] = useState([]);
    const [responseTechWOS, setResponseTechWOS] = useState([]);
    const [computerS, setComputerS] = useState(true);
    const [bgcolorC, setBgcolorC] = useState('#FFF');
    const [bgcolorT, setBgcolorT] = useState('#D9D9D9');


    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            const tokenDecod = jwtDecode(token);
            const data = {
                email: tokenDecod.sub,
            };
            usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`;
            usersApi.get(apiUrls.getComputerServiceWithStatus)
                .then(response =>
                    setResponseCompWS(response.data)
                ).catch(e => {
                    console.log(`Error al obtener solicitudes de computo con estatus`, e)
                });
            usersApi.get(apiUrls.getComputerServiceWithoutStatus)
                .then(response =>
                    setResponseCompWOS(response.data)
                ).catch(e => {
                    console.log(`Error al obtener solicitudes de computo con estatus`, e)
                });
            console.log(apiUrls.getTechnologyServiceWithStatus)
            usersApi.get(apiUrls.getTechnologyServiceWithStatus)
                .then(response =>
                    setResponseTechWS(response.data)
                ).catch(e => {
                    console.log(`Error al obtener solicitudes de computo con estatus`, e)
                });
            usersApi.get(apiUrls.getTechnologyServiceWithoutStatus)
                .then(response =>
                    setResponseTechWOS(response.data)
                ).catch(e => {
                    console.log(`Error al obtener solicitudes de computo con estatus`, e)
                });

        }
    }, []);

    const handleComputer = () => {
        setComputerS(true)
        setBgcolorC('#FFF')
        setBgcolorT('#D9D9D9')
    }

    const handleTechnology = () => {
        setComputerS(false)
        setBgcolorC('#D9D9D9')
        setBgcolorT('#FFF')
    }

    return (
        <>
            <h1>Solicitudes de servicio</h1>
            <div>
                <button style={{ backgroundColor: `${bgcolorC}`, border: '1px solid black' }} onClick={handleComputer}>Cómputo</button>
                <button style={{ backgroundColor: `${bgcolorT}`, border: '1px solid black' }} onClick={handleTechnology}>Tecnología</button>
            </div>

            {computerS &&
                <>
                    <h2>Servicio de cómputo</h2>
                    <h3>Pendientes</h3>
                    {responseCompWOS.map((comp) => {
                        return (
                            <SetComputerServiceStatus key={comp.idRequestService} compr={comp} />
                        );
                    })}
                    <h3>Resueltas</h3>
                    {responseCompWS.map((comp) => {
                        return (
                            <SetComputerServiceStatus key={comp.idRequestService} compr={comp} />
                        );
                    })}
                </>}
            {!computerS &&
                <>
                    <h2>Servicio de tecnología</h2>
                    <h3>Pendientes</h3>
                    {responseTechWOS.map((tech) => {
                        return (
                            <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech} />
                        );
                    })}
                    <h3>Resueltas</h3>
                    {responseTechWS.map((tech) => {
                        return (
                            <SetTechnologyServiceStatus key={tech.idRequestService} techr={tech}/>
                        );
                    })}
                </>}
        </>
    )
}
export default RequestService;