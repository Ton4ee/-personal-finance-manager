package com.antonio.finance.service;

import com.antonio.finance.model.Transaction;
import com.antonio.finance.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void delete(Long id) {
        transactionRepository.deleteById(id);
    }

    public List<Transaction> findBetweenDates(LocalDate start, LocalDate end) {
        return transactionRepository.findByDateBetween(start, end);
    }
}
