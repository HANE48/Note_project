package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Schema(description = "로그인시 넘어오는 파라미터")
@AllArgsConstructor
public class LoginRequest {

    @Schema(description = "유저가 입력한 ID", example = "ID")
    private String loginId;

    @Schema(description = "유저가 입력한 비밀번호", example = "pwd")
    private String pwd;
}
