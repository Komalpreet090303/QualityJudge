// src/components/ActionArea/ActionArea.tsx
import React from 'react';
import { FaPlay, FaSpinner } from 'react-icons/fa';
import styles from './ActionArea.module.css';

interface ActionAreaProps {
  onAnalyze: () => void;
  isLoading: boolean;
  canAnalyze: boolean;
}

const ActionArea: React.FC<ActionAreaProps> = ({ onAnalyze, isLoading, canAnalyze }) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.analyzeButton}
        onClick={onAnalyze}
        disabled={!canAnalyze || isLoading}
      >
        {isLoading ? (
          <>
            <FaSpinner className={styles.spinner} /> Analyzing...
          </>
        ) : (
          <>
            <FaPlay /> Analyze Video
          </>
        )}
      </button>
    </div>
  );
};

export default ActionArea;