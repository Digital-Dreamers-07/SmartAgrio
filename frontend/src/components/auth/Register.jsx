// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import './Register.css';
// import { Mail, Lock, User, Phone, MapPin, Loader2, Sprout, Eye, EyeOff } from 'lucide-react';

// const Register = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     state: '',
//     district: '',
//     farmSize: '',
//     soilType: '',
//     preferredCrops: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       setLoading(false);
//       return;
//     }

//     // Prepare data
//     const userData = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone,
//       location: {
//         state: formData.state,
//         district: formData.district,
//       },
//       farmDetails: {
//         farmSize: parseFloat(formData.farmSize) || 0,
//         soilType: formData.soilType,
//         preferredCrops: formData.preferredCrops.split(',').map(c => c.trim()),
//         farmType: 'conventional',
//       },
//     };

//     const result = await register(userData);
    
//     if (result.success) {
//       navigate('/dashboard');
//     } else {
//       setError(result.message);
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Left Side - Brand */}
//       <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center p-12">
//         <div className="max-w-md text-white">
//           <h1 className="text-4xl font-bold mb-6">
//             🌾 Join SmartFarm
//           </h1>
//           <p className="text-xl mb-8 text-primary-100">
//             Start your journey with AI-powered farming solutions
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-y-auto">
//         <div className="max-w-xl w-full space-y-8 animate-fade-in">
//           {/* Header */}
//           <div className="text-center">
//             <div className="flex justify-center mb-4">
//               <div className="bg-primary-100 p-3 rounded-full">
//                 <Sprout className="w-12 h-12 text-primary-600" />
//               </div>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900">
//               Create Your Account
//             </h2>
//             <p className="mt-2 text-gray-600">
//               Join thousands of farmers using SmartFarm AI
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* Registration Form */}
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             {/* Personal Information */}
//             <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="Rajesh Kumar"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="farmer@example.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="+91-9876543210"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="input-field pl-10 pr-10"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   <input
//                     name="confirmPassword"
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="input-field pl-10"
//                     placeholder="••••••••"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Location Information */}
//             <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     State *
//                   </label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <input
//                       name="state"
//                       type="text"
//                       required
//                       value={formData.state}
//                       onChange={handleChange}
//                       className="input-field pl-10"
//                       placeholder="Punjab"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     District
//                   </label>
//                   <input
//                     name="district"
//                     type="text"
//                     value={formData.district}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="Ludhiana"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Farm Information */}
//             <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Details</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Farm Size (acres)
//                   </label>
//                   <input
//                     name="farmSize"
//                     type="number"
//                     step="0.1"
//                     value={formData.farmSize}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="10"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Soil Type
//                   </label>
//                   <select
//                     name="soilType"
//                     value={formData.soilType}
//                     onChange={handleChange}
//                     className="input-field"
//                   >
//                     <option value="">Select soil type</option>
//                     <option value="loamy">Loamy</option>
//                     <option value="clayey">Clayey</option>
//                     <option value="sandy">Sandy</option>
//                     <option value="black">Black Soil</option>
//                     <option value="red">Red Soil</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Preferred Crops (comma-separated)
//                 </label>
//                 <input
//                   name="preferredCrops"
//                   type="text"
//                   value={formData.preferredCrops}
//                   onChange={handleChange}
//                   className="input-field"
//                   placeholder="wheat, rice, cotton"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="inline animate-spin -ml-1 mr-3 h-5 w-5" />
//                   Creating Account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </button>

//             {/* Login Link */}
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;






import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data.success) {
        navigate("/dashboard"); // Redirect after signup
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl text-foreground">
            Smart<span className="text-primary">Farm</span>
          </span>
        </Link>

        <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Join SmartFarm to revolutionize your farming</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Farmer"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
