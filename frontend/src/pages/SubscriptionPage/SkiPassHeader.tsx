
import { Snowflake } from "lucide-react";
import { Badge } from "../../components/Badge"; 
import type { ISkiPassHeaderProps } from "./types";


export const SkiPassHeader: React.FC<ISkiPassHeaderProps> = ({
  seasonLabel = "",
  title = "",
  description = "",
}) => {
  return (
    <div className="mb-8 text-center px-4 sm:px-6 lg:px-8">
      {/* Badge і іконка */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
        <Snowflake className="!h-8 !w-8 !sm:h-8 !sm:w-8 text-yellow-400" />
        <Badge className="bg-yellow-400 text-black text-base sm:text-lg font-semibold px-3 sm:px-4 py-1 sm:py-2">
          {seasonLabel}
        </Badge>
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-snug sm:leading-tight !font-bold">
        {title.split(" ").map((word, index) =>
          word === "катання" ? (
            <span key={index} className="text-yellow-400">{word} </span>
          ) : (
            word + " "
          )
        )}
      </h1>

      {/* Опис */}
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-full sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};
