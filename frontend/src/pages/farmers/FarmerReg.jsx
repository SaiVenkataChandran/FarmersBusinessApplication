import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./FarmerReg.module.css";

const FarmerReg = () => {
    // Individual form field states
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");

    // OTP and flow states
    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpTimer, setOtpTimer] = useState(120);
    const [timerInterval, setTimerInterval] = useState(null);

    // UI feedback
    const [error, setError] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    // Start OTP timer countdown
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

    const resetOtpTimer = () => {
        clearInterval(timerInterval);
        setOtpTimer(120);
    };

    // Handle OTP request
    const handleRequestOtp = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPassword || !phone || !address || !aadharNo || !accountNumber || !ifscCode) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Email cannot be empty");
            return;
        }

        try {
            const checkRes = await axios.post("http://localhost:5000/api/check-emailfarmr", { email });
            if (checkRes.data.exists) {
                setError("This email is already registered. Please login instead.");
                setServerMessage("");
            } else {
                const otpRes = await axios.post("http://localhost:5000/api/request-otp", { email });

                setServerOtp(otpRes.data.otp);
                setShowOtpField(true);
                setError("");
                setServerMessage("OTP sent to your email. Please enter it below.");
                startOtpTimer();
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.response?.data?.message || "Something went wrong");
            setServerMessage("");
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (otpTimer === 0) {
            setError("OTP expired. Please request a new one.");
            return;
        }

        if (otp !== serverOtp) {
            setError("Invalid OTP.");
            return;
        }

        setError("");
        setServerMessage("OTP verified! Registering farmer...");
        resetOtpTimer();
        registerFarmer();
    };

    // Final farmer registration
    const registerFarmer = async () => {
        try {
            const formData = {
                fullName,
                email,
                password,
                phone,
                address,
                aadharNo,
                accountNumber,
                ifscCode,
            };

            const res = await axios.post("http://localhost:5000/api/addfarmer", formData);
            console.log("Farmer Registration:", res.data);
            setIsRegistered(true);
            setShowOtpField(false);
            setServerMessage("Registration successful!");
        } catch (err) {
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    // Cleanup timer
    useEffect(() => {
        return () => clearInterval(timerInterval);
    }, [timerInterval]);

    return (
        <div className={styles["app-container"]}>
            <div className={styles["farmer-logins-container"]}>
                <h1>Farmer Registration</h1>

                {!showOtpField && !isRegistered && (
                    <form onSubmit={handleRequestOtp}>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                        <input type="text" value={aadharNo} onChange={(e) => setAadharNo(e.target.value)} placeholder="Aadhar Number" required />
                        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account Number" required />
                        <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} placeholder="IFSC Code" required />

                        {error && (
                            <p className={styles["error-message"]}>
                                {error}{" "}
                                {error.includes("already registered") && (
                                    <Link to="/farmer-login" className={styles["back-link"]}>
                                        Login here
                                    </Link>
                                )}
                            </p>
                        )}
                        {serverMessage && <p className={styles["success-message"]}>{serverMessage}</p>}

                        <button type="submit">Request OTP</button>
                    </form>
                )}

                {showOtpField && !isRegistered && (
                    <form onSubmit={handleOtpSubmit}>
                        <h3>OTP sent to {email}</h3>
                        <p>Expires in: {otpTimer} seconds</p>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required disabled={otpTimer === 0} />
                        <button type="submit" disabled={otpTimer === 0}>Verify OTP & Register</button>
                    </form>
                )}

                {isRegistered && (
                    <div>
                        <p className={styles["success-message"]}>Registration successful! Click below to login.</p>
                        <Link to="/farmer-login" className={styles["back-link"]}>Login here</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FarmerReg;
