const UrlList = ({ urls }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="url-list">
      <h2>Shortened URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs shortened yet</p>
      ) : (
        <ul>
          {urls.map((url) => (
            <li key={url._id} className="url-item">
              <div className="url-info">
                <div className="original-url">
                  <strong>Original:</strong> 
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl}
                  </a>
                </div>
                <div className="short-url">
                  <strong>Short:</strong> 
                  <a href={`${window.location.origin}/api/urls/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {`${window.location.origin}/api/urls/${url.shortCode}`}
                  </a>
                  <button 
                    onClick={() => copyToClipboard(`${window.location.origin}/api/urls/${url.shortCode}`)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
                <div className="clicks">
                  <strong>Clicks:</strong> {url.clicks}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UrlList