import { useState } from 'react'
import axios from 'axios'

const UrlForm = ({ onAddUrl }) => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/urls/shorten', {
        originalUrl
      })
      
      onAddUrl(response.data)
      setOriginalUrl('')
    } catch (error) {
      setError(error.response?.data || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <div className="input-group">
        <input
          type="url"
          placeholder="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default UrlForm