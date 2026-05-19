import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; // 🚨 CSS 임포트

function Register(props){
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [ckpwd, setCkPwd] = useState('');
    const [nickname, setNickName] = useState('');
    
    const navigate = useNavigate();

    // 부모(App.jsx)가 전달해 주는 테마 상태값 받기
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    const register = () => {
        if(!id.trim()){
            alert("아이디를 입력해주세요");
            return;
        }

        if(!pwd.trim()){
            alert("비밀번호를 입력해주세요");
            return;
        }

        if(!nickname.trim()){
            alert("닉네임을 입력해주세요");
            return;
        }

        // 🚨 [로직 수정] 비밀번호 불일치 시 아래 axios가 실행되지 않게 락(return)을 걸어야 해!
        if(pwd !== ckpwd){
            alert("올바른 비밀번호를 입력해주세요");
            document.getElementById("pwdck").focus(); // focus 뒤에 괄호() 붙여야 실행됨!
            return; 
        }

        axios({
            url: "http://localhost:8080/api/users",
            method: "post",
            data: {
                loginId: id,
                password: pwd,
                nickname: nickname
            }
        }).then(res => {
            const data = res.data;
            if(data.result === 'success'){
                alert("가입 성공");
                navigate("/login"); // 🚨 location.href 대신 리액트 무새로고침 라우터 이동!
            } else {
                alert("가입 실패"); 
            }
        }).catch(err => {
            console.log(err);
            alert("서버 통신 중 에러 발생");
        });

    } //register

    const back = () => {
        navigate("/"); // 🚨 메인으로 무새로고침 이동
    }

    return(
        /* 🚨 테이블 구조를 완전히 걷어내고 폼 데이터 형식의 div 레이아웃으로 변경 */
        <div className={`register-page-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="register-box">
                {/* 🚨 로고 클릭 시 홈으로 이동하는 이벤트 추가! */}
                <h2 className="register-title cursor-pointer" onClick={() => navigate('/')}>
                    💻 CREATE ACCOUNT
                </h2>
                
                {/* 아이디 */}
                <div className="input-group">
                    <label>USER ID</label>
                    <input 
                        type="text" 
                        className="register-input"
                        placeholder="사용할 아이디를 입력하세요"
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                    />
                </div>
                
                {/* 비밀번호 */}
                <div className="input-group">
                    <label>PASSWORD</label>
                    <input 
                        type="password" 
                        className="register-input"
                        placeholder="비밀번호를 입력하세요"
                        value={pwd} 
                        onChange={(e) => setPwd(e.target.value)} 
                    />
                </div>
                
                {/* 비밀번호 확인 */}
                <div className="input-group">
                    <label>CONFIRM PASSWORD</label>
                    <input 
                        type="password" 
                        id="pwdck"
                        className="register-input"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        value={ckpwd} 
                        onChange={(e) => setCkPwd(e.target.value)} 
                    />
                </div>
                
                {/* 닉네임 */}
                <div className="input-group">
                    <label>NICKNAME</label>
                    <input 
                        type="text" 
                        className="register-input"
                        placeholder="화면에 표시될 닉네임을 입력하세요"
                        value={nickname} 
                        onChange={(e) => setNickName(e.target.value)} 
                    />
                </div>
                
                {/* 하단 버튼 제어 구역 */}
                <div className="btn-group">
                    <input type="button" className="submit-btn" value="REGISTER" onClick={register} />
                    <input type="button" className="back-btn" value="CANCEL" onClick={back} />
                </div>
            </div>
        </div>  
    )
}

export default Register;