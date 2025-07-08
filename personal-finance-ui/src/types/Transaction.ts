export interface Transaction {
    id?: number
    amount: number
    type: 'INCOME' | 'EXPENSE'
    category: string
    date: string
    description: string
}
