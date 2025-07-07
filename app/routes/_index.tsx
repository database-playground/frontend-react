import BaseLayout from "~/components/layout/base";
import { Welcome } from "../welcome/welcome";

export function meta() {
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
