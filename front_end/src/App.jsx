import { useEffect, useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import MainDashboard from './components/MainDashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetail from './components/UserDetail'
import NoteWrite from './components/NoteWrite'
import PwdChange from './components/PwdChange'
import axios from 'axios'

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

	const [myList, setMyList] = useState({});
	//myList={myList} setMyList={setMyList}
	useEffect(() => {
		localStorage.setItem('isLogin', isLogin);
		localStorage.setItem('user', user);
		localStorage.setItem('id', id);
	}, [isLogin, user, id]);

	useEffect(() => {
		localStorage.setItem('isDarkMode', isDarkMode);
	}, [isDarkMode])

	//아이디에 맞게 쓴글 조회
	useEffect(()=>{
		if(isLogin){
			axios({
				url: "http://localhost:8080/api/note/list?user_id="+id,
				method: "get"
			}).then(res=>{
				setMyList(res.data);
			}).catch(err=>{
				console.log(err);
				alert("서버 통신 중 에러 발생");
			})
		}
	}, [isLogin, id])

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainDashboard myList={myList} setMyList={setMyList} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} isLogin={isLogin} setUser={setUser} setIsLogin={setIsLogin} id={id} setId={setId} />} />
					<Route path="/login.do" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} id={id} setId={setId} />} />
					<Route path="/register.do" element={<Register isDarkMode={isDarkMode} />} />
					<Route path="/write.do" element={<NoteWrite isDarkMode={isDarkMode} id={id} />} />
					<Route path="/user-detail.do" element={<UserDetail isLogin={isLogin} isDarkMode={isDarkMode} user={user} setUser={setUser} />} />
					<Route path="/pwd_change.do" element={<PwdChange isLogin={isLogin} setIsLogin={setIsLogin} user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} id={id} setId={setId} />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
