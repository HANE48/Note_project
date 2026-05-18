package com.wh.backend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.wh.backend.dao.*;

@SpringBootApplication
@MapperScan(basePackages = {"com.wh.backend.dao.UserDAO", "com.wh.backend.dao.ProblemNoteDAO"})
public class BackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);
    }

}
