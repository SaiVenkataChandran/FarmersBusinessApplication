// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./ConsumerReg.module.css"; // CSS Module import

// const ConsumerReg = () => {
//     const [formData, setFormData] = useState({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         phone: ""
//     });

//     const [error, setError] = useState("");
//     const [isRegistered, setIsRegistered] = useState(false);
//     const [showOtpField, setShowOtpField] = useState(false);
//     const [otp, setOtp] = useState("");
//     const [serverOtp, setServerOtp] = useState(""); // Store OTP received
//     const [serverMessage, setServerMessage] = useState("");

//     const [otpTimer, setOtpTimer] = useState(120); // 2 mins
//     const [timerInterval, setTimerInterval] = useState(null);

//     // Start countdown for OTP
//     const startOtpTimer = () => {
//         const interval = setInterval(() => {
//             setOtpTimer((prev) => {
//                 if (prev <= 1) {
//                     clearInterval(interval);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//         setTimerInterval(interval);
//     };

//     // Stop/reset timer
//     const resetOtpTimer = () => {
//         clearInterval(timerInterval);
//         setOtpTimer(120);
//     };

//     // Handle input change
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // OTP input
//     const handleOtpChange = (e) => {
//         setOtp(e.target.value);
//     };

//     // Request OTP
//     const handleRequestOtp = async (e) => {
//         e.preventDefault();

//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match!");
//             return;
//         }

//         setError("");

//         try {
//             const response = await axios.post("http://localhost:5000/api/request-otp", {
//                 email: formData.email,
//             });

//             console.log("OTP Response:", response.data);
//             setServerOtp(response.data.otp); // Store OTP
//             setServerMessage("OTP sent to your email. Please enter it below.");
//             setShowOtpField(true);
//             startOtpTimer(); // Start 2-minute timer
//         } catch (err) {
//             console.error("OTP Request Error:", err);
//             setError(err.response?.data?.message || "Failed to request OTP.");
//         }
//     };

//     // Verify OTP and register
//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();

//         if (otpTimer === 0) {
//             setError("OTP expired. Please request a new one.");
//             return;
//         }

//         if (otp !== serverOtp) {
//             setError("Invalid OTP. Try again.");
//             return;
//         }

//         setError("");
//         setServerMessage("OTP verified! Registering user...");
//         resetOtpTimer();

//         registerUser();
//     };

//     // Register user in DB
//     const registerUser = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/api/adduser", formData);

//             console.log("Registration Response:", response.data);
//             setServerMessage("Registration successful! You can now log in.");
//             setIsRegistered(true);
//             setShowOtpField(false);
//         } catch (err) {
//             console.error("Registration Error:", err);
//             setError(err.response?.data?.message || "Registration failed. Try again.");
//         }
//     };

//     // Cleanup timer on unmount
//     useEffect(() => {
//         return () => clearInterval(timerInterval);
//     }, [timerInterval]);

//     return (
//         <div className={styles["container"]}>
//             <div className={styles["consumer-reg-container"]}>
//                 <h1>Customer Registration</h1>

//                 {/* Registration Form */}
//                 {!showOtpField && !isRegistered && (
//                     <form onSubmit={handleRequestOtp}>
//                         <input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             placeholder="Full Name"
//                             required
//                             className={styles["input"]}
//                         />
//                         <br />
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             required
//                             className={styles["input"]}
//                         />
//                         <br />
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Password"
//                             required
//                             className={styles["input"]}
//                         />
//                         <br />
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             placeholder="Confirm Password"
//                             required
//                             className={styles["input"]}
//                         />
//                         <br />
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="Phone no"
//                             required
//                             className={styles["input"]}
//                         />
//                         <br />

//                         {error && <p className={styles["errorMessage"]}>{error}</p>}
//                         {serverMessage && <p className={styles["successMessage"]}>{serverMessage}</p>}

//                         <button type="submit" className={styles["button"]}>Request OTP</button>
//                     </form>
//                 )}

