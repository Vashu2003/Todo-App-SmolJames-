import express from 'express';
import prisma from '../prisma.Client.js';

const router = express.Router();

// Get all todos for a user
router.get('/', async (req, res) => {
    const todos = prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    });

    res.json({ message : 'All todos fetched successfully' ,todos });
}); 

// create a new todo for a user
router.post('/', async (req, res) => {
    const { task } = req.body;  
    
    const todo = await prisma.todo.create({
        data: {
            title: task,
            userId: req.userId
        }
    });

    res.status(201).json({ message: 'Todo created successfully', todo }); 
});

// Update a todo for a user
router.put('/:id', async (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    });
    res.json({ message : 'Todo updated successfully', updatedTodo });


});

// Delete a todo for a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId: userId
        }
    });
    res.json({ message : 'Todo deleted successfully' });
});

export default router;