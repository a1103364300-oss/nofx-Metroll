import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import { Container } from './Container'
import { Globe } from 'lucide-react'

interface HeaderProps {
  simple?: boolean // For login/register pages
}

export function Header({ simple = false }: HeaderProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <header className="header">
      <Container className="py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-metroll-primary/20 blur-xl rounded-full" />
              <img 
                src="/icons/nofx.svg" 
                alt="NOFX Logo" 
                className="relative w-9 h-9 drop-shadow-lg" 
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-content-primary tracking-tight">
                {t('appTitle', language)}
                <span className="ml-2 text-xs font-normal text-metroll-primary bg-metroll-primary/10 px-2 py-0.5 rounded-full">
                  Metroll
                </span>
              </h1>
              {!simple && (
                <p className="text-xs font-mono text-content-tertiary">
                  {t('subtitle', language)}
                </p>
              )}
            </div>
          </div>

          {/* Right - Language Toggle */}
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-content-tertiary" />
            <div className="flex gap-1 rounded-lg p-1 bg-surface-elevated border border-white/5">
              <button
                onClick={() => setLanguage('zh')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  language === 'zh'
                    ? 'bg-metroll-primary text-white shadow-glow-sm'
                    : 'bg-transparent text-content-tertiary hover:text-content-secondary hover:bg-surface-hover'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-metroll-primary text-white shadow-glow-sm'
                    : 'bg-transparent text-content-tertiary hover:text-content-secondary hover:bg-surface-hover'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
