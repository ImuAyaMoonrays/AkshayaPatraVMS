package com.akshayapatravms.c4g.web.rest;

import com.akshayapatravms.c4g.domain.Image;
import com.akshayapatravms.c4g.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageResource {

    private final Logger log = LoggerFactory.getLogger(ImageResource.class);

    private final ImageService imageService;


    public ImageResource(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            imageService.saveImage(file);
            return ResponseEntity.status(HttpStatus.OK)
                .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Optional<Image> fileEntityOptional = imageService.imageById(id);

        if (fileEntityOptional.isEmpty()) {
            return ResponseEntity.notFound()
                .build();
        }

        Image image = fileEntityOptional.get();
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
            .contentType(MediaType.valueOf(image.getContentType()))
            .body(image.getData());
    }


}
