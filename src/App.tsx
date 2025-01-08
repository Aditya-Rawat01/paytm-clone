import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup.tsx'
import Signin from './pages/signin.tsx'
import Dashboard from './pages/dashboard.tsx'
import SendMoney from './pages/sendMoney.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './pages/homepage.tsx'


const client=new QueryClient()
function App() {
  

  return (<>
    <QueryClientProvider client={client}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/send' element={<SendMoney/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/sendmoney' element={<SendMoney/>}/>
          </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>)
}

export default App
