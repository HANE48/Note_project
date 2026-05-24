import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NoteWrite.css';
import axios from 'axios';

/*
 * 게시글 작성하는곳
 */

function NoteWrite(props) {
    const navigate = useNavigate();

    // 테마 연동
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    // 입력 폼들 State
    const [number, setNumber] = useState('');               //문제번호
    const [title, setTitle] = useState('');                 //제목
    const [type, setType] = useState('');                   //알고리즘 유형 
    const [concept, setConcept] = useState('');             //핵심 개념
    const [wrongReason, setWrongReason] = useState('');     //오답 이유
    const [myCode, setMyCode] = useState('');               //내가 작성한 코드


    // 게시글 등록하는 함수
    const handleSave = () => {
        if (!number.trim() || !title.trim() || !wrongReason.trim()) {
            alert("문제 번호, 이름, 오답 원인은 필수 입력 사항입니다!");
            return;
        }
        //일단 플랫폼은 백준으로 고정 추후 다른 플랫폼 추가예정
        const data = {
            user_id:props.id,
            title:title,
            problem_number: number,
            platform:"백준",
            tags:type,
            wrong_reason: wrongReason,
            solution_logic: myCode
        };
        
        axios({
            url: "http://localhost:8080/api/note/insert",
            method: "post",
            data: data
        }).then(res => {
            const data = res.data;
            if(data.res == 1){
                alert("등록 성공");
                navigate("/");
            }else{
                alert("등록 실패");
            }
        }).catch(err=>{
            console.log(err);
            alert("서버 통신 중 에러 발생");
        })
    };

    return (
        <div className={`write-container ${isDarkMode ? 'dark' : 'light'}`}>
            
            {/* 상단 네비게이션 로고 바 */}
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
                        <h2>CREATE NEW REVIEW NOTE</h2>
                    </div>

                    {/* 메타 정보 입력 행 (가로 배치) */}
                    <div className="meta-row">
                        <div className="meta-group small">
                            <label>PROBLEM NO.</label>
                            <input type="number" className="write-input" 
                                placeholder="ex) 1260"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="meta-group">
                            <label>TITLE</label>
                            <input type="text" className="write-input" 
                                placeholder="문제 이름을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="meta-group">
                            <label>ALGORITHM TYPE</label>
                            <input type="text" className="write-input" value={type} onChange={(e) => setType(e.target.value)} placeholder='알고리즘유형 ex)DP'/>
                        </div>
                    </div>

                    {/* 1. 문제가 뭐였는지 */}
                    <div className="form-group">
                        <label> CORE CONCEPT / PROBLEM EXPLANATION</label>
                        <textarea 
                            className="write-textarea" 
                            placeholder="이 문제가 요구한 핵심 개념이나 로직(알고리즘 흐름)을 적어보세요."
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                    </div>

                    {/* 2. 내가 왜 틀렸는지 */}
                    <div className="form-group">
                        <label>WHY I WAS WRONG (오답 원인 분석)</label>
                        <textarea 
                            className="write-textarea" 
                            placeholder="ex) 시간 초과 발생, 인덱스 범위 초과, BFS 큐 방문 처리를 팝할 때 해서 중복 방문함 등..."
                            value={wrongReason}
                            onChange={(e) => setWrongReason(e.target.value)}
                        />
                    </div>

                    {/* 3. 내가 작성한 코드 공간 */}
                    <div className="form-group">
                        <label>MY CODE (틀린 코드 혹은 리팩토링 코드)</label>
                        <textarea 
                            className="write-textarea code-textarea" 
                            placeholder="// 이곳에 코드를 붙여넣거나 작성하세요."
                            value={myCode}
                            onChange={(e) => setMyCode(e.target.value)}
                        />
                    </div>

                    {/* 하단 제어 버튼 */}
                    <div className="write-btn-group">
                        {/* 🚨 className="cancel-btn"이랑 "save-btn" 완벽 복구! */}
                        <button className="cancel-btn" onClick={() => navigate("/")}>취소</button>
                        <button className="save-btn" onClick={handleSave}>노트 등록</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NoteWrite;