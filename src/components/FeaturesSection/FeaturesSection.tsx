// src/components/FeaturesSection/FeaturesSection.tsx
import React from 'react';
import { FaShieldAlt, FaCogs, FaCode, FaCopy } from 'react-icons/fa'; // Choose appropriate icons
import styles from './FeaturesSection.module.css';

interface FeatureItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  link?: { text: string; href: string }; // Optional link
}

// --- Customize Content Below ---
const FEATURES_DATA: FeatureItem[] = [
  {
    icon: <FaCopy />,
    title: 'Comprehensive Analysis',
    description: 'Calculate key quality metrics including shakiness, tilt, blurriness, and occlusion detection to get a full picture of your video\'s technical quality.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Data Security',
    description: 'Your uploaded videos are processed securely. We prioritize your data privacy and do not store video files after analysis is complete.',
    // link: { text: 'Read Privacy Policy', href: '#' }, // Example link
  },
  {
    icon: <FaCogs />,
    title: 'Accurate Metrics',
    description: 'Leveraging robust algorithms to provide reliable and consistent scores for each parameter, helping you make informed decisions.',
  },
  {
    icon: <FaCode />, // Or maybe FaServer, FaCloudUploadAlt
    title: 'Simple API Integration',
    description: 'Need to integrate quality checks into your own workflow? Our straightforward API allows for easy automation (Coming Soon!).',
    // link: { text: 'View API Docs', href: '#' }, // Example link
  },
];
// --- End Customize Content ---


const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresContainer}>
      {FEATURES_DATA.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div className={styles.iconWrapper}>
            {feature.icon}
          </div>
          <div className={styles.textContent}>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
            {feature.link && (
              <a href={feature.link.href} className={styles.link} target="_blank" rel="noopener noreferrer">
                {feature.link.text} →
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;