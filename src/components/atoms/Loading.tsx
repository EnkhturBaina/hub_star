import { Spinner } from '@heroui/react';
import { Router } from 'next/router';
import React, { useState, useEffect } from 'react';

const LoadingProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);
  }, []);

  return (
    <div>
      {pageLoading ? (
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
