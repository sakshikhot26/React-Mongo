import axiosInstance from "./axiosInstance";


export const loginUser = (data) =>{
    return axiosInstance.post("/user/login",data)
}

export const getDoctorList = () =>{
    return axiosInstance.get("/user/doctorList")
}

export const appliedDoctorList=()=>{
  return axiosInstance.get("/doc/docApplyList")
}



export const getApprovedDoctorList = () => {
  return axiosInstance.get("/doc/approvedDoctorList");
};


export const getDoctorInfo=()=>{
    return axiosInstance.get("/doc/getDoctorInfo");
};