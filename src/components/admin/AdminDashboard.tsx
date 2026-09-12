import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useContent } from '../../context/ContentContext';
import PageManager from './PageManager';
import ThemeEditor from './ThemeEditor';
import SiteSettings from './SiteSettings';
import PageEditor from './PageEditor';

export default function AdminDashboard() {
  const { logout } = useAdmin();
  const { pages, siteConfig } = useContent();
  const [activeTab, setActiveTab] = useState('pages');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);

  const handleEditPage = (pageId: string) => {
    setEditingPageId(pageId);
    setActiveTab('edit-page');
  };

  const handleBackToPages = () => {
    setEditingPageId(null);
    setActiveTab('pages');
  };

  const handleLogout = () => {
    logout();
    window.location.hash = '';
    window.location.reload();
  };

  const handleViewSite = () => {
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-light tracking-wider">Admin Dashboard</h1>
            <span className="text-xs text-gray-400">{siteConfig.siteName}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleViewSite}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('pages');
                setEditingPageId(null);
              }}
              className={`w-full text-left px-4 py-3 text-sm rounded transition-colors ${
                activeTab === 'pages'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full text-left px-4 py-3 text-sm rounded transition-colors ${
                activeTab === 'theme'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Theme
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 text-sm rounded transition-colors ${
                activeTab === 'settings'
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              Site Settings
            </button>
          </nav>

          {/* Page list */}
          <div className="mt-8">
            <h3 className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              Quick Edit Pages
            </h3>
            <div className="space-y-1">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleEditPage(page.id)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors"
                >
                  {page.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {activeTab === 'pages' && <PageManager onEditPage={handleEditPage} />}
          {activeTab === 'theme' && <ThemeEditor />}
          {activeTab === 'settings' && <SiteSettings />}
          {activeTab === 'edit-page' && editingPageId && (
            <PageEditor pageId={editingPageId} onBack={handleBackToPages} />
          )}
        </main>
      </div>
    </div>
  );
}
