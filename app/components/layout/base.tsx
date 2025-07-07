import Header from "~/components/header";
import { cn } from "~/lib/utils";

export default function BaseLayout(
  { children, containerClassName }: { children: React.ReactNode; containerClassName?: string },
) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className={cn("mx-auto my-8 max-w-xl", containerClassName)}>
        {children}
      </main>
    </div>
  );
}
