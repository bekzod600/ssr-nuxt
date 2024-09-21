import connectMongo from "@/server/utils/db";
import Todo from "@/server/models/todo";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  console.log(method);
  await connectMongo();

  if (method === "GET") {
    const todos = await Todo.find();
    return todos;
  } else if (method === "POST") {
    try {
      const body = await readBody(event);

      const newTodo = new Todo({
        title: body.title,
        completed: body.completed || false,
      });
      await newTodo.save();

      return newTodo;
    } catch (error: any) {
      return {
        status: 400,
        message: "Error creating todo",
        error: error.message,
      };
    }
  } else {
    return {
      status: 405,
      message: "Method Not Allowed",
    };
  }
});
