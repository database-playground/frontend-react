import { Loader } from "lucide-react";
import { cn } from "~/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return <Loader data-testid="spinner" className={cn("size-4 animate-spin", className)} />;
}
