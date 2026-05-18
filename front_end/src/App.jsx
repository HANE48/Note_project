import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import MainDashboard from './components/MainDashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
                {/* 메인 주소(/)로 들어오면 대시보드를 보여준다 */}
                <Route path="/" element={<MainDashboard />} />
                
                {/* /login 주소로 들어오면 로그인창을 보여준다 */}
                <Route path="/login" element={<Login />} />
            </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
