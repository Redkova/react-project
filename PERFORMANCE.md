# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 744 ms
- **Layout effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/baseline_sort_countries.png)

### Interaction B: Search countries

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 422.9 ms
- **Layout effects**: <0.1 ms
- **Passive effects**: 0.1 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/baseline_search_countries.png)

### Interaction C: Change year

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 808.7 ms
- **Layout effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/baseline_change_year.png)

### Interaction D: Toggle column

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 956.8 ms
- **Layout effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/baseline/baseline_toggle_column.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 101.7 ms
- **Layout effects**: 0.6 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/optimized_sort_countries.png)

### Interaction B: Search countries

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 94.9 ms
- **Layout effects**: 2.6 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/optimized_search_coutries.png)

### Interaction C: Change year

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 186.1 ms
- **Layout effects**: 4 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/optimized_change-year.png)

### Interaction D: Toggle column

- **Commit duration**: not explicitly shown in current React DevTools version
- **Render duration**: 46.8 ms
- **Layout effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**: ![screenshot](/screenshots/optimized/optimized_toggle_column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 744           | 101.7          | 86.3%       |
| Search countries | 422.9         | 94.9           | 77.6%       |
| Change year      | 808.7         | 186.1          | 77%         |
| Toggle column    | 956.8         | 46.8           | 95.1%       |
| **Average**      | **733.1**     | **107.4**      | **85.3%**   |
