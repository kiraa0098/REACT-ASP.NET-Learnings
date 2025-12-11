import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, Input, FormHelperText, Button, Stack } from '@mui/material';
import { useToDoStore } from '../store/useToDoStore';
import toast from 'react-hot-toast';

interface IFormInput {
    title: string;
}

const AddToDoForm: React.FC = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();
    const addToDo = useToDoStore((state) => state.addToDo);

    const onSubmit = (data: IFormInput) => {
        if (!navigator.onLine) {
            toast.error('You are offline. Please check your internet connection.');
            return;
        }
        if (data.title.trim() === '') {
            toast.error('To-Do title cannot be empty.');
            return;
        }
        addToDo(data.title);
        reset({ title: '' });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: 'To-Do title is required.' }}
                render={({ field }) => (
                    <FormControl fullWidth variant="standard" error={!!errors.title}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Input
                                {...field}
                                id="add-todo-input"
                                placeholder="Add a new task..."
                                sx={{ flexGrow: 1, backgroundColor: 'transparent' }}
                            />
                            <Button type="submit" variant="text" color="primary" size="large" sx={{ height: '56px' }}>
                                Add
                            </Button>
                        </Stack>
                        <FormHelperText>{errors.title ? errors.title.message : ' '}</FormHelperText>
                    </FormControl>
                )}
            />
        </form>
    );
};

export default AddToDoForm;