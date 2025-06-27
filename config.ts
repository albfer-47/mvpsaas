import { initializeApp } from 'firebase/app';

// Firebase configuration
// For production, these values would be stored in environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDevelopmentPurposesOnly",
  authDomain: "pdf-market-intelligence.firebaseapp.com",
  projectId: "pdf-market-intelligence",
  storageBucket: "pdf-market-intelligence.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
