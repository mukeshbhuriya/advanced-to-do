import { useState, memo } from 'react';
import styles from './TaskItem.module.css';
import Button from './UI/Button';
import TaskForm from './TaskForm';
import { formatDate } from '../utils/helpers';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <div className={styles.editWrapper}>
                <TaskForm
                    initialData={task}
                    onAdd={(updates) => {
                        onUpdate(task.id, updates);
                        setIsEditing(false);
                        return true;
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className={`${styles.card} ${task.status === 'completed' ? styles.completed : ''}`}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => onToggle(task.id)}
                        className={styles.checkbox}
                    />
                    <h3 className={styles.title}>{task.title}</h3>
                </div>
                <div className={styles.meta}>
                    <span className={`${styles.status} ${styles[task.status]}`}>
                        {task.status}
                    </span>
                    <span className={styles.date}>{formatDate(task.createdAt)}</span>
                </div>
            </div>

            {task.description && <p className={styles.description}>{task.description}</p>}

            <div className={styles.actions}>
                <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                    className={styles.actionBtn}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    onClick={() => onDelete(task.id)}
                    className={styles.actionBtn}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default memo(TaskItem);
