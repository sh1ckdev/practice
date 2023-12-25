import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./theme/theme.jsx";
import Account from "./pages/Account/Account.jsx";
import Home from "./pages/Home/Home.jsx";
import Auth from './pages/Auth/Auth.jsx';
import Reg from './pages/Auth/Reg.jsx';
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";



function App() {
  const {store} = useContext(Context)

  useEffect(() => {
      if (localStorage.getItem('token')) {
         store.checkAuth();
      }
  }, [store]);

  return (
    <>
    <Context.Provider value={{ store }}>
      <ThemeProvider theme={theme}>
        <Router>  
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Reg />} />
            <Route path={`/account/${store.user.username}`} element={<Account />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </Router>
      </ThemeProvider>
      </Context.Provider>
    </>
  );
}

export default observer(App);
