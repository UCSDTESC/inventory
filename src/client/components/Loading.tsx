import React from 'react';

const Loading: React.FunctionComponent = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading;