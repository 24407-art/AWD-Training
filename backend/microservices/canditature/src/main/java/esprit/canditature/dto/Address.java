package esprit.canditature.dto;

/** Address nested in the candidat JSON (same keys as the JSON). */
public record Address(
        Long id,
        String street,
        String houseNumber,
        String zipCode,
        Long candidateId
) {
}
