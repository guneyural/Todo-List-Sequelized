const {
    getUser,
    createUser,
    getUserTodos,
    addTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/index');
const router = require('express').Router();

router.get('/user', getUser);
router.get('/', getUserTodos);
router.post('/user', createUser);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;