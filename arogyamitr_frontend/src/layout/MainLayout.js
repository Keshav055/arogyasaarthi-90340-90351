import React from "react";

/**
 * PUBLIC_INTERFACE
 * MainLayout for page layout consistency.
 */
const MainLayout = ({ children }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    {/* Add app bar, side menu, etc. as needed */}
    <main style={{ flex: 1 }}>{children}</main>
    {/* Footer can be added here in future */}
  </div>
);

export default MainLayout;
