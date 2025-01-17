import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "All fields required",
      });
    }

    const todo = new Todo({
      title,
      description,
    });
    todo.save();
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log("Todo creation failed", error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      success: true,
      todos: todos.length === 0 ? [] : todos,
    });
  } catch (error) {
    console.log("Error occured", error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const title = req.body;
    const todoId = req.params.todoId;

    const todo = await Todo.findByIdAndUpdate(todoId, title, { new: true });

    return res.status(200).json({
      success: true,
      todo,
      message: "Todo Updated",
    });
  } catch (error) {
    console.log("Error Occured", error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      success: true,
      message: "Deleted Todo",
    });
  } catch (error) {
    console.log("Error occured", error);
  }
};
