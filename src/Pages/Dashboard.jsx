// import React, { useEffect, useState } from 'react'
// import { FaSignOutAlt, FaTasks, FaUsers, FaPlus , FaUserMd, FaCalendarAlt } from "react-icons/fa";
// import { Link, replace, useNavigate } from "react-router-dom";
// import { getLoggedUser } from '../api/userAPI';


// // import pages (example)
// import Appointments from '../components/Appointments'
// import CreateAppointment from '../Components/CreateAssignment';
// import UsersList from '../Components/UseList';
// import DoctorsList from '../Components/DoctorsList';
// import Profile from '../Components/Profile';
// import ApplyDoctor from '../Components/ApplyDoctor';


// const DashboardNavbar = () => {
//   const [user,setUser] = useState()
//   const navigate = useNavigate()

//  const [activePage, setActivePage] = useState("dashboard");


//   function handleLogout(){
//     localStorage.removeItem('token6163')
//     navigate('/',replace)
//   }

// async function fetchUser(){
//   const res = await getLoggedUser()
//   if(res.data.success){
//     setUser(res.data.user)
//   }
// }
//   useEffect(()=>{
//     fetchUser()
//   },[])

// /* ======================
//      ROLE BASED CONTENT
//   =======================*/
//   const renderContent = () => {
//     if (!user) return null

//     switch (activePage) {
//       case "profile":
//         return <Profile />

//       case "appointments":
//         return <Appointments />

//       case "create-appointment":
//         return <CreateAppointment />

//       case "doctors":
//         return <DoctorsList />

//       case "users":
//         return <UsersList />

//       case "apply-doctor":
//         return <ApplyDoctor />

//       default:
//         return <h4>Welcome to Dashboard</h4>
//     }
//   }

//   /* ======================
//      ROLE BASED MENU
//   =======================*/
//   const renderMenu = () => {
//     if (!user) return null

//     // ADMIN MENU
//     if (user.role === "Admin") {
//       return (
//         <>
//           <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
//           <MenuBtn label="Appointments" icon={<FaCalendarAlt />} onClick={() => setActivePage("appointments")} />
//           <MenuBtn label="All Doctors" icon={<FaUserMd />} onClick={() => setActivePage("doctors")} />
//           <MenuBtn label="All Users" icon={<FaUsers />} onClick={() => setActivePage("users")} />
//           <MenuBtn label="Create Appointment" icon={<FaPlus />} onClick={() => setActivePage("create-appointment")} />
//         </>
//       )
//     }

//     // DOCTOR MENU
//     if (user.role === "Doctor") {
//       return (
//         <>
//           <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
//           <MenuBtn label="Create Appointment" icon={<FaPlus />} onClick={() => setActivePage("create-appointment")} />
//           <MenuBtn label="Appointments" icon={<FaCalendarAlt />} onClick={() => setActivePage("appointments")} />
          
//         </>
//       )
//     }

//     // USER MENU
//     return (
//       <>
//         <MenuBtn label="Profile" onClick={() => setActivePage("profile")} />
//         <MenuBtn label="Create Appointment" icon={<FaPlus />} onClick={() => setActivePage("create-appointment")} />
//         <MenuBtn label="Appointments" icon={<FaCalendarAlt />} onClick={() => setActivePage("appointments")} />
//         <MenuBtn label="Apply for Doctor" icon={<FaUserMd />} onClick={() => setActivePage("apply-doctor")} />
//       </>
//     )
//   }



//   return (
//  <div className="container-fluid">
//       <div className="row" style={{ minHeight: "100vh" }}>
        
//         {/* Sidebar */}
//         <div className="col-md-3 col-lg-2 bg-dark text-white p-3">
//           <h5 className="text-center mb-4">👤 {user? user.name : 'user'}</h5>

//         <ul className="nav flex-column">
//             {renderMenu()}

//             <hr />

//             <li className="nav-item">
//               <button
//                 className="btn btn-danger w-100 text-start"
//                 onClick={handleLogout}
//               >
//                 <FaSignOutAlt className="me-2" />
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 col-lg-10 p-4 bg-light">
//           {renderContent()}
//         </div>

//       </div>
//     </div>
//   )
// }

// /* ======================
//    REUSABLE MENU BUTTON
// ======================*/
// const MenuBtn = ({ label, icon, onClick }) => (
//   <li className="nav-item mb-2">
//     <button className="btn btn-dark w-100 text-start" onClick={onClick}>
//       {icon && <span className="me-2">{icon}</span>}
//       {label}
//     </button>
//   </li>
// )



// export default DashboardNavbar




