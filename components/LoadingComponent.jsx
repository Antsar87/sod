import React from 'react';

const LoadingComponent = ({ text = 'Submit', isLoading }) => {
  return isLoading ? (
    <>
      <span className="loading"></span>
    </>
  ) : (
    text
  );
};

export default LoadingComponent;
