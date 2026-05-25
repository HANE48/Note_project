import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MainDashboard.css';
import NoteList from './NoteList';

function MainDashboard(props) {
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState([]);

    const logout = () => {
        if (!confirm("로그아웃 하시겠습니까?")) {
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
        <div className={`dashboard-container ${props.isDarkMode ? 'dark' : 'light'}`}>
            {/* 상단 네비게이션 바 */}
            <header className="navbar">
                <div className="logo-row">
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

                <div className="left-column">
                    <section className="welcome-banner">
                        {props.isLogin ? <h1 className="greeting">Welcome Back, {props.user}! </h1> :
                            <h1 className='greeting'>환영합니다! 로그인후 이용해주세요!</h1>
                        }
                        <p className="subtext">"코드에 버그가 없다면, 아직 충분히 복잡하지 않은 것이다."</p>

                        {/* 🚨 버튼 위치 조절 (제목은 정중앙, 버튼은 맨 왼쪽 고정) */}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', minHeight: '40px' }}>

                            {props.isLogin && (
                                <button
                                    className="add-note-toggle-btn"
                                    onClick={() => navigate('/write.do')}
                                    style={{ position: 'absolute', left: '0' }} /* 👈 핵심! 버튼을 부모 영역의 맨 왼쪽에 고정 */
                                >
                                    새 노트 작성
                                </button>
                            )}

                            {/* 👈 제목은 position 영향 없이 무조건 한가운데로 렌더링됨 */}
                            <h3 className="section-title" style={{ margin: 0, textAlign: 'center' }}>
                                내가 작성한 게시글
                            </h3>

                        </div>

                        <div className="grass-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {props.isLogin ? (
                                // 데이터가 있을 때와 없을 때를 구분해서 렌더링!
                                props.myList.length > 0 ? (
                                    props.myList.map((item, index) => (
                                        <NoteList key={item.id || index} item={item} isDarkMode={props.isDarkMode} />
                                    ))
                                ) : (
                                    <div style={{ color: 'var(--text-sub)' }}>
                                        아직 작성한 게시글이 없습니다. 첫 노트를 작성해 보세요!
                                    </div>
                                )
                            ) : (
                                <div style={{ color: 'var(--text-sub)' }}>
                                    로그인 후 작성한 게시글을 확인해 보세요!
                                </div>
                            )}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default MainDashboard;