import React from 'react';

/** Simpozium "Navoiy Merosi" qo'lyozma rasmi — loyiha imidji */
export const HERITAGE_MANUSCRIPT_URL =
  'https://navoisport.uz/wp-content/uploads/2026/01/nano-banana-1767111268939.png';

/** Umumiy naqsh tokenlari — Simpozium uslubidan, butun sayt bo'ylab bir xil */
export const PATTERNS = {
  /** Oltin yulduz / islimiy yulduz (animated-pattern) */
  star: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23a67c00' fill-opacity='0.35'/%3E%3C/svg%3E")`,
  /** Yengil yulduz (krem fonda) */
  starSoft: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23d3c7b5' fill-opacity='0.35'/%3E%3C/svg%3E")`,
  /** Girih — klassik islimiy panjara (global fixed) */
  girih: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L72 36 L108 48 L72 60 L60 96 L48 60 L12 48 L48 36 Z' fill='%23a67c00' fill-opacity='0.05'/%3E%3Cpath d='M0 0 L120 120 M120 0 L0 120 M60 0 V120 M0 60 H120' stroke='%23a67c00' stroke-opacity='0.04' stroke-width='0.5'/%3E%3Cpath d='M30 30 L90 30 L90 90 L30 90 Z' fill='none' stroke='%23a67c00' stroke-opacity='0.03' stroke-width='1'/%3E%3C/svg%3E")`,
  /** Oltin romb (dark / footer) */
  diamond: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
  /** Chuqur teal yulduz (DeepGirih — Speakers uslubi) */
  deepStar: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0 L95 55 L150 55 L105 85 L125 140 L80 110 L35 140 L55 85 L10 55 L65 55 Z' fill='%23004d61'/%3E%3Cpath d='M0 80 H160 M80 0 V160' stroke='%23004d61' stroke-width='1' opacity='0.2'/%3E%3C/svg%3E")`,
  /** Kichik header romb */
  diamondSm: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23a67c00'/%3E%3C/svg%3E")`,
} as const;

export type AtmosphereTone =
  | 'soft'
  | 'parchment'
  | 'heritage'
  | 'heritage-strong'
  | 'alt'
  | 'dark'
  | 'royal';

export type AtmosphereVariant = 'default' | 'mirror' | 'center';

/**
 * Global fixed fon — barcha sahifalarda bir xil:
 * heritage krem + parchment texture + girih + sekin yulduz naqshi + yengil manuscript wash.
 */
export const GlobalSiteBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden>
    <div className="absolute inset-0 bg-[#fdfaf3]" />
    <div className="absolute inset-0 parchment-texture opacity-50" />
    <div
      className="absolute inset-0 opacity-100"
      style={{
        backgroundImage: PATTERNS.girih,
        backgroundSize: '240px 240px',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.22] animated-pattern"
      style={{
        backgroundImage: PATTERNS.starSoft,
        backgroundSize: '150px 150px',
      }}
    />
    {/* Yengil qo'lyozma — butun sayt imidji */}
    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
      style={{
        backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'sepia(0.2)',
      }}
    />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-amber-200/15 blur-[140px] rounded-full" />
  </div>
);

/** Eski nom — Layout mosligi uchun */
export const GirihPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`fixed inset-0 pointer-events-none ${className} -z-10`}
    style={{
      backgroundImage: PATTERNS.girih,
      backgroundSize: '240px 240px',
    }}
    aria-hidden
  />
);

export const DeepGirihBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`absolute inset-0 opacity-[0.12] pointer-events-none ${className}`}
    style={{
      backgroundImage: PATTERNS.deepStar,
      backgroundSize: '80px 80px',
    }}
    aria-hidden
  />
);

/**
 * Bo'lim foni — Simpozium naqshlarini aralashtirib, bir tizimda:
 * krem / parchment / manuscript / girih yulduz / amber glow / dark diamond.
 */
