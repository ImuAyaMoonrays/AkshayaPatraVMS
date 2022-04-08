//package com.akshayapatravms.c4g.service.mapper;
//
//import com.akshayapatravms.c4g.domain.Authority;
//import com.akshayapatravms.c4g.domain.User;
//import com.akshayapatravms.c4g.service.dto.AdminUserDTO;
//import com.akshayapatravms.c4g.service.dto.UserDTO;
//import java.util.*;
//import java.util.stream.Collectors;
//
//import com.akshayapatravms.c4g.service.dto.event.EventResponseDTO;
//import org.mapstruct.BeanMapping;
//import org.mapstruct.Mapping;
//import org.mapstruct.Named;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EventMapper {
//
//    public EventResponseDTO userToUserDTO(User user) {
//        return new UserDTO(user);
//    }
//
//
//    public List<UserDTO> usersToUserDTOs(List<User> users) {
//        return users.stream().filter(Objects::nonNull).map(this::userToUserDTO).collect(Collectors.toList());
//    }
//
//    public List<AdminUserDTO> usersToAdminUserDTOs(List<User> users) {
//        return users.stream().filter(Objects::nonNull).map(this::userToAdminUserDTO).collect(Collectors.toList());
//    }
//
//    public AdminUserDTO userToAdminUserDTO(User user) {
//        return new AdminUserDTO(user);
//    }
//
//    public List<User> userDTOsToUsers(List<AdminUserDTO> userDTOs) {
//        return userDTOs.stream().filter(Objects::nonNull).map(this::userDTOToUser).collect(Collectors.toList());
//    }
//
//    public User userDTOToUser(AdminUserDTO userDTO) {
//        if (userDTO == null) {
//            return null;
//        } else {
//            User user = new User();
//            user.setId(userDTO.getId());
//            user.setLogin(userDTO.getLogin());
//            user.setFirstName(userDTO.getFirstName());
//            user.setLastName(userDTO.getLastName());
//            user.setEmail(userDTO.getEmail());
//            user.setImageUrl(userDTO.getImageUrl());
//            user.setActivated(userDTO.isActivated());
//            user.setLangKey(userDTO.getLangKey());
//            Set<Authority> authorities = this.authoritiesFromStrings(userDTO.getAuthorities());
//            user.setAuthorities(authorities);
//            return user;
//        }
//    }
//
//
//
//}
