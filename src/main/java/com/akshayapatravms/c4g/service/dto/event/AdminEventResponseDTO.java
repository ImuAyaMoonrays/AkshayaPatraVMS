package com.akshayapatravms.c4g.service.dto.event;

import com.akshayapatravms.c4g.domain.Cause;
import com.akshayapatravms.c4g.domain.Event;
import com.akshayapatravms.c4g.service.dto.CauseDTO;
import com.akshayapatravms.c4g.service.dto.ImageResponseDTO;

import javax.annotation.Nullable;
import java.util.Set;
import java.util.stream.Collectors;

public class AdminEventResponseDTO extends AbstractAdminEventDTO {

    @Nullable
    private ImageResponseDTO image;
    private Set<CauseDTO> causes;
    private Integer currentAmountOfVolunteers;

    public AdminEventResponseDTO() {
    }

    public AdminEventResponseDTO(Event event) {
        super(event);
        if (event.getImage() != null) {
            this.image = new ImageResponseDTO(event.getImage());
        }
        this.currentAmountOfVolunteers = event.getVolunteers().size();
        final Set<Cause> causes = event.getCauses();
        if (causes != null && causes.size() > 0) {
            this.causes = event.getCauses().stream()
                .map(CauseDTO::new)
                .collect(Collectors.toSet());
        }
    }

    @Nullable
    public ImageResponseDTO getImage() {
        return image;
    }

    public void setImage(@Nullable ImageResponseDTO image) {
        this.image = image;
    }

    public Set<CauseDTO> getCauses() {
        return causes;
    }

    public void setCauses(Set<CauseDTO> causes) {
        this.causes = causes;
    }

    public Integer getCurrentAmountOfVolunteers() {
        return currentAmountOfVolunteers;
    }

    public void setCurrentAmountOfVolunteers(Integer currentAmountOfVolunteers) {
        this.currentAmountOfVolunteers = currentAmountOfVolunteers;
    }
}
