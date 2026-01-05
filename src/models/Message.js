import pool from '../config/database.js';

class Message {
    static async createTable() {
        const query = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        proposal_type VARCHAR(50) NOT NULL,
        contact_type VARCHAR(50) NOT NULL,
        contact_value VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read BOOLEAN DEFAULT FALSE
      );
    `;

        try {
            await pool.query(query);
            console.log('✅ Tabla "messages" verificada/creada');
        } catch (error) {
            console.error('❌ Error creando tabla:', error.message);
        }
    }

    static async create(messageData) {
        const { name, proposal_type, contact_type, contact_value, message } = messageData;

        const query = `
      INSERT INTO messages (name, proposal_type, contact_type, contact_value, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

        const values = [name, proposal_type, contact_type, contact_value, message];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async getAll() {
        const query = 'SELECT * FROM messages ORDER BY created_at DESC;';
        const result = await pool.query(query);
        return result.rows;
    }

    static async markAsRead(id) {
        const query = 'UPDATE messages SET read = TRUE WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM messages WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

export default Message;
