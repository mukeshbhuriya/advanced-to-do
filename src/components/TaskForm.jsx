import { useState } from 'react';
import Button from './UI/Button';
import Input, { TextArea } from './UI/Input';
import styles from './TaskForm.module.css';

const TaskForm = ({ onAdd, onCancel, initialData = null }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = onAdd({ title, description });
        if (success && !initialData) {
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
            />
            <TextArea
                label="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter details..."
            />
            <div className={styles.actions}>
                {onCancel && (
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit">
                    {initialData ? 'Update Task' : 'Add Task'}
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;
