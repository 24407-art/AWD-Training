package esprit.canditature.dto;

/**
 * Copy of the JSON returned by the candidat microservice (not a JPA entity:
 * candidature does not own candidates, it only reads them through Feign).
 * Field names must match the JSON keys sent by candidat.
 */
public class Candidate {
    private int id;
    private String firstName;
    private String lastName;
    private String email;

    public Candidate() {
    }

    public Candidate(String lastName, String firstName, String email) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "Candidate{id=" + id + ", firstName='" + firstName + "', lastName='" + lastName
                + "', email='" + email + "'}";
    }
}
