
import { Card, CardHeader, CardTitle, CardContent } from "../../components/Card";
import { Button } from "../../components/Button";
import type { RentalCategoryCardProps } from "./types";



export default function RentalCategoryCard({
  categories,
  selectedCategory,
  onSelectCategory,
}: RentalCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Категорії</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={`w-full !flex justify-start rounded-2 !px-1 ${
                selectedCategory === category.id
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-transparent"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
