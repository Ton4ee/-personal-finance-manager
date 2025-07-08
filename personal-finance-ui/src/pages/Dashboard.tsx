import { useState } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import SummaryChart from '../components/SummaryChart'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import BalanceSummary from '../components/BalanceSummary'
import type { Transaction } from '../types/Transaction'

export default function Dashboard() {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [refreshFlag, setRefreshFlag] = useState(false)

    const handleEdit = (tx: Transaction) => {
        setSelectedTransaction(tx)
    }

    const handleSuccess = () => {
        setRefreshFlag(!refreshFlag)
    }

    const clearSelection = () => {
        setSelectedTransaction(null)
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h1 className="display-5 fw-bold text-primary">💸 Personal Finance Manager</h1>
                <p className="text-muted">Track your income and expenses with style.</p>
            </div>

            {/* Balance summary */}
            <BalanceSummary refreshFlag={refreshFlag} />

            {/* Transaction form */}
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <TransactionForm
                        selectedTransaction={selectedTransaction}
                        onSuccess={handleSuccess}
                        clearSelection={clearSelection}
                    />
                </div>
            </div>

            {/* Transaction list */}
            <div className="row mb-4">
                <div className="col-12">
                    <TransactionList onEdit={handleEdit} refreshFlag={refreshFlag} />
                </div>
            </div>

            {/* Charts */}
            <div className="row">
                <div className="col-md-6 mb-4">
                    <SummaryChart />
                </div>
                <div className="col-md-6 mb-4">
                    <IncomeExpenseChart />
                </div>
            </div>
        </div>
    )
}
