import { useState, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { validateTask } from '../utils/validation';
import { sortTasks, filterTasks } from '../utils/helpers';

const useTodos = () => {
    const [tasks, setTasks] = useLocalStorage('advanced-todos', []);
    const [filter, setFilter] = useState('all'); // all, completed, pending
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, az, za
    const [error, setError] = useState(null);

    const addTask = (taskData) => {
        setError(null);
        const { isValid, errors } = validateTask(taskData);

        if (!isValid) {
            setError(Object.values(errors)[0]); // Simple error handling for now
            return false;
        }

        const newTask = {
            id: crypto.randomUUID(),
            title: taskData.title,
            description: taskData.description,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setTasks(prev => [newTask, ...prev]);
        return true;
    };

    const updateTask = (id, updates) => {
        setError(null);
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return { ...task, ...updates, updatedAt: new Date().toISOString() };
            }
            return task;
        }));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const toggleStatus = (id) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const newStatus = task.status === 'completed' ? 'pending' : 'completed';
                return { ...task, status: newStatus, updatedAt: new Date().toISOString() };
            }
            return task;
        }));
    };

    const processedTasks = useMemo(() => {
        let result = filterTasks(tasks, filter);
        result = sortTasks(result, sortBy);
        return result;
    }, [tasks, filter, sortBy]);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length
    };

    return {
        tasks: processedTasks,
        stats,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        addTask,
        updateTask,
        deleteTask,
        toggleStatus,
        error,
        setError
    };
};

export default useTodos;
