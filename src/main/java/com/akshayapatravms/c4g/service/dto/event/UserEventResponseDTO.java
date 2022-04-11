package com.akshayapatravms.c4g.service.dto.event;

import com.akshayapatravms.c4g.domain.Cause;
import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.service.dto.CauseDTO;
import com.akshayapatravms.c4g.service.dto.ImageResponseDTO;

import javax.annotation.Nullable;
import java.util.Set;
import java.util.stream.Collectors;

// User = non-admin user
public class UserEventResponseDTO extends AbstractEventDTO {

    @Nullable
    private ImageResponseDTO image;
    private boolean isRegistered;
    private Set<CauseDTO> causes;

    public UserEventResponseDTO() {
    }

    public UserEventResponseDTO(Event event) {
        super(event);
        this.image = new ImageResponseDTO(event.getImage());

        final Set<Cause> causes = event.getCauses();
        if (causes != null && causes.size() > 0) {
            this.causes = event.getCauses().stream()
                .map(CauseDTO::new)
                .collect(Collectors.toSet());
        }
    }

    public boolean isRegistered() {
        return isRegistered;
    }

    public void setRegistered(boolean registered) {
        isRegistered = registered;
    }

    public Set<CauseDTO> getCauses() {
        return causes;
    }

    public void setCauses(Set<CauseDTO> causes) {
        this.causes = causes;
    }

    public ImageResponseDTO getImage() {
        return image;
    }

    public void setImage(ImageResponseDTO image) {
        this.image = image;
    }
}
