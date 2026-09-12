import { useState } from 'react';
import { useContent, PageContent } from '../../context/ContentContext';

interface PageManagerProps {
  onEditPage: (pageId: string) => void;
}

export default function PageManager({ onEditPage }: PageManagerProps) {
  const { pages, addPage, removePage, updatePage } = useContent();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');

  const handleAddPage = () => {
    if (!newPageTitle.trim()) return;

    const newPage: PageContent = {
      id: `page-${Date.now()}`,
      title: newPageTitle,
      slug: newPageTitle.toLowerCase().replace(/\s+/g, '-'),
      content: {
        sections: [
          {
            id: `section-${Date.now()}`,
            type: 'text',
            content: {
              title: newPageTitle,
              text: 'Add your content here...',
            },
          },
        ],
      },
      isVisible: true,
      order: pages.length,
    };

    addPage(newPage);
    setNewPageTitle('');
    setShowAddModal(false);
  };

  const handleRemovePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      removePage(pageId);
    }
  };

  const handleToggleVisibility = (pageId: string, isVisible: boolean) => {
    updatePage(pageId, { isVisible });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light tracking-wide mb-2">Pages</h2>
          <p className="text-sm text-gray-500">Manage your website pages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
        >
          + Add Page
        </button>
      </div>

      {/* Pages list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {pages.map((page, index) => (
          <div
            key={page.id}
            className={`p-6 flex items-center justify-between ${
              index !== pages.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">{page.title}</h3>
                <p className="text-xs text-gray-500">/{page.slug}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={page.isVisible}
                  onChange={(e) => handleToggleVisibility(page.id, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs text-gray-600">Visible</span>
              </label>

              <button
                onClick={() => onEditPage(page.id)}
                className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
              >
                Edit
              </button>

              <button
                onClick={() => handleRemovePage(page.id)}
                className="px-4 py-2 text-xs text-red-600 border border-gray-200 hover:border-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add page modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-light mb-6">Add New Page</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2">Page Title</label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors"
                  placeholder="Enter page title"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddPage}
                  className="flex-1 bg-black text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-900 transition-colors"
                >
                  Create Page
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewPageTitle('');
                  }}
                  className="flex-1 border border-gray-200 py-3 text-xs tracking-widest uppercase hover:border-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
