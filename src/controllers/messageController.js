import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
    try {
        const { name, proposalType, contactType, contactValue, message } = req.body;

        // Validación
        if (!name || !proposalType || !contactType || !contactValue || !message) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        // Crear mensaje en BD
        const newMessage = await Message.create({
            name,
            proposal_type: proposalType,
            contact_type: contactType,
            contact_value: contactValue,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Mensaje enviado correctamente',
            data: newMessage
        });
    } catch (error) {
        console.error('Error creando mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.getAll();
        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const markMessageAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.markAsRead(id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Mensaje no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error marcando mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.delete(id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Mensaje no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Mensaje eliminado correctamente'
        });
    } catch (error) {
        console.error('Error eliminando mensaje:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};
