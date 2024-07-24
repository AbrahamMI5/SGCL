import { useEffect, useState } from "react";
import { usersApi, apiUrls, security } from "./api/userApi";

export function RequestServiceStatus(props) {
    const {reciverName, observation, usersIdUsers, status} = props
    const [userName, setUserName] = useState();
    
    useEffect(()=>{
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;;
        usersApi.get(`${apiUrls.getUserById}${usersIdUsers}`)
            .then(response => {
                setUserName(response.data.userName); // Asumiendo que la respuesta del servidor contiene el nombre del docente
            })
            .catch(error => {
                console.error('Error fetching user name:', error);
            });
    }, [])

    const statuscolor =(status)=>{
        if (status == null){
            return '#D9D9D9';
        }if (status == 1){
            return '#FAFF00';
        }if (status == 2){
            return '#E81F1F';
        }if (status == 3){
            return '#6CE521';
        }else 
        return 'purple'
    }

    const statusTitle=(status)=>{
        if (status == null){
            return 'Pendiente';
        }if (status == 1){
            return 'En proceso';
        }if (status == 2){
            return 'Rechazada';
        }if (status == 3){
            return 'Finalizado';
        }else 
        return 'purple'
    }
    return (
        <>
            <div className="usrsCard">
                <div>
                    <label htmlFor="Name">Solicitado por:</label>
                    <input readOnly value={userName} type="text" id={'Name'} placeholder="Solicitante" />
                </div>
                <div>
                    <label htmlFor="Email">Usuario final</label>
                    <input readOnly value={reciverName} type="text" id={"Email"} placeholder="Usuario final" />

                </div>
                <div>
                    <label htmlFor="">Estado de la solicitud</label>
                    <div className="Status" style={{ backgroundColor: `${statuscolor(status)}`, cursor: 'pointer'}} title={statusTitle(status)} ></div>
                </div>
                <div>
                    <label htmlFor="">Observaciones:</label>
                    <textarea readOnly value={observation} name="" id="" style={{width: '300%'}}></textarea>
                </div>
            </div>
        </>
    )
} 