import { User } from "lucide-react";
import { Button } from "@shared/ui/button";

export const SellerHeader = () => {
  return (
    <header className="border-b bg-primary-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="font-['Brush_Script_MT',cursive] text-2xl font-bold">
              Farm Fresh - Seller
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
