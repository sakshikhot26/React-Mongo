// import { useState } from "react";
// import { loginUser, registerUser } from "../api/userAPI";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     contactNumber: "",
//     address: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       const res = await loginUser({
//         email: formData.email,
//         password: formData.password,
//       });
//       if (res.data.success) {
//         toast.success(res.data.msg);
//         localStorage.setItem("token6163", res.data.token);
//         navigate("/dashboard");
//       } else {
//         toast.error(res.data.msg);
//       }
//     } else {
//       const res = await registerUser(formData);
//       if (res.data.success) {
//         toast.success(res.data.msg);
//         setIsLogin(true);
//       } else {
//         toast.error(res.data.msg);
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         padding: "20px",
//         background: "#f8f9fa",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "450px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//           borderRadius: "8px",
//           background: "#fff",
//           padding: "20px",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           {isLogin ? "Login" : "Register"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div style={{ marginBottom: "15px" }}>
//               <label style={{ display: "block", marginBottom: "5px" }}>
//                 Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "10px",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                 }}
//                 required={!isLogin}
//               />
//             </div>
//           )}

//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ display: "block", marginBottom: "5px" }}>
//               Email *
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//               }}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "15px" }}>
//             <label style={{ display: "block", marginBottom: "5px" }}>
//               Password *
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//               }}
//               required
//             />
//           </div>

//           {!isLogin && (
//             <>
//               <div style={{ marginBottom: "15px" }}>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Contact Number
//                 </label>
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                   }}
//                 />
//               </div>

//               <div style={{ marginBottom: "15px" }}>
//                 <label style={{ display: "block", marginBottom: "5px" }}>
//                   Address
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows="3"
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "4px",
//                   }}
//                 ></textarea>
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "12px",
//               background: "#007bff",
//               border: "none",
//               color: "#fff",
//               fontSize: "16px",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             {isLogin ? "Login" : "Register"}
//           </button>
//         </form>

//         {/* Link under form */}
//         <p
//           style={{
//             textAlign: "center",
//             marginTop: "15px",
//             color: "#555",
//             cursor: "pointer",
//           }}
//           onClick={() => setIsLogin(!isLogin)}
//         >
//           {isLogin
//             ? "Don't have an account? Register here"
//             : "Already have an account? Login here"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;












import { useState } from "react";
import { loginUser, registerUser } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
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

    if (isLogin) {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        toast.success(res.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          closeOnClick: true,
        });
        localStorage.setItem("token6163", res.data.token);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(res.data.msg);
      }
    } else {
      const res = await registerUser(formData);
      if (res.data.success) {
        toast.success(res.data.msg);
        setIsLogin(true);
      } else {
        toast.error(res.data.msg);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "gradientBG 15s ease infinite",
        background: "linear-gradient(-45deg, #ff6a00, #ee0979, #7f00ff, #00c6ff)",
        backgroundSize: "400% 400%",
      }}
    >
      <ToastContainer />

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          borderRadius: "12px",
          padding: "30px",
          animation: "fadeIn 0.8s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "22px",
            fontSize: "26px",
            fontWeight: "700",
            color: "#222",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "7px" }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                style={{
                  width: "100%",
                  padding: "11px",
                  border: "1px solid #bbb",
                  borderRadius: "6px",
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "7px" }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "11px",
                border: "1px solid #bbb",
                borderRadius: "6px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "7px" }}>
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
                padding: "11px",
                border: "1px solid #bbb",
                borderRadius: "6px",
              }}
            />
          </div>

          {!isLogin && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "7px" }}>
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "7px" }}>
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "11px",
                    border: "1px solid #bbb",
                    borderRadius: "6px",
                  }}
                ></textarea>
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background:
                "linear-gradient(90deg, #ff8a00, #e52e71, #5643fa)",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundSize: "200% 200%",
              animation: "buttonGradient 3s ease infinite",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "15px",
            color: "#333",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login here"}
        </p>
      </div>

      {/* Gradient Animation Keyframes */}
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          @keyframes buttonGradient {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(-10px);}
            to {opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage;
