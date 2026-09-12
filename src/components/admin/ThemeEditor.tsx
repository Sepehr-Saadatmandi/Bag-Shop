import { useState, useEffect } from 'react';
import { useContent, ThemeConfig } from '../../context/ContentContext';

export default function ThemeEditor() {
  const { theme, updateTheme } = useContent();
  const [localTheme, setLocalTheme] = useState<ThemeConfig>(theme);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Sync local state with context when context changes
  useEffect(() => {
    setLocalTheme(theme);
    setHasChanges(false);
  }, [theme]);

  const handleSave = () => {
    updateTheme(localTheme);
    setHasChanges(false);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleCancel = () => {
    setLocalTheme(theme);
    setHasChanges(false);
  };

  const handleChange = (updates: Partial<ThemeConfig>) => {
    setLocalTheme({ ...localTheme, ...updates });
    setHasChanges(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">Theme Settings</h2>
        <p className="text-sm text-gray-500">Customize the look and feel of your website</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium mb-4">Colors</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-2">Primary Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={localTheme.primaryColor}
                    onChange={(e) => handleChange({ primaryColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localTheme.primaryColor}
                    onChange={(e) => handleChange({ primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Background Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={localTheme.backgroundColor}
                    onChange={(e) => handleChange({ backgroundColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localTheme.backgroundColor}
                    onChange={(e) => handleChange({ backgroundColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Text Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={localTheme.textColor}
                    onChange={(e) => handleChange({ textColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localTheme.textColor}
                    onChange={(e) => handleChange({ textColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Style */}
          <div>
            <h3 className="text-sm font-medium mb-4">Typography & Style</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-2">Font Family</label>
                <select
                  value={localTheme.fontFamily}
                  onChange={(e) => handleChange({ fontFamily: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm"
                >
                  <option value="Inter">Inter</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Lato">Lato</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Header Style</label>
                <select
                  value={localTheme.headerStyle}
                  onChange={(e) => handleChange({ headerStyle: e.target.value as 'light' | 'dark' })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Button Style</label>
                <select
                  value={localTheme.buttonStyle}
                  onChange={(e) => handleChange({ buttonStyle: e.target.value as 'rounded' | 'square' })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm"
                >
                  <option value="square">Square</option>
                  <option value="rounded">Rounded</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-4">Preview</h3>
          <div
            className="p-8 border border-gray-200 rounded"
            style={{
              backgroundColor: localTheme.backgroundColor,
              color: localTheme.textColor,
              fontFamily: localTheme.fontFamily,
            }}
          >
            <h4
              className="text-2xl mb-4"
              style={{ color: localTheme.primaryColor }}
            >
              Sample Heading
            </h4>
            <p className="mb-4">
              This is how your text will look with the current theme settings.
            </p>
            <button
              className={`px-6 py-3 text-xs tracking-widest uppercase ${
                localTheme.buttonStyle === 'rounded' ? 'rounded-full' : ''
              }`}
              style={{
                backgroundColor: localTheme.primaryColor,
                color: localTheme.backgroundColor,
              }}
            >
              Sample Button
            </button>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-8 py-3 text-xs tracking-widest uppercase transition-colors ${
              hasChanges
                ? 'bg-black text-white hover:bg-gray-900 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            disabled={!hasChanges}
            className={`px-8 py-3 text-xs tracking-widest uppercase border transition-colors ${
              hasChanges
                ? 'border-gray-300 hover:border-black cursor-pointer'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            Cancel
          </button>
          {showSaveMessage && (
            <span className="text-sm text-green-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Changes saved successfully!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
