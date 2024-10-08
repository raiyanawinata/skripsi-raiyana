import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const IframeComponent = ({ children, ...props }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframeDoc = iframeRef.current.contentDocument;
    const iframeRoot = iframeDoc.body;

    // Render the children inside the iframe
    ReactDOM.createPortal(children, iframeRoot);
  }, [children]);

  return <iframe ref={iframeRef} {...props} />;
};

export default IframeComponent;
