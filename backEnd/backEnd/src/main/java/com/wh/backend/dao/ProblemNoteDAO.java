package com.wh.backend.dao;

import com.wh.backend.vo.ProblemNoteVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProblemNoteDAO {
    int insertNote(ProblemNoteVO vo);
    List<ProblemNoteVO> selectAll(String user_id);
}
