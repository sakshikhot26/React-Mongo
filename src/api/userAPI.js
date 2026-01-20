import axiosInstance from "./axiosInstance";
import axios from "axios";

const BASE_URL = "http://localhost:7006/api/user"


export const registerUser = (data) => {
  return axiosInstance.post("/user/register", data);
};


export const loginUser = (data) =>{
    return axiosInstance.post("/user/login",data)
}


export const getLoggedUser = () => {
  return axiosInstance.get("/user/getUserInfo")
}


export const getDoctorList = () =>{
    return axiosInstance.get("/user/doctorList")
}

export const getAllUsers = () =>{
return axiosInstance.get("/user/users");
}

export const appliedDoctorList=()=>{
  return axiosInstance.get("/doc/docApplyList")
}


export const updateUser = (id, formData) => {
 
return axios.put(`${BASE_URL}/${id}`, formData);

}

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/${id}`)
}
