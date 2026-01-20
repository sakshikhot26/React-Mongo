import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userAPI";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAllUsers();
      console.log("users api res:", res.data);

      if (res.data?.success) {
        setUsers(res.data.users);
      } else {
        setError("No users found");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 8px 26px rgba(0,0,0,0.12)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "28px",
          color: "#222",
          fontWeight: "700",
          fontSize: "1.9rem",
        }}
      >
        All Users
      </h3>

      {loading && (
        <p style={{ textAlign: "center", color: "#007bff", fontSize: "1.1rem" }}>
          Loading…
        </p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red", fontSize: "1.1rem" }}>
          {error}
        </p>
      )}

      {/* Cards Wrapper */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "18px",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              background: "#fafafa",
              padding: "16px 20px",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              transition: "0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(0,0,0,0.08)";
            }}
          >
            <div>
              <strong
                style={{
                  fontSize: "1.1rem",
                  color: "#333",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {user.name}
              </strong>

              <span style={{ fontSize: "0.95rem", color: "#555" }}>
                {user.email}
              </span>
            </div>

            <span
              style={{
                display: "inline-block",
                marginTop: "14px",
                fontSize: "0.85rem",
                fontWeight: "600",
                padding: "6px 12px",
                backgroundColor: "#0d6efd",
                color: "#fff",
                borderRadius: "18px",
                textAlign: "center",
              }}
            >
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
