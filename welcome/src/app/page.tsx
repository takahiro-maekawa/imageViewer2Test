'use server';

import { redirect } from 'next/navigation';
export default async function Home() {
  const action = async () => {
    'use server';
    redirect("http://localhost:3000");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <span>ようこそ</span>
        <form action={action}>
          <button>CLICK</button>
        </form>
      </div>
    </main>
  );
}
