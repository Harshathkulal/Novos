import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Scroll. Connect. Scale.
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Building minimal, Social experiences.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/chat">
            <Button size="lg">Chat</Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>

        <form className="mt-8 flex w-full max-w-md items-center gap-2 mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1"
          />
          <Button type="submit">Join Waitlist</Button>
        </form>
      </section>

      <footer className="mt-20 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Novos, Inc
      </footer>
    </main>
  );
}
