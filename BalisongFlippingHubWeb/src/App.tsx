import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'

import { ProfilePage } from './pages/ProfilePage'
import { HomePage } from './pages/HomePage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import { ROLE } from './modals/User'
import TutorialCenterPage from './pages/TutorialCenterPage'
import ProductWorldPage from './pages/ProductWorldPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/*Public Routes*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="tutorial-center" element={<TutorialCenterPage />} />
        <Route path="product-world" element={<ProductWorldPage />} />
        <Route path="/unauthorized" element={<h2>Unaothorized</h2>} />

        {/*Protected Routes*/}
        <Route element={<ProtectedRoutes allowedRoles={[ROLE.ADMIN, ROLE.MAKER, ROLE.USER]} />}>
          <Route path="/me" element={<ProfilePage />} />
        </Route>

        {/*Catch all 404*/} 
         <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  )
}

export default App
