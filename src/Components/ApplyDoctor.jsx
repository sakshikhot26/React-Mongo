import React, { useState } from "react";
import axios from "axios";

const ApplyDoctor = () => {
  const [specialist, setSpecialist] = useState("");
  const [fees, setFees] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token6163");
    console.log("TOKEN =>", token);

    if (!token) {
      setMessage("Login first. Token missing.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7006/api/doc/apply",
        {
          specialist: specialist,
          fees: Number(fees),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Application sent successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.msg || "Unauthorized");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 35px",
          width: "100%",
          maxWidth: "420px",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#0f172a",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Apply to be a Doctor
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                color: "#334155",
                fontWeight: "500",
              }}
            >
              Speciality
            </label>
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                color: "#334155",
                fontWeight: "500",
              }}
            >
              Fees
            </label>
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontSize: "14px",
              color: "#0f766e",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplyDoctor;