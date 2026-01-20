import React, { useState, useEffect } from "react";
import { getDoctorList } from "../api/userAPI";
import { saveAppointment } from "../api/appointmentAPI";

const CreateAppointment = ({ onCreated }) => {
  const [doctors, setDoctors] = useState([]);
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [doctorID, setDoctorId] = useState("");

 useEffect(() => {
  async function fetchData() {
    try {
      const res = await getDoctorList();
      console.log("Doctor API Response:", res.data); 
      if (res?.data?.success) {
        setDoctors(res.data.doc ?? []); 
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  }
  fetchData();
}, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!dateTimeInput || !doctorID) {
      alert("Please select date/time & doctor");
      return;
    }

    try {
      const res = await saveAppointment({
        dateTime: dateTimeInput,
        doctorId: doctorID,
      });

      if (res?.data?.success) {
        alert("Appointment created!");
        onCreated(); 
      } else {
        alert("Failed to create appointment");
      }
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  }

  return (
    <div
  className="card shadow-lg rounded-4 mx-auto d-flex align-item-center"
  style={{
    maxWidth: "400px",
   
  }}
>
  {/* Header */}
  <div
    className="text-center text-white p-3 rounded-3"
    style={{ background: "linear-gradient(90deg,  #b59d68)" }}
  >
    <h4 className="fw-bold mb-0 text-shadow">Create Appointment</h4>
  </div>

  <div className="card-body p-4">
    <form onSubmit={handleSubmit} className="g-3">

      {/* Date & Time */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Date & Time</label>
        <input
          type="datetime-local"
          className="form-control form-control-lg border-info"
          value={dateTimeInput}
          onChange={(e) => setDateTimeInput(e.target.value)}
          required
        />
      </div>

      {/* Doctor Select */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Choose Doctor</label>
        <select
          className="form-select form-select-lg border-info"
          value={doctorID}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id ?? doc.id} value={doc._id ?? doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="text-center mt-4">
        <button
          type="submit"
          className="btn btn-gradient px-5 fw-bold text-white"
          style={{ background: "linear-gradient(90deg, #988442)" }}
        >
          Book Appointment
        </button>
      </div>

    </form>
  </div>
</div>
  );
}

export default CreateAppointment;