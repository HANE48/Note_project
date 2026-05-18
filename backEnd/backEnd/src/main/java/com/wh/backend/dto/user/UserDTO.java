package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(description = "마이페이지 진입시 유저의 정보를 불러옴")
@Getter
@AllArgsConstructor
public class UserDTO {
    @Schema(description = "유저가 로그인한데 사용한 ID", example = "ID")
    private String login_id;

    @Schema(description = "유저가 설정한 닉네임", example = "짱짱맨")
    private String nickname;

    @Schema(description = "생성한 날짜", example = "2026-05-18")
    private String created_at;
}
