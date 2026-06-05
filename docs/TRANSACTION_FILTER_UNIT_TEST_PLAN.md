# Transaction Filter Unit Test Plan

## Objective

Create unit tests for filter actions in `TransactionList`:
- `All`
- `Completed`
- `Pending`
- `Failed`

This plan focuses on user-visible behavior and accessibility states (`aria-pressed`) from the filter buttons.

## Scope

In scope:
- Filter button rendering
- Default filter selection
- Transaction list updates per selected filter
- Empty state when filter has no matching records
- Pagination reset behavior when changing filter

Out of scope:
- Styling details (CSS class names)
- API/backend behavior
- End-to-end navigation

## Test Data Strategy

Use deterministic mock transactions with mixed statuses:
- 2 completed
- 2 pending
- 1 failed

For empty-state case, use a dataset that has no `failed` transactions.

For pagination reset case, use > 5 rows and move to page 2 first, then change filter.

## Planned Test Cases

1. `FILTER-01` Default state is `All`
- Render component
- Verify `All` has `aria-pressed=true`
- Verify all mock transactions are visible

2. `FILTER-02` Click `Completed`
- Click `Completed`
- Verify only completed rows remain
- Verify `Completed` has `aria-pressed=true`

3. `FILTER-03` Click `Pending`
- Click `Pending`
- Verify only pending rows remain
- Verify `Pending` has `aria-pressed=true`

4. `FILTER-04` Click `Failed`
- Click `Failed`
- Verify only failed rows remain
- Verify `Failed` has `aria-pressed=true`

5. `FILTER-05` Empty state for selected filter
- Use dataset with no failed rows
- Click `Failed`
- Verify `No transactions found.` appears

6. `FILTER-06` Pagination resets after filter change
- Use > 5 rows and move to page 2
- Click `Pending` (or another filter)
- Verify page info resets to page 1

## File Plan

- New test file:
  - `__tests__/components/TransactionList.filter.test.tsx`

## Execution Plan

1. Create test file with reusable mock transactions.
2. Implement 6 tests from above.
3. Run `npm run test`.
4. Fix any failing assertions.
5. Confirm filter tests pass in final report.

## Acceptance Criteria

- All filter tests pass locally.
- Tests are readable and beginner-friendly.
- Test names clearly map to filter actions.
