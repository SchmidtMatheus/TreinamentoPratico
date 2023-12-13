package com.treinamento.treinamentopratico.controllers.jobPosition;

import com.treinamento.treinamentopratico.models.JobPosition;

public class JobPositionMapper {

  public static JobPosition toEntity(JobPositionRequest jobPositionRequest) {

    JobPosition jobPosition = new JobPosition();
    jobPosition.setName(jobPositionRequest.getName());
    return jobPosition;
  }

  public static JobPosition toEntity(JobPositionRequest jobPositionRequest, Integer id) {
    JobPosition jobPosition = toEntity(jobPositionRequest);
    jobPosition.setId(id);
    return jobPosition;
  }

  public static JobPositionResponse toResponse(JobPosition jobPosition) {
    JobPositionResponse jobPositionResponse = new JobPositionResponse();
    jobPositionResponse.setId(jobPosition.getId());
    jobPositionResponse.setName(jobPosition.getName());
    return jobPositionResponse;
  }
}
