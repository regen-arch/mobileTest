import React from "react";
import ReactDOM from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App"; // Assuming App.tsx is in the same directory
import "./index.css";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
