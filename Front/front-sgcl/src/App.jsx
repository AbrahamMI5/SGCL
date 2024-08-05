import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

import { Sidebar } from './components/SideBar';
import { Horary } from './components/Horaries';
import { LogIn } from './components/LogIn';
import { GridUser } from './components/FormUser';
import { FormLaboratory } from './components/FormLaboratories';
import { FormRequestLaboratory } from './components/FormRequestLaboratory';
import { usersApi, apiUrls, security } from "./components/api/userApi";
import { LabRequestAns } from './components/LabRequestAns';
import { Notifications } from './components/Notifications';
import { RequestService } from './components/RequestService';
import { RequestComputerService } from './components/RequestComputerService';
import { RequestTechnologyService } from './components/RequestTechnologyService';
import { SemesterPage } from './components/SemesterPage';

import bars from './components/img/bars.svg';
import logo from '/logofcbiyt.png';

function App() {
  const [role, setRole] = useState('');
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [managerial, setManagerial] = useState(false);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // Hook para obtener la ubicación actual

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const tokenDecod = jwtDecode(token);
      const data = {
        email: tokenDecod.sub,
      };
      security() ? usersApi.defaults.headers.common['Authorization'] = `Bearer ${security()}`: null;
      usersApi.post(`${apiUrls.getRoleByEmail}`, data)
        .then(respRole => {
          setRole(respRole.data);
          setRoleLoaded(true);
          if (respRole.data === 'Admin') {
            setAdmin(true);
          } else if (respRole.data === 'Teacher') {
            setTeacher(true);
          } else if (respRole.data === 'Managerial') {
            setManagerial(true);
          }
        })
        .catch(error => {
          console.error('Error fetching role:', error);
        });
    } else {
      setRoleLoaded(true);
      console.log('Error sin token')
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 900);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Inicializar el estado en función del tamaño inicial de la ventana
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Nuevo efecto para cerrar el sidebar en cada cambio de ruta
  useEffect(() => {
    if(window.innerWidth < 900){
    setIsSidebarOpen(false);
    }
  }, [location]);

  if (!roleLoaded) {
    return <div>Loading...</div>;
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <>
      <div>
        <button className='M-button' onClick={handleToggleSidebar}><img src={bars} alt="Menu" className='M-Img'/></button>
      </div>
      <img src={logo} alt="Logo FCBIYT" className='Logo-Img' />
      <h1 className='Title'>Gestión de laboratorios FCBIYT</h1>
      <div>
        <div className={` ${isSidebarOpen ? 'sidemenu-open' : 'sidemenu-close'}`}>
          <div className='sideBar'>
            <Sidebar role={role}/>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<div className='I-Horary'><Horary /></div>} />
        <Route path="/LogIn" element={role == '' ? <div className='I-LogIn'><LogIn /></div> : <Navigate to="/"/>}/>
        <Route path="/Admin" element={admin ? <h1>Hi</h1> : <Navigate to="/LogIn" />} />
        <Route path="/Users" element={admin ? <div className='I-Usr'><GridUser /> </div> : <Navigate to="/"/>} />
        <Route path="/Laboratories" element={admin ? <div className='I-Usr'> <FormLaboratory /> </div> : <Navigate to="/"/>} />
        <Route path="/RequestLaboratory" element={teacher ? <div className='I-Usr'> <FormRequestLaboratory /> </div> : <Navigate to="/"/>} />
        <Route path='/AnswereRequestLab' element={admin ? <div className='I-Usr'> <LabRequestAns/> </div> : <Navigate to="/"/> } />
        <Route path='/Notifications' element={admin || teacher  ? <div className='I-Usr'> <Notifications/> </div> : <Navigate to="/"/> } />
        <Route path='/TechnologyService' element={teacher  ? <div className='I-Usr'> <RequestTechnologyService/> </div> :  <Navigate to="/"/>}/>
        <Route path='/ComputerService' element={teacher || managerial ? <div className='I-Usr'> <RequestComputerService/> </div> :  <Navigate to="/"/>}/>
        <Route path='/RequestService' element={admin ? <div className='I-Usr'> <RequestService/> </div> : <Navigate to="/"/>} />
        <Route path='/Semester' element={admin ? <div className='I-Usr'> <SemesterPage/> </div> : <Navigate to="/"/>} />

      </Routes>
    </>
  );
}

export default App;