import React, { useEffect, useState } from "react"
import {
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaUserMd,
  FaCalendarAlt,
  FaMoon,
  FaSun,
  FaBars
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { getLoggedUser } from "../api/userAPI"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Pages
import Appointments from "../Components/Appointments"
import CreateAppointment from "../Components/CreateAppointment"
import UsersList from "../Components/UseList"
import DoctorsList from "../Components/DoctorsList"
import Profile from "../Components/Profile"
import ApplyDoctor from "../Components/ApplyDoctor"

const DashboardNavbar = () => {
  const [user, setUser] = useState()
  const [activePage, setActivePage] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("themeMode")
    if (saved === "dark") setDarkMode(true)
  }, [])

  function handleLogout() {
    localStorage.removeItem("token6163")
    toast.success("Logged out successfully 👋", {
      position: "top-right",
      autoClose: 2000,
    })
    setTimeout(() => navigate("/"), 2000)
  }

  async function fetchUser() {
    const res = await getLoggedUser()
    if (res.data.success) {
      setUser(res.data.user)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const bgColor = darkMode ? "#0f172a" : "#eef2ff"
  const textColor = darkMode ? "#fff" : "#111"

  const renderContent = () => (
    <div
      style={{
        animation: "fadeInContent 0.6s ease",
      }}
    >
      {activePage === "profile" && <Profile />}
      {activePage === "appointments" && <Appointments />}
      {activePage === "create-appointment" && <CreateAppointment />}
      {activePage === "doctors" && <DoctorsList />}
      {activePage === "users" && <UsersList />}
      {activePage === "apply-doctor" && <ApplyDoctor />}
      {activePage === "dashboard" && (
        <h3 style={{ fontWeight: "700", color: textColor }}>
          Welcome to Dashboard 👋
        </h3>
      )}
    </div>
  )

  const renderMenu = () => {
    if (!user) return null

    const items = []
    items.push({ label: "Profile", key: "profile" })
    if (user.role === "Admin") {
      items.push({ label: "Appointments", icon: <FaCalendarAlt />, key: "appointments" })
      items.push({ label: "All Doctors", icon: <FaUserMd />, key: "doctors" })
      items.push({ label: "All Users", icon: <FaUsers />, key: "users" })
      items.push({ label: "Create Appointment", icon: <FaPlus />, key: "create-appointment" })
    } else {
      items.push({ label: "Appointments", icon: <FaCalendarAlt />, key: "appointments" })
      items.push({ label: "Create Appointment", icon: <FaPlus />, key: "create-appointment" })
      if (user.role !== "Doctor") {
        items.push({ label: "Apply for Doctor", icon: <FaUserMd />, key: "apply-doctor" })
      }
    }

    return items.map((item) => (
      <MenuBtn
        key={item.key}
        label={item.label}
        icon={item.icon}
        active={activePage === item.key}
        onClick={() => setActivePage(item.key)}
      />
    ))
  }

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: bgColor, minHeight: "100vh", transition: "0.4s" }}
    >
      <ToastContainer />

      <div className="row" style={{ minHeight: "100vh" }}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            className="col-md-3 col-lg-2"
            style={{
              backgroundColor: darkMode ? "#111827" : "#ffffff",
              color: textColor,
              padding: "20px",
              animation: "slideInSidebar 0.5s ease",
            }}
          >
            <h5 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "700" }}>
              👤 {user?.name}
            </h5>

            <ul className="nav flex-column">
              {renderMenu()}
              <hr style={{ borderColor: "rgba(0,0,0,0.1)" }} />
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    background: "crimson",
                    color: "#fff",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div
          className={sidebarOpen ? "col-md-9 col-lg-10" : "col-md-12 col-lg-12"}
          style={{ padding: "30px", transition: "0.4s" }}
        >
          {/* Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              style={{
                padding: "10px",
                fontSize: "18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: darkMode ? "#374151" : "#d1d5db",
                color: textColor,
              }}
            >
              <FaBars />
            </button>
            <button
              onClick={() => {
                setDarkMode((prev) => {
                  const next = !prev
                  localStorage.setItem("themeMode", next ? "dark" : "light")
                  return next
                })
              }}
              style={{
                padding: "10px",
                fontSize: "18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: darkMode ? "#374151" : "#d1d5db",
                color: textColor,
              }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {renderContent()}
        </div>
      </div>

      {/* ANIMATION STYLES */}
      <style>
        {`
          @keyframes slideInSidebar {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInContent {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  )
}

/* ======================
   MENU BUTTON
======================*/
const MenuBtn = ({ label, icon, onClick, active }) => (
  <li style={{ marginBottom: "10px" }}>
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        background: active ? "#2563eb" : "transparent",
        color: active ? "#fff" : "#444",
        border: active ? "none" : "1px solid #ccc",
        fontWeight: "500",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "#e5e7eb"
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent"
      }}
    >
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
      {label}
    </button>
  </li>
)

export default DashboardNavbar
