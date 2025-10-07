import { Card, CardContent } from "../../components/Card"; // шляхи підкоригуй під свій проект
import { Button } from "../../components/Button";
import { LogIn } from "lucide-react";
import type { LoginPromptCardProps } from "./types";



export function LoginPromptCard({ onLoginClick }: LoginPromptCardProps) {
  return (
    <Card className="mb-6 border-yellow-400 bg-yellow-50">
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Лівий блок з іконкою і текстом */}
          <div className="flex items-start sm:items-center gap-2">
            <LogIn className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800 m-0 text-sm sm:text-base">
                Увійдіть для оформлення оренди
              </p>
              <p className="text-xs sm:text-sm text-yellow-700 m-0">
                Для продовження потрібна авторизація
              </p>
            </div>
          </div>

          {/* Кнопка */}
          <Button
            onClick={onLoginClick}
            className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 !rounded-md font-semibold text-xs sm:text-sm px-3 py-2"
          >
            Увійти
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
