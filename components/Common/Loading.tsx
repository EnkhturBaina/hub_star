import { Spinner } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-unit-9xl flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingProvider;
