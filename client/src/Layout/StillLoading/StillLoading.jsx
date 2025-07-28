import React, { useEffect, useState } from 'react';
import './StillLoading.scss';
import Lottie from 'lottie-react';
import auditLoading1 from '../../assets/lotte/2.json';
import auditLoading2 from '../../assets/lotte/4.json';
import auditLoading3 from '../../assets/lotte/Loading.json';
import AuditProgressSteps from '../../components/AuditStepsLoading/AuditProgressSteps';
import PerformanceFacts from '../../components/PerformanceFacts/PerformanceFacts';

export default function StillLoading() {
  const lotteAnimations = [auditLoading1, auditLoading2, auditLoading3];
  const [lotteImageIndex, setLotteImageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const updateTimer = setInterval(() => {
      const now = performance.now();
      setElapsedTime(((now - startTime) / 1000).toFixed(1)); // in seconds
    }, 500); // update every 0.5s

    const animationInterval = setInterval(() => {
      setLotteImageIndex(prevIndex => (prevIndex + 1) % lotteAnimations.length);
    }, 7000);

    return () => {
      clearInterval(updateTimer);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className='still-loading-div'>
      <Lottie
        animationData={lotteAnimations[lotteImageIndex]}
        loop
        autoplay
        className="lotte-animation"
      />
      <p className='audit-timer'>⏱️ Auditing... {elapsedTime}s</p>
      <AuditProgressSteps />
      <PerformanceFacts />
    </div>
  );
}
