import express, { Request, Response } from 'express';
import pool from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const route = express.Router();
const JWT_SECRET = "secret";

// Create a user
route.post("/create-user", async (req: Request, res: Response) => {
    try {
        const {email, username, password} = req.body;

        // Check if the email already exists in the database
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *", [email, username, hashedPassword]);
        res.json(newUser.rows[0]);
    } catch (error) {
        res.json((error as Error).message);
    }
});

// Log in
route.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists in the database
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password from the database
        const hashedPassword = user.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If passwords match, generate and send the JSON Web Token (JWT)
        const data = { email: user.rows[0].email, username: user.rows[0].username };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ token: authToken });
    } catch (error) {
        res.json((error as Error).message);
    }
});

export default route;

