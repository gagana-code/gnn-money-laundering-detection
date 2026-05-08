import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Transactions from "./pages/Transactions";
import Alerts from "./pages/Alerts";
import NetworkGraph from "./pages/NetworkGraph";
import Profile from "./pages/Profile";

function AppLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
          path="/upload"
          element={
            <AppLayout>
              <Upload />
            </AppLayout>
          }
        />

        <Route
          path="/transactions"
          element={
            <AppLayout>
              <Transactions />
            </AppLayout>
          }
        />

        <Route
          path="/alerts"
          element={
            <AppLayout>
              <Alerts />
            </AppLayout>
          }
        />

        <Route
          path="/graph"
          element={
            <AppLayout>
              <NetworkGraph />
            </AppLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}