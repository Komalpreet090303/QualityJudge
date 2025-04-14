// src/components/ReferenceVideos/ReferenceVideos.tsx
import React from 'react';
import styles from './ReferenceVideos.module.css';

const ReferenceVideos: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.label}>Shaky Example</p>
        <video
          className={styles.video}
          src="/videos/shaky-reference.mp4"
          autoPlay loop muted playsInline aria-hidden="true"
        />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.label}>Blurry Example</p>
        <video
          className={styles.video}
          src="/videos/blurry-reference.mp4"
          autoPlay loop muted playsInline aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ReferenceVideos;