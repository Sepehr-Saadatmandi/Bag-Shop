import { useState } from 'react';
import { useContent, Section } from '../../context/ContentContext';

interface PageEditorProps {
  pageId: string;
  onBack: () => void;
}

export default function PageEditor({ pageId, onBack }: PageEditorProps) {
  const { pages, updatePage, updateSection, addSection, removeSection } = useContent();
  const page = pages.find((p) => p.id === pageId);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  if (!page) {
    return <div>Page not found</div>;
  }

  const handleAddSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      content: getDefaultContent(type),
    };
    addSection(pageId, newSection);
  };

  const getDefaultContent = (type: Section['type']) => {
    switch (type) {
      case 'text':
        return {
          title: 'New Section',
          text: 'Add your content here...',
        };
      case 'image':
        return {
          image: '',
          alt: 'Image description',
        };
      case 'product-grid':
        return {
          title: 'Products',
          showNewOnly: false,
        };
      case 'newsletter':
        return {};
      case 'featured':
        return {};
      case 'custom':
        return {
          title: 'Custom Section',
          content: 'Add custom HTML or content here...',
        };
      default:
        return {};
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-black transition-colors mb-2"
          >
            ← Back to Pages
          </button>
          <h2 className="text-2xl font-light tracking-wide">Edit: {page.title}</h2>
        </div>
      </div>

      {/* Page settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-sm font-medium mb-4">Page Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Page Title</label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => updatePage(pageId, { title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">URL Slug</label>
            <input
              type="text"
              value={page.slug}
              onChange={(e) => updatePage(pageId, { slug: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Hero section (if exists) */}
      {page.content.hero && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-medium mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Hero Image URL</label>
              <input
                type="text"
                value={page.content.hero.image}
                onChange={(e) =>
                  updatePage(pageId, {
                    content: {
                      ...page.content,
                      hero: { ...page.content.hero!, image: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">Title</label>
              <input
                type="text"
                value={page.content.hero.title}
                onChange={(e) =>
                  updatePage(pageId, {
                    content: {
                      ...page.content,
                      hero: { ...page.content.hero!, title: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">Subtitle</label>
              <input
                type="text"
                value={page.content.hero.subtitle}
                onChange={(e) =>
                  updatePage(pageId, {
                    content: {
                      ...page.content,
                      hero: { ...page.content.hero!, subtitle: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">Button Text</label>
              <input
                type="text"
                value={page.content.hero.cta}
                onChange={(e) =>
                  updatePage(pageId, {
                    content: {
                      ...page.content,
                      hero: { ...page.content.hero!, cta: e.target.value },
                    },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-sm font-medium mb-4">Page Sections</h3>
        <div className="space-y-4">
          {page.content.sections.map((section, index) => (
            <div key={section.id} className="border border-gray-200 rounded p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                  <span className="text-sm font-medium capitalize">{section.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setEditingSection(editingSection === section.id ? null : section.id)
                    }
                    className="px-3 py-1 text-xs border border-gray-200 hover:border-black transition-colors"
                  >
                    {editingSection === section.id ? 'Close' : 'Edit'}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this section?')) {
                        removeSection(pageId, section.id);
                      }
                    }}
                    className="px-3 py-1 text-xs text-red-600 border border-gray-200 hover:border-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingSection === section.id && (
                <SectionEditor
                  section={section}
                  onUpdate={(updates) => updateSection(pageId, section.id, updates)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Add section buttons */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-3">Add a new section:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAddSection('text')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Text
            </button>
            <button
              onClick={() => handleAddSection('image')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Image
            </button>
            <button
              onClick={() => handleAddSection('product-grid')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Product Grid
            </button>
            <button
              onClick={() => handleAddSection('newsletter')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Newsletter
            </button>
            <button
              onClick={() => handleAddSection('featured')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Featured
            </button>
            <button
              onClick={() => handleAddSection('custom')}
              className="px-4 py-2 text-xs border border-gray-200 hover:border-black transition-colors"
            >
              + Custom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Section editor component
function SectionEditor({
  section,
  onUpdate,
}: {
  section: Section;
  onUpdate: (updates: any) => void;
}) {
  switch (section.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Title</label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Content</label>
            <textarea
              value={section.content.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors resize-y"
            />
          </div>
          {section.content.buttonText !== undefined && (
            <>
              <div>
                <label className="block text-xs text-gray-600 mb-2">Button Text</label>
                <input
                  type="text"
                  value={section.content.buttonText || ''}
                  onChange={(e) => onUpdate({ buttonText: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">Button Link</label>
                <input
                  type="text"
                  value={section.content.buttonLink || ''}
                  onChange={(e) => onUpdate({ buttonLink: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                  placeholder="e.g., about, shop, or external URL"
                />
              </div>
            </>
          )}
        </div>
      );

    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Image URL</label>
            <input
              type="text"
              value={section.content.image || ''}
              onChange={(e) => onUpdate({ image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Alt Text</label>
            <input
              type="text"
              value={section.content.alt || ''}
              onChange={(e) => onUpdate({ alt: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
        </div>
      );

    case 'product-grid':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Section Title</label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={section.content.showNewOnly || false}
                onChange={(e) => onUpdate({ showNewOnly: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Show only new arrivals</span>
            </label>
          </div>
        </div>
      );

    case 'custom':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Title</label>
            <input
              type="text"
              value={section.content.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-2">Content (HTML supported)</label>
            <textarea
              value={section.content.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={8}
              className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors resize-y font-mono"
            />
          </div>
        </div>
      );

    default:
      return <p className="text-sm text-gray-500">No editable content for this section type.</p>;
  }
}
