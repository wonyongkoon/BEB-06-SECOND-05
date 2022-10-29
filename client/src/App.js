import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import MarketPage from './pages/MarketPage';
import MyPage from './pages/MyPage';
import SignupPage from './pages/SignupPage';
import WritePage from './pages/WritePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/write' element={<WritePage />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/market' element={<MarketPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
