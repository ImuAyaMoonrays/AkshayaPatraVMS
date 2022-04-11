package com.akshayapatravms.c4g.service;

import com.akshayapatravms.c4g.domain.Image;
import com.akshayapatravms.c4g.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    private final ImageRepository imageRepository;


    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }


    public Image saveImage(MultipartFile file) throws IOException {
        final Image image = new Image();
        image.setName(file.getName());
        image.setData(file.getBytes());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        return imageRepository.save(image);
    }

    public Optional<Image> imageById(String id) {
        return imageRepository.findById(id);
    }


}
