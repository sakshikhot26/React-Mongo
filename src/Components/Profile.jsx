import React, { useEffect, useState } from "react";
import {
  getLoggedUser,
  deleteUser,
} from "../api/userAPI";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    userImage: null,
  });
  const [previewImg, setPreviewImg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getLoggedUser();
      if (res.data.success) {
        const u = res.data.user;
        setUser(u);
        setFormData({
          name: u.name,
          email: u.email,
          contactNumber: u.contactNumber || "",
          address: u.address || "",
          userImage: null,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "userImage") {
      setFormData({ ...formData, userImage: files[0] });

     
      if (files && files.length > 0) {
        setPreviewImg(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("contactNumber", formData.contactNumber);
      data.append("address", formData.address);
      if (formData.userImage) {
        data.append("userImage", formData.userImage);
      }

      const res = await axiosInstance.put(`/user/${user._id}`, data);

      if (res.data.success) {
      
        await fetchUser();


        setPreviewImg(null);

        toast.success("Profile updated successfully!");
        setEditing(false);
      }
    } catch (err) {
      console.log("Update Error:", err);
      toast.error("Profile update failed!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure to delete profile?")) return;
    try {
      await deleteUser(user._id);
      toast.success("Profile deleted successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
      }}
    >
      {!user ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {!editing ? (
            <>
              <h2 style={{ textAlign: "center" }}>My Profile</h2>

              <div style={{ textAlign: "center" }}>
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "3px solid #007bff",
                    }}
                  />
                ) : (
                  user.imagePath && (
                    <img
                      src={user.imagePath}
                      alt="profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "3px solid #007bff",
                      }}
                    />
                  )
                )}
              </div>

              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                <strong>Contact:</strong> {user.contactNumber}
              </p>
              <p style={{ fontSize: "18px", margin: "10px 0" }}>
                <strong>Address:</strong> {user.address}
              </p>

              <div style={{ textAlign: "center", marginTop: "18px" }}>
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    background: "#28a745",
                    color: "#fff",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "12px",
                  }}
                >
                  Delete Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>Edit Profile</h2>

              <form
                onSubmit={handleUpdate}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />

                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />

                <input
                  type="file"
                  name="userImage"
                  onChange={handleChange}
                  style={{ padding: "6px" }}
                />

                <button
                  type="submit"
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  style={{
                    background: "#6c757d",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </>
      )}

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default Profile;
