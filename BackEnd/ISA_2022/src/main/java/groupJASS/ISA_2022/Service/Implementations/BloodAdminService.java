package groupJASS.ISA_2022.Service.Implementations;

import groupJASS.ISA_2022.Model.BloodAdmin;
import groupJASS.ISA_2022.Repository.BloodAdminRepository;
import groupJASS.ISA_2022.Service.Interfaces.IBloodAdminService;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Primary
public class BloodAdminService implements IBloodAdminService {

    private final BloodAdminRepository _bloodAdminRepository;

    @Autowired
    public BloodAdminService(BloodAdminRepository bloodAdminRepository)
    {
        _bloodAdminRepository = bloodAdminRepository;
    }
    @Override
    public Iterable<BloodAdmin> findAll() {
        throw new NotImplementedException();
    }

    @Override
    public BloodAdmin findById(UUID id) {
        throw new NotImplementedException();
    }

    @Override
    public BloodAdmin save(BloodAdmin entity) {
        entity.setId(UUID.randomUUID());
        return _bloodAdminRepository.save(entity);
    }

    @Override
    public void deleteById(UUID id) {
        throw new NotImplementedException();
    }
}
