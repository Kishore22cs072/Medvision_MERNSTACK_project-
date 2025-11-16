import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


const db = new sqlite3.Database(path.join(__dirname, 'medical_images.db'));


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS medical_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    classification TEXT,
    accuracy REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS treatment_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_id INTEGER,
    suggestion TEXT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES medical_images (id)
  )`);
});


app.get('/api/patients', (req, res) => {
  db.all('SELECT * FROM patients ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/patients', (req, res) => {
  const { name, age, gender } = req.body;
  db.run(
    'INSERT INTO patients (name, age, gender) VALUES (?, ?, ?)',
    [name, age, gender],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, age, gender });
    }
  );
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { patientId } = req.body;
  
  
  const classifications = ['Pneumonia', 'Normal', 'Tuberculosis', 'COVID-19', 'Bronchitis'];
  const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
  const randomAccuracy = Math.floor(Math.random() * 20) + 80; 

  db.run(
    'INSERT INTO medical_images (patient_id, filename, original_name, classification, accuracy) VALUES (?, ?, ?, ?, ?)',
    [patientId, req.file.filename, req.file.originalname, randomClassification, randomAccuracy],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const imageId = this.lastID;
      
   
      const suggestions = getTreatmentSuggestions(randomClassification);
      suggestions.forEach(suggestion => {
        db.run(
          'INSERT INTO treatment_suggestions (image_id, suggestion) VALUES (?, ?)',
          [imageId, suggestion]
        );
      });

      res.json({
        id: imageId,
        filename: req.file.filename,
        originalName: req.file.originalname,
        classification: randomClassification,
        accuracy: randomAccuracy,
        suggestions: suggestions
      });
    }
  );
});

app.get('/api/images/:patientId', (req, res) => {
  const { patientId } = req.params;
  
  db.all(
    `SELECT mi.*, GROUP_CONCAT(ts.suggestion) as suggestions 
     FROM medical_images mi 
     LEFT JOIN treatment_suggestions ts ON mi.id = ts.image_id 
     WHERE mi.patient_id = ? 
     GROUP BY mi.id 
     ORDER BY mi.created_at DESC`,
    [patientId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const images = rows.map(row => ({
        ...row,
        suggestions: row.suggestions ? row.suggestions.split(',') : []
      }));
      
      res.json(images);
    }
  );
});

function getTreatmentSuggestions(classification) {
  const treatmentMap = {
    'Pneumonia': ['Antibiotic therapy', 'Rest and hydration', 'Follow-up chest X-ray', 'Monitor oxygen levels'],
    'Normal': ['Continue routine checkups', 'Maintain healthy lifestyle', 'No immediate treatment needed'],
    'Tuberculosis': ['Anti-TB medication', 'Isolation precautions', 'Regular monitoring', 'Nutritional support'],
    'COVID-19': ['Antiviral treatment', 'Isolation', 'Monitor symptoms', 'Supportive care'],
    'Bronchitis': ['Rest and fluids', 'Bronchodilators if needed', 'Avoid irritants', 'Follow-up if symptoms persist']
  };
  
  return treatmentMap[classification] || ['Consult with specialist', 'Additional tests recommended'];
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});