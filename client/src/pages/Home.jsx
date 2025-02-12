import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        //console.log(res);
        setTodos([...todos, res.data.todo]);
        toast(res.data.message);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo");
        if (res.data.success) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        toast("Error in fetching todos");
      }
    };
    fetchTodo();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center mt-2 gap-5">
        <Input
          type="text"
          placeholder="Add a new todo ..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-1/4"
        />
        <Button onClick={addTodoHandler}>Add todo</Button>
      </div>
      <Textarea
        placeholder="Write the decription"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="w-1/4 mt-2"
      />
      <div className="grid grid-cols-5 gap-2 mt-5">
        {todos.map((todo) => (
          <Card key={todo._id} className="bg-slate-400">
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>{todo.description}</CardDescription>
            </CardHeader>

            {/* <CardContent>
              <h1>{todo.title}</h1>
              <p>{todo.description}</p>
            </CardContent> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
