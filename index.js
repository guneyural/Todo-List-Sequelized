const app = require('express')();
const todoRoutes = require('./routes');
const PORT = process.env.PORT || 5000;

app.use(require('express').json());
app.use('/api/todo', todoRoutes);

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));