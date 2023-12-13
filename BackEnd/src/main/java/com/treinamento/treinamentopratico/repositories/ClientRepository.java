package com.treinamento.treinamentopratico.repositories;

import com.treinamento.treinamentopratico.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

}
