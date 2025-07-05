import Header from "~/components/header";
import { cn } from "~/lib/utils";

export default function BaseLayout({ children, containerClassName }: { children: React.ReactNode, containerClassName?: string }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className={cn("max-w-xl mx-auto my-8", containerClassName)}>
        {children}
      </main>
    </div>
  );
}
