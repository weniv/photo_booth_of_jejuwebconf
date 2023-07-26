import React, { useState } from "react";

const FrameContext = React.createContext();

export const FrameProvider = ({ children }) => {
    const [selectedFrame, setSelectedFrame] = useState("first");

    const updateFrame = (newSelected) => {
        setSelectedFrame(newSelected);
    };

    return <FrameContext.Provider value={{ selectedFrame, updateFrame }}>{children}</FrameContext.Provider>;
};

export default FrameContext;
