package esprit.canditature.dto;

import java.time.LocalDate;

/**
 * Full candidature returned to the client:
 * data stored by candidature + the candidate (read in CANDIDAT) + the job (read in JOB).
 */
public record CandidatureResponse(
        Long id,
        String motivation,
        LocalDate applicationDate,
        Candidate candidate,
        JobResponse job
) {
}
