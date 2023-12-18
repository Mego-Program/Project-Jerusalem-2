import  convertDateFormat  from './utils';
import React, { useState, useEffect } from 'react';

const Stopwatch = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const endTime = new Date(convertDateFormat(endDate)).getTime();
            const now = new Date().getTime();
            const difference = endTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                return `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
            return 'Time up!';
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup function
        return () => clearInterval(timer);
    }, [endDate]); // Dependency array

    return <div className="stopwatch">{timeLeft}</div>;
};

export default Stopwatch;
