import axios from "axios";

export const usersApi= axios.create();

const apiUrl = 'http://localhost:8080';

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
  getLab :`${apiUrl}/laboratory/getLaboratory`,
  login: `${apiUrl}/user/logIn`,
  getRoleByEmail: `${apiUrl}/user/getRoleByEmail`,
  getUserByEmail: `${apiUrl}/user/getUserByEmail`,
  creageRequestLaboratory: `${apiUrl}/requestLaboratory/createRequestLaboratory`,
  getAllRequestLab: `${apiUrl}/requestLaboratory/getAllRequestLaboratory`,
  updateRequestLab: `${apiUrl}/requestLaboratory/updateRequestLab`,
  getRequestLabById: `${apiUrl}/requestLaboratory/getRequestLabByID`,
  getRequestLab: `${apiUrl}/requestLaboratory/getRequest`,
  getNotificationByUsrId: `${apiUrl}/notification/getNotificationByIdUser`,
  deleteNotification: `${apiUrl}/notification/deleteNotificationById`,

};