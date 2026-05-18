package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
@Schema(description = "회원가입 결과 응답 데이터")
public class RegisterResponseDTO {
    @Schema(description = "회원가입 결과(success / fail)", example = "success")
    private String result;
}
