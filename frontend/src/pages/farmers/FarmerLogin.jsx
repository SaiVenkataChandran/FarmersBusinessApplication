import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./FarmerLogin.module.css";

const FarmerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const otpInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showForgotPassword && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showForgotPassword]);

  useEffect(() => {
    if (isOtpVerified) {
      setTimeout(() => {
        document.querySelector(`.${styles["reset-input"]}[type='password']`)?.focus();
      }, 100);
    }
  }, [isOtpVerified, styles]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/farmer-login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("farmerId", res.data.farmerId);
        navigate("/farmer-home");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    setEnteredOtp("");

    try {
      const emailCheckRes = await axios.post("http://localhost:5000/api/check-emailfarm", { email });

      if (!emailCheckRes.data || emailCheckRes.data.message !== "Email exists") {
        setError("Email not found. Please check and try again.");
        return;
      }

      const otpRes = await axios.post("http://localhost:5000/api/send-otpfarm", { email });

      if (otpRes.data.message === "OTP sent successfully") {
        setShowForgotPassword(true);
        setMessage("OTP sent to your email.");
      } else {
        setError(otpRes.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("An error occurred while sending OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otpfarm", {
        email,
        otp: enteredOtp,
      });

      if (res.data.verified) {
        setIsOtpVerified(true);
        setMessage("OTP verified! You can now reset your password.");
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("OTP verification failed.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-passwordfarm", {
        email,
        newPassword,
      });

      if (res.data.success) {
        setMessage("Password reset successful! You can now login with your new password.");
        setShowForgotPassword(false);
        setIsOtpVerified(false);
        setPassword("");
        setEnteredOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Password reset failed.");
      }
    } catch (err) {
      setError("Something went wrong while resetting password.");
    }
  };

  return (
    <div className={styles["app-container"]}>
      <div className={styles["farmer-logins-container"]}>
        <h1>Farmer Login</h1>

        {error && <p className={styles["error-message"]}>{error}</p>}
        {message && <p className={styles["success-message"]}>{message}</p>}

        {showForgotPassword ? (
          <div className={styles["reset-container"]}>
            <h3 className={styles["reset-title"]}>Reset Password</h3>

            {!isOtpVerified ? (
              <>
                <input
                  ref={otpInputRef}
                  type="text"
                  className={styles["reset-input"]}
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                />
                <button className={styles["reset-button"]} onClick={handleOtpSubmit}>
                  Verify OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles["reset-input"]}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles["reset-input"]}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={`${styles["reset-button"]} ${styles["toggle-button"]}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
                <button className={styles["reset-button"]} onClick={handleResetPassword}>
                  Reset Password
                </button>
              </>
            )}
          </div>
        ) : (
          <form className={styles["login-form"]} onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p className={styles["forgot-password"]}>
              <button type="button" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </p>
          </form>
        )}

        <Link to="/" className={styles["back-link"]}>
          Back to Home
        </Link>

        <p className={styles["register-link"]}>
          New user?{" "}
          <Link to="/farmer-register" className={styles["reg-button"]}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FarmerLogin;