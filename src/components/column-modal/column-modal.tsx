import styles from './column-modal.module.css';
import { useCallback } from 'react';

type ColumnModalProps = {
  isOpen: boolean;
  availableColumns: string[];
  selectedColumns: string[];
  onToggle: (column: string) => void;
  onClose: () => void;
};

export const ColumnModal = ({
  isOpen,
  availableColumns,
  selectedColumns,
  onToggle,
  onClose,
}: ColumnModalProps) => {
  const handleToggle = useCallback(
    (column: string) => {
      onToggle(column);
    },
    [onToggle]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Select columns to display</h2>
        <div className={styles.columnList}>
          {availableColumns.map((column) => (
            <div key={column} className={styles.columnItem}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleToggle(column)}
                  className={styles.checkbox}
                />
                {column}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
