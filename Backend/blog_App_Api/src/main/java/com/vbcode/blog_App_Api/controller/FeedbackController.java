package com.vbcode.blog_App_Api.controller;

import com.vbcode.blog_App_Api.entity.FeedBack;
import com.vbcode.blog_App_Api.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/feedback")
    public ResponseEntity<FeedBack> createFeedBack(@RequestBody FeedBack feedBack){
        FeedBack feedback = this.feedbackService.createFeedback(feedBack);

        return new ResponseEntity<>(feedBack, HttpStatus.CREATED);
    }

    @GetMapping("/feedback")
    public ResponseEntity<List<FeedBack>> getAllFeddback(){
        List<FeedBack> allFeedBack = this.feedbackService.getALlFeedBack();
        return new ResponseEntity<>(allFeedBack,HttpStatus.OK);
    }

}
