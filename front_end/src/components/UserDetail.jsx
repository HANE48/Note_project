import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserDetail.css';
import axios from 'axios';

function UserDetail(props) {
    const navigate = useNavigate();

    // 테마 및 유저 정보 props 디스트럭처링 (안전장치 포함)
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;
    const nickname = props.user || '인공이';

    // 🚨 [가드 로직] 로그인 안 한 상태로 주소창에 /user 치고 들어오면 튕겨내기
    useEffect(() => {
        if (!props.isLogin) {
            alert("로그인 후 이용해주세요.");
            navigate("/");
        }
    }, [props.isLogin, navigate]);

    // 1. 비밀번호 변경 로직 (나중에 스프링에 PUT이나 POST 날릴 자리)
    const handleChangePassword = () => {
        //비밀번호 변경 페이지로 이동해서 비밀번호 변경
        navigate("/pwd_change.do");
    };

    // 2. 회원 탈퇴 로직 (나중에 스프링에 DELETE 요청 날릴 자리)
    const handleWithdrawal = () => {
        const confirmDelete = window.confirm("정말로 회원을 탈퇴하시겠습니까? 오답노트 데이터가 전부 삭제됩니다.");

        if (confirmDelete) {

            // 탈퇴 성공 시 리액트 로그인 상태값들 전부 로그아웃 초기화
            props.setUser('');
            props.setIsLogin(false);
            props.setId('');

            alert("회원 탈퇴는 준비 예정입니다.");
            navigate("/"); // 메인으로 강제 이동
        }
    };
    

    // 로그인 안 되어 있으면 비정상 화면이 잠깐이라도 노출되지 않도록 빈 가드 리턴
    if (!props.isLogin) {
        return null;
    }

    return (
        <div className={`user-detail-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="user-detail-content">
                <div className="profile-card">

                    {/* 상단 헤더 구역 */}
                    <div className="profile-header">
                        <h2>📝 USER PROFILE</h2>
                        <button className="back-btn" onClick={() => navigate("/")}>뒤로가기</button>
                    </div>

                    {/* 유저 정보 상세 구역 */}
                    <div className="info-section">
                        <div className="info-row">
                            <span className="info-label">NICKNAME</span>
                            <span className="info-value">{nickname}님</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">ACCOUNT STATUS</span>
                            <span className="info-value" style={{ color: '#22c55e' }}>ACTIVE</span>
                        </div>
                    </div>

                    {/* 기능 버튼 구역 */}
                    <div className="action-section">
                        <div className="action-row">
                            <button className="action-btn" onClick={handleChangePassword}>
                                🔒 비밀번호 변경
                            </button>
                        </div>
                        {/* 회원 탈퇴 버튼 (위험 표시 구역) */}
                        <button className="danger-btn" onClick={handleWithdrawal}>
                            ⚠️ 회원 탈퇴하기
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDetail;