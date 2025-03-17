
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, KeyRound, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AddCredentialDialog from "./add-credential-dialog";

export function Header() {
  const { logout, user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-6 w-6" />
          <h1 className="text-xl font-bold md:text-2xl">Password Vault</h1>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">Add Credential</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
              <AddCredentialDialog 
                open={isAddDialogOpen} 
                onOpenChange={setIsAddDialogOpen} 
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
