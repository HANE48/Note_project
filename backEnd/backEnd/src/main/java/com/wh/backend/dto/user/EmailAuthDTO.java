package com.wh.backend.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Schema(description = "이메일인증시 반환되는값")
@Getter
@AllArgsConstructor
public class EmailAuthDTO {
    @Schema(description = "성공/실패")
    private String result;

    @Schema(description = "이메일로 전송한 인증번호값")
    private String authNum;
}
