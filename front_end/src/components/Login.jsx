import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    let [id, setId] = useState('');
    let [pwd, setPwd] = useState('');

    const send = () => {

        if (!id.trim()) {
            alert("아이디를 입력해주세요");
            return;
        }

        if (!pwd.trim()) {
            alert("비밀번호를 입력해주세요");
            return;
        }

        axios.post("http://localhost:8080/api/users/login", {
            login_id: id,
            pwd: pwd
        }).then(res => {
            const data = res.data;
            if(data.result == "success"){
                alert("${data.nickname}님 환영합니다");
            }else if(data.result == "pwd"){
                alert("비밀번호가 틀립니다.");
            }else if(data.result == "id"){
                alert("아이디가 틀리거나 존재하지 않습니다");
            }
        }).catch(err=> {
            console.log(err);
            alert("서버와 통신중 에러가 발생했습니다")
        })
        

    }

    return (
        <div>
            <table border="1" align="center">
                <tr>
                    <th>ID</th>
                    <td>
                        <input type="text" name="login_id" value={id} onChange={(e) => { setId(e.target.value) }} />
                    </td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td>
                        <input type="password" name="pwd" value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="button" value="등록" onClick={send} />
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Login