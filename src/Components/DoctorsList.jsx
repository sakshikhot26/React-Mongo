import React, { useEffect, useState } from "react";
import { appliedDoctorList, getApprovedDoctorList } from "../api/doctorAPI";
import axiosInstance from "../api/axiosInstance";

function DoctorsList() {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [updatedFees, setUpdatedFees] = useState("");
  const [updatedSpecialist, setUpdatedSpecialist] = useState("");

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const fetchAllDoctors = async () => {
    try {
      setLoading(true);

      const pending = await appliedDoctorList();
      setPendingDoctors(pending?.data?.doc ?? []);

      const approved = await getApprovedDoctorList();
      setApprovedDoctors(approved?.data?.doc ?? []);

      setLoading(false);
    } catch (error) {
      console.error("FETCH DOC ERROR =>", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (doctorId, status) => {
    try {
      await axiosInstance.patch(`/doc/docStatus/${doctorId}`, { status });
      fetchAllDoctors();
    } catch (error) {
      console.error("STATUS UPDATE ERROR =>", error);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor._id);
    setUpdatedFees(doctor.fees);
    setUpdatedSpecialist(doctor.specialist);
  };

  const handleSave = async (doctorId) => {
    try {
      await axiosInstance.put(`/doc/update/${doctorId}`, {
        fees: updatedFees,
        specialist: updatedSpecialist,
      });
      setEditingDoctor(null);
      fetchAllDoctors();
    } catch (error) {
      console.error("UPDATE DOCTOR ERROR =>", error);
    }
  };

  const handleDisable = async (doctorId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/doc/delete/${doctorId}`);
      fetchAllDoctors();
    } catch (error) {
      console.error("DELETE DOCTOR ERROR =>", error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3 className="text-primary mb-4">Doctors Management</h3>

      {/* Pending */}
      <div className="card shadow mb-4">
        <div className="card-header bg-secondary text-white">
          Pending Doctor Applications
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Doctor ID</th>
                <th>Specialist</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingDoctors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Pending Doctors
                  </td>
                </tr>
              ) : (
                pendingDoctors.map((doc, i) => (
                  <tr key={doc._id}>
                    <td>{i + 1}</td>
                    <td>{doc._id}</td>
                    <td>{doc.specialist}</td>
                    <td>₹ {doc.fees}</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          handleStatusChange(doc._id, "Accepted")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleStatusChange(doc._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          Approved Doctors
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Specialist</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedDoctors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Approved Doctors
                  </td>
                </tr>
              ) : (
                approvedDoctors.map((doc, i) => (
                  <tr key={doc._id}>
                    <td>{i + 1}</td>
                    <td>{doc.createdBy?.name}</td>
                    <td>{doc.createdBy?.email}</td>
                    <td>
                      {editingDoctor === doc._id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={updatedSpecialist}
                          onChange={(e) =>
                            setUpdatedSpecialist(e.target.value)
                          }
                        />
                      ) : (
                        doc.specialist
                      )}
                    </td>
                    <td>
                      {editingDoctor === doc._id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={updatedFees}
                          onChange={(e) =>
                            setUpdatedFees(e.target.value)
                          }
                        />
                      ) : (
                        `₹ ${doc.fees}`
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>
                      {editingDoctor === doc._id ? (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleSave(doc._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingDoctor(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => handleEdit(doc)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDisable(doc._id)}
                          >
                            Disable
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DoctorsList;
