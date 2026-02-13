package com.jayara.ems.specification;

import com.jayara.ems.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {

    public static Specification<Employee> search(String search) {
        return (root, query, criteriaBuilder) -> {

            if (search == null || search.trim().isEmpty()) {
                return null;
            }

            String likePattern = "%" + search.toLowerCase() + "%";

            // Try parsing ID
            try {
                Long id = Long.parseLong(search);

                return criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("id"), id),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), likePattern)
                );

            } catch (NumberFormatException e) {
                // Not a number → search only by text fields
                return criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), likePattern)
                );
            }
        };
    }

    public static Specification<Employee> filterByDepartment(String department) {
        return (root, query, criteriaBuilder) -> {

            if (department == null || department.isEmpty()) {
                return null;
            }

            return criteriaBuilder.equal(root.get("department"), department);
        };
    }
}
