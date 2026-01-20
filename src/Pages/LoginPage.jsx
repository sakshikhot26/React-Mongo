// import { useState } from "react";
// import { loginUser, registerUser } from "../api/userAPI";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login Data:", formData);
//     const res = await loginUser(formData)
//     if(res.data.success){
//         toast.success(res.data.msg)
//         localStorage.setItem('token6163',res.data.token)
//         navigate('/dashboard')
//     }else{
//         toast.error(res.data.msg)
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-header text-center">
//               <h4>Login</h4>
//             </div>

//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
                
//                   {/* Email */}
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="mb-3">
//                   <label className="form-label">Password *</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* Submit */}
//                 <button type="submit" className="btn btn-primary w-100">
//                   Login
//                 </button>

//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;















import { useState } from "react";
import { loginUser, registerUser } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    const res = await loginUser(formData);
    if (res.data.success) {
      toast.success(res.data.msg);
      localStorage.setItem("token6163", res.data.token);
      navigate("/dashboard");
    } else {
      toast.error(res.data.msg);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "15px",
            textAlign: "center",
          }}
        >
          <h4 style={{ margin: 0 }}>Login</h4>
        </div>

        <div style={{ padding: "20px", background: "#fff" }}>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
