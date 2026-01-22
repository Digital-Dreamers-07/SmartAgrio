// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import { historyAPI } from '../../services/api';
// // import {
// //   Sprout, Cloud, Bug, Droplets, TrendingUp, MessageSquare,
// //   Activity, BarChart3, ArrowRight, Loader2, Calendar, 
// //   CheckCircle, AlertCircle, Clock, MapPin
// // } from 'lucide-react';
// // import './Dashboard.css';

// // const Dashboard = () => {
// //   const { user } = useAuth();
// //   const [stats, setStats] = useState(null);
// //   const [recentHistory, setRecentHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       const [statsRes, historyRes] = await Promise.all([
// //         historyAPI.getStats(),
// //         historyAPI.getRecent({ limit: 5 })
// //       ]);
// //       setStats(statsRes.data.data);
// //       setRecentHistory(historyRes.data.data || []);
// //     } catch (error) {
// //       console.error('Failed to fetch dashboard data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const features = [
// //     {
// //       title: 'Crop Recommendations',
// //       description: 'AI-powered crop suggestions for your farm',
// //       icon: Sprout,
// //       color: 'success',
// //       link: '/crops',
// //       gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
// //     },
// //     {
// //       title: 'Weather Forecast',
// //       description: 'Real-time weather and farming advice',
// //       icon: Cloud,
// //       color: 'info',
// //       link: '/weather',
// //       gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
// //     },
// //     {
// //       title: 'Disease Detection',
// //       description: 'Identify and treat crop diseases early',
// //       icon: Bug,
// //       color: 'error',
// //       link: '/disease',
// //       gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
// //     },
// //     {
// //       title: 'Irrigation Guide',
// //       description: 'Optimize water usage and scheduling',
// //       icon: Droplets,
// //       color: 'cyan',
// //       link: '/irrigation',
// //       gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
// //     },
// //     {
// //       title: 'Market Prices',
// //       description: 'Track real-time commodity prices',
// //       icon: TrendingUp,
// //       color: 'purple',
// //       link: '/market',
// //       gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
// //     },
// //     {
// //       title: 'FarmBot Assistant',
// //       description: '24/7 AI-powered farming helper',
// //       icon: MessageSquare,
// //       color: 'orange',
// //       link: '/chatbot',
// //       gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
// //     }
// //   ];

// //   const featureTypeNames = {
// //     crop_recommendation: 'Crop Recommendation',
// //     weather_query: 'Weather Query',
// //     disease_detection: 'Disease Detection',
// //     irrigation_advice: 'Irrigation Advice',
// //     fertilizer_guide: 'Fertilizer Guide',
// //     market_price: 'Market Price',
// //     chatbot: 'Chatbot'
// //   };

// //   const getFeatureIcon = (type) => {
// //     const icons = {
// //       crop_recommendation: Sprout,
// //       weather_query: Cloud,
// //       disease_detection: Bug,
// //       irrigation_advice: Droplets,
// //       fertilizer_guide: Droplets,
// //       market_price: TrendingUp,
// //       chatbot: MessageSquare
// //     };
// //     return icons[type] || Activity;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="loading-screen">
// //         <Loader2 size={48} className="animate-spin" />
// //         <p>Loading your dashboard...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="dashboard">
// //       {/* Hero Section */}
// //       <div className="dashboard-hero">
// //         <div className="container">
// //           <div className="hero-content animate-fade-in">
// //             <div className="hero-text">
// //               <h1 className="hero-title">
// //                 Welcome back, {user?.name}! 👋
// //               </h1>
// //               <p className="hero-subtitle">
// //                 <MapPin size={18} />
// //                 {user?.location?.state && `${user.location.state}`}
// //                 {user?.location?.district && `, ${user.location.district}`}
// //                 {user?.farmDetails?.farmSize && ` • ${user.farmDetails.farmSize} acres`}
// //               </p>
// //             </div>
// //             <div className="hero-actions">
// //               <Link to="/chatbot" className="btn btn-primary">
// //                 <MessageSquare size={20} />
// //                 Ask FarmBot
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container dashboard-content">
// //         {/* Stats Grid */}
// //         <div className="stats-grid animate-slide-up">
// //           <div className="stat-card">
// //             <div className="stat-icon success">
// //               <Activity size={24} />
// //             </div>
// //             <div className="stat-info">
// //               <div className="stat-value">{stats?.totalQueries || 0}</div>
// //               <div className="stat-label">Total Queries</div>
// //             </div>
// //           </div>

