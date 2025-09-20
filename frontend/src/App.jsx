import { useState, useEffect } from 'react'
import UrlForm from './components/UrlForm'
import UrlList from './components/UrlList'
import './App.css'

function App() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls')
      const data = await response.json()
      setUrls(data)
    } catch (error) {
      console.error('Error fetching URLs:', error)
    }
  }

  const addUrl = (newUrl) => {
    setUrls([newUrl, ...urls])
  }

  return (
    <div className="app">
      <h1>URL Shortener</h1>
      <UrlForm onAddUrl={addUrl} />
      <UrlList urls={urls} />
    </div>
  )
}

export default App