import { useEffect, useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import MainDashboard from './components/MainDashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetail from './components/UserDetail'
import NoteWrite from './components/NoteWrite'

function App() {
  //true면 다크모드, false면 라이트모드
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') !== 'false';
  });
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem('isLogin') === 'true';
  });
  const [user, setUser] = useState(() => {
    return localStorage.getItem('user') || '';
  });
  const [id, setId] = useState(() => {
    return localStorage.getItem('id') || '';
  });

  useEffect(() => {
    localStorage.setItem('isLogin', isLogin);
    localStorage.setItem('user', user);
    localStorage.setItem('id', id);
  }, [isLogin, user, id]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainDashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} isLogin={isLogin} setUser={setUser} setIsLogin={setIsLogin} id={id} setId={setId} />} />
          <Route path="/login.do" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} id={id} setId={setId} />} />
          <Route path="/register.do" element={<Register isDarkMode={isDarkMode} />} />
          <Route path="/write.do" element={<NoteWrite isDarkMode={isDarkMode} id={id} />} />
          <Route path="/user-detail.do" element={<UserDetail isLogin={isLogin} isDarkMode={isDarkMode} user={user} setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
