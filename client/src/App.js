import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MarketPage from './pages/MarketPage';
import MyPage from './pages/MyPage';
import SignupPage from './pages/SignupPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/LoginPage';
import UserContextProvider from './User/UserContextProvider';

function App() {
  return (
    
    <BrowserRouter>
    <>
      <UserContextProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/market' element={<MarketPage />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<Login />} />
            </Routes>
            <Footer />
          </div>
      </UserContextProvider>
    </>
    </BrowserRouter>
    
  );
}

export default App;
