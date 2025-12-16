export const validateTask = (task) => {
    const errors = {};

    if (!task.title || task.title.trim() === '') {
        errors.title = 'Title is required';
    } else if (task.title.length > 50) {
        errors.title = 'Title must be less than 50 characters';
    }

    if (task.description && task.description.length > 200) {
        errors.description = 'Description must be less than 200 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