// //           <div className="stat-card">
// //             <div className="stat-icon info">
// //               <BarChart3 size={24} />
// //             </div>
// //             <div className="stat-info">
// //               <div className="stat-value">
// //                 {featureTypeNames[stats?.mostUsedFeature]?.split(' ')[0] || 'N/A'}
// //               </div>
// //               <div className="stat-label">Most Used Feature</div>
// //             </div>
// //           </div>

// //           <div className="stat-card">
// //             <div className="stat-icon warning">
// //               <Calendar size={24} />
// //             </div>
// //             <div className="stat-info">
// //               <div className="stat-value">
// //                 {stats?.userSince ? new Date(stats.userSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
// //               </div>
// //               <div className="stat-label">Member Since</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Quick Access Features */}
// //         <section className="dashboard-section">
// //           <div className="section-header">
// //             <h2 className="section-title">Quick Access</h2>
// //             <p className="section-description">Start exploring our AI-powered features</p>
// //           </div>

// //           <div className="features-grid">
// //             {features.map((feature, index) => {
// //               const Icon = feature.icon;
// //               return (
// //                 <Link
// //                   key={index}
// //                   to={feature.link}
// //                   className="feature-card animate-slide-up"
// //                   style={{ animationDelay: `${index * 0.1}s` }}
// //                 >
// //                   <div className="feature-card-header">
// //                     <div className="feature-icon" style={{ background: feature.gradient }}>
// //                       <Icon size={28} strokeWidth={2} />
// //                     </div>
// //                     <ArrowRight className="feature-arrow" size={20} />
// //                   </div>
// //                   <h3 className="feature-title">{feature.title}</h3>
// //                   <p className="feature-description">{feature.description}</p>
// //                 </Link>
// //               );
// //             })}
// //           </div>
// //         </section>

// //         {/* Recent Activity */}
// //         <section className="dashboard-section">
// //           <div className="section-header">
// //             <h2 className="section-title">Recent Activity</h2>
// //             <Link to="/history" className="section-link">
// //               View All <ArrowRight size={16} />
// //             </Link>
// //           </div>

// //           <div className="activity-card card">
// //             {recentHistory.length === 0 ? (
// //               <div className="empty-state">
// //                 <Activity size={48} className="empty-icon" />
// //                 <h3 className="empty-title">No Activity Yet</h3>
// //                 <p className="empty-description">
// //                   Start exploring features to see your activity here
// //                 </p>
// //                 <Link to="/crops" className="btn btn-primary mt-md">
// //                   Get Started
// //                 </Link>
// //               </div>
// //             ) : (
// //               <div className="activity-list">
// //                 {recentHistory.map((item, index) => {
// //                   const Icon = getFeatureIcon(item.featureType);
// //                   return (
// //                     <div key={index} className="activity-item">
// //                       <div className="activity-icon">
// //                         <Icon size={20} />
// //                       </div>
// //                       <div className="activity-details">
// //                         <div className="activity-title">
// //                           {featureTypeNames[item.featureType] || item.featureType}
// //                         </div>
// //                         <div className="activity-time">
// //                           <Clock size={14} />
// //                           {new Date(item.createdAt).toLocaleString()}
// //                         </div>
// //                       </div>
// //                       <div className="activity-status">
// //                         {item.success !== false ? (
// //                           <span className="badge badge-success">
// //                             <CheckCircle size={14} />
// //                             Success
// //                           </span>
// //                         ) : (
// //                           <span className="badge badge-error">
// //                             <AlertCircle size={14} />
// //                             Failed
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;







// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { historyAPI } from '../../services/api';
// import {
//   Sprout, Cloud, Bug, Droplets, TrendingUp, MessageSquare,
//   Activity, BarChart3, ArrowRight, Loader2, Calendar,
//   CheckCircle, AlertCircle, Clock, MapPin
// } from 'lucide-react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [recentHistory, setRecentHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [statsRes, historyRes] = await Promise.all([
//         historyAPI.getStats(),
//         historyAPI.getRecent({ limit: 5 })
//       ]);
//       setStats(statsRes.data.data);
//       setRecentHistory(historyRes.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const features = [
//     {
//       title: 'Crop Recommendations',
//       description: 'AI-powered crop suggestions for your farm',
//       icon: Sprout,
//       color: 'success',
//       link: '/crops',
//       gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
//     },
//     {
//       title: 'Weather Forecast',
//       description: 'Real-time weather and farming advice',
//       icon: Cloud,
//       color: 'info',
//       link: '/weather',
//       gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
//     },
//     {
//       title: 'Disease Detection',
//       description: 'Identify and treat crop diseases early',
//       icon: Bug,
//       color: 'error',
//       link: '/disease',
//       gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
//     },
//     {
//       title: 'Irrigation Guide',
//       description: 'Optimize water usage and scheduling',
//       icon: Droplets,
//       color: 'cyan',
//       link: '/irrigation',
//       gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
//     },
//     {
//       title: 'Market Prices',
//       description: 'Track real-time commodity prices',
//       icon: TrendingUp,
//       color: 'purple',
//       link: '/market',
//       gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
//     },
//     {
//       title: 'FarmBot Assistant',
//       description: '24/7 AI-powered farming helper',
//       icon: MessageSquare,
//       color: 'orange',
//       link: '/chatbot',
//       gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
//     }
//   ];

