import React from 'react';

const Terms: React.FC = () => {
  return (
    <iframe
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '500px',
      }}
      src={`${process.env.BASE_API_URL}terms`}
    ></iframe>
  );
};

export default Terms;
