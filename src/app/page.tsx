"use client";

import { useQuery } from "@tanstack/react-query";
import getContent from "./api/getData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addTask, removeTask, setTasks } from "./store/todo";

type Todo = {
  id: number;
  title: string;
};

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { data } = useQuery<Todo[], Error>({
    queryFn: getContent,
    queryKey: ["todos"],
  });

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data));
    }
  }, [dispatch, data]);

  console.log(data);

  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() === "") return;

    const newTask: Todo = {
      id: Date.now(),
      title: input.trim(),
    };
    dispatch(addTask(newTask));
    setInput("");
  };

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
  };
  return (
    <div className="bg-gray-300 text-black px-4 py-4">
      <div>
        <h2 className="text-lg font-bold">Tasks in Redux</h2>
        <ul>
          {tasks.map((item) => (
            <li key={item.id} className="flex flex-col max-w-max">
              <span>{item.title}</span>
              <button
                onClick={() => handleRemoveTask(item.id)}
                className="bg-white text-black p-2 ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <form
          action=""
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <label htmlFor="">New Task</label>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="bg-white text-black p-2 m border-black border  mt-1 w-16 mx-auto">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