//   const featureTypeNames = {
//     crop_recommendation: 'Crop Recommendation',
//     weather_query: 'Weather Query',
//     disease_detection: 'Disease Detection',
//     irrigation_advice: 'Irrigation Advice',
//     fertilizer_guide: 'Fertilizer Guide',
//     market_price: 'Market Price',
//     chatbot: 'Chatbot'
//   };

//   const getFeatureIcon = (type) => {
//     const icons = {
//       crop_recommendation: Sprout,
//       weather_query: Cloud,
//       disease_detection: Bug,
//       irrigation_advice: Droplets,
//       fertilizer_guide: Droplets,
//       market_price: TrendingUp,
//       chatbot: MessageSquare
//     };
//     return icons[type] || Activity;
//   };

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <Loader2 size={48} className="animate-spin" />
//         <p>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       {/* Hero Section */}
//       <div className="dashboard-hero">
//         <div className="container">
//           <div className="hero-content animate-fade-in">
//             <div className="hero-text">
//               <h1 className="hero-title">
//                 Welcome back, {user?.name}! 👋
//               </h1>
//               <p className="hero-subtitle">
//                 <MapPin size={18} />
//                 {user?.location?.state && `${user.location.state}`}
//                 {user?.location?.district && `, ${user.location.district}`}
//                 {user?.farmDetails?.farmSize && ` • ${user.farmDetails.farmSize} acres`}
//               </p>
//             </div>
//             <div className="hero-actions">
//               <Link to="/chatbot" className="btn btn-primary">
//                 <MessageSquare size={20} />
//                 Ask FarmBot
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container dashboard-content">
//         {/* Stats Grid */}
//         <div className="stats-grid animate-slide-up">
//           <div className="stat-card">
//             <div className="stat-icon success">
//               <Activity size={24} />
//             </div>
//             <div className="stat-info">
//               <div className="stat-value">{stats?.totalQueries || 0}</div>
//               <div className="stat-label">Total Queries</div>
//             </div>
//           </div>

//           <div className="stat-card">
//             <div className="stat-icon info">
//               <BarChart3 size={24} />
//             </div>
//             <div className="stat-info">
//               <div className="stat-value">
//                 {featureTypeNames[stats?.mostUsedFeature]?.split(' ')[0] || 'N/A'}
//               </div>
//               <div className="stat-label">Most Used Feature</div>
//             </div>
//           </div>

//           <div className="stat-card">
//             <div className="stat-icon warning">
//               <Calendar size={24} />
//             </div>
//             <div className="stat-info">
//               <div className="stat-value">
//                 {stats?.userSince ? new Date(stats.userSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
//               </div>
//               <div className="stat-label">Member Since</div>
//             </div>
//           </div>
//         </div>

//         {/* Quick Access Features */}
//         <section className="dashboard-section">
//           <div className="section-header">
//             <h2 className="section-title">Quick Access</h2>
//             <p className="section-description">Start exploring our AI-powered features</p>
//           </div>

//           <div className="features-grid">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <Link
//                   key={index}
//                   to={feature.link}
//                   className="feature-card animate-slide-up"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="feature-card-header">
//                     <div className="feature-icon" style={{ background: feature.gradient }}>
//                       <Icon size={28} strokeWidth={2} />
//                     </div>
//                     <ArrowRight className="feature-arrow" size={20} />
//                   </div>
//                   <h3 className="feature-title">{feature.title}</h3>
//                   <p className="feature-description">{feature.description}</p>
//                 </Link>
//               );
//             })}
//           </div>
//         </section>

//         {/* Recent Activity */}
//         <section className="dashboard-section">
//           <div className="section-header">
//             <h2 className="section-title">Recent Activity</h2>
//             <Link to="/history" className="section-link">
//               View All <ArrowRight size={16} />
//             </Link>
//           </div>

