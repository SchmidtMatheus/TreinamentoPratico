package com.treinamento.treinamentopratico.exceptions;

public class NotFoundIdException extends RuntimeException{
  public NotFoundIdException(String errorMessage) {
    super(errorMessage);
  }
}
