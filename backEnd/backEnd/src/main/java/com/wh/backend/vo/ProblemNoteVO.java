package com.wh.backend.vo;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("pn")
public class ProblemNoteVO {
    private int id;
    private String user_id;
    private String title;
    private String problem_number;
    private String platform;
    private String tags;
    private String wrong_reason;
    private String solution_logic;
    private String created_at;
}
