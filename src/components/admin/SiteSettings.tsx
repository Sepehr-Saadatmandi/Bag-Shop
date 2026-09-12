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
