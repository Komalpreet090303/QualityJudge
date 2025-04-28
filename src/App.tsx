// src/App.tsx
import React, { useState, useCallback, useEffect } from 'react';
// --- VVV Add axios import VVV ---
import axios from 'axios';
// --- ^^^ Add axios import ^^^ ---
import Navbar from './components/Navbar/Navbar';
import FileUploadButton from './components/FileUploadButton/FileUploadButton';
import Options from './options'; // Ensure path is correct
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay';
import Footer from './components/Footer/Footer';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import ThemeToggle from './components/ThemeToggle/ThemeToggle'; // If used directly
import './App.css';
import './components/CalculateButton/calculateButton.css';
import './options.css';
import './components/FeaturesSection/FeaturesSection.module.css';
import { FaSpinner } from 'react-icons/fa';
// --- VVV Import TokenResponse type (or relevant part) VVV ---

import { TokenResponse } from '@react-oauth/google'; // Actual type

// Define user profile structure (reuse from Navbar or define once)
interface UserProfile {
    name?: string;
    picture?: string;
    email?: string;
}
// --- ^^^ Define user profile structure ^^^ ---


function App() {
  // --- Existing State ---
  const [fileSelected, setFileSelected] = useState(() => !!localStorage.getItem("selectedFileName"));
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(() => localStorage.getItem("selectedFileName"));
  const [options, setOptions] = useState<Record<string, boolean>>({ /* ... */ });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string | number> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGlobalDark, setIsGlobalDark] = useState(() => { /* ... */
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : false; // Default light
  });

  // --- VVV Authentication State VVV ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  // --- ^^^ Authentication State ^^^ ---

  // --- Existing Handlers ---
  const handleFileChange = useCallback((file: File | null) => {
    setVideoFile(file);
    console.log("hello");
    setFileSelected(true);
    
    const currentFileName = file ? file.name : null;
    setFileName(currentFileName); // Keep display name updated
    if (file) { localStorage.setItem("selectedFileName", file.name);console.log(file.name); }
    else { localStorage.removeItem("selectedFileName"); }
    setResults(null); setError(null);
  }, []);

  // Handler for option checkboxes (using the tile component handler)
   const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: checked }));
    setResults(null); setError(null);
  }, []);


  // API Call Simulation (Keep existing)
    // --- VVV THIS IS WHERE YOU INTEGRATE YOUR API CALL VVV ---
    const handleCalculate = useCallback(async () => {
      setError(null);
      setResults(null);
  
      // 1. --- Input Validation ---
      if (!videoFile) {
        setError("No video file selected. Please upload a video.");
        return; 
      }
      const selectedFeatures = Object.entries(options)
        .filter(([key, value]) => value === true) 
        .map(([key]) => key); 
  
      if (selectedFeatures.length === 0) {
        setError("Please select at least one parameter to analyze.");
        return;
      }
  
      setIsLoading(true); 
  
      console.log("Calling Prediction API for file:", videoFile.name);
      console.log("Selected features:", selectedFeatures);
  
    
      const formData = new FormData();

      formData.append('video', videoFile, videoFile.name);
    
      formData.append('features', JSON.stringify(selectedFeatures));
  
     
      try {
    
        const API_ENDPOINT = 'https://qualityjudge-1.onrender.com/api/predict'; 
       
  
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          body: formData,
        });
  
        
        if (!response.ok) {
          console.log("nooooooooooooooooooooo")
          let errorMsg = `API Error: ${response.status} ${response.statusText}`;
          try {
              const errorData = await response.json();
              errorMsg = errorData.message || errorData.error || errorMsg;
          } catch (e) {
              
          }
          throw new Error(errorMsg);
        }
  
        
        const predictionResults = await response.json();
        console.log('API Response Data:', predictionResults);
  
       
        setResults(predictionResults);
        setError(null); 
  
      } catch (err: any) {
       
        console.error("Prediction API call failed:", err);
        setError(err.message || "Failed to analyze video. Please try again.");
        setResults(null); 
      } finally {
       
        setIsLoading(false);
      }
    }, [options, videoFile,fileName,fileSelected]);  // Add videoFile dependency
  const handleThemeChange = useCallback((isDark: boolean) => { /* ... */ }, []);

  // --- VVV Google Login/Logout Handlers VVV ---
  const handleLoginSuccess = useCallback(async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
      console.log('Login Success - Token Response:', tokenResponse);
      if (tokenResponse && tokenResponse.access_token) {
          try {
              const userInfoResponse = await axios.get(
                  'https://www.googleapis.com/oauth2/v3/userinfo',
                  { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
              );
              console.log('User Info:', userInfoResponse.data);
              const profileData: UserProfile = {
                  name: userInfoResponse.data.name,
                  picture: userInfoResponse.data.picture,
                  email: userInfoResponse.data.email,
              };
              setUserProfile(profileData);
              setIsLoggedIn(true);
              // Optional: Store profile in localStorage for persistence on refresh
              // localStorage.setItem('userProfile', JSON.stringify(profileData));
          } catch (err) {
              console.error("Failed to fetch user info:", err);
              setError("Login failed to fetch user details.");
              setIsLoggedIn(false); setUserProfile(null); // Reset on error
          }
      } else {
          handleLoginError(); // Call error handler if no token
      }
  }, []); // Empty dependency array ok if not relying on other state inside

  const handleLoginError = useCallback(() => {
      console.error('Google Login Failed');
      setError("Google Sign-In failed. Please try again.");
      setIsLoggedIn(false); setUserProfile(null);
  }, []);

  const handleLogout = useCallback(() => {
      setIsLoggedIn(false);
      setUserProfile(null);
      // Optional: Clear stored profile
      // localStorage.removeItem('userProfile');
      console.log('User logged out');
  }, []);
  // --- ^^^ Google Login/Logout Handlers ^^^ ---

   // --- VVV Optional: Load user from localStorage on initial mount VVV ---
   useEffect(() => {
       // Example only, implement proper token check/refresh in a real app
       // const storedProfile = localStorage.getItem('userProfile');
       // if (storedProfile) {
       //     try {
       //         setUserProfile(JSON.parse(storedProfile));
       //         setIsLoggedIn(true); // Assume logged in if profile exists (simplistic)
       //     } catch (e) {
       //         console.error("Error parsing stored user profile", e);
       //         localStorage.removeItem('userProfile'); // Clear invalid data
       //     }
       // }
   }, []);
   // --- ^^^ Optional: Load user from localStorage ^^^ ---


  // Derived State
  const isAnyOptionSelected = Object.values(options).some(value => value === true);
  const canCalculate = fileSelected && isAnyOptionSelected && !isLoading;
  const lowerContentWrapperClass = `below-upload-content ${isGlobalDark ? 'force-light-mode' : ''}`;

  return (
    <>
      {/* --- VVV Pass ALL required props to Navbar VVV --- */}
      <Navbar
        onThemeChange={handleThemeChange}
        initialIsDark={isGlobalDark}
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
        onLoginSuccess={handleLoginSuccess}
        onLoginError={handleLoginError}
        onLogout={handleLogout}
      />
      {/* --- ^^^ Pass ALL required props to Navbar ^^^ --- */}

      <main id="content-section">
        <div id="fixed">
        <h2 id="heading">GET VIDEO QUALITY PARAMETERS</h2>
        <p id="heading_text">
          Upload your video file, select the parameters you want to analyze,
          <br /> and get instant quality scores.
        </p>
        </div>

        {/* --- Optional: Reference Videos Section --- */}
        {/* <div className="reference-videos-container"> ...videos... </div> */}

        {/* Centering container */}
        <div className="content-centerer">

          {/* === Step 1: Upload === */}
          <FileUploadButton
            fileSelected={fileSelected}
            setVideoFile={setVideoFile}
            // Pass the correct prop based on FileUploadButton's needs
            // setFileSelected={handleFileStateChange} // If using boolean handler
            setFileSelected={setFileSelected}  // If using File handler
          />

         


          {/* === Step 2: Options (Show only if file is selected) === */}
          {/* Use the tile-based Options component */}
          {fileSelected && (
            <Options
              selectedOptions={options}
              onOptionChange={handleCheckboxChange}
              fileSelected={fileSelected} // Pass prop if needed
            />
          )}

          {/* === Step 3: Calculation Button (Show only if ready) === */}
          {fileSelected && isAnyOptionSelected && (
            <div className="calculate-button-container">
              <button
                className="calculate-btn"
                onClick={handleCalculate}
                disabled={!canCalculate}
              >
                {isLoading ? (
                  <><FaSpinner className="fa-spin" /> Calculating...</>
                ) : (
                  <><i className="fa fa-calculator"></i> Calculate Scores</>
                )}
              </button>
            </div>
          )}

          {/* === Step 4: Results Display === */}
          {((isLoading || error || results)&&fileSelected) && (
            <ResultsDisplay
                isLoading={isLoading}
                results={results}
                error={error}
            />
          )}
           {/* === Features Section (Placed After Upload) === */}
           <FeaturesSection />
          {/* ============================================ */}

        </div> {/* End content-centerer */}
      </main>

      <Footer />
    </>
  );
}

export default App;
