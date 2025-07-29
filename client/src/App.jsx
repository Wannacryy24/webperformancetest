import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage/HomePage";
import PerformanceTester from "./components/PerformanceTester/PerformanceTester";
import NotFound from './pages/NotFounds/NotFound';
import MainLayout from './Layout/MainLayout';
import SkeletonBar from './components/skeletonBarGraph/SkeletonBar'
import React from 'react';
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tester" element={<PerformanceTester />} />
          <Route path="skeleton" element={<SkeletonBar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
