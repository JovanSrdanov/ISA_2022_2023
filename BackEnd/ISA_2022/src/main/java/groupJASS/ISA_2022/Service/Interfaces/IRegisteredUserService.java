package groupJASS.ISA_2022.Service.Interfaces;

import groupJASS.ISA_2022.Model.Address;
import groupJASS.ISA_2022.Model.Questionnaire;
import groupJASS.ISA_2022.Model.RegisteredUser;

import java.util.UUID;

public interface IRegisteredUserService extends ICrudService<RegisteredUser> {
    RegisteredUser RegisterUser(RegisteredUser map, Address address);

    Questionnaire getQuestionnaireFromBloodDonor(UUID bloodDonorId);
}
