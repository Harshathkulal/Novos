import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-12 bg-gradient-to-br from-black/10 via-gray-900 to-black text-white">
      <section className="text-center max-w-2xl mt-20">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Welcome to <span className="text-teal-500">Novos</span>
        </h1>
        <p className="mt-6 text-lg">Thread and connect.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/thread">
            <Button size="lg" className="rounded-full">
              Explore Threads
            </Button>
          </Link>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="rounded-full">
              Start Chatting
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="rounded-full">
              Login / Signup
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-2 text-center max-w-2xl pb-20">
        <h2 className="text-xl font-semibold">About Novos</h2>
        <p className="mt-3 text-muted-foreground">
          Novos is a simple side project exploring scalable UIs, APIs, and
          system design.
        </p>

        <div className="flex justify-center mt-6">
          <a
            href="https://github.com/Harshathkulal/Novos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              <Github size={18} />
              Star on GitHub
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