//                 {/* OTP Form */}
//                 {showOtpField && !isRegistered && (
//                     <form onSubmit={handleOtpSubmit}>
//                         <h3>OTP sent to {formData.email}</h3>
//                         <p className={styles["timer"]}>Expires in: {otpTimer} seconds</p>
//                         <input
//                             type="text"
//                             value={otp}
//                             onChange={handleOtpChange}
//                             placeholder="Enter OTP"
//                             required
//                             className={styles["input"]}
//                             disabled={otpTimer === 0}
//                         />
//                         <br />
//                         {error && <p className={styles["errorMessage"]}>{error}</p>}
//                         <button type="submit" disabled={otpTimer === 0} className={styles["button"]}>Verify OTP & Register</button>
//                     </form>
//                 )}

//                 {/* Registration Success */}
//                 {isRegistered && (
//                     <div>
//                         <p className={styles["successMessage"]}>Registration successful! Click below to login.</p>
//                         <Link to="/consumer-login" className={styles["loginLink"]}>Login here</Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ConsumerReg;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./ConsumerReg.module.css"; // CSS Module import

const ConsumerReg = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "" // Add address field
    });

    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [showOtpField, setShowOtpField] = useState(false);
    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState(""); // Store OTP received
    const [serverMessage, setServerMessage] = useState("");

    const [otpTimer, setOtpTimer] = useState(120); // 2 mins
    const [timerInterval, setTimerInterval] = useState(null);

    // Start countdown for OTP
    const startOtpTimer = () => {
        const interval = setInterval(() => {
            setOtpTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setTimerInterval(interval);
    };

    // Stop/reset timer
    const resetOtpTimer = () => {
        clearInterval(timerInterval);
        setOtpTimer(120);
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // OTP input
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Request OTP
    const handleRequestOtp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/request-otp", {
                email: formData.email,
            });

            console.log("OTP Response:", response.data);
            setServerOtp(response.data.otp); // Store OTP
            setServerMessage("OTP sent to your email. Please enter it below.");
            setShowOtpField(true);
            startOtpTimer(); // Start 2-minute timer
        } catch (err) {
            console.error("OTP Request Error:", err);
            setError(err.response?.data?.message || "Failed to request OTP.");
        }
    };

    // Verify OTP and register
    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (otpTimer === 0) {
            setError("OTP expired. Please request a new one.");
            return;
        }

        if (otp !== serverOtp) {
            setError("Invalid OTP. Try again.");
            return;
        }

        setError("");
        setServerMessage("OTP verified! Registering user...");
        resetOtpTimer();

        registerUser();
    };

    // Register user in DB
    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/adduser", formData);

            console.log("Registration Response:", response.data);
            setServerMessage("Registration successful! You can now log in.");
            setIsRegistered(true);
            setShowOtpField(false);
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => clearInterval(timerInterval);
    }, [timerInterval]);

    return (
        <div className={styles["container"]}>
            <div className={styles["consumer-reg-container"]}>
                <h1>Customer Registration</h1>

                {/* Registration Form */}
                {!showOtpField && !isRegistered && (
                    <form onSubmit={handleRequestOtp}>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className={styles["input"]}
                        />
                        <br />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className={styles["input"]}
                        />
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className={styles["input"]}
                        />
                        <br />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                            className={styles["input"]}
                        />
                        <br />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone no"
                            required
                            className={styles["input"]}
                        />
                        <br />
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                            className={styles["input"]}
                        />
                        <br />

                        {error && <p className={styles["errorMessage"]}>{error}</p>}
                        {serverMessage && <p className={styles["successMessage"]}>{serverMessage}</p>}

                        <button type="submit" className={styles["button"]}>Request OTP</button>
                    </form>
                )}

                {/* OTP Form */}
                {showOtpField && !isRegistered && (
                    <form onSubmit={handleOtpSubmit}>
                        <h3>OTP sent to {formData.email}</h3>
                        <p className={styles["timer"]}>Expires in: {otpTimer} seconds</p>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP"
                            required
                            className={styles["input"]}
                            disabled={otpTimer === 0}
                        />
                        <br />
                        {error && <p className={styles["errorMessage"]}>{error}</p>}
                        <button type="submit" disabled={otpTimer === 0} className={styles["button"]}>Verify OTP & Register</button>
                    </form>
                )}

                {/* Registration Success */}
                {isRegistered && (
                    <div>
                        <p className={styles["successMessage"]}>Registration successful! Click below to login.</p>
                        <Link to="/consumer-login" className={styles["loginLink"]}>Login here</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsumerReg;
