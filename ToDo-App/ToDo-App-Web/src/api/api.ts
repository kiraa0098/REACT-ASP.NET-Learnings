import axios from "./axios";
import type { ToDo } from "../types/todo";

export const getToDos = async (): Promise<ToDo[]> => {
  const response = await axios.get<ToDo[]>("/ToDo");
  return response.data;
};

export const getToDoById = async (id: string): Promise<ToDo> => {
  const response = await axios.get<ToDo>(`/ToDo/${id}`);
  return response.data;
};

export const createToDo = async (title: string): Promise<ToDo> => {
  const response = await axios.post<ToDo>("/ToDo", { title });
  return response.data;
};

export const updateToDo = async (todo: ToDo): Promise<void> => {
  await axios.put(`/ToDo/${todo.id}`, todo);
};

export const deleteToDo = async (id: string): Promise<void> => {
  await axios.delete(`/ToDo/${id}`);
};

export const exportToDos = async (): Promise<Blob> => {
  const response = await axios.get("/ToDo/export", {
    responseType: "blob",
  });
  return response.data;
};
