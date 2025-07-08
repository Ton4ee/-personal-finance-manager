package com.antonio.finance.web;

import com.antonio.finance.model.Transaction;
import com.antonio.finance.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getAll() {
        return transactionService.findAll();
    }

    @GetMapping("/{id}")
    public Transaction getById(@PathVariable Long id) {
        return transactionService.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        return transactionService.save(transaction);
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @RequestBody Transaction transaction) {
        transaction.setId(id);
        return transactionService.save(transaction);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        transactionService.delete(id);
    }

    @GetMapping("/between")
    public List<Transaction> getBetweenDates(@RequestParam String start, @RequestParam String end) {
        return transactionService.findBetweenDates(LocalDate.parse(start), LocalDate.parse(end));
    }
}
