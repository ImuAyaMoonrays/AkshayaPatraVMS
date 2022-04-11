package com.akshayapatravms.c4g.service.dto;

import com.akshayapatravms.c4g.domain.Image;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ImageResponseDTO {
    private String id;
    private String name;
    private Long size;
    private String url;
    private String contentType;

    public ImageResponseDTO(Image image) {
        this.id = image.getId();
        this.name = image.getName();
        this.size = image.getSize();
        this.contentType = image.getContentType();
        this.url = ServletUriComponentsBuilder.newInstance()
            .path("/api/images/")
            .path(image.getId())
            .toUriString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
