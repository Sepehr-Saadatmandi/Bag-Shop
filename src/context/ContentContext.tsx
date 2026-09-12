import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: {
    hero?: {
      image: string;
      title: string;
      subtitle: string;
      cta: string;
    };
    sections: Section[];
  };
  isVisible: boolean;
  order: number;
}

export interface Section {
  id: string;
  type: 'text' | 'image' | 'product-grid' | 'newsletter' | 'featured' | 'custom';
  content: any;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headerStyle: 'light' | 'dark';
  buttonStyle: 'rounded' | 'square';
}

export interface SiteConfig {
  siteName: string;
  logo: string;
  logoType: 'text' | 'icon' | 'image';
  logoIcon: string;
  logoColor: string;
  showAnnouncement: boolean;
  announcement: string;
  footerText: string;
  pageTitle: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
    telegram: string;
  };
}

interface ContentContextType {
  pages: PageContent[];
  theme: ThemeConfig;
  siteConfig: SiteConfig;
  updatePage: (pageId: string, updates: Partial<PageContent>) => void;
  addPage: (page: PageContent) => void;
  removePage: (pageId: string) => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  updateSection: (pageId: string, sectionId: string, updates: any) => void;
  addSection: (pageId: string, section: Section) => void;
  removeSection: (pageId: string, sectionId: string) => void;
  reorderSections: (pageId: string, sectionIds: string[]) => void;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  fontFamily: 'Inter',
  headerStyle: 'light',
  buttonStyle: 'square',
};

const defaultSiteConfig: SiteConfig = {
  siteName: 'Maison Élan',
  logo: '',
  logoType: 'icon',
  logoIcon: 'M',
  logoColor: '#000000',
  showAnnouncement: true,
  announcement: 'Now shipping worldwide — Complimentary express delivery on orders over $500',
  footerText: '© 2026 Maison Élan. All rights reserved.',
  pageTitle: 'Maison Élan — Luxury Bags',
  socialLinks: {
    instagram: '#',
    twitter: '#',
    youtube: '#',
    telegram: '#',
  },
};

