import React, { useEffect, useMemo, useState } from 'react';
import CSS from './I&E.module.css';

const STORAGE_KEY = 'STORAGE_KEY';

const defaultState = {
  incomeList: [
    { id: 'income-1', name: 'Online sales', amount: 4000, recurring: true, category: 'Sales', note: '' },
    { id: 'income-2', name: 'Main Job', amount: 7000, recurring: true, category: 'Salary', note: '' },
    { id: 'income-3', name: 'Hustling', amount: 1500, recurring: true, category: 'Side hustle', note: '' },
  ],
  expenseList: [
    { id: 'expense-1', name: 'Home Utilities', amount: 1500, recurring: true, category: 'Bills', note: '' },
    { id: 'expense-2', name: 'Food', amount: 1400, recurring: true, category: 'Groceries', note: '' },
    { id: 'expense-3', name: 'Rent', amount: 5500, recurring: true, category: 'Housing', note: '' },
  ],
  savings: 0,
};

const formatCurrency = (value) =>
  `R${Number(value || 0).toLocaleString('en-ZA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

function normaliseEntry(entry, prefix, index) {
  return {
    id: entry?.id || `${prefix}-${index + 1}-${String(entry?.name || 'entry').toLowerCase().replace(/\s+/g, '-')}`,
    name: entry?.name || '',
    amount: Number(entry?.amount || 0),
    recurring: Boolean(entry?.recurring),
    category: entry?.category || (prefix === 'income' ? 'Income' : 'Expense'),
    note: entry?.note || '',
  };
}

function readStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    return {
      incomeList: Array.isArray(parsed?.incomeList)
        ? parsed.incomeList.map((entry, index) => normaliseEntry(entry, 'income', index))
        : defaultState.incomeList,
      expenseList: Array.isArray(parsed?.expenseList)
        ? parsed.expenseList.map((entry, index) => normaliseEntry(entry, 'expense', index))
        : defaultState.expenseList,
      savings: Number(parsed?.savings || 0),
    };
  } catch (error) {
    console.error('Failed to load I&E state from localStorage', error);
    return defaultState;
  }
}

function blankEntry(type = 'income') {
  return {
    id: null,
    type,
    name: '',
    amount: '',
    recurring: false,
    category: type === 'income' ? 'Income' : 'Expense',
    note: '',
  };
}

export default function IEMain() {
  const [data, setData] = useState(readStoredState);
  const [entryModal, setEntryModal] = useState({ open: false, mode: 'add', form: blankEntry('income') });
  const [savingsModal, setSavingsModal] = useState({ open: false, amount: '' });
  const [activeView, setActiveView] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save I&E state to localStorage', error);
    }
  }, [data]);

  const incomeTotal = useMemo(
    () => data.incomeList.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [data.incomeList]
  );

  const expenseTotal = useMemo(
    () => data.expenseList.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [data.expenseList]
  );

  const availableToSave = incomeTotal - expenseTotal - data.savings;
  const disposableIncome = incomeTotal - expenseTotal;
  const totalRecurringIncome = data.incomeList.filter((item) => item.recurring).length;
  const totalRecurringExpenses = data.expenseList.filter((item) => item.recurring).length;

  const allTransactions = useMemo(() => {
    const mappedIncome = data.incomeList.map((item) => ({ ...item, type: 'income' }));
    const mappedExpense = data.expenseList.map((item) => ({ ...item, type: 'expense' }));

    return [...mappedIncome, ...mappedExpense].sort((a, b) => a.name.localeCompare(b.name));
  }, [data.expenseList, data.incomeList]);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    const source =
      activeView === 'income'
        ? allTransactions.filter((item) => item.type === 'income')
        : activeView === 'expense'
        ? allTransactions.filter((item) => item.type === 'expense')
        : allTransactions;

    if (!query) return source;

    return source.filter((item) => {
      return [item.name, item.category, item.note].some((value) => String(value || '').toLowerCase().includes(query));
    });
  }, [activeView, allTransactions, search]);

  const monthlyHealthTone =
    disposableIncome < 0 ? CSS.metricNegative : availableToSave <= 0 ? CSS.metricWarning : CSS.metricPositive;

  function openAddModal(type) {
    setEntryModal({
      open: true,
      mode: 'add',
      form: blankEntry(type),
    });
  }

  function openEditModal(entry) {
    setEntryModal({
      open: true,
      mode: 'edit',
      form: {
        id: entry.id,
        type: entry.type,
        name: entry.name,
        amount: String(entry.amount),
        recurring: Boolean(entry.recurring),
        category: entry.category,
        note: entry.note || '',
      },
    });
  }

  function closeEntryModal() {
    setEntryModal({ open: false, mode: 'add', form: blankEntry('income') });
  }

  function updateEntryField(field, value) {
    setEntryModal((current) => ({
      ...current,
      form: {
        ...current.form,
        [field]: value,
      },
    }));
  }

  function handleSaveEntry() {
    const amount = Number(entryModal.form.amount);
    const cleanName = entryModal.form.name.trim();
    const cleanCategory = entryModal.form.category.trim();

    if (!cleanName || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const payload = {
      id: entryModal.form.id || `${entryModal.form.type}-${Date.now()}`,
      name: cleanName,
      amount,
      recurring: Boolean(entryModal.form.recurring),
      category: cleanCategory || (entryModal.form.type === 'income' ? 'Income' : 'Expense'),
      note: entryModal.form.note.trim(),
    };

    setData((current) => {
      const targetKey = entryModal.form.type === 'income' ? 'incomeList' : 'expenseList';
      const targetList = [...current[targetKey]];
      const existingIndex = targetList.findIndex((item) => item.id === payload.id);

      if (existingIndex >= 0) {
        targetList[existingIndex] = payload;
      } else {
        targetList.unshift(payload);
      }

      return {
        ...current,
        [targetKey]: targetList,
      };
    });

    closeEntryModal();
  }

  function handleDeleteEntry(entry) {
    setData((current) => {
      const key = entry.type === 'income' ? 'incomeList' : 'expenseList';
      return {
        ...current,
        [key]: current[key].filter((item) => item.id !== entry.id),
      };
    });
  }

  function handleTransferToSavings() {
    const amount = Number(savingsModal.amount);

    if (!Number.isFinite(amount) || amount <= 0 || amount > availableToSave) {
      return;
    }

    setData((current) => ({
      ...current,
      savings: Number(current.savings) + amount,
    }));

    setSavingsModal({ open: false, amount: '' });
  }

  function TransactionTable({ items, type }) {
    return (
      <div className={CSS.tableCard}>
        <div className={CSS.tableCardHeader}>
          <div>
            <p className={CSS.eyebrow}>{type === 'income' ? 'Money in' : 'Money out'}</p>
            <h3>{type === 'income' ? 'Income entries' : 'Expense entries'}</h3>
          </div>
          <button className={CSS.secondaryButton} onClick={() => openAddModal(type)}>
            {type === 'income' ? 'Add income' : 'Add expense'}
          </button>
        </div>

        <div className={CSS.tableWrap}>
          <table className={CSS.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Recurring</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className={CSS.cellPrimary}>{item.name}</div>
                    {item.note ? <div className={CSS.cellSecondary}>{item.note}</div> : null}
                  </td>
                  <td>{item.category}</td>
                  <td>{formatCurrency(item.amount)}</td>
                  <td>{item.recurring ? 'Monthly' : 'Once-off'}</td>
                  <td>
                    <div className={CSS.actionRow}>
                      <button className={CSS.iconButton} onClick={() => openEditModal({ ...item, type })}>Edit</button>
                      <button className={CSS.iconButtonDanger} onClick={() => handleDeleteEntry({ ...item, type })}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5" className={CSS.emptyCell}>
                    No {type} entries yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <section className={CSS.appShell}>
      <div className={CSS.heroCard}>
        <div>
          <p className={CSS.eyebrow}>Budget dashboard</p>
          <h2>Track income, expenses, savings, and monthly breathing room.</h2>
          <p className={CSS.heroText}>
            This refreshed I &amp; E build keeps everything in local storage, fixes the broken savings flow,
            and gives you a cleaner monthly cash snapshot with faster add, edit, and search actions.
          </p>
        </div>
        <div className={CSS.heroActions}>
          <button className={CSS.primaryButton} onClick={() => openAddModal('income')}>Add income</button>
          <button className={CSS.secondaryButton} onClick={() => openAddModal('expense')}>Add expense</button>
          <button
            className={CSS.secondaryButton}
            disabled={availableToSave <= 0}
            onClick={() => setSavingsModal({ open: true, amount: '' })}
          >
            Move to savings
          </button>
        </div>
      </div>

      <div className={CSS.metricsGrid}>
        <article className={CSS.metricCard}>
          <p className={CSS.metricLabel}>Total income</p>
          <h3>{formatCurrency(incomeTotal)}</h3>
          <span className={CSS.metricHint}>{totalRecurringIncome} recurring entry(s)</span>
        </article>
        <article className={CSS.metricCard}>
          <p className={CSS.metricLabel}>Total expenses</p>
          <h3>{formatCurrency(expenseTotal)}</h3>
          <span className={CSS.metricHint}>{totalRecurringExpenses} recurring entry(s)</span>
        </article>
        <article className={`${CSS.metricCard} ${monthlyHealthTone}`}>
          <p className={CSS.metricLabel}>Disposable income</p>
          <h3>{formatCurrency(disposableIncome)}</h3>
          <span className={CSS.metricHint}>Income minus expenses before savings</span>
        </article>
        <article className={CSS.metricCard}>
          <p className={CSS.metricLabel}>Current savings</p>
          <h3>{formatCurrency(data.savings)}</h3>
          <span className={CSS.metricHint}>Available to save now: {formatCurrency(Math.max(availableToSave, 0))}</span>
        </article>
      </div>

      <div className={CSS.tablesGrid}>
        <TransactionTable items={data.incomeList} type="income" />
        <TransactionTable items={data.expenseList} type="expense" />
      </div>

      <div className={CSS.activityCard}>
        <div className={CSS.tableCardHeader}>
          <div>
            <p className={CSS.eyebrow}>Transaction browser</p>
            <h3>Find and review entries quickly</h3>
          </div>
          <div className={CSS.filterPills}>
            {['all', 'income', 'expense'].map((view) => (
              <button
                key={view}
                className={view === activeView ? CSS.filterPillActive : CSS.filterPill}
                onClick={() => setActiveView(view)}
              >
                {view === 'all' ? 'All' : view === 'income' ? 'Income only' : 'Expenses only'}
              </button>
            ))}
          </div>
        </div>

        <div className={CSS.searchRow}>
          <input
            className={CSS.searchInput}
            type="text"
            placeholder="Search by name, category, or note"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className={CSS.transactionList}>
          {filteredTransactions.map((item) => (
            <article key={`${item.type}-${item.id}`} className={CSS.transactionCard}>
              <div>
                <div className={CSS.transactionTitleRow}>
                  <h4>{item.name}</h4>
                  <span className={item.type === 'income' ? CSS.badgeIncome : CSS.badgeExpense}>
                    {item.type}
                  </span>
                </div>
                <p className={CSS.transactionMeta}>{item.category} · {item.recurring ? 'Recurring' : 'One-off'}</p>
                {item.note ? <p className={CSS.transactionNote}>{item.note}</p> : null}
              </div>
              <div className={CSS.transactionRight}>
                <strong>{formatCurrency(item.amount)}</strong>
                <div className={CSS.actionRow}>
                  <button className={CSS.iconButton} onClick={() => openEditModal(item)}>Edit</button>
                  <button className={CSS.iconButtonDanger} onClick={() => handleDeleteEntry(item)}>Delete</button>
                </div>
              </div>
            </article>
          ))}

          {filteredTransactions.length === 0 ? (
            <div className={CSS.emptyState}>
              No entries match your current search or filter.
            </div>
          ) : null}
        </div>
      </div>

      {entryModal.open ? (
        <div className={CSS.modalBackdrop} onClick={closeEntryModal}>
          <div className={CSS.modalCard} onClick={(event) => event.stopPropagation()}>
            <div className={CSS.modalHeader}>
              <div>
                <p className={CSS.eyebrow}>{entryModal.mode === 'add' ? 'New entry' : 'Edit entry'}</p>
                <h3>{entryModal.mode === 'add' ? 'Add a transaction' : 'Update transaction details'}</h3>
              </div>
              <button className={CSS.closeButton} onClick={closeEntryModal}>×</button>
            </div>

            <div className={CSS.formGrid}>
              <label className={CSS.field}>
                <span>Type</span>
                <select
                  className={CSS.input}
                  value={entryModal.form.type}
                  onChange={(event) => updateEntryField('type', event.target.value)}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </label>

              <label className={CSS.field}>
                <span>Name</span>
                <input
                  className={CSS.input}
                  type="text"
                  value={entryModal.form.name}
                  onChange={(event) => updateEntryField('name', event.target.value)}
                  placeholder="Rent, salary, freelance invoice..."
                />
              </label>

              <label className={CSS.field}>
                <span>Amount</span>
                <input
                  className={CSS.input}
                  type="number"
                  min="0"
                  step="0.01"
                  value={entryModal.form.amount}
                  onChange={(event) => updateEntryField('amount', event.target.value)}
                  placeholder="0.00"
                />
              </label>

              <label className={CSS.field}>
                <span>Category</span>
                <input
                  className={CSS.input}
                  type="text"
                  value={entryModal.form.category}
                  onChange={(event) => updateEntryField('category', event.target.value)}
                  placeholder="Housing, salary, groceries..."
                />
              </label>

              <label className={`${CSS.field} ${CSS.fieldFull}`}>
                <span>Note</span>
                <textarea
                  className={CSS.textarea}
                  rows="3"
                  value={entryModal.form.note}
                  onChange={(event) => updateEntryField('note', event.target.value)}
                  placeholder="Optional note for context"
                />
              </label>

              <label className={`${CSS.checkboxRow} ${CSS.fieldFull}`}>
                <input
                  type="checkbox"
                  checked={entryModal.form.recurring}
                  onChange={(event) => updateEntryField('recurring', event.target.checked)}
                />
                <span>Mark this as a recurring monthly entry</span>
              </label>
            </div>

            <div className={CSS.modalActions}>
              <button className={CSS.ghostButton} onClick={closeEntryModal}>Cancel</button>
              <button className={CSS.primaryButton} onClick={handleSaveEntry}>Save entry</button>
            </div>
          </div>
        </div>
      ) : null}

      {savingsModal.open ? (
        <div className={CSS.modalBackdrop} onClick={() => setSavingsModal({ open: false, amount: '' })}>
          <div className={CSS.modalCardSmall} onClick={(event) => event.stopPropagation()}>
            <div className={CSS.modalHeader}>
              <div>
                <p className={CSS.eyebrow}>Savings transfer</p>
                <h3>Move money into savings</h3>
              </div>
              <button className={CSS.closeButton} onClick={() => setSavingsModal({ open: false, amount: '' })}>×</button>
            </div>
            <p className={CSS.savingsHelper}>
              You can move up to {formatCurrency(Math.max(availableToSave, 0))} into savings based on your current monthly surplus.
            </p>
            <label className={CSS.field}>
              <span>Amount to save</span>
              <input
                className={CSS.input}
                type="number"
                min="0"
                step="0.01"
                value={savingsModal.amount}
                onChange={(event) => setSavingsModal((current) => ({ ...current, amount: event.target.value }))}
                placeholder="0.00"
              />
            </label>
            <div className={CSS.modalActions}>
              <button className={CSS.ghostButton} onClick={() => setSavingsModal({ open: false, amount: '' })}>Cancel</button>
              <button className={CSS.primaryButton} onClick={handleTransferToSavings}>Save amount</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
