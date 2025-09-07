import React, { useState } from "react";
// import ReactFlow, { Handle } from "react-flow-renderer";

const CustomNodeTwo = ({ data }) => {
  const [showHandles, setShowHandles] = useState(data.initialValue || false);

  const toggleHandles = () => {
    setShowHandles(!showHandles);
  };

  const renderHandles = () => {
    if (showHandles) {
      // Render handles conditionally based on the showHandles state
      return (
        <>
          <Handle type="source" position="top" id="top" />
          <Handle type="source" position="bottom" id="bottom" />
        </>
      );
    }
    return null; // Don't render handles
  };

  return (
    <div>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        {/* Node content */}
        Custom Node
      </div>
      <button onClick={toggleHandles}>Toggle Handles</button>
      {renderHandles()}
    </div>
  );
};

export default CustomNodeTwo;
