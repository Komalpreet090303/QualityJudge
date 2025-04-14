// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react';
// --- VVV Google OAuth Imports VVV ---
import { useGoogleLogin, googleLogout, TokenResponse } from '@react-oauth/google';
// --- ^^^ Google OAuth Imports ^^^ ---
import './Navbar.css';
import logo from '../../assets/quality.png'; // Adjust path if needed
import ThemeToggle from '../ThemeToggle/ThemeToggle'; // Assuming path is correct

// --- VVV Define expected user profile structure VVV ---
interface UserProfile {
    name?: string;
    picture?: string;
}

// --- VVV Define Props Interface VVV ---
interface NavbarProps {
    // Optional theme props (if needed)
    onThemeChange?: (isDark: boolean) => void;
    initialIsDark?: boolean;

    // Required Auth props
    isLoggedIn: boolean;
    userProfile: UserProfile | null;
    onLoginSuccess: (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => void; // Type from library
    onLoginError: () => void;
    onLogout: () => void;
}
// --- ^^^ Define Props Interface ^^^ ---

// --- VVV UPDATE COMPONENT SIGNATURE TO ACCEPT PROPS VVV ---
const Navbar: React.FC<NavbarProps> = ({
    onThemeChange,
    initialIsDark,
    isLoggedIn,
    userProfile,
    onLoginSuccess,
    onLoginError,
    onLogout
}) => {
// --- ^^^ UPDATE COMPONENT SIGNATURE TO ACCEPT PROPS ^^^ ---

  const [showTools, setShowTools] = useState(false);
  const [showAPI, setShowAPI] = useState(false);

  // --- VVV Google Login Hook VVV ---
  const login = useGoogleLogin({
      onSuccess: onLoginSuccess, // Pass handler from App
      onError: onLoginError,     // Pass handler from App
  });
  // --- ^^^ Google Login Hook ^^^ ---

  // --- VVV Logout Handler VVV ---
  const handleLogoutClick = () => {
      googleLogout(); // Clear Google session
      onLogout();     // Clear App state
  };
  // --- ^^^ Logout Handler ^^^ ---


  // Dropdown Handlers
  const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
  };
  const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(false);
  };

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-left">
        <img src={logo} alt="QualityJudge Logo" className="custom-navbar-logo" />
        <h2 className="custom-navbar-brand">Quality<strong>Judge</strong></h2>
      </div>

      {/* Keep your Links section */}
      <ul className="custom-navbar-links">
        <li
          className="custom-navbar-item"
          onMouseEnter={() => handleMouseEnter(setShowTools)}
          onMouseLeave={() => handleMouseLeave(setShowTools)}
        >
          Tools ▾
          {showTools && ( <div className="custom-dropdown"> <a href="#">...</a> </div> )}
        </li>
        <li
          className="custom-navbar-item"
          onMouseEnter={() => handleMouseEnter(setShowAPI)}
          onMouseLeave={() => handleMouseLeave(setShowAPI)}
        >
          API ▾
           {showAPI && ( <div className="custom-dropdown"> <a href="#">...</a> </div> )}
        </li>
      </ul>

      <div className="custom-navbar-right">
        

        {/* === VVV Conditional Auth Rendering VVV === */}
        {isLoggedIn && userProfile ? (
             <div className="navbar-user-info">
                {userProfile.picture && (
                    <img
                        src={userProfile.picture}
                        alt={userProfile.name || 'User'}
                        className="navbar-user-avatar"
                        referrerPolicy="no-referrer"
                    />
                )}
                <span className="navbar-user-name">
                    {userProfile.name || 'User'}
                </span>
                <button onClick={handleLogoutClick} className="custom-btn1 logout">
                    Logout
                </button>
            </div>
        ) : (
            <div className="custom-navbar-auth">
                {/* --- VVV Update onClick for login/signup VVV --- */}
                <button onClick={() => login()} className="custom-btn1 login">Login</button>
                <button onClick={() => login()} className="custom-btn1 signup">Sign Up with Google</button>
                {/* --- ^^^ Update onClick for login/signup ^^^ --- */}
            </div>
        )}
         {/* === ^^^ Conditional Auth Rendering ^^^ === */}
      </div>
    </nav>
  );
};

export default Navbar;