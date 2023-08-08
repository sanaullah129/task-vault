CREATE DATABASE task_vault;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

--FUNCTIONS FOR TASKS
--Create a new task
CREATE OR REPLACE FUNCTION create_task(description VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    INSERT INTO tasks (description) VALUES (description);
END;
$$
LANGUAGE plpgsql;

--Get all tasks
CREATE OR REPLACE FUNCTION get_tasks()
RETURNS TABLE(task_id INT, description VARCHAR(255)) AS $$
BEGIN
    RETURN QUERY SELECT * FROM tasks;
END;
$$
LANGUAGE plpgsql;

--Get one task
-- CREATE OR REPLACE FUNCTION get_one_task(task_id INT)
-- RETURNS TABLE(description VARCHAR(255)) AS $$
-- BEGIN
--     RETURN QUERY SELECT * FROM tasks WHERE task_id = task_id;
-- END;
-- $$
-- LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_one_task(task_id INT)
RETURNS TABLE(task_row tasks) AS $$
BEGIN
    RETURN QUERY SELECT * FROM tasks WHERE task_id = task_id;
END;
$$
LANGUAGE plpgsql;

--Update a task
CREATE OR REPLACE FUNCTION update_task(task_id INT, new_description VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    UPDATE tasks SET description = new_description WHERE task_id = task_id;
END;
$$
LANGUAGE plpgsql;

--Delete a task
CREATE OR REPLACE FUNCTION delete_task(task_id INT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM tasks WHERE task_id = task_id;
END;
$$
LANGUAGE plpgsql;