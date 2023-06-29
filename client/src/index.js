import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../src/assets/styles.css';
import { TrackerProvider } from './TrackerProvider.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
