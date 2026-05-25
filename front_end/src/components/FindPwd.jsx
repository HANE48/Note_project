import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/FindPwd.css'; // 🚨 CSS 파일 연결

function FindPwd(props) {
    const navigate = useNavigate();

    // 테마 연동 (App.jsx에서 받아옴)
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    // 입력 상태값
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const handleFind = () => {
        if (!id.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (!email.trim()) {
            alert("가입 시 등록한 이메일을 입력해주세요.");
            return;
        }
        alert("이메일전송 대기중...");
        axios.post("http://localhost:8080/api/users/find-pwd", {
            loginId: id,
            email: email
        })
        .then(res => {
            const data = res.data;
            if (data.result == 1) {
                alert("입력하신 이메일로 임시 비밀번호가 발송되었습니다.");
                navigate("/login.do"); // 성공하면 로그인 창으로 돌려보냄
            } else {
                alert("일치하는 회원 정보가 없습니다.");
            }
        })
        .catch(err => {
            console.error("비밀번호 찾기 통신 에러:", err);
            alert("서버 통신 중 에러가 발생했습니다.");
        });
    };

    return (
        <div className={`find-pwd-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="find-pwd-box">
                {/* 상단 로고 (누르면 홈으로) */}
                <h2 className="find-pwd-title cursor-pointer" onClick={() => navigate('/')}>
                    💻 FIND PASSWORD
                </h2>
                
                <p className="find-pwd-desc">
                    가입 시 등록한 아이디와 이메일을 입력해주세요.<br/>
                    이메일로 임시 비밀번호를 발송해 드립니다.
                </p>

                {/* 아이디 입력 구역 */}
                <div className="input-group">
                    <label>USER ID</label>
                    <input 
                        type="text" 
                        className="find-input"
                        placeholder="아이디를 입력하세요"
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                    />
                </div>
                
                {/* 이메일 입력 구역 */}
                <div className="input-group">
                    <label>EMAIL</label>
                    <input 
                        type="text" 
                        className="find-input"
                        placeholder="가입 시 등록한 이메일을 입력하세요"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                
                {/* 하단 제어 버튼 */}
                <div className="btn-group">
                    <button className="submit-btn" onClick={handleFind}>비밀번호 찾기</button>
                    <button className="cancel-btn" onClick={() => navigate("/login.do")}>로그인으로 돌아가기</button>
                </div>
            </div>
        </div>
    );
}

export default FindPwd;