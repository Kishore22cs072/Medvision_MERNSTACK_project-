import { useState } from 'react'; 
import './App.css';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import PatientInfo from './components/PatientInfo';
import ResultsPanel from './components/ResultsPanel';

import { Routes, Route } from "react-router-dom";

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";


function normalizeReport(resp) {
  if (!resp) return null;

  
  if (resp.report) {
    const r = resp.report;
    return {
      classification: typeof r.classification === 'string' ? r.classification : (r.classification?.label || "Unknown"),
      accuracy: typeof r.accuracy === 'number' ? r.accuracy : (r.classification?.accuracy ? Math.round(r.classification.accuracy * 100) : 0),
      suggestions: r.suggestions ?? r.classification?.suggestions ?? [],
      imageUrl: r.imageUrl ?? r.filePath ?? null,
      originalName: r.originalName ?? r.original_name ?? null,
      id: r._id ?? r.id ?? null,
      createdAt: r.createdAt ?? r.created_at ?? null
    };
  }

  if (resp.record) {
    const r = resp.record;
    const classificationVal = typeof r.classification === 'string' ? r.classification : r.classification?.label;
    const accuracyVal = typeof r.classification === 'object' ? (r.classification.accuracy ? Math.round(r.classification.accuracy * 100) : 0) : (r.accuracy ?? 0);
    return {
      classification: classificationVal ?? "Unknown",
      accuracy: typeof accuracyVal === 'number' ? accuracyVal : Math.round(accuracyVal),
      suggestions: r.classification?.suggestions ?? r.suggestions ?? [],
      imageUrl: r.filePath ?? r.imageUrl ?? null,
      originalName: r.originalName ?? r.original_name ?? r.filename ?? null,
      id: r._id ?? r.id ?? null,
      createdAt: r.createdAt ?? r.created_at ?? null
    };
  }

  const r = resp;
  const classificationVal = typeof r.classification === 'string' ? r.classification : r.classification?.label;
  const accuracyVal = typeof r.accuracy === 'number' ? r.accuracy : (r.classification?.accuracy ? Math.round(r.classification.accuracy * 100) : 0);

  return {
    classification: classificationVal ?? "Unknown",
    accuracy: typeof accuracyVal === 'number' ? accuracyVal : Math.round(accuracyVal),
    suggestions: r.suggestions ?? r.classification?.suggestions ?? [],
    imageUrl: r.imageUrl ?? r.filePath ?? null,
    originalName: r.originalName ?? r.original_name ?? null,
    id: r._id ?? r.id ?? null,
    createdAt: r.createdAt ?? r.created_at ?? null
  };
}

function Home() {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePatientSelect = (patient) => {
    setCurrentPatient(patient);
    setClassificationResult(null);
  };


  const handleGenerateReport = async (file) => {
    if (!currentPatient) {
      alert('Please select a patient first');
      return;
    }

    setIsLoading(true);
    const form = new FormData();
    form.append("image", file);
    form.append("patientId", currentPatient._id ?? currentPatient.id);

    try {
      const resp = await fetch(`${API}/api/generate-report`, {
        method: 'POST',
        body: form,
      });

      const data = await resp.json();
      if (!resp.ok) {
        console.error('Upload error', data);
        alert(data.message || data.error || "Upload failed");
        return;
      }

      const report = normalizeReport(data);
      if (report) setClassificationResult(report);
      else alert("Upload succeeded but response could not be parsed");

    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleGenerateRandomReport = async () => {
    if (!currentPatient) {
      alert('Please select a patient first');
      return;
    }

    setIsLoading(true);
    try {
      const resp = await fetch(`${API}/api/reports/random`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: currentPatient._id ?? currentPatient.id })
      });

      const data = await resp.json();
      if (!resp.ok) {
        console.error('Random generate error', data);
        alert(data.message || data.error || "Failed to generate random report");
        return;
      }

      const report = normalizeReport(data);
      if (report) setClassificationResult(report);
      else alert("Report generated but response could not be parsed");

    } catch (err) {
      console.error('Random report failed:', err);
      alert('Failed to generate random report');
    } finally {
      setIsLoading(false);
    }
  };

  const defaultResult = {
    classification: "Awaiting Diagnosis",
    accuracy: 0,
    suggestions: [
      "Upload a chest X-ray to generate a diagnostic report.",
      "Select a patient before uploading the image.",
      "The AI will analyze and suggest possible conditions here."
    ]
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="content-grid">
          <div className="left-panel">
            <PatientInfo 
              currentPatient={currentPatient}
              onPatientSelect={handlePatientSelect}
            />
            
            <UploadSection 
              onImageUpload={handleGenerateReport}
              isLoading={isLoading}
            />
          </div>
          
          <div className="right-panel">
            <ResultsPanel 
              result={classificationResult || defaultResult}
              patientName={currentPatient?.name || "No Patient Selected"}
              onGenerateRandom={handleGenerateRandomReport}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<><Header /><About /></>} />
      <Route path="/services" element={<><Header /><Services /></>} />
      <Route path="/contact" element={<><Header /><Contact /></>} />
    </Routes>
  );
}
