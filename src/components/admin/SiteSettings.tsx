import { useState, useEffect } from 'react';
import { useContent, SiteConfig } from '../../context/ContentContext';

export default function SiteSettings() {
  const { siteConfig, updateSiteConfig } = useContent();
  const [localConfig, setLocalConfig] = useState<SiteConfig>(siteConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Sync local state with context when context changes
  useEffect(() => {
    setLocalConfig(siteConfig);
    setHasChanges(false);
  }, [siteConfig]);

  const handleSave = () => {
    updateSiteConfig(localConfig);
    setHasChanges(false);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleCancel = () => {
    setLocalConfig(siteConfig);
    setHasChanges(false);
  };

  const handleChange = (updates: Partial<SiteConfig>) => {
    setLocalConfig({ ...localConfig, ...updates });
    setHasChanges(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-light tracking-wide mb-2">Site Settings</h2>
        <p className="text-sm text-gray-500">Configure your website's global settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
        {/* General */}
        <div>
          <h3 className="text-sm font-medium mb-4">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Site Name</label>
              <input
                type="text"
                value={localConfig.siteName}
                onChange={(e) => handleChange({ siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Browser Tab Title</label>
              <input
                type="text"
                value={localConfig.pageTitle}
                onChange={(e) => handleChange({ pageTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                This appears in the browser tab and search results
              </p>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={localConfig.showAnnouncement}
                  onChange={(e) => handleChange({ showAnnouncement: e.target.checked })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-medium">Show Announcement Bar</span>
              </label>
              {localConfig.showAnnouncement && (
                <div className="ml-7">
                  <label className="block text-xs text-gray-600 mb-2">Announcement Text</label>
                  <input
                    type="text"
                    value={localConfig.announcement}
                    onChange={(e) => handleChange({ announcement: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Displayed at the top of your website
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Footer Text</label>
              <input
                type="text"
                value={localConfig.footerText}
                onChange={(e) => handleChange({ footerText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Logo Settings */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-4">Logo & Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Logo Type</label>
              <select
                value={localConfig.logoType}
                onChange={(e) => handleChange({ logoType: e.target.value as 'text' | 'icon' | 'image' })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              >
                <option value="icon">Icon (Circle with letter)</option>
                <option value="text">Text Only</option>
                <option value="image">Image URL</option>
              </select>
            </div>

            {localConfig.logoType === 'icon' && (
              <>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Logo Icon (Letter or Symbol)</label>
                  <input
                    type="text"
                    value={localConfig.logoIcon}
                    onChange={(e) => handleChange({ logoIcon: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                    placeholder="M"
                    maxLength={2}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enter 1-2 characters (e.g., "M", "ME", "★")
                  </p>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Logo Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={localConfig.logoColor}
                      onChange={(e) => handleChange({ logoColor: e.target.value })}
                      className="w-12 h-12 border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={localConfig.logoColor}
                      onChange={(e) => handleChange({ logoColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {localConfig.logoType === 'text' && (
              <div>
                <label className="block text-xs text-gray-600 mb-2">Text Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={localConfig.logoColor}
                    onChange={(e) => handleChange({ logoColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localConfig.logoColor}
                    onChange={(e) => handleChange({ logoColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>
            )}

            {localConfig.logoType === 'image' && (
              <div>
                <label className="block text-xs text-gray-600 mb-2">Logo Image URL</label>
                <input
                  type="text"
                  value={localConfig.logo}
                  onChange={(e) => handleChange({ logo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Paste a direct link to your logo image (PNG or SVG recommended)
                </p>
              </div>
            )}

            {/* Preview */}
            <div className="mt-6 p-6 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs text-gray-600 mb-3">Preview:</p>
              <div className="flex items-center justify-center">
                {localConfig.logoType === 'image' && localConfig.logo ? (
                  <img src={localConfig.logo} alt="Logo" className="h-12 object-contain" />
                ) : localConfig.logoType === 'text' ? (
                  <h1
                    className="text-2xl tracking-[0.3em] uppercase font-light"
                    style={{ color: localConfig.logoColor }}
                  >
                    {localConfig.siteName}
                  </h1>
                ) : (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full text-white text-xl"
                      style={{ backgroundColor: localConfig.logoColor }}
                    >
                      {localConfig.logoIcon || localConfig.siteName.charAt(0)}
                    </div>
                    <h1
                      className="text-2xl tracking-[0.3em] uppercase font-light"
                      style={{ color: localConfig.logoColor }}
                    >
                      {localConfig.siteName}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-4">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Instagram</label>
              <input
                type="url"
                value={localConfig.socialLinks.instagram}
                onChange={(e) =>
                  handleChange({
                    socialLinks: { ...localConfig.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Twitter</label>
              <input
                type="url"
                value={localConfig.socialLinks.twitter}
                onChange={(e) =>
                  handleChange({
                    socialLinks: { ...localConfig.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">YouTube</label>
              <input
                type="url"
                value={localConfig.socialLinks.youtube}
                onChange={(e) =>
                  handleChange({
                    socialLinks: { ...localConfig.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                placeholder="https://youtube.com/..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Telegram</label>
              <input
                type="url"
                value={localConfig.socialLinks.telegram}
                onChange={(e) =>
                  handleChange({
                    socialLinks: { ...localConfig.socialLinks, telegram: e.target.value },
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
                placeholder="https://t.me/..."
              />
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-sm font-medium mb-4">Reset</h3>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-red-200 text-red-600 hover:border-red-600 transition-colors"
          >
            Reset All Content
          </button>
          <p className="text-xs text-gray-400 mt-2">
            This will reset all pages, theme settings, and site configuration to their defaults.
          </p>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="pt-8 border-t border-gray-100 flex items-center gap-4">
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
