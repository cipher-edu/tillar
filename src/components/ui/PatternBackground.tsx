import React, { useState } from 'react';
import { Copy, Check, Sparkles, BookOpen } from 'lucide-react';

/** Simpozium "Navoiy Merosi" qo'lyozma rasmi — loyiha imidji */
export const HERITAGE_MANUSCRIPT_URL =
  'https://navoisport.uz/wp-content/uploads/2026/01/nano-banana-1767111268939.png';

/** 
 * Timuriy va Alisher Navoiy davri hamda Islom olami naqshlari (Girih, Islimiy Arabesk, 8 va 12 burchakli Yulduzlar)
 */
export const PATTERNS = {
  /** 8 burchakli Islomiy yulduz (animated-pattern) */
  star: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23d4af37' fill-opacity='0.35'/%3E%3C/svg%3E")`,
  
  /** Yengil yulduz (krem fonda) */
  starSoft: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3C/svg%3E")`,
  
  /** Girih — klassik islimiy 8 va 12 burchakli yulduz naqsh panjarasi */
  girih: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0 L96 48 L144 64 L96 80 L80 128 L64 80 L16 64 L64 48 Z' fill='%23d4af37' fill-opacity='0.06'/%3E%3Cpath d='M0 0 L160 160 M160 0 L0 160 M80 0 V160 M0 80 H160' stroke='%23d4af37' stroke-opacity='0.08' stroke-width='0.75'/%3E%3Cpath d='M40 40 L120 40 L120 120 L40 120 Z' fill='none' stroke='%23d4af37' stroke-opacity='0.05' stroke-width='1'/%3E%3Cpath d='M80 20 L140 80 L80 140 L20 80 Z' fill='none' stroke='%23d4af37' stroke-opacity='0.06' stroke-width='0.75'/%3E%3C/svg%3E")`,
  
  /** Qadimiy Islimiy Arabesk (Manuscript Arabesque Floral motif) */
  islimiy: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.12' stroke-width='1.2'%3E%3Ccircle cx='60' cy='60' r='40'/%3E%3Ccircle cx='60' cy='60' r='20'/%3E%3Cpath d='M60 0 C75 30 105 45 120 60 C105 75 75 90 60 120 C45 90 15 75 0 60 C15 45 45 30 60 0 Z'/%3E%3Cpath d='M0 0 C30 15 45 45 60 60 C45 75 30 105 0 120 C15 90 45 75 60 60 C45 45 15 30 0 0 Z'/%3E%3C/g%3E%3C/svg%3E")`,

  /** Kamoliddin Behzod Miniatura San'ati Zarrin Naqshi (Herat School Filigree) */
  behzodMiniature: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.14' stroke-width='1'%3E%3Cpath d='M70 0 C85 35 105 55 140 70 C105 85 85 105 70 140 C55 105 35 85 0 70 C35 55 55 35 70 0 Z' fill='%23d4af37' fill-opacity='0.03'/%3E%3Ccircle cx='70' cy='70' r='30' stroke-dasharray='2 2'/%3E%3Cpolygon points='70,25 80,55 110,55 85,73 95,103 70,85 45,103 55,73 30,55 60,55' fill='%23d4af37' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E")`,

  /** Oltin romb / Timurid Mosaic tile */
  diamond: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23d4af37' fill-opacity='0.15'/%3E%3Cpath d='M60 20L100 60L60 100L20 60Z' fill='none' stroke='%23d4af37' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
  
  /** Chuqur teal yulduz (DeepGirih) */
  deepStar: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0 L95 55 L150 55 L105 85 L125 140 L80 110 L35 140 L55 85 L10 55 L65 55 Z' fill='%23d4af37' fill-opacity='0.15'/%3E%3Cpath d='M0 80 H160 M80 0 V160' stroke='%23d4af37' stroke-width='1' opacity='0.15'/%3E%3C/svg%3E")`,
  
  /** Kichik header romb */
  diamondSm: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23d4af37' fill-opacity='0.2'/%3E%3C/svg%3E")`,
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
 * Sahifalar bo'yicha Hazrat Alisher Navoiy hikmatli misralari to'plami
 */
export const NAVOIY_COUPLETS: Record<string, { uz: string; ru: string; en: string; source: string }> = {
  home: {
    uz: "Olam ahlining hunar-u ma'rifatin jam etib,\nTil bila el ko'ngliga hikmat urug'in sochgali...",
    ru: "Собрав в единое целое ремесло и просвещение мира,\nЯзыком посеять семена мудрости в сердцах людей...",
    en: "Gathering the craft and enlightenment of the world,\nTo sow the seeds of wisdom in hearts through language...",
    source: "Alisher Navoiy — «Xamsa»",
  },
  history: {
    uz: "Adl-u adolat bila eldurg'usi saodat binosi,\nObod bo'lg'usi el maskani ma'rifat ziyosi...",
    ru: "Справедливостью возводится здание счастья,\nПросвещением процветает обитель народа...",
    en: "The abode of happiness is built on justice,\nThe house of nation thrives by light of wisdom...",
    source: "Alisher Navoiy — «Tarixi Muluki Ajam»",
  },
  leadership: {
    uz: "Komillik ko'zgusi odob-u adolatdur hamisha,\nRahbarga ilmu hikmat eng ulug' fazilatdur...",
    ru: "Зеркало совершенства — благородие и справедливость,\nДля руководителя мудрость — величайшая добродетель...",
    en: "The mirror of perfection is virtue and justice,\nFor a leader, wisdom is the highest virtue...",
    source: "Alisher Navoiy — «Mahbub ul-Qulub»",
  },
  programs: {
    uz: "O'rganmoq ila ilmni qilg'il pesha har on,\nHikmat chirog'idan nurlansin ko'ngul nuri hamon...",
    ru: "Сделай приобретение знаний своим призванием,\nПусть светильник мудрости озаряет твое сердце...",
    en: "Make the acquisition of knowledge your life's calling,\nLet the lamp of wisdom illuminate your heart forever...",
    source: "Alisher Navoiy — «Farhod va Shirin»",
  },
  professors: {
    uz: "Haq yo'lida kimki bir harf o'rgatdi chekib ranj,\nAylamak bo'lmas ado oning haqin yuz ganj...",
    ru: "Кто на пути истины обучил хотя бы одной букве с трудом,\nНе измерить его заслугу и сотней сокровищ...",
    en: "Whoever patiently taught even a single letter on the path of truth,\nCan never be repaid even with a hundred treasures...",
    source: "Alisher Navoiy — «Sab'ai Sayyor»",
  },
  students: {
    uz: "Yoshlikni g'animat bil, ilm-u odob et pesha,\nG'ayrat bila intilgil oliy g'oyag'a hamisha...",
    ru: "Цени молодость, найди призвание в знаниях и воспитании,\nС усердием всегда стремись к высокой цели...",
    en: "Treasure youth, dedicate yourself to knowledge and virtue,\nStrive endlessly with zeal toward higher aspirations...",
    source: "Alisher Navoiy — «Lison ut-Tayr»",
  },
  science: {
    uz: "Ilm ahlidin el topg'usi izzat-u sharaf har on,\nIlmsiz kishi gumroh erur jahonda hamon...",
    ru: "От людей науки народ обретает почет и славу,\nБез знаний человек плутает во тьме...",
    en: "From the people of knowledge, nations gain honor and glory,\nWithout knowledge, one wanders lost in darkness...",
    source: "Alisher Navoiy — «Nazm ul-Javohir»",
  },
  news: {
    uz: "Jahon bori yangilik-u xushxabardin obod,\nEzgu so'z bila el ko'ngli bo'lg'usi shod...",
    ru: "Весь мир процветает от благих вестей,\nДобрым словом радуется сердце народа...",
    en: "The whole world flourishes with good tidings,\nKind words fill hearts with joy...",
    source: "Alisher Navoiy — «Munshaot»",
  },
  contact: {
    uz: "Saxovat-u muloqot elg'a najot berur hamisha,\nEzgu niyat va ixlos har ishg'a bayot berur...",
    ru: "Щедрость и общение даруют людям спасение,\nДоброе намерение дает силу каждому делу...",
    en: "Generosity and dialogue bring salvation to all,\nNoble intentions bring strength to every endeavor...",
    source: "Alisher Navoiy — «Siroj ul-Muslimin»",
  },
};

/**
 * Global fixed fon — Alisher Navoiy davri islimiy naqshlari bilan
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
      className="absolute inset-0 opacity-[0.18] animated-pattern"
      style={{
        backgroundImage: PATTERNS.islimiy,
        backgroundSize: '180px 180px',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
      style={{
        backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'sepia(0.25)',
      }}
    />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-amber-200/20 blur-[140px] rounded-full" />
  </div>
);

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
    className={`absolute inset-0 opacity-[0.18] pointer-events-none ${className}`}
    style={{
      backgroundImage: PATTERNS.deepStar,
      backgroundSize: '120px 120px',
    }}
    aria-hidden
  />
);

export const SectionAtmosphere: React.FC<{
  className?: string;
  tone?: AtmosphereTone;
  variant?: AtmosphereVariant;
  manuscript?: boolean;
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
      ? 'bg-[#fdfaf3]/95'
      : tone === 'alt'
        ? 'bg-[#faf7f0]/95'
        : tone === 'parchment'
          ? 'bg-[#fcf8ee]/95'
          : tone === 'dark'
            ? 'bg-[#09192f]'
            : tone === 'royal'
              ? 'bg-[#0b1d3a]'
              : 'bg-[#fdfaf3]';

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
          className={`absolute inset-0 ${animated ? 'animated-pattern' : ''} opacity-[0.12]`}
          style={{
            backgroundImage: PATTERNS.diamond,
            backgroundSize: '120px 120px',
          }}
        />
        <DeepGirihBackground className="opacity-[0.25]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div className={`absolute inset-0 ${baseColor}`} />
      <div className="absolute inset-0 parchment-texture opacity-40" />

      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: PATTERNS.girih,
          backgroundSize: '240px 240px',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.18] animated-pattern"
        style={{
          backgroundImage: PATTERNS.islimiy,
          backgroundSize: '180px 180px',
        }}
      />

      {showManuscript && (
        <>
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{
              backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
              backgroundSize: 'cover',
              backgroundPosition: variant === 'mirror' ? 'left center' : 'right center',
              filter: 'sepia(0.3) contrast(0.95)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf3]/70 via-transparent to-[#fdfaf3]/80" />
        </>
      )}

      <div className={`absolute ${glowA} w-72 h-72 bg-amber-200/40 rounded-full blur-3xl`} />
      <div className={`absolute ${glowB} w-64 h-64 bg-amber-300/30 rounded-full blur-3xl`} />
    </div>
  );
};

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

/** Alisher Navoiy Shamsa Naqsh Medalyoni */
export const ShamsaMedallion: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="50" cy="50" r="42" fill="url(#shamsaGold)" opacity="0.9" />
    <path d="M50 10 L58 35 L85 22 L70 47 L95 50 L70 53 L85 78 L58 65 L50 90 L42 65 L15 78 L30 53 L5 50 L30 47 L15 22 L42 35 Z" fill="#b48a1d" opacity="0.8" />
    <path d="M50 20 L55 38 L75 30 L65 48 L83 50 L65 52 L75 70 L55 62 L50 80 L45 62 L25 70 L35 52 L17 50 L35 48 L25 30 L45 38 Z" fill="#fef08a" />
    <circle cx="50" cy="50" r="16" fill="#09192f" stroke="#d4af37" strokeWidth="2" />
    <circle cx="50" cy="50" r="6" fill="#d4af37" />
    <defs>
      <linearGradient id="shamsaGold" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#b48a1d" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Mukammal darajada yaratilgan "NAVOIY MEROSI" maxsus bo'limi
 */
export const IslimiyDivider: React.FC<{ topic?: string; lang?: 'uz' | 'ru' | 'en' }> = ({
  topic = 'home',
  lang = 'uz',
}) => {
  const [copied, setCopied] = useState(false);
  const item = NAVOIY_COUPLETS[topic] || NAVOIY_COUPLETS.home;
  const verseText = item[lang] || item.uz;

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${verseText}"\n— ${item.source}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="my-20 relative z-10 px-4">
      <div className="max-w-4xl mx-auto rounded-[3rem] border-2 border-amber-400/40 bg-slate-950 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center group hover:border-amber-300 transition-all duration-500">
        {/* Background Patterns */}
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none animated-pattern"
          style={{ backgroundImage: PATTERNS.girih, backgroundSize: '160px 160px' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url(${HERITAGE_MANUSCRIPT_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Ambient Glowing Gold Spheres */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Top Badge Header */}
          <div className="flex items-center gap-3 mb-5">
            <ShamsaMedallion className="w-8 h-8" />
            <span className="text-xs md:text-sm font-classic font-black tracking-[0.4em] text-amber-300 uppercase">
              ⚜ HAZRAT ALISHER NAVOIY MEROSI ⚜
            </span>
            <ShamsaMedallion className="w-8 h-8" />
          </div>

          <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8 opacity-90 shadow-[0_0_10px_#d4af37]" />

          {/* Verse Quote */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-classic italic text-amber-50 leading-relaxed max-w-3xl whitespace-pre-line mb-8 font-semibold drop-shadow-lg">
            <span className="text-amber-400 not-italic mr-2 text-3xl">“</span>
            {verseText}
            <span className="text-amber-400 not-italic ml-2 text-3xl">”</span>
          </blockquote>

          {/* Source & Copy Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gold-gradient text-slate-950 text-[10px] font-black uppercase tracking-[0.25em] font-ui shadow-lg">
              <BookOpen className="w-3.5 h-3.5" />
              {item.source}
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-400/40 bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-[10px] font-black uppercase tracking-[0.2em] font-ui transition-all duration-300 shadow-md"
              title="Hikmatni nusxalash"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Nusxalandi!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Nusxalash
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SectionTitleDecoration: React.FC = () => (
  <div className="flex flex-col items-center mb-8">
    <ShamsaMedallion className="w-8 h-8 mb-3" />
    <div className="w-28 h-1 gold-gradient rounded-full shadow-[0_0_12px_#d4af37]" />
  </div>
);
