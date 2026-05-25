package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "비밀번호 변경시 응답 데이터")
public class PwdChangeDTO {
    @Schema(description = "비밀번호 변경 결과", example = "success")
    private String result;
}