const defaultPages: PageContent[] = [
  {
    id: 'home',
    title: 'Home',
    slug: 'home',
    content: {
      hero: {
        image: 'https://image.qwenlm.ai/generated-images/5054f3fe-cff5-434b-8ca1-6310c59476c9/_result.png',
        title: 'New Collection',
        subtitle: 'Autumn/Winter 2026',
        cta: 'Shop Collection',
      },
      sections: [
        {
          id: 'brand-story',
          type: 'text',
          content: {
            title: 'Crafted with Intention',
            text: 'Maison Élan is a British luxury accessories brand founded in 2018. Our pieces are designed in London and handcrafted by skilled artisans using the finest Italian leathers. Each bag is a testament to timeless design and uncompromising quality — created to be cherished for years to come.',
            buttonText: 'Our Story',
            buttonLink: 'about',
          },
        },
        {
          id: 'featured',
          type: 'featured',
          content: {},
        },
        {
          id: 'new-arrivals',
          type: 'product-grid',
          content: {
            showNewOnly: true,
            title: 'New Arrivals',
          },
        },
        {
          id: 'newsletter',
          type: 'newsletter',
          content: {},
        },
      ],
    },
    isVisible: true,
    order: 0,
  },
  {
    id: 'shop',
    title: 'Shop',
    slug: 'shop',
    content: {
      sections: [
        {
          id: 'shop-grid',
          type: 'product-grid',
          content: {
            showNewOnly: false,
            title: 'The Collection',
          },
        },
      ],
    },
    isVisible: true,
    order: 1,
  },
  {
    id: 'new',
    title: 'New Arrivals',
    slug: 'new',
    content: {
      sections: [
        {
          id: 'new-grid',
          type: 'product-grid',
          content: {
            showNewOnly: true,
            title: 'New Arrivals',
          },
        },
      ],
    },
    isVisible: true,
    order: 2,
  },
  {
    id: 'collections',
    title: 'Collections',
    slug: 'collections',
    content: {
      sections: [
        {
          id: 'collections-grid',
          type: 'custom',
          content: {
            title: 'Collections',
            subtitle: 'Explore our curated collections',
          },
        },
      ],
    },
    isVisible: true,
    order: 3,
  },
  {
    id: 'about',
    title: 'About',
    slug: 'about',
    content: {
      sections: [
        {
          id: 'about-content',
          type: 'text',
          content: {
            title: 'Our Story',
            image: 'https://image.qwenlm.ai/generated-images/53e21664-ce6a-4cc6-96cd-967d006fabef/_result.png',
            paragraphs: [
              'Maison Élan was founded in 2018 with a singular vision: to create luxury bags that transcend seasons and trends. Based in the heart of London, our design studio draws inspiration from architecture, art, and the modern woman\'s dynamic lifestyle.',
              'Every piece begins as a sketch and is brought to life through meticulous craftsmanship. We work exclusively with heritage tanneries in Italy, selecting only the finest full-grain leathers that develop a beautiful patina over time.',
              'Our commitment to quality extends beyond materials. Each bag undergoes over 200 individual steps in its creation, from pattern cutting to the final hand-stitching. The result is a product that not only looks exceptional but is built to last a lifetime.',
            ],
            stats: [
              { value: '100%', label: 'Italian Leather' },
              { value: '200+', label: 'Steps per Bag' },
              { value: '5yr', label: 'Warranty' },
            ],
          },
        },
      ],
    },
    isVisible: true,
    order: 4,
  },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    // Load from localStorage
    const savedPages = localStorage.getItem('cms_pages');
    const savedTheme = localStorage.getItem('cms_theme');
    const savedSiteConfig = localStorage.getItem('cms_siteConfig');

    setPages(savedPages ? JSON.parse(savedPages) : defaultPages);
    setTheme(savedTheme ? JSON.parse(savedTheme) : defaultTheme);
    setSiteConfig(savedSiteConfig ? JSON.parse(savedSiteConfig) : defaultSiteConfig);
  }, []);

  const savePages = (newPages: PageContent[]) => {
    setPages(newPages);
    localStorage.setItem('cms_pages', JSON.stringify(newPages));
  };

  const updatePage = (pageId: string, updates: Partial<PageContent>) => {
    const newPages = pages.map((p) => (p.id === pageId ? { ...p, ...updates } : p));
    savePages(newPages);
  };

  const addPage = (page: PageContent) => {
    const newPages = [...pages, page];
    savePages(newPages);
  };

  const removePage = (pageId: string) => {
    const newPages = pages.filter((p) => p.id !== pageId);
    savePages(newPages);
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates };
    setTheme(newTheme);
    localStorage.setItem('cms_theme', JSON.stringify(newTheme));
  };

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    const newConfig = { ...siteConfig, ...updates };
    setSiteConfig(newConfig);
    localStorage.setItem('cms_siteConfig', JSON.stringify(newConfig));
  };

  const updateSection = (pageId: string, sectionId: string, updates: any) => {
    const newPages = pages.map((page) => {
      if (page.id === pageId) {
        const newSections = page.content.sections.map((section) =>
          section.id === sectionId ? { ...section, content: { ...section.content, ...updates } } : section
        );
        return { ...page, content: { ...page.content, sections: newSections } };
      }
      return page;
    });
    savePages(newPages);
  };

  const addSection = (pageId: string, section: Section) => {
    const newPages = pages.map((page) => {
      if (page.id === pageId) {
        return {
          ...page,
          content: {
            ...page.content,
            sections: [...page.content.sections, section],
          },
        };
      }
      return page;
    });
    savePages(newPages);
  };

  const removeSection = (pageId: string, sectionId: string) => {
    const newPages = pages.map((page) => {
      if (page.id === pageId) {
        return {
          ...page,
          content: {
            ...page.content,
            sections: page.content.sections.filter((s) => s.id !== sectionId),
          },
        };
      }
      return page;
    });
    savePages(newPages);
  };

  const reorderSections = (pageId: string, sectionIds: string[]) => {
    const newPages = pages.map((page) => {
      if (page.id === pageId) {
        const reordered = sectionIds
          .map((id) => page.content.sections.find((s) => s.id === id))
          .filter(Boolean) as Section[];
        return { ...page, content: { ...page.content, sections: reordered } };
      }
      return page;
    });
    savePages(newPages);
  };

  return (
    <ContentContext.Provider
      value={{
        pages,
        theme,
        siteConfig,
        updatePage,
        addPage,
        removePage,
        updateTheme,
        updateSiteConfig,
        updateSection,
        addSection,
        removeSection,
        reorderSections,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
