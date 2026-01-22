// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/shared/ProtectedRoute';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// import Dashboard from './components/dashboard/Dashboard';
// import Navbar from './components/layout/Navbar';

// // Import feature components (we'll create these)
// import CropRecommendation from './components/features/CropRecommendation';
// import Weather from './components/features/Weather';
// import DiseaseDetection from './components/features/DiseaseDetection';
// import Irrigation from './components/features/Irrigation';
// import MarketPrices from './components/features/MarketPrices';
// import Chatbot from './components/features/chatbot';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes with Navbar */}
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <div className="min-h-screen bg-gray-50">
//                   <Navbar />
//                   <Routes>
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/crops" element={<CropRecommendation />} />
//                     <Route path="/weather" element={<Weather />} />
//                     <Route path="/disease" element={<DiseaseDetection />} />
//                     <Route path="/irrigation" element={<Irrigation />} />
//                     <Route path="/market" element={<MarketPrices />} />
//                     <Route path="/chatbot" element={<Chatbot />} />
//                     <Route path="/" element={<Navigate to="/dashboard" replace />} />
//                   </Routes>
//                 </div>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;









import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import CropRecommendation from './components/features/CropRecommendation';
import Weather from './components/features/Weather';
import DiseaseDetection from './components/features/DiseaseDetection';
import Irrigation from './components/features/Irrigation';
import MarketPrices from './components/features/MarketPrices';
import Chatbot from './components/features/chatbot';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crops"
            element={
              <ProtectedRoute>
                <Navbar />
                <CropRecommendation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <Navbar />
                <Weather />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disease"
            element={
              <ProtectedRoute>
                <Navbar />
                <DiseaseDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/irrigation"
            element={
              <ProtectedRoute>
                <Navbar />
                <Irrigation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <Navbar />
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Navbar />
                <Chatbot />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;