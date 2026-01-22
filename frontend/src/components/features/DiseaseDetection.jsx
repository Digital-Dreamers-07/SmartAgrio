// // import { useState } from 'react';
// // import { diseaseAPI } from '../../services/api';
// // import { Bug, Loader2 } from 'lucide-react';
// // // import './features.css';

// // const DiseaseDetection = () => {
// //   const [formData, setFormData] = useState({
// //     cropType: '',
// //     symptoms: '',
// //     affectedParts: '',
// //     colorChanges: '',
// //     growthStage: ''
// //   });
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const response = await diseaseAPI.detectFromSymptoms(formData);
// //       setResult(response.data.data);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="feature-page">
// //       <div className="feature-container">
// //         <div className="feature-header">
// //           <div className="header-icon error">
// //             <Bug size={32} />
// //           </div>
// //           <div>
// //             <h1 className="feature-title">Disease Detection</h1>
// //             <p className="feature-description">Identify and treat crop diseases early</p>
// //           </div>
// //         </div>

// //         <div className="feature-content">
// //           <div className="feature-form-card card">
// //             <h2 className="card-title">Describe the Symptoms</h2>
// //             <form onSubmit={handleSubmit} className="feature-form">
// //               <div className="form-grid">
// //                 <div className="form-group">
// //                   <label className="form-label">Crop Type *</label>
// //                   <input type="text" name="cropType" required value={formData.cropType} onChange={handleChange} className="form-input" placeholder="e.g., Tomato" />
// //                 </div>
// //                 <div className="form-group">
// //                   <label className="form-label">Symptoms *</label>
// //                   <input type="text" name="symptoms" required value={formData.symptoms} onChange={handleChange} className="form-input" placeholder="e.g., Yellow spots" />
// //                 </div>
// //                 <div className="form-group">
// //                   <label className="form-label">Affected Parts</label>
// //                   <input type="text" name="affectedParts" value={formData.affectedParts} onChange={handleChange} className="form-input" placeholder="e.g., Leaves" />
// //                 </div>
// //               </div>
// //               <button type="submit" disabled={loading} className="btn btn-primary btn-full">
// //                 {loading ? <><Loader2 size={20} className="animate-spin" /> Analyzing...</> : <>Detect Disease</>}
// //               </button>
// //             </form>
// //           </div>

// //           {result && (
// //             <div className="feature-result-card card animate-slide-up">
// //               <h2 className="card-title">Diagnosis</h2>
// //               <pre className="result-text">{result.diagnosis}</pre>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DiseaseDetection;








// import { useState } from 'react';
// import { diseaseAPI } from '../../services/api';
// import { Bug, Loader2 } from 'lucide-react';

// const DiseaseDetection = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) return alert('Please select an image');

//     const formData = new FormData();
//     formData.append('image', selectedFile); // must match Multer field name

//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await diseaseAPI.detectFromImage(formData); // ✅ Correct function
//       if (res.data.success) {
//         setResult(res.data.data); // should include diagnosis, symptoms, treatment, chemicals
//       } else {
//         alert('Detection failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Detection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
//       <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-lg space-y-6">
//         <div className="flex items-center gap-3 mb-4">
//           <Bug className="text-green-600" size={32} />
//           <h1 className="text-2xl font-bold">Plant Disease Detection</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Upload Leaf Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-gray-700 border rounded-md p-2 focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//           >
//             {loading ? <><Loader2 className="animate-spin" /> Analyzing...</> : 'Detect Disease'}
//           </button>
//         </form>

//         {result && (
//           <div className="bg-green-50 p-4 rounded-md shadow-md space-y-2">
//             <h2 className="font-semibold text-lg">Analysis Result:</h2>
//             <div className="space-y-1">
//               <p><strong>Diagnosis:</strong> {result.diagnosis}</p>
//               <p><strong>Symptoms:</strong> {result.symptoms}</p>
//               <p><strong>Treatment:</strong> {result.treatment}</p>
//               <p><strong>Chemicals:</strong> {result.chemicals}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiseaseDetection;


// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

// const handleAnalyze = async () => {
//   if (!selectedFile) return setError("Please select an image.");
//   setLoading(true);
//   setResult(null);
//   setError("");

//   try {
//     // convert image to base64
//     const toBase64 = (file) =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result.split(",")[1]);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });

//     const base64Image = await toBase64(selectedFile);

//     const requestBody = {
//       contents: [
//         {
//           parts: [
//             {
//               inlineData: {
//                 mimeType: selectedFile.type,
//                 data: base64Image,
//               },
//             },
//           ],
//         },
//       ],
//       // Optional: model parameters
//       temperature: 0.2,
//       maxOutputTokens: 512,
//     };

//     const res = await fetch(GEMINI_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!res.ok) throw new Error(`API failed: ${res.status}`);
//     const data = await res.json();

//     const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No data received";

//     // Attempt to parse JSON if Gemini returns structured output
//     let parsedResult;
//     try {
//       parsedResult = JSON.parse(rawText);
//     } catch {
//       parsedResult = { message: rawText };
//     }

//     setResult(parsedResult);
//   } catch (err) {
//     console.error(err);
//     setError("Failed to analyze image. Try again.");
//   } finally {
//     setLoading(false);
//   }
// };





import React, { useState } from "react";
import { FaUpload, FaSpinner } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const DiseasePredictor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mainDisease, setMainDisease] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return setError("Please select a valid image.");

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) return setError("Invalid file type. Please upload JPEG/PNG/WEBP.");

    if (file.size > 5 * 1024 * 1024) return setError("File size exceeds 5MB. Please upload a smaller image.");

    setSelectedFile(file);
    setError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const extractMainDisease = (text) => {
    const patterns = [
      /alternaria leaf spot/i,
      /cercospora leaf spot/i,
      /septoria leaf spot/i,
      /powdery mildew/i,
      /downy mildew/i,
      /bacterial leaf spot/i,
      /anthracnose/i,
      /fusarium wilt/i,
      /rust/i,
      /blight/i,
      /root rot/i,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[0];
    }
    return "Unknown Disease";
  };

  const formatReport = (text) => {
    return text
      .replace(/\*/g, "")
      .replace(/-/g, "")
      .replace(/•/g, "")
      .replace(/\n+/g, "\n")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const handleUpload = async () => {
    if (!selectedFile) return setError("Please select an image.");
    setLoading(true);
    setMainDisease("");
    setReport("");
    setError("");

    try {
      const base64Image = await toBase64(selectedFile);

      const requestBody = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: selectedFile.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      };

      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(`API failed: ${response.status}`);
      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No data received";

      setMainDisease(extractMainDisease(rawText));
      setReport(formatReport(rawText));
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-10 border border-green-100">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700">
          🌾 Smart Crop Disease Detector
        </h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out text-center cursor-pointer ${
            isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600 text-lg">
            {isDragActive ? "Drop the image here..." : "Drag & drop an image here, or click to select"}
          </p>
        </div>

        {selectedFile && (
          <div className="mt-6 flex justify-center">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="w-full max-w-xs h-auto object-cover rounded-xl border"
            />
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={handleUpload}
            className={`bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
            {loading ? "Analyzing..." : "Upload & Detect"}
          </button>

          {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}
        </div>

        {loading && (
          <div className="text-center mt-6">
            <FaSpinner className="animate-spin text-green-500 text-4xl mx-auto" />
            <p className="mt-2 text-gray-700">Analyzing image...</p>
          </div>
        )}

        {mainDisease && (
          <div className="bg-green-100 rounded-xl shadow-lg p-6 mt-10">
            <h3 className="text-2xl font-bold text-black">
              🌿 Main Disease Detected: <span className="font-semibold">{mainDisease}</span>
            </h3>
          </div>
        )}

        {report && (
          <div className="bg-gray-50 rounded-xl shadow-lg p-6 mt-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📄 Diagnostic Report</h3>
            <div className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
              {report}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictor;