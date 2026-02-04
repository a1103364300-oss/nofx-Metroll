import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Github } from 'lucide-react'
import { t, type Language } from '../i18n/translations'
import { useSystemConfig } from '../hooks/useSystemConfig'
import { OFFICIAL_LINKS } from '../constants/branding'

type Page =
  | 'competition'
  | 'traders'
  | 'trader'
  | 'backtest'
  | 'strategy'
  | 'strategy-market'
  | 'data'
  | 'debate'
  | 'faq'
  | 'login'
  | 'register'

interface HeaderBarProps {
  onLoginClick?: () => void
  isLoggedIn?: boolean
  isHomePage?: boolean
  currentPage?: Page
  language?: Language
  onLanguageChange?: (lang: Language) => void
  user?: { email: string } | null
  onLogout?: () => void
  onPageChange?: (page: Page) => void
  onLoginRequired?: (featureName: string) => void
}

export default function HeaderBar({
  isLoggedIn = false,
  currentPage,
  language = 'zh' as Language,
  onLanguageChange,
  user,
  onLogout,
  onPageChange,
  onLoginRequired,
}: HeaderBarProps) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const { config: systemConfig } = useSystemConfig()
  const registrationEnabled = systemConfig?.registration_enabled !== false

  // Navigation tabs configuration
  const navTabs: { page: Page; path: string; label: string; requiresAuth: boolean }[] = [
    { page: 'data', path: '/data', label: language === 'zh' ? '数据' : 'Data', requiresAuth: false },
    { page: 'strategy-market', path: '/strategy-market', label: language === 'zh' ? '策略市场' : 'Market', requiresAuth: true },
    { page: 'traders', path: '/traders', label: t('configNav', language), requiresAuth: true },
    { page: 'trader', path: '/dashboard', label: t('dashboardNav', language), requiresAuth: true },
    { page: 'strategy', path: '/strategy', label: t('strategyNav', language), requiresAuth: true },
    { page: 'competition', path: '/competition', label: t('realtimeNav', language), requiresAuth: true },
    { page: 'debate', path: '/debate', label: t('debateNav', language), requiresAuth: true },
    { page: 'backtest', path: '/backtest', label: 'Backtest', requiresAuth: true },
    { page: 'faq', path: '/faq', label: t('faqNav', language), requiresAuth: false },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (tab: typeof navTabs[0]) => {
    if (tab.requiresAuth && !isLoggedIn) {
      onLoginRequired?.(tab.label)
      return
    }
    onPageChange?.(tab.page)
    navigate(tab.path)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-base/95 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-[1920px] mx-auto">
        {/* Logo */}
        <div
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-metroll-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src="/icons/nofx.svg" alt="NOFX Logo" className="relative w-8 h-8" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-content-primary">NOFX</span>
            <span className="text-[10px] font-semibold text-metroll-primary bg-metroll-primary/10 px-2 py-0.5 rounded-full border border-metroll-primary/20">
              Metroll
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between flex-1 ml-8">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            {navTabs.map((tab) => (
              <button
                key={tab.page}
                onClick={() => handleNavClick(tab)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${currentPage === tab.page 
                    ? 'text-metroll-primary' 
                    : 'text-content-tertiary hover:text-content-primary hover:bg-surface-elevated'
                  }`}
              >
                {currentPage === tab.page && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-metroll-primary/10 rounded-lg border border-metroll-primary/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Social Links */}
            <div className="flex items-center gap-1">
              <a
                href={OFFICIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-content-tertiary hover:text-content-primary hover:bg-surface-elevated transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={OFFICIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-content-tertiary hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all"
                title="Twitter"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={OFFICIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-content-tertiary hover:text-[#0088cc] hover:bg-[#0088cc]/10 transition-all"
                title="Telegram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>

            <div className="h-5 w-px bg-white/10" />

            {/* User Section */}
            {isLoggedIn && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-elevated border border-white/5 hover:border-metroll-primary/30 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-metroll-primary to-metroll-accent flex items-center justify-center text-xs font-bold text-white">
                    {user.email[0].toUpperCase()}
                  </div>
                  <span className="text-sm text-content-secondary max-w-[120px] truncate">
                    {user.email}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-content-tertiary transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-surface-elevated border border-white/10 shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <div className="text-xs text-content-tertiary">{t('loggedInAs', language)}</div>
                        <div className="text-sm font-medium text-content-primary truncate">{user.email}</div>
                      </div>
                      {onLogout && (
                        <button
                          onClick={() => {
                            onLogout()
                            setUserDropdownOpen(false)
                          }}
                          className="w-full px-4 py-3 text-sm font-medium text-loss hover:bg-loss/10 transition-colors text-left"
                        >
                          {t('exitLogin', language)}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              currentPage !== 'login' && currentPage !== 'register' && (
                <div className="flex items-center gap-2">
                  <a
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-content-secondary hover:text-content-primary transition-colors"
                  >
                    {t('signIn', language)}
                  </a>
                  {registrationEnabled && (
                    <a
                      href="/register"
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-metroll-primary hover:bg-metroll-primary-light text-white transition-all shadow-glow-sm hover:shadow-glow"
                    >
                      {t('signUp', language)}
                    </a>
                  )}
                </div>
              )
            )}

            {/* Language Toggle */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-content-tertiary hover:bg-surface-elevated transition-all"
              >
                <span className="text-base">{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {languageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-surface-elevated border border-white/10 shadow-xl overflow-hidden"
                  >
                    {[
                      { code: 'zh', flag: '🇨🇳', label: '中文' },
                      { code: 'en', flag: '🇺🇸', label: 'English' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange?.(lang.code as Language)
                          setLanguageDropdownOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                          ${language === lang.code 
                            ? 'bg-metroll-primary/10 text-metroll-primary' 
                            : 'text-content-secondary hover:bg-surface-hover hover:text-content-primary'
                          }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-content-tertiary hover:bg-surface-elevated transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-base border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navTabs.map((tab, i) => (
                <motion.button
                  key={tab.page}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    handleNavClick(tab)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors
                    ${currentPage === tab.page 
                      ? 'bg-metroll-primary/10 text-metroll-primary border border-metroll-primary/20' 
                      : 'text-content-secondary hover:bg-surface-elevated'
                    }`}
                >
                  <span className="font-medium">{tab.label}</span>
                  {tab.requiresAuth && !isLoggedIn && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface-hover text-content-tertiary">
                      LOGIN
                    </span>
                  )}
                </motion.button>
              ))}

              <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                {/* Language */}
                <div className="flex gap-2">
                  {['zh', 'en'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => onLanguageChange?.(lang as Language)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors
                        ${language === lang 
                          ? 'bg-metroll-primary text-white' 
                          : 'bg-surface-elevated text-content-tertiary'
                        }`}
                    >
                      {lang === 'zh' ? '🇨🇳 中文' : '🇺🇸 EN'}
                    </button>
                  ))}
                </div>

                {/* Auth */}
                {isLoggedIn && user ? (
                  <button
                    onClick={() => {
                      onLogout?.()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full py-3 rounded-lg text-sm font-medium bg-loss/10 text-loss border border-loss/20"
                  >
                    {t('exitLogin', language)}
                  </button>
                ) : (
                  currentPage !== 'login' && currentPage !== 'register' && (
                    <a
                      href="/login"
                      className="block w-full py-3 rounded-lg text-sm font-semibold text-center bg-metroll-primary text-white"
                    >
                      {t('signIn', language)}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
