package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "로그인 결과 응답 데이터")
public class LoginResponse {
    @Schema(description = "로그인 결과 코드(success/id/pwd)", example="success")
    private String result;

    @Schema(description = "로그인 성공시 유저의 고유 인덱스 번호(실패시 null)", example="1")
    private Integer userId;

    @Schema(description = "로그인 성공시 유저의 닉네임(실패시 null)", example = "짱짱맨")
    private String nickname;
}
