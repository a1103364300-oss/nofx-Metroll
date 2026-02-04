import { t, type Language } from '../../i18n/translations'
import type { FAQCategory } from '../../data/faqData'

interface FAQSidebarProps {
  categories: FAQCategory[]
  activeItemId: string | null
  language: Language
  onItemClick: (categoryId: string, itemId: string) => void
}

export function FAQSidebar({
  categories,
  activeItemId,
  language,
  onItemClick,
}: FAQSidebarProps) {
  return (
    <nav
      className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-4"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#2B3139 #1E2329',
      }}
    >
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="card p-4 rounded-xl border border-white/5">
            {/* Category Title */}
            <div className="flex items-center gap-2 mb-3 px-3">
              <category.icon className="w-5 h-5 text-metroll-primary" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-metroll-primary">
                {t(category.titleKey, language)}
              </h3>
            </div>

            {/* Category Items */}
            <ul className="space-y-1">
              {category.items.map((item) => {
                const isActive = activeItemId === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onItemClick(category.id, item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border-l-[3px] ${isActive
                        ? 'bg-metroll-primary/10 text-metroll-primary border-metroll-primary pl-[9px]'
                        : 'bg-transparent text-text-content-tertiary border-transparent pl-3 hover:bg-metroll-primary/5 hover:text-text-content-primary'
                        }`}
                    >
                      {t(item.questionKey, language)}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
