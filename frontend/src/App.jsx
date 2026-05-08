import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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