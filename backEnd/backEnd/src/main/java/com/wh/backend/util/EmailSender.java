package com.wh.backend.util;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailSender {
    private final JavaMailSender jms;
    private int authNum;

    public EmailSender(JavaMailSender jms) {
        this.jms = jms;
    }

    /**
     * 인증번호 생성
     */
    public void makeRandomNum() {
        authNum = new Random().nextInt(999999 - 111111 + 1) + 111111;
    }

    /**
     * 입력받은 이메일로 인증번호 전송
     * @param email 인증번호를 받을 이메일
     * @return 인증번호를 String 형태로 리턴
     */
    public String joinEmail(String email){
        makeRandomNum();
        String setFrom = "hun2me@naver.com";
        String toMail = email;
        String title = "회원가입 인증용 이메일 입니다.";    //이메일의 제목
        StringBuffer sb = new StringBuffer();

        sb.append("<h3> 요청하신 인증번호입니다 </h3>")
                .append("<h1><b>")
                .append(authNum)
                .append("</b></h1>")
                .append("<p>감사합니다</p>");

        try{
            MimeMessage message = jms.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(sb.toString(), true);    //html의 태그를 동작하게 하기 위해 true

            jms.send(message);
        }catch(Exception e){
            System.err.println(e);
        }

        return String.valueOf(authNum);
    }//joinEmail
}
