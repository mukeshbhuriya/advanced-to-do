import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
    if (tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>No tasks found. Start by adding one!</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TaskList;
