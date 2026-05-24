package com.wh.backend.controller;

import com.wh.backend.dao.ProblemNoteDAO;
import com.wh.backend.vo.ProblemNoteVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProblemNoteController {
    private final ProblemNoteDAO problemNoteDAO;

    @PostMapping("/api/note/insert")
    public Map<String, Object> upd(@RequestBody ProblemNoteVO vo){
        Map<String, Object> map = new HashMap<>();
        int res = problemNoteDAO.insertNote(vo);
        map.put("res", res);
        return map;
    }

    @GetMapping("api/note/list")
    public List<ProblemNoteVO> list(@RequestParam String user_id){
        return problemNoteDAO.selectAll(user_id);
    }

}
