import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Transaction } from '../types/Transaction'

const API_URL = 'http://localhost:8080/api/transactions'

interface Props {
    selectedTransaction: Transaction | null
    onSuccess: () => void
    clearSelection: () => void
}

export default function TransactionForm({ selectedTransaction, onSuccess, clearSelection }: Props) {
    const [form, setForm] = useState<Transaction>({
        amount: 0,
        type: 'INCOME',
        category: '',
        date: '',
        description: ''
    })

    useEffect(() => {
        if (selectedTransaction) {
            setForm(selectedTransaction)
        }
    }, [selectedTransaction])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (selectedTransaction && selectedTransaction.id) {
                await axios.put(`${API_URL}/${selectedTransaction.id}`, form)
            } else {
                await axios.post(API_URL, form)
            }

            alert('Transaction saved!')
            setForm({ amount: 0, type: 'INCOME', category: '', date: '', description: '' })
            onSuccess()
            clearSelection()
        } catch (error) {
            console.error('Error saving transaction', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
            <h4 className="mb-3">{selectedTransaction ? 'Edit' : 'Add'} Transaction</h4>

            <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-select">
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {selectedTransaction ? 'Update' : 'Save'}
                </button>
                {selectedTransaction && (
                    <button type="button" onClick={clearSelection} className="btn btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}
