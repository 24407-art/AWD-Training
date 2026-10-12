package esprit.canditature.service;

import esprit.canditature.dto.Candidate;
import esprit.canditature.dto.CandidatureResponse;
import esprit.canditature.dto.JobResponse;
import esprit.canditature.entity.Candidature;
import esprit.canditature.feignClient.CandidatClient;
import esprit.canditature.feignClient.JobClient;
import esprit.canditature.repository.CandidatureRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class CandidatureService {

    private final CandidatureRepository repository;
    private final CandidatClient candidatClient;
    private final JobClient jobClient;

    public CandidatureService(CandidatureRepository repository, CandidatClient candidatClient, JobClient jobClient) {
        this.repository = repository;
        this.candidatClient = candidatClient;
        this.jobClient = jobClient;
    }

    /**
     * Add a candidature, then return it with the candidate and the job.
     * - candidate or job unknown -> FeignException.NotFound -> 404 (handled in CandidatureRestApi)
     * - job closed or candidate already applied to this job -> 409
     */
    public CandidatureResponse add(Candidature candidature) {
        Candidate candidate = candidatClient.findById(candidature.getCandidateId());
        JobResponse job = jobClient.findById(candidature.getJobId());

        if (!job.available()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce job n'est plus disponible");
        }
        if (repository.existsByCandidateIdAndJobId(candidature.getCandidateId(), candidature.getJobId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce candidat a déjà postulé à ce job");
        }
        if (candidature.getApplicationDate() == null) {
            candidature.setApplicationDate(LocalDate.now());
        }

        Candidature saved = repository.save(candidature);
        return new CandidatureResponse(saved.getId(), saved.getMotivation(), saved.getApplicationDate(), candidate, job);
    }

    /** One candidature with its candidate and its job (2 OpenFeign calls). */
    public CandidatureResponse getById(Long id) {
        Candidature candidature = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));
        return toResponse(candidature);
    }

    public List<CandidatureResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private CandidatureResponse toResponse(Candidature candidature) {
        Candidate candidate = candidatClient.findById(candidature.getCandidateId());
        JobResponse job = jobClient.findById(candidature.getJobId());
        return new CandidatureResponse(candidature.getId(), candidature.getMotivation(),
                candidature.getApplicationDate(), candidate, job);
    }
}
