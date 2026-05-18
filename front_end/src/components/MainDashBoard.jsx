import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainDashboard.css'; 

function MainDashboard() {
    const navigate = useNavigate(); 

    // 상태 관리 (State)
    const [nickname, setNickname] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    // 🚨 [테마 상태 변수 추가] true면 다크모드, false면 라이트모드
    const [isDarkMode, setIsDarkMode] = useState(true); 

    const [todoList, setTodoList] = useState([
        { id: 1, number: 12865, title: '평범한 배낭', type: 'DP', dday: 'D-1' },
        { id: 2, number: 1753, title: '최단경로', type: '다익스트라', dday: 'D-3' },
        { id: 3, number: 1920, title: '수 찾기', type: '이분탐색', dday: 'D-7' },
    ]);

    return (
        /* 🚨 [핵심 로직] isDarkMode 값에 따라 클래스명에 'dark' 또는 'light'를 동적으로 붙여줌! */
        <div className={`dashboard-container ${isDarkMode ? 'dark' : 'light'}`}>
            
            {/* 상단 네비게이션 바 */}
            <header className="navbar">
                <div className="logo-row">
                    <span className="logo-icon">💻</span>
                    <h2 className="logo-text">BOJ_NOTE_STUDIO</h2>
                </div>
                
                <nav className="nav-menu">
                    <span className="menu-item active">Dashboard</span>
                    <span className="menu-item">Review Notes</span>
                    <span className="menu-item">Analytics</span>
                </nav>
                
                <div className="user-info">
                    {/* 🚨 [테마 토글 버튼 추가] 누를 때마다 상태를 반대로(!) 반전시킴 */}
                    <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? '☀️ 라이트모드' : '🌙 다크모드'}
                    </button>

                    {isLoggedIn ? (
                        <>
                            <span className="user-name">{nickname}님</span>
                            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>로그아웃</button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
                    )}
                </div>
            </header>

            {/* 메인 본문 레이아웃 */}
            <div className="content-body">
                
                {/* [좌측 영역] 환영 배너 & 잔디밭 (65%) */}
                <div className="left-column">
                    <section className="welcome-banner">
                        <h1 className="greeting">Welcome Back, {nickname}! 👋</h1>
                        <p className="subtext">"코드에 버그가 없다면, 아직 충분히 복잡하지 않은 것이다."</p>
                        
                        <div className="streak-status">
                            <span className="fire-emoji">🔥</span>
                            <div>
                                <div className="streak-title">CURRENT STREAK</div>
                                <div className="streak-days">12 DAYS</div>
                            </div>
                        </div>
                    </section>

                    <section className="grass-section">
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
                    </section>
                </div>

                {/* [우측 영역] 오늘 풀어볼 오답 리스트 (35%) */}
                <div className="right-column">
                    <section className="todo-container">
                        <div className="todo-header">
                            <h3 className="section-title">🎯 TODAY'S REVIEW TASK</h3>
                            <span className="task-count">{todoList.length} REMAINING</span>
                        </div>
                        
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
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default MainDashboard;