export const SectionAtmosphere: React.FC<{
  className?: string;
  tone?: AtmosphereTone;
  variant?: AtmosphereVariant;
  /** Manuscript wash (light tonlarda) */
  manuscript?: boolean;
  /** Animated star overlay */
  animated?: boolean;
}> = ({
  className = '',
  tone = 'heritage',
  variant = 'default',
  manuscript,
  animated = true,
}) => {
  const isDark = tone === 'dark' || tone === 'royal';
  const showManuscript =
    manuscript ?? (tone === 'heritage' || tone === 'heritage-strong' || tone === 'parchment');

  const baseColor =
    tone === 'soft'
      ? 'bg-[#fdfaf3]/90'
      : tone === 'alt'
        ? 'bg-[#faf7f0]/95'
        : tone === 'parchment'
          ? 'bg-[#fcf8ee]/92'
          : tone === 'dark'
            ? 'bg-[#001524]'
            : tone === 'royal'
              ? 'bg-[#001a2c]'
              : 'bg-[#fdfaf3]';

  const manuscriptOpacity =
    tone === 'heritage-strong'
      ? 'opacity-[0.26]'
      : tone === 'parchment'
        ? 'opacity-[0.14]'
        : tone === 'soft'
          ? 'opacity-[0.08]'
          : 'opacity-[0.16]';

  const glowA =
    variant === 'mirror'
      ? '-bottom-16 -left-16'
      : variant === 'center'
        ? 'top-1/3 left-1/2 -translate-x-1/2'
        : '-top-16 -right-16';
  const glowB =
    variant === 'mirror'
      ? '-top-20 -right-10'
      : variant === 'center'
        ? 'bottom-0 right-1/4'
        : '-bottom-20 -left-12';

  if (isDark) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
        <div className={`absolute inset-0 ${baseColor}`} />
        <div
          className={`absolute inset-0 ${animated ? 'animated-pattern' : ''} opacity-[0.07]`}
          style={{
            backgroundImage: PATTERNS.diamond,
            backgroundSize: '120px 120px',
          }}
        />
        <DeepGirihBackground className="opacity-[0.18]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-teal-900/40 blur-3xl rounded-full" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {/* Asosiy krem / parchment */}
      <div className={`absolute inset-0 ${baseColor}`} />

      {/* Parchment texture — barcha light tonlarda */}
      <div
        className={`absolute inset-0 parchment-texture ${
          tone === 'parchment' || tone === 'alt' ? 'opacity-55' : 'opacity-35'
        }`}
      />

      {/* Girih panjara */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: PATTERNS.girih,
          backgroundSize: '240px 240px',
        }}
      />

      {/* Qo'lyozma wash (Navoiy Merosi) */}
      {showManuscript && (
        <>
          <div
            className={`absolute inset-0 ${manuscriptOpacity} mix-blend-multiply`}
            style={{
              backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
              backgroundSize: 'cover',
              backgroundPosition: variant === 'mirror' ? 'left center' : 'right center',
              filter: 'sepia(0.25) contrast(0.95)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf3]/70 via-[#fdfaf3]/45 to-[#fdfaf3]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfaf3]/65 via-transparent to-[#fdfaf3]/55" />
        </>
      )}

      {/* Animated islimiy yulduz */}
      {animated && (
        <div
          className="absolute inset-0 opacity-[0.2] animated-pattern"
          style={{
            backgroundImage: tone === 'soft' ? PATTERNS.starSoft : PATTERNS.star,
            backgroundSize: '140px 140px',
          }}
        />
      )}

      {/* Amber glow orblari */}
      <div
        className={`absolute ${glowA} w-56 h-56 md:w-72 md:h-72 bg-amber-100 rounded-full blur-3xl ${
          tone === 'heritage-strong' ? 'opacity-70' : 'opacity-55'
        }`}
      />
      <div
        className={`absolute ${glowB} w-48 h-48 md:w-64 md:h-64 bg-amber-200/50 rounded-full blur-3xl ${
          tone === 'soft' ? 'opacity-35' : 'opacity-50'
        }`}
      />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-[#fcf8ee] rounded-full blur-3xl opacity-40" />
    </div>
  );
};

/** Orqaga moslik: eski HeritageAtmosphere → SectionAtmosphere */
export const HeritageAtmosphere: React.FC<{
  className?: string;
  intensity?: 'soft' | 'medium' | 'strong';
  showManuscript?: boolean;
  variant?: AtmosphereVariant;
}> = ({ className, intensity = 'medium', showManuscript = true, variant = 'default' }) => {
  const tone: AtmosphereTone =
    intensity === 'soft' ? 'soft' : intensity === 'strong' ? 'heritage-strong' : 'heritage';
  return (
    <SectionAtmosphere
      className={className}
      tone={tone}
      variant={variant}
      manuscript={showManuscript}
    />
  );
};

export const IslimiyDivider: React.FC = () => (
  <div className="flex items-center justify-center py-16 opacity-40 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
    </div>
    <div className="relative bg-[#fdfaf3]/90 px-12 py-3 rounded-full border border-amber-300 shadow-md backdrop-blur-md parchment-texture">
      <span className="text-4xl text-amber-700 tracking-[0.5em]">❦⚜❦</span>
    </div>
  </div>
);

export const SectionTitleDecoration: React.FC = () => (
  <div className="flex flex-col items-center mb-10">
    <div className="text-amber-600 text-3xl mb-3">✧ ✦ ✧</div>
    <div className="w-24 h-[3px] gold-gradient rounded-full" />
  </div>
);
