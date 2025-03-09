import pkg from 'pg';
const {Pool} = pkg;
import express from 'express';
import cors from 'cors';
import {config} from "dotenv";

config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Provide a default port
});


pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database!');

    release();

     //Testing Response
    client.query('SELECT * FROM BOOKS', (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            console.log("Books data:", result.rows); // Log all rows

            // To access specific columns, use:
            result.rows.forEach(book => {
                console.log("Book Title:", book.title); // Replace 'title' with an actual column name
            });
        }
    });


});

//Making the get route


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React dev server URL
}));

app.get("/api/books", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        console.log(result);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
export default pool;