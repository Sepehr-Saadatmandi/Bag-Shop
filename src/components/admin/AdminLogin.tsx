import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      // Force a page reload to trigger the admin dashboard view
      // This is needed because the hash is already #/admin
      window.location.reload();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-wider mb-2">Admin Login</h1>
          <p className="text-sm text-gray-500">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p className="mb-1">Username: <code className="bg-white px-2 py-0.5 rounded border border-blue-100">admin</code></p>
          <p>Password: <code className="bg-white px-2 py-0.5 rounded border border-blue-100">admin123</code></p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              window.location.hash = '';
              window.location.reload();
            }}
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
