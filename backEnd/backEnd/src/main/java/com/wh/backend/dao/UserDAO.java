package com.wh.backend.dao;

import com.wh.backend.vo.UserVO;

public interface UserDAO {
     UserVO selectOneUser(String login_id);
     UserVO selectOneUserId(int id);
     int insertUser(UserVO vo);
     int delete(int id);
     int updateUserPwd(UserVO vo);
     UserVO selectUserId(String login_id);
}
