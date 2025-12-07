import { create } from "zustand";
import type { ToDo } from "../types/todo";
import {
  getToDos,
  createToDo,
  updateToDo,
  deleteToDo as apiDeleteToDo,
} from "../api/api";

interface ToDoState {
  todos: ToDo[];
  fetchToDos: () => Promise<void>;
  addToDo: (title: string) => Promise<void>;
  toggleToDo: (todo: ToDo) => Promise<void>;
  updateToDoTitle: (todo: ToDo, title: string) => Promise<void>;
  deleteToDo: (id: string) => Promise<void>;
}

export const useToDoStore = create<ToDoState>((set) => ({
  todos: [],
  fetchToDos: async () => {
    const todos = await getToDos();
    set({ todos });
  },
  addToDo: async (title) => {
    const newToDo = await createToDo(title);
    set((state) => ({ todos: [...state.todos, newToDo] }));
  },
  toggleToDo: async (todo) => {
    await updateToDo({ ...todo, isDone: !todo.isDone });
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === todo.id ? { ...t, isDone: !t.isDone } : t
      ),
    }));
  },
  updateToDoTitle: async (todo, title) => {
    await updateToDo({ ...todo, title });
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? { ...t, title } : t)),
    }));
  },
  deleteToDo: async (id) => {
    await apiDeleteToDo(id);
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));
