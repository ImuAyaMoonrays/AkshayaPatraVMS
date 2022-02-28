package com.akshayapatravms.c4g.enums;

public enum PresenceModality {
    //    since we are using @Enumerated(EnumType.STRING), changing these values will break the data, you can add new values, but don't
    //    change the present ones (ie IN_PERSON -> PHYSICAL)
    IN_PERSON,
    VIRTUAL,
}
