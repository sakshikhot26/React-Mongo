import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import DashboardNavbar from "./Pages/Dashboard"
import ProtectedRoute from "./Components/ProtectedRoutes"
import AuthPage from "./Pages/AuthPage";


function App() {

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} /> */}
           <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardNavbar />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
