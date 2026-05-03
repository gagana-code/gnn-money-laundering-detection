import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0e17; color: #e2e8f0; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #0a0e17; }
  ::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 3px; }
  input:focus, select:focus { outline: 1px solid #3b82f6; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);
