import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/PwdChange.css'; // 🚨 CSS 파일 연결

function PwdChange(props) {
    const navigate = useNavigate();

    // 테마 연동
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    // 입력 상태값 세팅
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [newPwdCheck, setNewPwdCheck] = useState('');

    useEffect(() => {
        if (!props.isLogin) {
            alert("로그인 후 이용할 수 있는 서비스입니다.");
            navigate("/login");
        }
    }, [props.isLogin, navigate]);

    const handleChangePwd = () => {
        if (!currentPwd.trim()) {
            alert("현재 비밀번호를 입력해주세요.");
            return;
        }
        if (!newPwd.trim()) {
            alert("새 비밀번호를 입력해주세요.");
            return;
        }
        if (newPwd !== newPwdCheck) {
            alert("새 비밀번호가 일치하지 않습니다.");
            document.getElementById("newPwdChk").focus();
            return;
        }

        // 🚨 스프링부트로 비밀번호 변경 요청 쏘기 (PUT 방식 추천)
        axios.put("http://localhost:8080/api/users/change-pwd", {
            id: props.id,          // 현재 로그인한 유저의 DB PK 
            currentPwd: currentPwd,    // 기존 비번 (서버에서 맞는지 검증)
            newPwd: newPwd             // 바꿀 비번
        })
        .then(res => {
            const data = res.data;
            if (data.result === 'success') {
                alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
                
                // 보안상 비밀번호 변경 후엔 강제 로그아웃 시키는 게 정석!
                props.setIsLogin(false);
                props.setUser('');
                props.setId('');
                localStorage.clear();
                navigate("/login.do"); 
                
            } else if (data.result === 'wrong_pwd') {
                alert("현재 비밀번호가 틀렸습니다.");
            } else {
                alert("비밀번호 변경 실패: " + data.message);
            }
        })
        .catch(err => {
            console.error("비밀번호 변경 통신 에러:", err);
            alert("서버와 통신 중 에러가 발생했습니다.");
        });
    };

    // 비로그인 찰나의 순간에 화면 렌더링 방지
    if (!props.isLogin) return null;

    return (
        <div className={`pwd-change-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="pwd-change-box">
                {/* 상단 로고 타이틀 */}
                <h2 className="pwd-change-title cursor-pointer" onClick={() => navigate('/')}>
                    CHANGE PASSWORD
                </h2>
                
                <p className="pwd-change-desc">
                    안전한 계정 사용을 위해 비밀번호를 변경해주세요.<br/>
                    (변경 완료 시 자동으로 로그아웃됩니다.)
                </p>

                {/* 현재 비밀번호 */}
                <div className="input-group">
                    <label>CURRENT PASSWORD</label>
                    <input 
                        type="password" 
                        className="pwd-input"
                        placeholder="현재 사용 중인 비밀번호 입력"
                        value={currentPwd} 
                        onChange={(e) => setCurrentPwd(e.target.value)} 
                    />
                </div>
                
                <hr className="divider" />

                {/* 새 비밀번호 */}
                <div className="input-group">
                    <label>NEW PASSWORD</label>
                    <input 
                        type="password" 
                        className="pwd-input"
                        placeholder="새로운 비밀번호 입력"
                        value={newPwd} 
                        onChange={(e) => setNewPwd(e.target.value)} 
                    />
                </div>

                {/* 새 비밀번호 확인 */}
                <div className="input-group">
                    <label>CONFIRM NEW PASSWORD</label>
                    <input 
                        type="password" 
                        id="newPwdChk"
                        className="pwd-input"
                        placeholder="새로운 비밀번호 한 번 더 입력"
                        value={newPwdCheck} 
                        onChange={(e) => setNewPwdCheck(e.target.value)} 
                    />
                </div>
                
                {/* 하단 제어 버튼 */}
                <div className="btn-group">
                    <button className="submit-btn" onClick={handleChangePwd}>비밀번호 변경하기</button>
                    {/* 취소 시 마이페이지(UserDetail)로 돌려보냄 */}
                    <button className="cancel-btn" onClick={() => navigate("/user-detail.do")}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default PwdChange;