import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MainDashboard.css'; 

function MainDashboard(props) {
    const navigate = useNavigate(); 
    const [todoList, setTodoList] = useState([]);

    const logout = () => {
        if(!confirm("로그아웃 하시겠습니까?")){
            return;
        }

        //현재 저장된 정보 삭제
        props.setIsLogin(false);
        props.setUser('');
        props.setId('');

        //로컬스토리지에 저장된 정보 삭제
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        localStorage.removeItem('id');

        alert("로그아웃 되었습니다.");
        navigate("/");
    }//logout

    
    return (
        /* 🚨 [핵심 로직] isDarkMode 값에 따라 클래스명에 'dark' 또는 'light'를 동적으로 붙여줌! */
        <div className={`dashboard-container ${props.isDarkMode ? 'dark' : 'light'}`}>
            {/* 상단 네비게이션 바 */}
            <header className="navbar">
                <div className="logo-row">
                    <span className="logo-icon">💻</span>
                    <h2 className="logo-text">NOTE_STUDIO</h2>
                </div>
                
                <nav className="nav-menu">
                    <span className="menu-item active">Dashboard</span>
                    <span className="menu-item">Review Notes</span>
                    <span className="menu-item">Analytics</span>
                </nav>
                
                <div className="user-info">
                    <button className="theme-toggle-btn" onClick={() => props.setIsDarkMode(!props.isDarkMode)}>
                        {props.isDarkMode ? '☀️ 라이트모드' : '🌙 다크모드'}
                    </button>
                    {props.isLogin ? (
                        <>
                            {/* 🚨 [디자인 변경] 클릭할 수 있는 닉네임 구역을 프로필 아이콘과 함께 배치 */}
                            <span className="user-profile-click" onClick={() => navigate('/user-detail.do')}>
                                <span className="profile-icon">👤</span>
                                <span className="user-name">{props.user}님</span>
                            </span>
                            <button className="logout-btn" onClick={logout}>로그아웃</button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('/login.do')}>로그인</button>
                    )}
                </div>
            </header>

            {/* 메인 본문 레이아웃 */}
            <div className="content-body">
                
                {/* [좌측 영역] 환영 배너 & 잔디밭 (65%) */}
                <div className="left-column">   
                    <section className="welcome-banner">
                        {props.isLogin ? <h1 className="greeting">Welcome Back, {props.user}! </h1> : 
                        <h1 className='greeting'>환영합니다! 로그인후 이용해주세요!</h1>
                        }
                        <p className="subtext">"코드에 버그가 없다면, 아직 충분히 복잡하지 않은 것이다."</p>
                        
                        {/*
                        <div className="streak-status">
                            <span className="fire-emoji">🔥</span>
                            <div>
                                <div className="streak-title">CURRENT STREAK</div>
                                <div className="streak-days">12 DAYS</div>
                            </div>
                        </div>
                        */}
                    </section>
                    
                    {/* <section className="grass-section">
                        <h3 className="section-title">SOLVED STREAK (RECENT 6 MONTHS)</h3>
                        <div className="grass-wrapper">
                            {[...Array(48)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="grass-block"
                                    style={{
                                        // 비어있는 잔디 배경은 테마 변수(--bg-main)를 타도록 수정해서 이질감 없게 만듦!
                                        backgroundColor: i % 7 === 0 ? 'var(--bg-main)' : i % 3 === 0 ? '#4ade80' : '#22c55e'
                                    }} 
                                />
                            ))}
                        </div>
                    </section> */}
                </div>

                {/* [우측 영역] 오늘 풀어볼 오답 리스트 (35%) */}
                <div className="right-column">
                    <section className="todo-container">
                        <div className="todo-header">
                            <h3 className="section-title">🎯 TODAY'S REVIEW TASK</h3>
                            {props.isLogin && (
                                <button className="add-note-toggle-btn" onClick={() => navigate('/write.do')}>
                                    ➕ 새 노트 작성
                                </button>
                            )}
                        </div>
                        {/*
                        <div className="todo-list">
                            {todoList.map((task) => (
                                <div key={task.id} className="todo-card">
                                    <div className="todo-info">
                                        <span className="prob-number">#{task.number}</span>
                                        <div className="prob-title">{task.title}</div>
                                        <span className="prob-type">{task.type}</span>
                                    </div>
                                    <span className="dday-badge">{task.dday}</span>
                                </div>
                            ))} 
                        </div>*/}
                    </section>
                </div>

            </div>
        </div>
    );
}

export default MainDashboard;