package com.wh.backend.util;

import lombok.RequiredArgsConstructor;
import lombok.Singular;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PwdSecurity {
    private BCryptPasswordEncoder encoder;

    /**
     * 비밀번호를 암호화 후 암호화 한 비밀번호를 리턴
     * @param pwd   저장할 비밀번호
     * @return  암호화된 비밀번호
     */
    public String pwdEncoding(String pwd){
        return encoder.encode(pwd);
    }

    /**
     * 비밀번호를 입력받아 두 비밀번호가 같은지 확인
     * @param curPwd    입력창에서 입력한 비밀번호 입력
     * @param encodedpwd DB에서 불러온 비밀번호
     * @return  두 비밀번호가 같으면 true, 아니면 false
     */
    public boolean isRight(String curPwd, String encodedpwd){
        return BCrypt.checkpw(curPwd, encodedpwd);
    }

}
