import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-indie-bg">
      {/* Blobs with hardware acceleration forced through will-change and translate3d */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.10] blur-[100px] bg-indie-primary animate-float will-change-transform" style={{ animationDuration: '15s', transform: 'translateZ(0)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.10] blur-[120px] bg-indie-accent animate-float will-change-transform" style={{ animationDuration: '20s', animationDelay: '2s', transform: 'translateZ(0)' }} />

      {/* Replaced heavy SVG turbulence with a lightweight CSS repeating gradient texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(var(--color-indie-text) 1px, transparent 1px)`,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0'
      }} />
    </div>
  );
};

export default BackgroundEffects;
