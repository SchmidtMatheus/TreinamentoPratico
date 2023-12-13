package com.treinamento.treinamentopratico.controllers.client;

import com.treinamento.treinamentopratico.models.Client;

public class ClientMapper {

  public static Client toEntity(ClientRequest clientRequest) {

    Client client = new Client();
    client.setName(clientRequest.getName());
    return client;
  }

  public static Client toEntity(ClientRequest clientRequest, Integer id) {
    Client client = toEntity(clientRequest);
    client.setId(id);
    return client;
  }

  public static ClientResponse toResponse(Client client) {
    ClientResponse clientResponse = new ClientResponse();
    clientResponse.setId(client.getId());
    clientResponse.setName(client.getName());
    return clientResponse;
  }
}
