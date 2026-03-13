import { useState, useEffect } from 'react';
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let requestRef;
    const handleMouseMove = (e) => {
      requestRef = requestAnimationFrame(() => setPosition({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(requestRef); };
  }, []);
  return position;
};