import React from "react";
import styles from "../AppTheme.module.css";

/**
 * PUBLIC_INTERFACE
 * MainLayout for page layout consistency.
 */
const MainLayout = ({ children }) => (
  <div className={styles.appContainer}>
    <main style={{ flex: 1, width: "100%", margin: 0 }}>{children}</main>
    {/* Optionally: App-wide footer in future */}
  </div>
);

export default MainLayout;