//           <div className="activity-card card">
//             {recentHistory.length === 0 ? (
//               <div className="empty-state">
//                 <Activity size={48} className="empty-icon" />
//                 <h3 className="empty-title">No Activity Yet</h3>
//                 <p className="empty-description">
//                   Start exploring features to see your activity here
//                 </p>
//                 <Link to="/crops" className="btn btn-primary mt-md">
//                   Get Started
//                 </Link>
//               </div>
//             ) : (
//               <div className="activity-list">
//                 {recentHistory.map((item, index) => {
//                   const Icon = getFeatureIcon(item.featureType);
//                   return (
//                     <div key={index} className="activity-item">
//                       <div className="activity-icon">
//                         <Icon size={20} />
//                       </div>
//                       <div className="activity-details">
//                         <div className="activity-title">
//                           {featureTypeNames[item.featureType] || item.featureType}
//                         </div>
//                         <div className="activity-time">
//                           <Clock size={14} />
//                           {new Date(item.createdAt).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="activity-status">
//                         {item.success !== false ? (
//                           <span className="badge badge-success">
//                             <CheckCircle size={14} />
//                             Success
//                           </span>
//                         ) : (
//                           <span className="badge badge-error">
//                             <AlertCircle size={14} />
//                             Failed
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { historyAPI } from '../../services/api';
import {
  Sprout, Cloud, Bug, Droplets, TrendingUp, MessageSquare,
  Activity, BarChart3, ArrowRight, Loader2, Calendar,
  CheckCircle, AlertCircle, Clock, MapPin
} from 'lucide-react';
import './Dashboard.css';
import { dashboardAPI } from '../../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        historyAPI.getStats(),
        historyAPI.getRecent({ limit: 5 })
      ]);
      setStats(statsRes.data.data || {});
      setRecentHistory(historyRes.data.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { title: 'Crop Recommendations', icon: Sprout, link: '/crops', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { title: 'Weather Forecast', icon: Cloud, link: '/weather', gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
    { title: 'Disease Detection', icon: Bug, link: '/disease', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    { title: 'Irrigation Guide', icon: Droplets, link: '/irrigation', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
    { title: 'Market Prices', icon: TrendingUp, link: '/market', gradient: 'linear-gradient(135deg, #a855f7, #9333ea)' },
    { title: 'FarmBot Assistant', icon: MessageSquare, link: '/chatbot', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
  ];

  const featureTypeNames = {
    crop_recommendation: 'Crop Recommendation',
    weather_query: 'Weather Query',
    disease_detection: 'Disease Detection',
    irrigation_advice: 'Irrigation Advice',
    fertilizer_guide: 'Fertilizer Guide',
    market_price: 'Market Price',
    chatbot: 'Chatbot'
  };

  const getFeatureIcon = (type) => {
    const icons = { crop_recommendation: Sprout, weather_query: Cloud, disease_detection: Bug, irrigation_advice: Droplets, fertilizer_guide: Droplets, market_price: TrendingUp, chatbot: MessageSquare };
    return icons[type] || Activity;
  };

  if (loading) return (
    <div className="loading-screen">
      <Loader2 size={48} className="animate-spin" />
      <p>Loading your dashboard...</p>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="container">
          <h1>Welcome back, {user?.name} 👋</h1>
          <p><MapPin size={18} /> {user?.location?.state}, {user?.location?.district}</p>
          <Link to="/chatbot" className="btn btn-primary"><MessageSquare size={20} /> Ask FarmBot</Link>
        </div>
      </div>

      <div className="container dashboard-content">
        {/* Quick Access */}
        <section className="features-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link key={i} to={f.link} className="feature-card" style={{ background: f.gradient }}>
                <Icon size={28} /> {f.title}
              </Link>
            );
          })}
        </section>

        {/* Recent Activity */}
        <section>
          <h2>Recent Activity</h2>
          {recentHistory.length === 0 ? (
            <div className="empty-state">
              <Activity size={48} />
              <p>No activity yet. Start exploring features!</p>
              <Link to="/crops" className="btn btn-primary">Get Started</Link>
            </div>
          ) : (
            <div className="activity-list">
              {recentHistory.map((item, i) => {
                const Icon = getFeatureIcon(item.featureType);
                return (
                  <div key={i} className="activity-item">
                    <Icon size={20} />
                    <div>
                      {featureTypeNames[item.featureType] || item.featureType}
                      <br/>
                      <small>{new Date(item.createdAt).toLocaleString()}</small>
                    </div>
                    {item.success !== false ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
