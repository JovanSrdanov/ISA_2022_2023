package groupJASS.ISA_2022.Controller;

import groupJASS.ISA_2022.DTO.BloodAdminRegistrationDTO;
import groupJASS.ISA_2022.Model.BloodAdmin;
import groupJASS.ISA_2022.Model.BloodUser;
import groupJASS.ISA_2022.Model.Role;
import groupJASS.ISA_2022.Service.Interfaces.IBloodAdminService;
import groupJASS.ISA_2022.Service.Interfaces.IBloodUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("blood-admin")
public class BloodAdminController {

    private final IBloodUserService _bloodUserService;
    private final ModelMapper _modelMapper;
    private final IBloodAdminService _bloodAdminService;

    @Autowired
    public BloodAdminController(IBloodUserService bloodUserService, ModelMapper modelMapper, IBloodAdminService bloodAdminService)
    {
        _bloodUserService = bloodUserService;
        _modelMapper = modelMapper;
        _bloodAdminService = bloodAdminService;
    }

    @PostMapping(consumes = "application/json" )
    public ResponseEntity<Void> registerBloodAdmin(@RequestBody BloodAdminRegistrationDTO dto)
    {
        try{
            //TODO: Convert this to transaction
            BloodAdmin bloodAdmin = _modelMapper.map(dto, BloodAdmin.class);
            UUID bloodAdminId = _bloodAdminService.save(bloodAdmin).getId();

            BloodUser bloodUser = _modelMapper.map(dto, BloodUser.class);
            bloodUser.setRole(Role.MEDICAL_ADMIN);
            bloodUser.setPersonId(bloodAdminId);

            _bloodUserService.save(bloodUser);

            return  new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
