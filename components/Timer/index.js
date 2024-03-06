import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!hasMounted) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasMounted, timeLeft]);

  if (!hasMounted) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{height:'100vh', width:'100vw', fontSize:'20px', backgroundColor:'black',color:'#f5f5f7', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {Object.keys(timeLeft).length === 0 && <span>¡Tiempo terminado!</span>}
      {Object.keys(timeLeft).map(interval => (
        <span key={interval} style={{marginRight:'10px',fontWeight:'800'}}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      ))}
    </div>
  );
};

export default CountdownTimer;
