package com.wh.backend.dao;

import com.wh.backend.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDAO {
     UserVO selectOneUser(String login_id);
     UserVO selectOneUser(int id);
     int insertUser(UserVO vo);
     int delete(int id);
}
