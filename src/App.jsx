// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Upload } from './views/Upload';
import { Download } from './views/Download';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f5f5f5' }}>
        <Link to="/upload" style={{ marginRight: '15px' }}>
          Upload File
        </Link>
        <Link to="/download">Download File</Link>
      </nav>

      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/download" element={<Download />} />
        <Route
          path="/"
          element={
            <h2 style={{ padding: '20px' }}>
              Welcome! Choose Upload or Download.
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
