import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/Button";
import { AuthModal } from "../components/AuthModal";
import { Avatar, AvatarFallback, AvatarImage } from "../components/Avatar";
import {
  Home,
  Calendar,
  Ship as Ski,
  User,
  CreditCard,
  Menu,
} from "lucide-react";

import { useUser } from "../store/UseContext";

export function SidebarMenu() {
  const { user, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    { href: "/", icon: Home, label: "Головна" },
    { href: "/booking", icon: Calendar, label: "Бронювання" },
    { href: "/rental", icon: Ski, label: "Оренда" },
    { href: "/ski-passes", icon: CreditCard, label: "Абонементи" },
    { href: "/dashboard", icon: User, label: "Кабінет" },
  ];

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      {/* Mobile menu button */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="sm"
          className="!w-auto !h-auto p-2 fixed top-4 left-4 z-50 md:hidden bg-black/80 text-white hover:bg-black flex items-center justify-center rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-800">
          <h3 className="text-sm font-bold leading-tight break-words text-center">
            VONSI RESORT
          </h3>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 mb-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-yellow-400 text-black"
                        : "hover:bg-gray-800 text-gray-300 hover:text-white"
                    )}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-base font-semibold">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth / User Info */}
        <div className="px-4 py-4 border-t border-gray-800 flex flex-col items-center gap-2">
          {!user ? (
            <>
              <Button
                variant="login"
                size="default"
                className="!rounded-md !w-[90%] !bg-black !text-yellow-400 !border-2 !border-yellow-400 hover:!bg-yellow-400 hover:!text-black !text-sm transition-colors"
                onClick={() => openAuthModal("login")}
              >
                Увійти
              </Button>
              <Button
                variant="register"
                size="default"
                className="!text-sm !rounded-md !w-[90%] flex items-center justify-center rounded-lg bg-yellow-400 text-black px-4 py-2 text-sm hover:bg-yellow-500 transition-colors"
                onClick={() => openAuthModal("register")}
              >
                Реєстрація
              </Button>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-yellow-400 drop-shadow-[0_0_3px_#facc15]">
                <AvatarImage
                  src={user.channelPhoto || "/placeholder.svg"}
                  alt={user.firstName}
                />
                <AvatarFallback className="text-xl sm:text-2xl bg-yellow-400 text-black">
                  {user?.firstName
                    ? user.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : ""}
                </AvatarFallback>
              </Avatar>
              <div className="text-center my-0 text-yellow-400 text-lg font-bold leading-tight">
                {user.firstName} {user.lastName}
              </div>
              <div className="relative z-50 p-4">
                <button
                  className="w-full bg-yellow-400 text-black px-3 py-2 rounded-5 hover:bg-yellow-500 hover:font-semibold transition-colors"
                  onClick={signOut}
                >
                  Вийти
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
