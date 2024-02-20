import './App.css'
import WebcamCapture from './components/WebcamComponent'
import Layout from './Layout'
import NoPage from './NoPage'
import { Register } from './components/Register'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Dashboard from './components/dashboard/dashboard'


function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  return (
    <BrowserRouter>
      {isAuthenticated ? <AfterAuthRoutes /> : <BeforeAuthRoutes />}

    </BrowserRouter>
  )
}

export default App

const AfterAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Register />} />
        <Route path="WebcamCapture" element={<WebcamCapture />} />
        <Route path="Register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
    // <Routes>
    //   <Route exact path="/" element={<Home />} />
    //   <Route path="/profile/" element={<Profile />} />
    //   <Route path="/update/" element={<Update />} />
    //   <Route path="/delete" element={<DeleteUser />} />
    //   <Route path="/*" element={<Navigate replace to="/" />} />
    // </Routes>
  );
};
const BeforeAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="WebcamCapture" element={<WebcamCapture />} />
        <Route path="Register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

