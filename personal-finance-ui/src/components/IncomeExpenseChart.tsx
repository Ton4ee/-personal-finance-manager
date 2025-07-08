import { useEffect, useState } from 'react'
import axios from 'axios'
import type {Transaction} from '../types/Transaction'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const API_URL = 'http://localhost:8080/api/transactions'

interface MonthlyData {
    month: string
    income: number
    expense: number
}

export default function IncomeExpenseChart() {
    const [data, setData] = useState<MonthlyData[]>([])

    useEffect(() => {
        axios.get<Transaction[]>(API_URL).then((res) => {
            const transactions = res.data

            const grouped = transactions.reduce((acc: Record<string, MonthlyData>, tx) => {
                const month = tx.date.substring(0, 7) // "2025-07"
                if (!acc[month]) {
                    acc[month] = { month, income: 0, expense: 0 }
                }

                if (tx.type === 'INCOME') {
                    acc[month].income += tx.amount
                } else {
                    acc[month].expense += tx.amount
                }

                return acc
            }, {})

            const result = Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month))
            setData(result)
        })
    }, [])

    return (
        <div style={{ width: '100%', height: 350, marginTop: '2rem' }}>
            <h2>Monthly Income vs Expense</h2>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#82ca9d" name="Income" />
                    <Bar dataKey="expense" fill="#ff7f50" name="Expense" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
