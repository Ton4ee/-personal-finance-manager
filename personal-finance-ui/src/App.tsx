import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

export default function App() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>💸 Personal Finance Manager</h1>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </div>
    )
}
