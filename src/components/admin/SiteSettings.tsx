import { useContent } from '../../context/ContentContext';

export default function SiteSettings() {
  const { siteConfig, updateSiteConfig } = useContent();

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
                value={siteConfig.siteName}
                onChange={(e) => updateSiteConfig({ siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Browser Tab Title</label>
              <input
                type="text"
                value={siteConfig.pageTitle}
                onChange={(e) => updateSiteConfig({ pageTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                This appears in the browser tab and search results
              </p>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Announcement Bar</label>
              <input
                type="text"
                value={siteConfig.announcement}
                onChange={(e) => updateSiteConfig({ announcement: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                Displayed at the top of your website
              </p>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-2">Footer Text</label>
              <input
                type="text"
                value={siteConfig.footerText}
                onChange={(e) => updateSiteConfig({ footerText: e.target.value })}
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
                value={siteConfig.logoType}
                onChange={(e) => updateSiteConfig({ logoType: e.target.value as 'text' | 'icon' | 'image' })}
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black outline-none transition-colors"
              >
                <option value="icon">Icon (Circle with letter)</option>
                <option value="text">Text Only</option>
                <option value="image">Image URL</option>
              </select>
            </div>

            {siteConfig.logoType === 'icon' && (
              <>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Logo Icon (Letter or Symbol)</label>
                  <input
                    type="text"
                    value={siteConfig.logoIcon}
                    onChange={(e) => updateSiteConfig({ logoIcon: e.target.value })}
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
                      value={siteConfig.logoColor}
                      onChange={(e) => updateSiteConfig({ logoColor: e.target.value })}
                      className="w-12 h-12 border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={siteConfig.logoColor}
                      onChange={(e) => updateSiteConfig({ logoColor: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {siteConfig.logoType === 'text' && (
              <div>
                <label className="block text-xs text-gray-600 mb-2">Text Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={siteConfig.logoColor}
                    onChange={(e) => updateSiteConfig({ logoColor: e.target.value })}
                    className="w-12 h-12 border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={siteConfig.logoColor}
                    onChange={(e) => updateSiteConfig({ logoColor: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-200 text-sm"
                  />
                </div>
              </div>
            )}

            {siteConfig.logoType === 'image' && (
              <div>
                <label className="block text-xs text-gray-600 mb-2">Logo Image URL</label>
                <input
                  type="text"
                  value={siteConfig.logo}
                  onChange={(e) => updateSiteConfig({ logo: e.target.value })}
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
                {siteConfig.logoType === 'image' && siteConfig.logo ? (
                  <img src={siteConfig.logo} alt="Logo" className="h-12 object-contain" />
                ) : siteConfig.logoType === 'text' ? (
                  <h1
                    className="text-2xl tracking-[0.3em] uppercase font-light"
                    style={{ color: siteConfig.logoColor }}
                  >
                    {siteConfig.siteName}
                  </h1>
                ) : (
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full text-white text-xl"
                      style={{ backgroundColor: siteConfig.logoColor }}
                    >
                      {siteConfig.logoIcon || siteConfig.siteName.charAt(0)}
                    </div>
                    <h1
                      className="text-2xl tracking-[0.3em] uppercase font-light"
                      style={{ color: siteConfig.logoColor }}
                    >
                      {siteConfig.siteName}
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
                value={siteConfig.socialLinks.instagram}
                onChange={(e) =>
                  updateSiteConfig({
                    socialLinks: { ...siteConfig.socialLinks, instagram: e.target.value },
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
                value={siteConfig.socialLinks.twitter}
                onChange={(e) =>
                  updateSiteConfig({
                    socialLinks: { ...siteConfig.socialLinks, twitter: e.target.value },
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
                value={siteConfig.socialLinks.youtube}
                onChange={(e) =>
                  updateSiteConfig({
                    socialLinks: { ...siteConfig.socialLinks, youtube: e.target.value },
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
                value={siteConfig.socialLinks.telegram}
                onChange={(e) =>
                  updateSiteConfig({
                    socialLinks: { ...siteConfig.socialLinks, telegram: e.target.value },
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
      </div>
    </div>
  );
}
