import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login />} />

          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
