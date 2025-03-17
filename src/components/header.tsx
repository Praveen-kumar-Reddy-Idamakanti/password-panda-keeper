
import { Search, Lock, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNew: () => void;
}

export function Header({ searchQuery, onSearchChange, onAddNew }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full backdrop-blur-lg bg-background/90 border-b">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-full bg-primary flex items-center justify-center pulse-ring">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Password Panda</h1>
        </div>
        
        <div className="flex flex-1 items-center sm:max-w-md space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search credentials..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Button onClick={onAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
    </header>
  );
}
