package com.vbcode.blog_App_Api.service.imple;

import com.vbcode.blog_App_Api.entity.FeedBack;
import com.vbcode.blog_App_Api.exception.ResourceNotFoundException;
import com.vbcode.blog_App_Api.repository.FeedbackRepo;
import com.vbcode.blog_App_Api.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImple implements FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;
    @Override
    public FeedBack createFeedback(FeedBack feedBack) {
            FeedBack f=this.feedbackRepo.save(feedBack);
        return f;
    }

    @Override
    public void DeleteFeedback(Integer fid) {
            this.feedbackRepo.findById(fid) .orElseThrow(()->new ResourceNotFoundException("Feedback","Fid",fid));
    }

    @Override
    public List<FeedBack> getALlFeedBack() {
        List<FeedBack> all = this.feedbackRepo.findAll();
        return all.stream().collect(Collectors.toList());
    }
}
