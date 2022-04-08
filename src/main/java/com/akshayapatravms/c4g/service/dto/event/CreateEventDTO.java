package com.akshayapatravms.c4g.service.dto.event;

import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;

public class CreateEventDTO extends AbstractEventDTO {

    public CreateEventDTO() {
    }

    @Nullable
    private MultipartFile image;

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
