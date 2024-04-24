import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { Sidebar } from './components/SideBar';
import { Horary } from './components/Horaries';
import { LogIn } from './components/LogIn';
import { GridUser } from './components/FormUser';
import { FormLaboratory } from './components/FormLaboratories';
import { FormRequestLaboratory } from './components/FormRequestLaboratory';
import { usersApi, apiUrls } from "./components/api/userApi";
import { LabRequestAns } from './components/LabRequestAns';

import logo from '/logofcbiyt.png';

function App() {
  const [role, setRole] = useState('');
  const [admin, setAdmin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [managerial, setManagerial] = useState(false);
  const [roleLoaded, setRoleLoaded] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const tokenDecod = jwtDecode(token);
      const data = {
        email: tokenDecod.sub,
      };
      if (token) {
        usersApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
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

  if (!roleLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <button className='M-button'>-</button>
      </div>
      <img src={logo} alt="Logo FCBIYT" className='Logo-Img' />
      <h1 className='Title'>Gestión de laboratorios FCBIYT</h1>
      <div>
        <div className='sidemenu'>
          <div className='sideBar'>
            <Sidebar role={role}/>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<div className='I-Horary'><Horary /></div>} />
        <Route path="/LogIn" element={<div className='I-LogIn'><LogIn /></div>} />
        <Route path="/Admin" element={admin ? <h1>Hi</h1> : <Navigate to="/LogIn" />} />
        <Route path="/Users" element={admin ? <div className='I-Usr'><GridUser /> </div> : <Navigate to="/LogIn"/>} />
        <Route path="/Laboratories" element={admin ? <div className='I-Usr'> <FormLaboratory /> </div> : <Navigate to="/LogIn"/>} />
        <Route path="/RequestLaboratory" element={teacher ? <div className='I-Usr'> <FormRequestLaboratory /> </div> : <Navigate to="/LogIn"/>} />
        <Route path='/AnswereRequestLab' element={admin ? <div className='I-Usr'> <LabRequestAns/> </div> : <Navigate to="/LogIn"/> } />
      </Routes>
    </>
  );
}

export default App;
