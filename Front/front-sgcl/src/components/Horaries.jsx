import './App.css'
import { usersApi, apiUrls, security } from "./api/userApi";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export function Horary() {
    const [laboratories, setLaboratories] = useState([]);
    const [groups, setGroups] = useState([]);
    const [option, setOption] = useState("Sin datos");
    const [group, setgroup] = useState("Sin datos");
    const [horaries, setHoraries] = useState([]);

    useEffect(() => {
        const toastMessage = localStorage.getItem('toastMessage');
        if (toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem('toastMessage');
        }
        let token = localStorage.getItem('token');
        security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}` : null;;
        usersApi.get(apiUrls.getAllLaboratories)
            .then(respLaboratories => {
                setLaboratories(respLaboratories.data);
                if (respLaboratories.data.length > 0) {
                    const firstLab = respLaboratories.data[0];
                    setOption(firstLab.labName);
                    setgroup(firstLab.idLaboratories);
                    getHoraryByLab(firstLab);
                }
            })
            .catch(error => {
                console.error('Error fetching laboratories:', error);
            });
        usersApi.get(apiUrls.getClassrooms)
            .then(response => {
                setGroups(response.data)
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            })
    }, []);

    const getHoraryByGroup = (group) => {
        setOption(groupName(group))
        setgroup(group)
        usersApi.get(apiUrls.getLabHorarybyGroup + group)
            .then(horaryResp => {
                setHoraries(horaryResp.data)
            })
            .catch(error => {
                console.error('Error fetching hprariesByGroups:', error);
            })
    }

    const getHoraryByLab = (lab) => {
        setOption(lab.labName)
        setgroup(lab.idLaboratories)
        usersApi.get(apiUrls.getLabHorarybyLab + lab.idLaboratories)
            .then(horaryResp => {
                console.log(horaryResp)
                setHoraries(horaryResp.data)
            })
            .catch(error => {
                console.error('Error fetching hprariesByLab:', error);
            })
    }

    const groupName = (group) => {
        if (group != undefined) {
            if (group != undefined && group.length == 2) {
                const splitgroup = group.split("")
                return (splitgroup[0] + ` "` + splitgroup[1].toUpperCase() + `"`)
            }
        }
        return group
    }




    return (
        <>
            <ToastContainer />
            <nav className='Horary-Select'>
                <ul className='H-Menu'>
                    <li tabIndex="0">Laboratorios
                        <ul className='V-Menu'>
                            {laboratories.map(laboratory => (
                                <li key={laboratory.labName} onClick={() => getHoraryByLab(laboratory)}>{laboratory.labName}</li>
                            ))}
                        </ul>
                    </li>
                    <li tabIndex="0">Grupos
                        <ul className='V-Menu'>
                            {groups.map(group => (
                                <li key={group} onClick={() => getHoraryByGroup(group)}>{groupName(group)}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className='H-Title'>{option}</div>
            <div className='Horaries'>
                <div style={{ backgroundColor: 'white' }}></div>
                <div className='Horary-Titles'>Lunes</div>
                <div className='Horary-Titles'>Martes</div>
                <div className='Horary-Titles'>Miércoles</div>
                <div className='Horary-Titles'>Jueves</div>
                <div className='Horary-Titles'>Viernes</div>
                <div className='Horary-Titles'>12:00 - 2:00</div>
                <div className='Horary-dates'><b>{horaries[0] ? groupName(horaries[0].header) : ''}</b> <br /> {horaries[0] && horaries[0].subject ? horaries[0].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[4] ? groupName(horaries[4].header) : ''}</b> <br /> {horaries[4] && horaries[4].subject ? horaries[4].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[8] ? groupName(horaries[8].header) : ''}</b> <br /> {horaries[8] && horaries[8].subject ? horaries[8].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[12] ? groupName(horaries[12].header) : ''}</b> <br /> {horaries[12] && horaries[12].subject ? horaries[12].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[16] ? groupName(horaries[16].header) : ''}</b> <br /> {horaries[16] && horaries[16].subject ? horaries[16].subject : ''}</div>
                <div className='Horary-Titles'>2:00 - 4:00</div>
                <div className='Horary-dates'><b>{horaries[1] ? groupName(horaries[1].header) : ''} </b> <br /> {horaries[1] && horaries[1].subject ? horaries[1].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[5] ? groupName(horaries[5].header) : ''} </b> <br /> {horaries[5] && horaries[5].subject ? horaries[5].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[9] ? groupName(horaries[9].header) : ''} </b> <br /> {horaries[9] && horaries[9].subject ? horaries[9].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[13] ? groupName(horaries[13].header) : ''} </b> <br /> {horaries[13] && horaries[13].subject ? horaries[13].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[17] ? groupName(horaries[17].header) : ''} </b> <br /> {horaries[17] && horaries[17].subject ? horaries[17].subject : ''}</div>
                <div className='Horary-Titles'>4:00 - 6:00</div>
                <div className='Horary-dates'><b>{horaries[2] ? groupName(horaries[2].header) : ''} </b> <br /> {horaries[2] && horaries[2].subject ? horaries[2].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[6] ? groupName(horaries[6].header) : ''} </b> <br /> {horaries[6] && horaries[6].subject ? horaries[6].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[10] ? groupName(horaries[10].header) : ''} </b> <br /> {horaries[10] && horaries[10].subject ? horaries[10].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[14] ? groupName(horaries[14].header) : ''} </b> <br /> {horaries[14] && horaries[14].subject ? horaries[14].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[18] ? groupName(horaries[18].header) : ''} </b> <br /> {horaries[18] && horaries[18].subject ? horaries[18].subject : ''}</div>
                <div className='Horary-Titles'>6:00 - 8:00</div>
                <div className='Horary-dates'><b>{horaries[3] ? groupName(horaries[3].header) : ''} </b> <br /> {horaries[3] && horaries[3].subject ? horaries[3].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[7] ? groupName(horaries[7].header) : ''} </b> <br /> {horaries[7] && horaries[7].subject ? horaries[7].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[11] ? groupName(horaries[11].header) : ''} </b> <br /> {horaries[11] && horaries[11].subject ? horaries[11].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[15] ? groupName(horaries[15].header) : ''} </b> <br /> {horaries[15] && horaries[15].subject ? horaries[15].subject : ''}</div>
                <div className='Horary-dates'><b>{horaries[19] ? groupName(horaries[19].header) : ''} </b> <br /> {horaries[19] && horaries[19].subject ? horaries[19].subject : ''}</div>
            </div>


        </>


    )
}