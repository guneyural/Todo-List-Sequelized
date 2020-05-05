const {
    user,
    todo
} = require('../db/models');

const getUser = async (req, res) => {
    try {
        const getUser = await user.findOne({
            where: { id: req.header('userId') }
        });
        if(getUser) return res.json(getUser);
        return res.status(400).json({ msg: 'User not found' });
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await user.create(req.body);
        return res.json(newUser);
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const getUserTodos = async (req, res) => {
    try {
        if(req.header('userId')) {
            const todos = await todo.findAll({
                where: { userId: req.header('userId') },
                include: [
                    {
                        model: user,
                        as: 'user'
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(todos.length > 0) return res.json(todos);
            return res.status(200).json(todos);
        }
        return res.status(401).json({ msg: 'Sign in to see your todos' });
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const addTodo = async (req, res) => {
    try {
        if(req.header('userId')){
            const newTodo = await todo.create({
                ...req.body,
                userId: req.header('userId')
            });
            const getNewTodo = await todo.findOne({
                where: { id: newTodo.id },
                include: [
                    {
                        model: user,
                        as: 'user'
                    }
                ]
            });
            return res.status(201).json(getNewTodo);
        }
        return res.status(401).json({ msg: 'Sign in to add todo' });
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const updateTodo = async (req, res) => {
    try {
        if(req.header('userId')){
            const getTodo = await todo.findOne({
                where: { id: req.params.id }
            });
            if(getTodo.userId === Number(req.header('userId'))) {
                await todo.update(req.body, {
                    where: { id: req.params.id }
                });
                const getUpdatedTodo = await todo.findOne({
                    where: { id: req.params.id },
                    include: [
                        {
                            model: user,
                            as: 'user'
                        }
                    ]
                });
                return res.json(getUpdatedTodo);
            } else {
                return res.status(401).json({ msg: 'You can only modify your todos.' });
            }
        }else {
            return res.status(401).json({ msg: 'Sign in to update todo' });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deleteTodo = async (req, res) => {
    try {
        if(req.header('userId')){
            const getTodo = await todo.findOne({
                where: { id: req.params.id }
            });
            if(getTodo.userId === Number(req.header('userId'))) {
                await todo.destroy({
                    where: { id: req.params.id }
                });
                res.json({ msg: 'Item Deleted' });
            } else {
                return res.status(401).json({ msg: 'You can only modify your todos.' });
            }
        } else {
            return res.status(401).json({ msg: 'Sign in to delete todo' });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getUser,
    createUser,
    getUserTodos,
    addTodo,
    updateTodo,
    deleteTodo
};