import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePageMeditation from "../pages/HomePageMeditation"
import LoginPage from "../pages/LoginPage";
import Layout from '../components/layout/Layout'
import PlayerPage from "../pages/PlayerPage"
import UserPage from "../pages/UserPage"
import AdminPage from "../pages/AdminPage"

export default function Router() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePageMeditation />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/meditar/:id" element={<PlayerPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}
