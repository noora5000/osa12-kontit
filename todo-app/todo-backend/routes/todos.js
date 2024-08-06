const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.json(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  try {
    const id = req.todo._id;
    const delAct = await Todo.findByIdAndDelete(id)
    if(!delAct){
      res.sendStatus(404);
    }
    res.sendStatus(204).end(); 
  } catch (error) {
    console.error(error); 
    res.sendStatus(500); 
  }
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
    // req.todo määritelty findByIdMiddleware:ssa
    if (!req.todo) {
      return res.sendStatus(404); 
    }
    res.json(req.todo).end();

  } catch (error) {
    console.error(error); 
    res.sendStatus(500);
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try{
    const id = req.todo._id;
    const updateTodo = {
      text: req.body.text,
      done: req.body.done,
    }
    const update = await Todo.findByIdAndUpdate(id, updateTodo, { new: true })
    res.json(update);
  } catch(error){
    console.error(error)
    res.sendStatus(500);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
