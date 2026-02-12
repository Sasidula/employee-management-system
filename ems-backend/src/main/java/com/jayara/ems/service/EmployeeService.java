package com.jayara.ems.service;

import com.jayara.ems.dto.EmployeeRequestDTO;
import com.jayara.ems.dto.EmployeeResponseDTO;
import com.jayara.ems.exception.EmailAlreadyExistsException;
import com.jayara.ems.entity.Employee;
import com.jayara.ems.exception.EmployeeNotFoundException;
import com.jayara.ems.repository.EmployeeRepository;
import com.jayara.ems.specification.EmployeeSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository repository;


    //Create Employee
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException(dto.getEmail());
        }

        Employee employee = Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .department(dto.getDepartment())
                .build();

        Employee saved = repository.save(employee);

        return mapToResponse(saved);
    }


    //Update Employee
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {

        Employee existing = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        // Check email uniqueness if changed
        if (!existing.getEmail().equals(dto.getEmail()) &&
                repository.existsByEmail(dto.getEmail())) {

            throw new EmailAlreadyExistsException(dto.getEmail());
        }

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setDepartment(dto.getDepartment());

        Employee updated = repository.save(existing);

        return mapToResponse(updated);
    }


    //Find All Employees
    public Page<EmployeeResponseDTO> findAll(
            String search,
            String department,
            Pageable pageable) {

        Specification<Employee> spec =
                Specification.where(EmployeeSpecification.search(search))
                        .and(EmployeeSpecification.filterByDepartment(department));

        Page<Employee> employees = repository.findAll(spec, pageable);

        return employees.map(this::mapToResponse);
    }


    //Find Employee by ID
    public EmployeeResponseDTO findById(Long id) {

        Employee employee = repository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        return mapToResponse(employee);
    }


    // Delete Employee
    public void deleteEmployee(Long id) {

        if (!repository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }

        repository.deleteById(id);
    }


    // Utility method to map Employee entity to EmployeeResponseDTO
    private EmployeeResponseDTO mapToResponse(Employee employee) {

        return EmployeeResponseDTO.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .build();
    }

}
