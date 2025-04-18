import Database from "better-sqlite3";

// Creates an in-memory SQLite database instance using better-sqlite3
const db = new Database(":memory:");

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
    )
`);
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);

// Export the database instance for use in other modules
export default db;