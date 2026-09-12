import { useContent } from '../../context/ContentContext';

export default function ThemeEditor() {
  const { theme, updateTheme } = useContent();

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
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Background Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Text Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
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
                  value={theme.fontFamily}
                  onChange={(e) => updateTheme({ fontFamily: e.target.value })}
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
                  value={theme.headerStyle}
                  onChange={(e) => updateTheme({ headerStyle: e.target.value as 'light' | 'dark' })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-2">Button Style</label>
                <select
                  value={theme.buttonStyle}
                  onChange={(e) => updateTheme({ buttonStyle: e.target.value as 'rounded' | 'square' })}
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
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              fontFamily: theme.fontFamily,
            }}
          >
            <h4
              className="text-2xl mb-4"
              style={{ color: theme.primaryColor }}
            >
              Sample Heading
            </h4>
            <p className="mb-4">
              This is how your text will look with the current theme settings.
            </p>
            <button
              className={`px-6 py-3 text-xs tracking-widest uppercase ${
                theme.buttonStyle === 'rounded' ? 'rounded-full' : ''
              }`}
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.backgroundColor,
              }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
