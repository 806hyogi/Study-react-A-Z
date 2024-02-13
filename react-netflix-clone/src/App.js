import './App.css';
import React from "react";
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import DetailPage from "./pages/DetailPage";
import MainPage from './pages/MainPage';
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return(
    <div>
      <Nav />
      <Outlet/>
      <Footer/>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
