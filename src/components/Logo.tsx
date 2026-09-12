import { useContent } from '../context/ContentContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  colorOverride?: string;
}

export default function Logo({ size = 'medium', colorOverride }: LogoProps) {
  const { siteConfig } = useContent();
  const logoColor = colorOverride || siteConfig.logoColor;

  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-xl lg:text-2xl',
    large: 'text-3xl lg:text-4xl',
  };

  const iconSizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10 lg:w-12 lg:h-12',
    large: 'w-16 h-16',
  };

  if (siteConfig.logoType === 'image' && siteConfig.logo) {
    return (
      <img
        src={siteConfig.logo}
        alt={siteConfig.siteName}
        className={`${iconSizes[size]} object-contain`}
      />
    );
  }

  if (siteConfig.logoType === 'text') {
    return (
      <h1
        className={`${sizeClasses[size]} tracking-[0.3em] uppercase font-light`}
        style={{ color: logoColor }}
      >
        {siteConfig.siteName}
      </h1>
    );
  }

  // Icon logo (default)
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSizes[size]} flex items-center justify-center rounded-full font-light flex-shrink-0`}
        style={{
          backgroundColor: logoColor,
          color: '#ffffff',
        }}
      >
        <span className={sizeClasses[size]}>
          {siteConfig.logoIcon || siteConfig.siteName.charAt(0)}
        </span>
      </div>
      <h1
        className={`${sizeClasses[size]} tracking-[0.3em] uppercase font-light`}
        style={{ color: logoColor }}
      >
        {siteConfig.siteName}
      </h1>
    </div>
  );
}
