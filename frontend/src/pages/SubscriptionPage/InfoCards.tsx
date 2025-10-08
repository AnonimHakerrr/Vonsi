
import React from "react";
import { Card, CardContent } from "../../components/Card";
import { Mountain, Clock, Users } from "lucide-react";

export const InfoCards: React.FC = () => {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card>
        <CardContent className="p-6 text-center">
          <Mountain className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h4 className="text-lg !font-bold mb-2">
            15 трас різної складності
          </h4>
          <p className="text-muted-foreground text-sm">
            Від зелених трас для початківців до чорних для експертів
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h4 className="text-lg !font-bold mb-2">Режим роботи</h4>
          <p className="text-muted-foreground text-sm">
            Щодня з 8:00 до 22:00
            <br />
            Нічне катання до 22:00
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h4 className="text-lg !font-bold mb-2">Групові знижки</h4>
          <p className="text-muted-foreground text-sm">
            Знижка 15% при покупці від 5 абонементів
            <br />
            Знижка 25% від 10 абонементів
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
