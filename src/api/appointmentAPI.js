import axiosInstance from "./axiosInstance";

export const saveAppointment = (data) =>
  axiosInstance.post("/appointment/createAppoint", data);

export const showAppointmentlist = () =>
  axiosInstance.get("/appointment/getAppointmentsByUser");

export const updateAppointment = (id, data) =>
  axiosInstance.put(`/appointment/updateAppoint/${id}`, data);

export const deleteAppointment = (id) =>
  axiosInstance.delete(`/appointment/deleteAppoint/${id}`);
