import type { Route } from "../+types/root";
import { Welcome } from "../welcome/welcome";
import BaseLayout from "~/components/layout/base";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <BaseLayout>
      <Welcome />
    </BaseLayout>
  );
}
