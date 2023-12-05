import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom'
import { useState } from "react"

import { useAuthContext } from './hooks/useAuthContext';

//pages and compoenents
import Home from './pages/Home'
import Navbar from './components/Navbar';
import BlogForm from './components/BlogForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Details from './pages/Details';
import Account from './pages/Account';

function App() {

  const { user } = useAuthContext()

  const [currentblog, setCurrentBlog] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home func={setCurrentBlog} />}
            />
            <Route
              path="/post"
              element={user ? <BlogForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user? <Signup /> : <Navigate to="/"/>}
            />  
             <Route
              path="/account"
              element={user ? <Account func={setCurrentBlog} /> : <Navigate to="/"/>}
            />  
            <Route
              path='/details'
              element={<Details current={ currentblog} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
