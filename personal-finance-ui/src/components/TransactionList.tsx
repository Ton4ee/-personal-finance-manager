import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Transaction } from '../types/Transaction'

const API_URL = 'https://personal-finance-manager-production-9c7e.up.railway.app/api/transactions'


interface Props {
    onEdit: (tx: Transaction) => void
    refreshFlag: boolean
}

export default function TransactionList({ onEdit, refreshFlag }: Props) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const fetchTransactions = () => {
        axios
            .get(API_URL)
            .then((res) => setTransactions(res.data))
            .catch((err) => console.error('Error fetching transactions:', err))
    }

    const fetchFiltered = () => {
        if (!startDate || !endDate) {
            alert('Pick start and end date')
            return
        }

        axios
            .get(`${API_URL}/between?start=${startDate}&end=${endDate}`)
            .then((res) => setTransactions(res.data))
            .catch((err) => console.error('Error filtering transactions:', err))
    }

    useEffect(() => {
        fetchTransactions()
    }, [refreshFlag])

    const handleDelete = async (id: number | undefined) => {
        if (!id) return
        const confirm = window.confirm('Are you sure you want to delete this transaction?')
        if (!confirm) return

        try {
            await axios.delete(`${API_URL}/${id}`)
            fetchTransactions()
        } catch (err) {
            console.error('Failed to delete:', err)
        }
    }

    return (
        <div className="card p-4 shadow-sm">
            <h4 className="mb-3">All Transactions</h4>

            {/* Date Range Filter */}
            <div className="row g-2 align-items-end mb-3">
                <div className="col-md-4">
                    <label className="form-label">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 d-flex gap-2">
                    <button onClick={fetchFiltered} className="btn btn-outline-primary w-50">
                        Filter
                    </button>
                    <button onClick={fetchTransactions} className="btn btn-outline-secondary w-50">
                        Reset
                    </button>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                    <tr>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th style={{ width: '120px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td>${tx.amount.toFixed(2)}</td>
                            <td>
                  <span
                      className={`badge ${
                          tx.type === 'INCOME' ? 'bg-success' : 'bg-danger'
                      }`}
                  >
                    {tx.type}
                  </span>
                            </td>
                            <td>{tx.category}</td>
                            <td>{tx.date}</td>
                            <td>{tx.description}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(tx)}
                                    className="btn btn-sm btn-outline-secondary me-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(tx.id)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center text-muted">
                                No transactions found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
