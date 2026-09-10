const store = new Map()

globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
}

const { expenseService } = await import('../src/services/expenseService.js')

const initial = expenseService.getExpenses()
console.log('seeded', initial.length)

const added = expenseService.addExpense({
  title: 'Coffee',
  amount: 80,
  category: 'Food',
  date: '2026-09-09',
  paymentMethod: 'UPI',
  note: 'test',
})
console.log('added', added.title, added.amount)

const updated = expenseService.updateExpense(added.id, {
  title: 'Coffee',
  amount: 90,
  category: 'Food',
  date: '2026-09-09',
  paymentMethod: 'Cash',
  note: 'edited',
})
console.log('updated', updated.amount, updated.paymentMethod)

expenseService.deleteExpense(added.id)
console.log(
  'after delete',
  expenseService.getExpenses().every((e) => e.id !== added.id),
)

expenseService.clearExpenses()
console.log('cleared', expenseService.getExpenses().length === 0)
