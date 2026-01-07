import { validationResult } from 'express-validator';
import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errors.array()
            });
        }

        const { name, proposalType, contactType, contactValue, message } = req.body;

        const newMessage = await Message.create({
            name,
            proposal_type: proposalType,
            contact_type: contactType,
            contact_value: contactValue,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage
        });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
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
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
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
                message: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
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
                message: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
