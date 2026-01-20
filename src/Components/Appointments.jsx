
import React, { useEffect, useState } from "react";
import {
  showAppointmentlist,
  updateAppointment,
  deleteAppointment,
} from "../api/appointmentAPI";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ dateTime: "", status: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await showAppointmentlist();
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (err) {
      console.error("load error:", err);
      setError("Failed to fetch appointments");
    }
  };

  const startEdit = (appt) => {
    setEditingId(appt._id);
    setForm({
      dateTime: appt.dateTime ? appt.dateTime.slice(0, 16) : "",
      status: appt.status,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id, doctorId) => {
    try {
      await updateAppointment(id, {
        dateTime: form.dateTime,
        status: form.status,
        doctorId: doctorId,
      });
      setEditingId(null);
      loadAppointments();
    } catch (err) {
      console.error("update error:", err);
      setError("Update failed");
    }
  };

  const removeAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await deleteAppointment(id);
      loadAppointments();
    } catch (err) {
      console.error("delete error:", err);
      setError("Delete failed");
    }
  };


  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      padding: "20px",
    },
    card: {
      width: "300px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "18px 22px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: 600,
      marginBottom: "8px",
      color: "#222",
    },
    text: {
      margin: "6px 0",
      color: "#555",
    },
    input: {
      padding: "8px",
      width: "100%",
      borderRadius: "6px",
      border: "1px solid #ccc",
      margin: "6px 0",
      fontSize: "0.95rem",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    button: {
      flex: 1,
      padding: "8px 12px",
      fontSize: "0.95rem",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    saveBtn: {
      background: "#0288d1",
      color: "#fff",
      marginRight: "8px",
    },
    cancelBtn: {
      background: "#f57c00",
      color: "#fff",
    },
    deleteBtn: {
      background: "#d32f2f",
      color: "#fff",
      marginTop: "10px",
      width: "100%",
    },
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Appointments</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div style={styles.container}>
        {appointments.map((appt) => (
          <div
            key={appt._id}
            style={styles.card}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, styles.cardHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, {
                transform: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              })
            }
          >
            {editingId === appt._id ? (
              <>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={form.dateTime}
                  onChange={handleChange}
                  style={styles.input}
                />

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Completed">Completed</option>
                  <option value="Reject">Reject</option>
                </select>

                <div style={styles.buttonGroup}>
                  <button
                    style={{ ...styles.button, ...styles.saveBtn }}
                    onClick={() => saveEdit(appt._id, appt.doctorId)}
                  >
                    Save
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.cancelBtn }}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.text}>
                  <strong>Date:</strong>{" "}
                  {new Date(appt.dateTime).toLocaleString()}
                </p>
                <p style={styles.text}>
                  <strong>Status:</strong> {appt.status}
                </p>

                <div style={styles.buttonGroup}>
                  <button
                    style={{
                      ...styles.button,
                      background: "#1976d2",
                      color: "#fff",
                    }}
                    onClick={() => startEdit(appt)}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      ...styles.button,
                      background: "#d32f2f",
                      color: "#fff",
                    }}
                    onClick={() => removeAppointment(appt._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
