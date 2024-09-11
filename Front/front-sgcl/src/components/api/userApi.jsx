import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export const usersApi = axios.create();

const apiUrl = 'http://localhost:8080';

export const security = () => {
  let token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return token;
      } else {
        localStorage.clear()
        window.location.reload()
        return null
      }
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const apiUrls = {
  getAllLaboratories: `${apiUrl}/laboratory/getAllLaboratories`,
  getAllUser: `${apiUrl}/user/getAllUser`,
  getUserById: `${apiUrl}/user/getUser`,
  updateUser: `${apiUrl}/user/updateUser`,
  deleteUser: `${apiUrl}/user/deleteUser`,
  createUser: `${apiUrl}/user/createUser`,
  createLab: `${apiUrl}/laboratory/createLaboratory`,
  deleteLab: `${apiUrl}/laboratory/deleteLaboratory`,
  updateLab: `${apiUrl}/laboratory/updateLaboratory`,
  getLab: `${apiUrl}/laboratory/getLaboratory`,
  login: `${apiUrl}/user/logIn`,
  getRoleByEmail: `${apiUrl}/user/getRoleByEmail`,
  getUserByEmail: `${apiUrl}/user/getUserByEmail`,
  creageRequestLaboratory: `${apiUrl}/requestLaboratory/createRequestLaboratory`,
  getAllRequestLab: `${apiUrl}/requestLaboratory/getAllRequestLaboratory`,
  updateRequestLab: `${apiUrl}/requestLaboratory/updateRequestLab`,
  getRequestLabById: `${apiUrl}/requestLaboratory/getRequestLabByID`,
  getRequestLab: `${apiUrl}/requestLaboratory/getRequest`,
  getRequestLabAnswered: `${apiUrl}/requestLaboratory/getRequestAnswered`,
  getRequestLabInProcess: `${apiUrl}/requestLaboratory/getRequestInProcess`,
  getNotificationByUsrId: `${apiUrl}/notification/getNotificationByIdUser`,
  deleteNotification: `${apiUrl}/notification/deleteNotificationById`,
  createRequestCompService: `${apiUrl}/requestService/createRequestServ`,
  getComputerRequest: `${apiUrl}/requestService/getComputerService`,
  getTechnologyRequest: `${apiUrl}/requestService/getTechnologyService`,
  getTechnologyServiceWithoutStatus: `${apiUrl}/requestService/getTechnologyWithoutStatus`,
  getTechnologyServiceWithStatus: `${apiUrl}/requestService/getTechnologyWithStatus`,
  getComputerServiceWithoutStatus: `${apiUrl}/requestService/getComputerWithoutStatus`,
  getComputerServiceWithStatus: `${apiUrl}/requestService/getComputerWithStatus`,
  setRequestServiceStatus: `${apiUrl}/requestService/setStatus`,
  getClassrooms: `${apiUrl}/labHorary/getClassrooms`,
  getLabHorarybyGroup: `${apiUrl}/labHorary/getByGroup`,
  getLabHorarybyLab: `${apiUrl}/labHorary/getByLab`,
  createSemester: `${apiUrl}/semester/create`,
  getAllSemester: `${apiUrl}/semester/getAll`,
  deleteSemester: `${apiUrl}/semester/delete`,
  updateSemester: `${apiUrl}/semester/update`,
  activeSemester: `${apiUrl}/semester/setActive`,
  getDocument: `${apiUrl}/document/getDocuments`,
  setAnualDoc: `${apiUrl}/document/createAnual`,
  setSemesterDoc: `${apiUrl}/document/createSemester`,
  getStadistics: `${apiUrl}/requestLaboratory/stadistics`
};