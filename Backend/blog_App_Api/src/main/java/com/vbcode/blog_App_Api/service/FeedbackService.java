package com.vbcode.blog_App_Api.service;

import com.vbcode.blog_App_Api.entity.FeedBack;

import java.util.List;

public interface FeedbackService {

    FeedBack createFeedback(FeedBack feedBack);
    void DeleteFeedback(Integer fid);
    List<FeedBack> getALlFeedBack();

}
