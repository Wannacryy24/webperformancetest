import React, { useState, useEffect } from 'react';
import './AuditProgressSteps.scss';
import { CheckCircle, Loader2, Circle } from 'lucide-react';

const AuditProgressSteps = () => {
  const steps = [
    'Launching Headless Chrome',
    'Loading your website',
    'Emulating mobile/desktop',
    'Running Lighthouse analysis...',
    'Generating your PDF report',
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setComplete(true);
    }
  }, [currentStep]);

  return (
    <div className="audit-progress">
      <h2 className="audit-title">🚀 Running Audit</h2>

      <ul className="audit-steps">
        {steps.map((step, index) => {
  const isDone = index < currentStep && (index !== steps.length - 1 || complete);
  const isCurrent = index === currentStep;

  return (
    <li
      key={index}
      className={`audit-step ${
        isDone ? 'done' : isCurrent ? 'current' : ''
      }`}
    >
      <span className="icon">
        {isDone ? (
          <CheckCircle size={20} />
        ) : isCurrent ? (
          <Loader2 className="spin" size={20} />
        ) : (
          <Circle size={20} />
        )}
      </span>
      <span className="label">{step}</span>
    </li>
  );
})}

      </ul>

      {complete && (
        <div className="audit-complete">
          ✅ Audit Completed!
        </div>
      )}
    </div>
  );
};

export default AuditProgressSteps;
