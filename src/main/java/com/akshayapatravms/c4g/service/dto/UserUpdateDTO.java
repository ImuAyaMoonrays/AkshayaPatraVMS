package com.akshayapatravms.c4g.service.dto;

import java.sql.Date;

public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    private String email;
    private Date dob;
    private String phoneNumber;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phone_number) {
        this.phoneNumber = phone_number;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            "firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            "email='" + email + '\'' +
            ", dob='" + dob + '\'' +
            "phone_number='" + phoneNumber + '\'' +
            "}";
    }

}
