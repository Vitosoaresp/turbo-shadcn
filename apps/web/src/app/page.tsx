import { Button } from '@repo/ui/components/button';

export default function Home() {
  return (
    <main className="flex flex-1 justify-center items-center gap-4 p-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </main>
  );
}
