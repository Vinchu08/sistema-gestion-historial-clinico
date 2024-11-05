import { permanentRedirect } from "next/navigation";

export default function Page() {
  {/*
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1>Este es el marco de Page</h1>
    </main>
  );
  */}
  permanentRedirect('/adm/home');
}
