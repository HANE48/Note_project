import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NoteWrite.css';

function NoteWrite(props) {
    const navigate = useNavigate();

    // 테마 연동
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    // 입력 폼들 State
    const [number, setNumber] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('DP');
    const [concept, setConcept] = useState('');     
    const [wrongReason, setWrongReason] = useState(''); 
    const [myCode, setMyCode] = useState('');       

    // 저장 버튼 클릭 시 실행
    const handleSave = () => {
        if (!number.trim() || !title.trim() || !wrongReason.trim()) {
            alert("문제 번호, 이름, 오답 원인은 필수 입력 사항입니다!");
            return;
        }

        console.log({
            userId: props.id,
            probNumber: number,
            probTitle: title,
            probType: type,
            concept: concept,
            wrongReason: wrongReason,
            myCode: myCode
        });

        alert("오답노트가 저장되었습니다. (백엔드 전송 준비 완료!)");
        navigate("/"); 
    };

    return (
        <div className={`write-container ${isDarkMode ? 'dark' : 'light'}`}>
            
            {/* 🚨 [새로 추가] 상단 네비게이션 로고 바 */}
            <header className="write-navbar">
                <div className="logo-row clickable-logo" onClick={() => navigate('/')}>
                    <span className="logo-icon">💻</span>
                    <h2 className="logo-text">NOTE_STUDIO</h2>
                </div>
                <div className="nav-hint">WRITING MODE</div>
            </header>

            <div className="write-content">
                <div className="write-card">
                    
                    {/* 카드 내부 타이틀 */}
                    <div className="write-header">
                        <h2>📝 CREATE NEW REVIEW NOTE</h2>
                    </div>

                    {/* 메타 정보 입력 행 (가로 배치) */}
                    <div className="meta-row">
                        <div className="meta-group small">
                            <label>PROBLEM NO.</label>
                            <input 
                                type="number" 
                                className="write-input" 
                                placeholder="ex) 1260"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="meta-group">
                            <label>TITLE</label>
                            <input 
                                type="text" 
                                className="write-input" 
                                placeholder="문제 이름을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="meta-group">
                            <label>ALGORITHM TYPE</label>
                            <select className="write-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="DP">DP (동적계획법)</option>
                                <option value="DFS/BFS">DFS / BFS</option>
                                <option value="이분탐색">이분탐색</option>
                                <option value="다익스트라">다익스트라</option>
                                <option value="그리디">그리디</option>
                            </select>
                        </div>
                    </div>

                    {/* 1. 문제가 뭐였는지 */}
                    <div className="form-group">
                        <label>🎯 CORE CONCEPT / PROBLEM EXPLANATION</label>
                        <textarea 
                            className="write-textarea" 
                            placeholder="이 문제가 요구한 핵심 개념이나 로직(알고리즘 흐름)을 적어보세요."
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                    </div>

                    {/* 2. 내가 왜 틀렸는지 */}
                    <div className="form-group">
                        <label>⚠️ WHY I WAS WRONG (오답 원인 분석)</label>
                        <textarea 
                            className="write-textarea" 
                            placeholder="ex) 시간 초과 발생, 인덱스 범위 초과, BFS 큐 방문 처리를 팝할 때 해서 중복 방문함 등..."
                            value={wrongReason}
                            onChange={(e) => setWrongReason(e.target.value)}
                        />
                    </div>

                    {/* 3. 내가 작성한 코드 공간 */}
                    <div className="form-group">
                        <label>💻 MY CODE (틀린 코드 혹은 리팩토링 코드)</label>
                        <textarea 
                            className="write-textarea code-textarea" 
                            placeholder="// 이곳에 코드를 붙여넣거나 작성하세요."
                            value={myCode}
                            onChange={(e) => setMyCode(e.target.value)}
                        />
                    </div>

                    {/* 하단 제어 버튼 */}
                    <div className="write-btn-group">
                        <button className="cancel-btn" onClick={() => navigate("/")}>취소</button>
                        <button className="save-btn" onClick={handleSave}>노트 등록</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NoteWrite;