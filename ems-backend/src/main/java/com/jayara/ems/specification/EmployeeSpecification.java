package com.jayara.ems.specification;

import com.jayara.ems.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {

    public static Specification<Employee> search(String search) {
        return (root, query, criteriaBuilder) -> {

            if (search == null || search.isEmpty()) {
                return null;
            }

            String likePattern = "%" + search.toLowerCase() + "%";

            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), likePattern)
            );
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
