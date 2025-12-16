import { useState } from 'react';
import useTodos from './hooks/useTodos';
import useDarkMode from './hooks/useDarkMode';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterSort from './components/FilterSort';
import styles from './App.module.css';
import Button from './components/UI/Button';

function App() {
  const {
    tasks,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
    stats,
    error
  } = useTodos();

  const { theme, toggleTheme } = useDarkMode();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Task Master</h1>
          <p className={styles.subtitle}>Manage your tasks efficiently</p>
        </div>
        <Button onClick={toggleTheme} variant="secondary">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
      </header>

      <main className={styles.main}>
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Tasks</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.pending}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        <div className={styles.controls}>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className={showAddForm ? '' : styles.primaryAction} // Add distinct class if needed
          >
            {showAddForm ? 'Cancel Adding' : '+ New Task'}
          </Button>
          <FilterSort
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {showAddForm && (
          <div className={styles.formSection}>
            <TaskForm
              onAdd={(data) => {
                const success = addTask(data);
                if (success) setShowAddForm(false);
                return success;
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <TaskList
          tasks={tasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggle={toggleStatus}
        />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Advanced To-Do App</p>
      </footer>
    </div>
  );
}

export default App;
