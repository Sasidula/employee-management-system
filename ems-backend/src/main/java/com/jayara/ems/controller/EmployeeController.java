package com.jayara.ems.controller;

import com.jayara.ems.dto.EmployeeRequestDTO;
import com.jayara.ems.dto.EmployeeResponseDTO;
import com.jayara.ems.entity.Employee;
import com.jayara.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService service;

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(
            @Valid @RequestBody EmployeeRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createEmployee(dto));
    }


    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDTO>> getAllEmployees(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department,
            @RequestParam(defaultValue = "id,asc") String[] sort

    ) {

        Sort.Direction direction =
                sort[1].equalsIgnoreCase("desc")
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(direction, sort[0])
        );

        return ResponseEntity.ok(
                service.findAll(search, department, pageable)
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDTO dto) {

        return ResponseEntity.ok(service.updateEmployee(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {

        service.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

}
