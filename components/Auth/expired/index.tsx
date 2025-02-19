import React, { useState, useEffect } from 'react';
import styles from './expired.module.scss';
interface IProps {
  secound?: number;
  handleClick: () => void;
}
const ExpiredTimer: React.FC<IProps> = ({ secound = 60, handleClick }) => {
  const [timeLeft, setTimeLeft] = useState(secound); // Start from 60 seconds

  useEffect(() => {
    // Exit if timer has finished
    if (timeLeft === 0) return;

    // Set up the interval
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  const onClick = () => {
    setTimeLeft(secound);
    handleClick();
  };
  return (
    <div className={styles.expiredTimer}>
      {timeLeft == 0 ? (
        <p className="cursor-pointer hover:text-mainColor" onClick={onClick}>
          Дахин илгээх
        </p>
      ) : (
        <p>Хугацаа: {timeLeft} секунд</p>
      )}
    </div>
  );
};

export default ExpiredTimer;
