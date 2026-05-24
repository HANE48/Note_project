import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/NoteList.css'; // 🚨 CSS 임포트 확인!

function NoteList(props) {
    const navigate = useNavigate();

    // 부모(MainDashboard)에게서 테마 상태를 받아옴!
    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    const goToDetail = () => {
        // 클릭하면 상세 페이지 주소로 쿼리스트링(?id=번호)을 달고 이동!
        // 나중에 NoteDetail 컴포넌트 만들 때 URL에서 저 id를 꺼내 쓰면 돼.
        navigate(`/note-detail?id=${props.item.id}`);
    };

    return (
        <div className={`note-list-item ${isDarkMode ? 'dark' : 'light'}`} onClick={goToDetail}>
            <div className="note-title">
                <span>📄</span> 
                <span>{props.item.title}</span>
            </div>
            
            <span className="go-arrow">➔</span>
        </div>
    );
}

export default NoteList;