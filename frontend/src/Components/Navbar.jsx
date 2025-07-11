// import React, { useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/logo.png";


// import {
//   AiOutlineHome,
//   AiOutlineShoppingCart,
//   AiOutlineOrderedList,
//   AiOutlineBell,
//   AiOutlineUser,
// } from "react-icons/ai";
// import styles from "./Navbar.module.css";

// const Navbar = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const loadGoogleTranslate = () => {
//       if (!window.googleTranslateElementInit) {
//         window.googleTranslateElementInit = () => {
//           new window.google.translate.TranslateElement(
//             { pageLanguage: "en" },
//             "google_translate_element"
//           );
//         };
//       }

//       if (!document.getElementById("google-translate-script")) {
//         const script = document.createElement("script");
//         script.id = "google-translate-script";
//         script.src =
//           "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//         script.async = true;
//         document.body.appendChild(script);
//       } else {
//         if (window.google && window.google.translate) {
//           window.googleTranslateElementInit();
//         }
//       }
//     };

//     loadGoogleTranslate();
//   }, [location.pathname]);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo} style={{ display: "flex", alignItems: "center" }}>
//         <div className={styles.logoWrapper}>
//           <img src={logo} alt="AgriBridge Logo" className={styles.logoImg} />
//         </div>
//         <span style={{ fontSize: "22px", fontWeight: "bold", marginLeft: "10px" }}>AgriBridge</span>
//       </div>

//       <ul className={styles.navLinks}>
//         <li>
//           <Link to="/financial-dashboard">
//             <AiOutlineHome /> Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link to="/products">
//             <AiOutlineShoppingCart /> Products
//           </Link>
//         </li>
//         <li>
//           <Link to="/orders">
//             <AiOutlineOrderedList /> Orders
//           </Link>
//         </li>
//         <li>
//           <Link to="/notifications">
//             <AiOutlineBell /> Notifications
//           </Link>
//         </li>
//         <li>
//           <Link to="/profile">
//             <AiOutlineUser /> Profile
//           </Link>
//         </li>
//         <li>
//           <Link to="/">
//            Logout
//           </Link>
//           </li>
//         <li className={styles.translateWidget}>
//           <div id="google_translate_element"></div>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineOrderedList,
  AiOutlineBell,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  if (!localStorage.getItem("farmerId")) return null;

  useEffect(() => {
    const loadGoogleTranslate = () => {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        };
      }

      if (!document.getElementById("google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      } else {
        if (window.google && window.google.translate) {
          window.googleTranslateElementInit();
        }
      }
    };

    loadGoogleTranslate();
  }, [location.pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="AgriBridge Logo" className={styles.logoImg} />
        </div>
        <span style={{ fontSize: "22px", fontWeight: "bold", marginLeft: "10px" }}>
          {/* AgriBridge */}
        </span>
      </div>

      <ul className={styles.navLinks}>
        <li className={location.pathname === "/financial-dashboard" ? styles.active : ""}>
          <Link to="/financial-dashboard">
            <AiOutlineHome /> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/products" ? styles.active : ""}>
          <Link to="/products">
            <AiOutlineShoppingCart /> Products
          </Link>
        </li>
        <li className={location.pathname === "/orders" ? styles.active : ""}>
          <Link to="/orders">
            <AiOutlineOrderedList /> Orders
          </Link>
        </li>
        <li className={location.pathname === "/notifications" ? styles.active : ""}>
          <Link to="/notifications">
            <AiOutlineBell /> Notifications
          </Link>
        </li>
        <li className={location.pathname === "/profile" ? styles.active : ""}>
          <Link to="/profile">
            <AiOutlineUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li className={styles.translateWidget}>
          <div id="google_translate_element"></div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;