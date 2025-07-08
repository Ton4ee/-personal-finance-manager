import { useEffect, useState } from 'react'
import axios from 'axios'
import type {Transaction} from '../types/Transaction'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

const API_URL = 'https://personal-finance-manager-production-9c7e.up.railway.app/api/transactions'


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28']

export default function SummaryChart() {
    const [data, setData] = useState<{ name: string; value: number }[]>([])

    useEffect(() => {
        axios
            .get<Transaction[]>(API_URL)
            .then((res) => {
                const transactions = res.data

                const grouped = transactions.reduce((acc: Record<string, number>, tx) => {
                    acc[tx.category] = (acc[tx.category] || 0) + tx.amount
                    return acc
                }, {})

                const chartData = Object.entries(grouped).map(([category, total]) => ({
                    name: category,
                    value: total
                }))

                setData(chartData)
            })
            .catch((err) => console.error('Error loading chart data', err))
    }, [])

    return (
        <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
            <h2>Category Summary</h2>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
