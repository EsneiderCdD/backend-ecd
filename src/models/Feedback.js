import pool from '../config/database.js';

class Feedback {
    static async createTable() {
        const query = `
      CREATE TABLE IF NOT EXISTS feedbacks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read BOOLEAN DEFAULT FALSE
      );
    `;

        try {
            await pool.query(query);
            // console.log('Feedback table verified/created');
        } catch (error) {
            console.error('Error creating feedback table:', error.message);
        }
    }

    static async create(feedbackData) {
        const { name, message } = feedbackData;

        const query = `
      INSERT INTO feedbacks (name, message)
      VALUES ($1, $2)
      RETURNING *;
    `;

        const values = [name, message];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getAll() {
        const query = 'SELECT * FROM feedbacks ORDER BY created_at DESC;';
        const result = await pool.query(query);
        return result.rows;
    }

    static async delete(id) {
        const query = 'DELETE FROM feedbacks WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

export default Feedback;
