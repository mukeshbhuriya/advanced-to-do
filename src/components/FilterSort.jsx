import styles from './FilterSort.module.css';

const FilterSort = ({ filter, setFilter, sortBy, setSortBy }) => {
    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <label className={styles.label}>Filter:</label>
                <select
                    className={styles.select}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Sort:</label>
                <select
                    className={styles.select}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSort;
