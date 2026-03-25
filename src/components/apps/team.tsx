"use client";

export default function AboutTeam() {
  return (
    <div className="windowMainScreen h-full w-full overflow-y-auto bg-ub-cool-grey px-5 py-6 text-white md:px-8 md:py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            About my team
          </h1>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-300 md:text-base">
            <p>
              We are a team of engineers specializing in full-stack development
              and AI-driven systems.
            </p>
            <p>
              We build scalable applications, real-time data platforms, and
              intelligent tools that help businesses operate more efficiently.
            </p>
            <p>
              Our focus is on clean architecture, reliable performance, and
              delivering practical solutions from idea to production.
            </p>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-orange-300 md:text-xl">
            Kohei Hashimoto — Full-Stack Engineer
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            Kohei specializes in building scalable web applications and backend
            systems, with strong experience across modern frontend frameworks and
            cloud-based architectures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-orange-300 md:text-xl">
            Haruki Mizuno — AI &amp; API Engineer
          </h2>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            Haruki focuses on AI integration and API-driven systems, developing
            intelligent features and connecting platforms through efficient,
            reliable data pipelines.
          </p>
        </section>
      </div>
    </div>
  );
}
