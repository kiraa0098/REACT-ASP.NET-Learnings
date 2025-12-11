import React, { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardContent,
  Checkbox,
  Button,
  TextField,
  Box,
  Typography
} from "@mui/material";
import { useToDoStore } from "../store/useToDoStore";
import type { ToDo } from "../types/todo";
import toast from "react-hot-toast";

const ToDoList: React.FC = () => {
  const { todos, fetchToDos, toggleToDo, deleteToDo, updateToDoTitle } = useToDoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [animation, setAnimation] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchToDos();
  }, [fetchToDos]);

  const handleToggleToDo = (todo: ToDo) => {
    if (!navigator.onLine) {
        toast.error('You are offline. Please check your internet connection.');
        return;
    }
    // Trigger the animation
    const newAnimation = { ...animation };
    newAnimation[todo.id] = todo.isDone ? "strike-right-to-left" : "strike-left-to-right";
    setAnimation(newAnimation);

    // Call the zustand action
    toggleToDo(todo);

    // Clear animation state after it finishes
    setTimeout(() => {
        setAnimation((prev) => {
            const updated = { ...prev };
            delete updated[todo.id];
            return updated;
        });
    }, 500); // Match animation duration
  };

  const handleEdit = (todo: ToDo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSaveEdit = (todo: ToDo) => {
    if (!navigator.onLine) {
        toast.error('You are offline. Please check your internet connection.');
        return;
    }
    if (editedTitle.trim() === "") {
      toast.error("To-Do title cannot be empty.");
      return;
    }
    updateToDoTitle(todo, editedTitle);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
  };

  const handleDelete = (id: string) => {
    if (!navigator.onLine) {
        toast.error('You are offline. Please check your internet connection.');
        return;
    }
    deleteToDo(id);
  }

  return (
    <Stack spacing={2}>
      {[...(todos || [])]?.sort((a, b) => a.id.localeCompare(b.id)).map((todo) => (
        <Card 
          key={todo.id}
          elevation={0}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            opacity: todo.isDone ? 0.6 : 1,
            backgroundColor: 'transparent',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 0,
          }}
        >
          <Checkbox
            checked={todo.isDone}
            onChange={() => handleToggleToDo(todo)}
            disabled={editingId === todo.id}
            color="primary"
          />
          <CardContent sx={{ flexGrow: 1, py: 0, ml: 1 }}>
            {editingId === todo.id ? (
              <TextField
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="standard"
                fullWidth
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(todo);
                  if (e.key === "Escape") handleCancelEdit();
                }}
              />
            ) : (
              <Typography 
                sx={{ textAlign: 'left' }}
                className={`${todo.isDone ? 'strike-through strike-through-done' : ''} ${animation[todo.id] || ''}`}
              >
                {todo.title}
              </Typography>
            )}
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
            {editingId === todo.id ? (
              <>
                <Button variant="text" color="primary" onClick={() => handleSaveEdit(todo)}>Save</Button>
                <Button variant="text" color="error" onClick={handleCancelEdit}>Cancel</Button>
              </>
            ) : (
              <>
                <Button variant="text" color="primary" onClick={() => handleEdit(todo)}>Edit</Button>
                <Button variant="text" color="error" onClick={() => handleDelete(todo.id)}>Delete</Button>
              </>
            )}
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export default ToDoList;