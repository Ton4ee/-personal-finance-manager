import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Transaction } from '../types/Transaction'

const API_URL = 'https://personal-finance-manager-production-9c7e.up.railway.app/api/transactions'


interface Props {
    refreshFlag: boolean
}

export default function BalanceSummary({ refreshFlag }: Props) {
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)

    useEffect(() => {
        axios.get<Transaction[]>(API_URL).then((res) => {
            const transactions = res.data

            const totalIncome = transactions
                .filter((tx) => tx.type === 'INCOME')
                .reduce((sum, tx) => sum + tx.amount, 0)

            const totalExpense = transactions
                .filter((tx) => tx.type === 'EXPENSE')
                .reduce((sum, tx) => sum + tx.amount, 0)

            setIncome(totalIncome)
            setExpense(totalExpense)
        })
    }, [refreshFlag])

    const balance = income - expense

    return (
        <div className="row text-center mb-4">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6>Total Income</h6>
                        <h4 className="text-success">${income.toFixed(2)}</h4>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6>Total Expense</h6>
                        <h4 className="text-danger">${expense.toFixed(2)}</h4>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6>Balance</h6>
                        <h4 className={`fw-bold ${balance < 0 ? 'text-danger' : 'text-dark'}`}>
                            ${balance.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
