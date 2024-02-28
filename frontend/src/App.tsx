import './App.css'
import Layout from './Layout'
import NoPage from './NoPage'
import { Register } from './components/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard/dashboard'
import Voting from './Pages/Voting/Voting'
// import Voting from './components/voting/voting'
import { Toaster } from "@/components/ui/toaster"
import Login from './Pages/Login'
import { useAuth } from './contexts/AuthContext';



function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      {isAuthenticated ? <AfterAuthRoutes /> : <BeforeAuthRoutes />}
      <Toaster />
    </BrowserRouter>
  )
}

export default App

const AfterAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="Voting" element={<Voting />} />
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
        <Route path="Voting" element={<Voting />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

