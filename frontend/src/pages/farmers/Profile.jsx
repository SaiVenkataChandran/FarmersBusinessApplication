// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../../Components/Navbar";
// import "./Profile.css";

// const Profile = () => {
//   const farmerId = localStorage.getItem("farmerId");
//   const [farmer, setFarmer] = useState(null);

//   useEffect(() => {
//     const fetchFarmer = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/farmers/${farmerId}`);
//         setFarmer(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.error("Error fetching farmer details:", error);
//       }
//     };

//     if (farmerId) {
//       fetchFarmer();
//     }
//   }, [farmerId]);

//   if (!farmer) return <div className="text-center mt-5">Loading...</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="profile-container">
//         <div className="card p-4">
//           <div className="text mt-3 text-center">
//             <p><strong>📍 Full Name:</strong> {farmer.fullName}</p>
//             <p><strong>📍 Address:</strong> {farmer.address}</p>
//             <p><strong>📞 Phone:</strong> {farmer.phone}</p>
//             <p><strong>📧 Email:</strong> {farmer.email}</p>
//             <p><strong>🆔 Aadhar No:</strong> {farmer.aadharNo}</p>
//           </div>

//           <div className="d-flex mt-2 justify-content-center">
//             <button className="btn1 btn-dark">Edit Profile</button>
//           </div>

//           <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
//             <span><i className="fa fa-twitter"></i></span>
//             <span><i className="fa fa-facebook-f"></i></span>
//             <span><i className="fa fa-instagram"></i></span>
//             <span><i className="fa fa-linkedin"></i></span>
//           </div>

//           <div className="px-2 rounded mt-4 date">
//             <span className="join">{new Date(farmer.register_in).toLocaleDateString()}</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import "./Profile.css";

const Profile = () => {
  const farmerId = localStorage.getItem("farmerId");
  const [farmer, setFarmer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    aadharNo: "",
  });

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/farmers/${farmerId}`);
        setFarmer(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      }
    };

    if (farmerId) {
      fetchFarmer();
    }
  }, [farmerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/farmersedit/${farmerId}`, formData);
      setFarmer(res.data);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message); // Shows "Email already exists..." or any custom message
      } else {
        alert("Failed to update profile");
      }
      console.log("Error updating profile:", error);
    }
  };


  if (!farmer) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <div className="profile-background">
        <Navbar />
        <div className="profile-container">
          <div className="card p-4">
            <div className="text mt-3 text-center">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="form-control mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    placeholder="Aadhar No"
                    className="form-control mb-2"
                  />
                </>
              ) : (
                <>
                  <p><strong>📍 Full Name:</strong> {farmer.fullName}</p>
                  <p><strong>📍 Address:</strong> {farmer.address}</p>
                  <p><strong>📞 Phone:</strong> {farmer.phone}</p>
                  <p><strong>📧 Email:</strong> {farmer.email}</p>
                  <p><strong>🆔 Aadhar No:</strong> {farmer.aadharNo}</p>
                </>
              )}
            </div>

            <div className="d-flex mt-2 justify-content-center">
              {editMode ? (
                <>
                  <button className="btn1 btn-success me-2" onClick={handleUpdate}>Save</button>
                  <button className="btn1 btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                </>
              ) : (
                <button className="btn1 btn-dark" onClick={() => setEditMode(true)}>Edit Profile</button>
              )}
            </div>

            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span><i className="fa fa-twitter"></i></span>
              <span><i className="fa fa-facebook-f"></i></span>
              <span><i className="fa fa-instagram"></i></span>
              <span><i className="fa fa-linkedin"></i></span>
            </div>

            <div className="px-2 rounded mt-4 date">
              <span className="join">{new Date(farmer.register_in).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


