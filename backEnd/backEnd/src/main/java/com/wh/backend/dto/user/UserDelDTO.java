package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@Schema(description = "삭제성공 여부와 로그인 ID를 반환")
@AllArgsConstructor
public class UserDelDTO {
    @Schema(description = "삭제 수행 결과(success/fail)", example = "success")
    private String result;
    @Schema(description = "삭제한 유저의 ID", example = "ID")
    private String login_id;
}
