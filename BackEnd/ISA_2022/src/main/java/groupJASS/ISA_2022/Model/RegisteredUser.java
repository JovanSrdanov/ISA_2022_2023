package groupJASS.ISA_2022.Model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisteredUser extends Person {

    // TODO: ne radi lazy

    @ManyToOne(fetch = FetchType.EAGER)
    private Address address;
    @Column(nullable = false)
    private String institution;
    @Column(nullable = false)
    private String occupation;
    @Column(unique = true, nullable = false)
    private String jmbg;
    @Column(nullable = false)
    private Gender gender;
    @Column(nullable = false)
    private boolean isActivated;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private int points;
    @OneToOne(fetch = FetchType.EAGER)
    private Questionnaire questionnaire;


}
