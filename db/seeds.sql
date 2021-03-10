USE employee_db;

INSERT INTO departments (id, department) VALUES ("1", "Management");
INSERT INTO departments (id, department) VALUES ("2", "Assistants");
INSERT INTO departments (id, department) VALUES ("3", "General Labor");


INSERT INTO roles (id, title, salary, depId) VALUES ("1", "Manager", "80000", "1");
INSERT INTO roles (id, title, salary, depId) VALUES ("2", "Assistant", "50000", "2");
INSERT INTO roles (id, title, salary, depId) VALUES ("3", "Layman", "40000", "3");


INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("1", "Bill", "Loni", "1", NULL);
INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("2", "Jim", "Shu", "1", "1");
INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("3", "Hugh", "Mann", "2", "4");