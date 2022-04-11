package com.akshayapatravms.c4g.service.dto.event;

import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.service.dto.ImageResponseDTO;

import javax.annotation.Nullable;

public class EventResponseDTO extends AbstractEventDTO {

    public EventResponseDTO() {
    }

    public EventResponseDTO(Event event) {
        super(event);
        this.image = new ImageResponseDTO(event.getImage());

    }

    @Nullable
    private ImageResponseDTO image;

    public ImageResponseDTO getImage() {
        return image;
    }

    public void setImage(ImageResponseDTO image) {
        this.image = image;
    }
}
