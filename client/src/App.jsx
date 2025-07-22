import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./components/homepage/HomePage";
import PerformanceTester from "./components/PerformanceTester/PerformanceTester";
import SkeletonBar from "./components/skeletonBarGraph/skeletonBar";
import NotFound from './pages/NotFounds/NotFound';
import MainLayout from './Layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tester" element={<PerformanceTester />} />
          <Route path="/skeleton" element={<SkeletonBar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
