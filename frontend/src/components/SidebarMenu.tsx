
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "../components/Button"
import { AuthModal } from "../components/AuthModal"
import { Mountain, Home, Calendar, Ship as Ski, User, CreditCard, Menu, X } from "lucide-react"

export function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const location = useLocation()
  const pathname = location.pathname

  const menuItems = [
    { href: "/", icon: Home, label: "Головна" },
    { href: "/booking", icon: Calendar, label: "Бронювання" },
    { href: "/rental", icon: Ski, label: "Оренда" },
    { href: "/ski-passes", icon: CreditCard, label: "Абонементи" },
    { href: "/dashboard", icon: User, label: "Кабінет" },
  ]

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-black/80 text-white hover:bg-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-6 border-b border-gray-800">
          <Mountain className="h-8 w-8 text-yellow-400" />
          <h1 className="text-xl font-bold">VONSI RESORT</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-800 text-gray-300 hover:text-white",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Auth buttons */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Button
            variant="outline"
            className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
            onClick={() => openAuthModal("login")}
          >
            Увійти
          </Button>
          <Button
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => openAuthModal("register")}
          >
            Реєстрація
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
