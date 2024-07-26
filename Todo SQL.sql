CREATE DATABASE todo_app;
USE todo_app;

-- DROP DATABASE todo_app;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    due_date DATE,
    user_id INT,
    priority_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (priority_id) REFERENCES priorities(id)
);

INSERT INTO tasks (title, description, status, due_date, user_id, priority_id) VALUES
('Task 1', 'Task 1', 'Pending', '2024-07-30', 2, 3),
('Task 2', 'Task 2', 'Completed', '2024-07-26', 2, 1);


CREATE TABLE lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listName VARCHAR(100) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO lists (listName, user_id) VALUES
('List 1', 1),
('List 2', 1),
('List 1', 3);

CREATE TABLE taskLists (
    task_id INT,
    list_id INT,
    PRIMARY KEY (task_id, list_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (list_id) REFERENCES lists(id)
);

INSERT INTO taskLists (task_id, list_id) VALUES
(1, 1),
(2, 2);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    Upassword VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (userName, email, Upassword) VALUES
('Tom', 'tom@gmail.com', '!Tom76'),
('Peter', 'peter@gmail.com', 'Pet6%er');


CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    task_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO notes (content, task_id, user_id) VALUES
('Note 1', 1, 1),
('Comment', 1, 2);


CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fileName VARCHAR(255) NOT NULL,
    filePath VARCHAR(255) NOT NULL,
    task_id INT,
    user_id INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO attachments (fileName, filePath, task_id, user_id) VALUES
('File 1', 'C:/Users/HP/Documents/GitHub/Todo_App/Files/file1.txt', 1, 1),
('File 2', 'C:/Users/HP/Documents/GitHub/Todo_App/Files/file2.txt', 2, 1);


CREATE TABLE priorities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    priorityName VARCHAR(50) NOT NULL,
    priorityLevel INT NOT NULL
);

INSERT INTO priorities (priorityName, priorityLevel) VALUES
('High', 1),
('Moderate', 2),
('Low', 3);