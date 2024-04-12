import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import ListCourse from './pages/ListCourse'
import VideoPage from './pages/VideoPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={
            <Layout>
              <Login />
            </Layout>
          } path='/' />

          <Route element={
            <Layout>
              <ListCourse />
            </Layout>
          } path='/videos' />

          <Route element={
            <Layout>
              <VideoPage />
            </Layout>
          } path='/video' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
