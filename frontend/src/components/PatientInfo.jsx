import React, { useState, useEffect } from 'react';
import './PatientInfo.css';

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PatientInfo = ({ currentPatient, onPatientSelect }) => {
  const [patients, setPatients] = useState([]);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${API}/api/patients`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient),
      });

      const createdPatient = await response.json();
      setPatients([createdPatient, ...patients]);
      setNewPatient({ name: '', age: '', gender: '' });
      setShowNewPatientForm(false);
      onPatientSelect(createdPatient);

    } catch (error) {
      console.error('Failed to create patient:', error);
    }
  };

  return (
    <div className="patient-info">
      <div className="patient-header">
        <h2>Patient Information</h2>
        <button 
          className="add-patient-btn"
          onClick={() => setShowNewPatientForm(true)}
        >
          Add Patient
        </button>
      </div>

      {showNewPatientForm && (
        <div className="new-patient-form">
          <form onSubmit={handleCreatePatient}>

            <div className="form-group">
              <input
                type="text"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="number"
                placeholder="Age"
                value={newPatient.age}
                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                required
              />

              <select
                value={newPatient.gender}
                onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowNewPatientForm(false)}>Cancel</button>
              <button type="submit">Create</button>
            </div>

          </form>
        </div>
      )}

      <div className="patients-list">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className={`patient-card ${currentPatient?._id === patient._id ? 'active' : ''}`}
            onClick={() => onPatientSelect(patient)}
          >
            <div className="patient-avatar">
              {patient.name.charAt(0).toUpperCase()}
            </div>

            <div className="patient-details">
              <h3>{patient.name}</h3>
              <p>{patient.age} years • {patient.gender}</p>
            </div>

          </div>
        ))}
      </div>

      {currentPatient && (
        <div className="current-patient">
          <h3>Selected Patient</h3>

          <div className="patient-summary">
            <div className="summary-item">
              <span>Name:</span> <strong>{currentPatient.name}</strong>
            </div>

            <div className="summary-item">
              <span>Age:</span> <strong>{currentPatient.age}</strong>
            </div>

            <div className="summary-item">
              <span>Gender:</span> <strong>{currentPatient.gender}</strong>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default PatientInfo;
