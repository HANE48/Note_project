import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; 

function Register(props) {
    const navigate = useNavigate();

    // 입력 폼 상태값들
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [ckpwd, setCkPwd] = useState('');
    const [nickname, setNickName] = useState('');
    
    // 이메일 인증 관련 상태값들
    const [email, setEmail] = useState('');
    const [authNum, setAuthNum] = useState('');     // 유저가 입력한 인증번호
    const [chkNum, setChkNum] = useState('');       // 서버에서 받아온 진짜 인증번호
    const [isEmailSent, setIsEmailSent] = useState(false); // 🚨 인증번호 입력창을 보여줄지 말지 결정하는 State!
    const [emailAuth, setEmailAuth] = useState(false);     // 최종 인증 완료 여부

    const isDarkMode = props.isDarkMode !== undefined ? props.isDarkMode : true;

    // 1. 회원가입 버튼 클릭 시
    const register = () => {
        if (!id.trim()) { alert("아이디를 입력해주세요"); return; }
        if (!pwd.trim()) { alert("비밀번호를 입력해주세요"); return; }
        if (!nickname.trim()) { alert("닉네임을 입력해주세요"); return; }
        if (pwd !== ckpwd) {
            alert("올바른 비밀번호를 입력해주세요");
            document.getElementById("pwdck").focus();
            return;
        }
        // 🚨 이메일 인증 안 했으면 컷!
        if (!emailAuth) {
            alert("이메일 인증을 완료해주세요!");
            return;
        }

        axios({
            url: "http://localhost:8080/api/users",
            method: "post",
            data: {
                loginId: id,
                password: pwd,
                nickname: nickname,
                email: email // DB에 이메일도 같이 저장!
            }
        }).then(res => {
            const data = res.data;
            if (data.result === 'success') {
                alert("가입 성공");
                navigate("/");
            } else {
                alert("가입 실패");
            }
        }).catch(err => {
            console.log(err);
            alert("서버 통신 중 에러 발생");
        });
    } 

    const back = () => {
        navigate("/");
    }

    // 2. 인증번호 발송 버튼 클릭 시
    const authen = () => {
        if (!email.trim()) {
            alert("이메일을 먼저 입력해주세요.");
            return;
        }

        // 🚨 [수정 완료] axios.post(주소, 데이터) 정석 문법으로 404 에러 원천 차단!
        axios.post("http://localhost:8080/api/users/auth", { 
            email: email 
        })
        .then(res => {
            const data = res.data;
            // 스프링에서 EmailAuthDTO로 반환한 값을 받는다고 가정
            alert("이메일로 인증번호가 발송되었습니다.");
            
            // 🚨 리액트 정석: getElementById 대신 State를 true로 바꿔서 입력창을 렌더링함!
            setIsEmailSent(true); 
            setChkNum(data.authNum); // 서버가 준 인증번호 저장 (DTO 필드명에 맞게 수정!)
        })
        .catch(err => {
            console.error(err);
            alert("이메일 전송에 실패하였습니다.");
        });
    }

    // 3. 인증번호 확인 버튼 클릭 시
    const verifyAuthCode = () => {
        if (!authNum.trim()) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        if (authNum == chkNum) {
            alert("이메일 인증이 완료되었습니다!");
            setEmailAuth(true); // 인증 완료 상태로 변경
        } else {
            alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
        }
    }

    return (
        <div className={`register-page-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="register-box">
                <h2 className="register-title cursor-pointer" onClick={() => navigate('/')}>
                    💻 CREATE ACCOUNT
                </h2>

                <div className="input-group">
                    <label>USER ID</label>
                    <input type="text" className="register-input" placeholder="사용할 아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>PASSWORD</label>
                    <input type="password" className="register-input" placeholder="비밀번호를 입력하세요" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>CONFIRM PASSWORD</label>
                    <input type="password" id="pwdck" className="register-input" placeholder="비밀번호를 한 번 더 입력하세요" value={ckpwd} onChange={(e) => setCkPwd(e.target.value)} />
                </div>

                {/* 🚨 이메일 인증 구역 리팩토링 (Flex 적용) */}
                <div className="input-group">
                    <label>EMAIL AUTHENTICATION</label>
                    
                    {/* 1층: 이메일 입력 + 발송 버튼 */}
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <input 
                            type="text" 
                            className="register-input" 
                            placeholder="이메일을 입력해주세요" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={emailAuth} // 인증 완료되면 이메일 수정 불가
                        />
                        <button type="button" className="submit-btn" style={{ width: '130px', flexShrink: 0 }} onClick={authen} disabled={emailAuth}>
                            {isEmailSent ? "재전송" : "인증 발송"}
                        </button>
                    </div>

                    {/* 2층: 🚨 isEmailSent가 true일 때만 나타나는 인증번호 입력 + 확인 버튼 */}
                    {isEmailSent && !emailAuth && (
                        <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                            <input 
                                type="text" 
                                className="register-input" 
                                placeholder="인증번호 6자리 입력" 
                                value={authNum} 
                                onChange={(e) => setAuthNum(e.target.value)} 
                            />
                            <button type="button" className="submit-btn" style={{ width: '130px', flexShrink: 0, backgroundColor: '#4ade80', color: '#0f172a' }} onClick={verifyAuthCode}>
                                인증 확인
                            </button>
                        </div>
                    )}

                    {/* 인증 완료 메시지 */}
                    {emailAuth && (
                        <div style={{ marginTop: '8px', color: '#4ade80', fontSize: '13px', fontWeight: 'bold' }}>
                            ✅ 이메일 인증이 완료되었습니다.
                        </div>
                    )}
                </div>

                <div className="input-group" style={{ marginTop: '10px' }}>
                    <label>NICKNAME</label>
                    <input type="text" className="register-input" placeholder="화면에 표시될 닉네임을 입력하세요" value={nickname} onChange={(e) => setNickName(e.target.value)} />
                </div>

                <div className="btn-group">
                    {/* form 태그 안에서 엔터 쳤을 때 오작동 방지를 위해 type="button" 설정 필수! */}
                    <input type="button" className="submit-btn" value="REGISTER" onClick={register} />
                    <input type="button" className="back-btn" value="CANCEL" onClick={back} />
                </div>
            </div>
        </div>
    )
}

export default Register;