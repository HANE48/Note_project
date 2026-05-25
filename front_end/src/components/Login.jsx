import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'; 

function Login(props) {
    let [id, setId] = useState('');
    let [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    // 🚨 부모(App.jsx)가 보내준 테마 상태값 꺼내오기 (기본값 true)
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    const send = () => {
        if (!id.trim()) { alert("아이디를 입력해주세요"); return; }
        if (!pwd.trim()) { alert("비밀번호를 입력해주세요"); return; }

        const data = {loginId : id, pwd : pwd};

        axios.post("http://localhost:8080/api/users/login", data)
            .then(res => {
                const data = res.data;

                if(data.result == "success"){
                    alert(data.nickname + "님 환영합니다"); 
                    props.setUser(data.nickname);
                    props.setIsLogin(true);
                    props.setId(data.userId);
                    navigate("/");
                    
                }else if(data.result == "pwd"){
                    alert("비밀번호가 틀립니다.");
                }else if(data.result == "id"){
                    alert("아이디가 틀리거나 존재하지 않습니다");
                }
        }).catch(err => {
            console.log(err);
            alert("서버와 통신중 에러가 발생했습니다" + err);
        })
    }

    const register = () => {
        navigate("/register.do");
    }

    return (
        <div className={`login-page-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="login-box">
                <h2 className="login-title cursor-pointer" onClick={() => navigate('/')}>
                    NOTE_LOGIN
                </h2>
                
                <div className="input-group">
                    <label>USER ID</label>
                    <input 
                        type="text" 
                        className="login-input"
                        placeholder="아이디를 입력하세요"
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                    />
                </div>
                
                <div className="input-group">
                    <label>PASSWORD</label>
                    <input 
                        type="password" 
                        className="login-input"
                        placeholder="비밀번호를 입력하세요"
                        value={pwd} 
                        onChange={(e) => setPwd(e.target.value)} 
                    />
                </div>
                
                <div className="btn-group">
                    <input type="button" className="submit-btn" value="SIGN IN" onClick={send} />
                    <input type="button" className="register-btn" value="CREATE ACCOUNT" onClick={register} />
                    <input type="button" className="register-btn" value="비밀번호 찾기" onClick={()=>{navigate("/find_pwd.do")}} />
                </div>
            </div>
        </div>
    )
}

export default Login;