package com.vbcode.blog_App_Api.service.imple;

import com.vbcode.blog_App_Api.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImple implements FileService {
    @Override
    public String uploadImage(String path, MultipartFile multipartFile) throws IOException {
        //File name
        String name= multipartFile.getOriginalFilename();
        //Random name genrate file
        String randomID= UUID.randomUUID().toString();
        String filename1=randomID.concat(name.substring(name.lastIndexOf(".")));
        //FullPath
       String filePath=path+ File.separator + filename1;
       //File Exists or Not
       File f=new File(path);
       if (!f.exists()){
            f.mkdir();
       }

        Files.copy(multipartFile.getInputStream(), Paths.get(filePath));
       return filename1;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath=path+File.separator+fileName;
        InputStream image=new FileInputStream(fullPath);
        return image ;
    }
}
