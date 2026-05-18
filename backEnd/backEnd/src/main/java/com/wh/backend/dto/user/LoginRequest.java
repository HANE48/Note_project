package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Schema(description = "로그인시 넘어오는 파라미터")
@NoArgsConstructor
public class LoginRequest {

    @Schema(description = "유저가 입력한 ID", example = "ID")
    private String loginId;

    @Schema(description = "유저가 입력한 비밀번호", example = "pwd")
    private String pwd;
}
