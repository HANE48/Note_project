package com.wh.backend.vo;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("user")
public class UserVO {
    private int id;
    private String login_id;
    private String password;
    private String nickname;
    private String created_at;
}
