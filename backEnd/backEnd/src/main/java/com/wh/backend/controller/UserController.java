package com.wh.backend.controller;

import com.wh.backend.dao.UserDAO;
import com.wh.backend.dto.user.*;
import com.wh.backend.util.PwdSecurity;
import com.wh.backend.vo.UserVO;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserDAO userDAO;
    //private PwdSecurity pwdsec;

    @GetMapping("test")
    public String test(){
        return "";
    }

    /**
     * 로그인 시에 사용하는 API
     * @return 아이디가 틀리면 "ID", 비밀번호가 틀리면 "pwd", 성공은 "success"로 넘어옴
     */
    @PostMapping("/api/users/login")
    public LoginResponse login(@RequestBody LoginRequest req){

        System.out.println(req.getLoginId());
        System.out.println(req.getPwd());
        UserVO vo = userDAO.selectOneUser(req.getLoginId());
        System.out.println(vo == null);

        if(vo != null){
            if(vo.getPassword().equals(req.getPwd())){
                return new LoginResponse("success", vo.getId(), vo.getNickname());
            }else{
                return new LoginResponse("pwd", null, null);
            }
        }else{
            return new LoginResponse("id", null, null);
        }
    }

    /**
     * 회원가입 API
     * @param vo 회원가입에 사용한 유저의 정보
     * @return 성공/실패
     */
    @PostMapping("/api/users")
    public RegisterResponseDTO register(UserVO vo){
        //비밀번호 암호화
        //vo.setPassword(pwdsec.pwdEncoding(vo.getPassword()));
        //가입한 일자 저장
        vo.setCreated_at(LocalDate.now().toString());
        int res = userDAO.insertUser(vo);
        if(res == 1){
            return new RegisterResponseDTO("success");
        }else{
            return new RegisterResponseDTO("fail");
        }
    }

    /**
     * 마이페이지 진입시 유저의 고유 ID를 가지고 정보를 불러옴
     * @param id DB의 주키
     * @return 유저의 ID, 닉네임, 생성일자를 담은 DTO
     */
    @GetMapping("/api/users/")
    public UserDTO user(int id){
        UserVO vo = userDAO.selectOneUserId(id);
        return new UserDTO(vo.getLoginId(), vo.getNickname(), vo.getCreated_at());
    }

    /**
     * 유저의 비밀번호를 한번 더 입력받아 맞을경우만 삭제
     * @param pwd   삭제를 위해 입력한 비밀번호
     * @param id    DB의 고유 ID
     * @return  삭제 여부에 대한 DTO
     */
    @DeleteMapping("/api/users/")
    public UserDelDTO del(String pwd, int id){
        UserVO vo = userDAO.selectOneUserId(id);
        if(pwd.equals(vo.getPassword())){
            //비밀번호가 맞을 경우
            int res = userDAO.delete(id);
            return new UserDelDTO(res == 1 ? "success" : "fail", vo.getLoginId());
        }else{
            return new UserDelDTO("fail", vo.getLoginId());
        }
    }

}
