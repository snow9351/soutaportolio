const History = () => {
  type Experience = {
    company: string;
    role: string;
    period: string;
    location: string;
    alignment: "left" | "right";
    summary: string;
    teamStructure?: string;
    responsibilities: string[];
    achievements: string[];
  };

  const experiences: Experience[] = [
    {
      company: "Wolf Fusion Team",
      role: "Senior Full Stack Mobile Developer & team leader",
      period: "",
      location: "Remote",
      alignment: "left",
      summary:
        "Leading small development team building advanced trading infrastructure including TradingVPS hosting, copytrading platform, and intelligent AI trading agents.",
      teamStructure:
        "4-person agile team: 2 full stack developers, 1 DevOps engineer, 1 AI/ML specialist.",
      responsibilities: [
        "Lead architecture design for TradingVPS high-performance hosting platform.",
        "Oversee copytrading platform development with real-time trade synchronization.",
        "Direct AI agent development for automated market analysis and execution.",
        "Manage sprint planning, code reviews, and deployment pipelines.",
        "Coordinate cross-functional delivery of trading ecosystem components.",
      ],
      achievements: [
        "Successfully launched TradingVPS platform serving 500+ active traders.",
        "Deployed copytrading system with sub-50ms trade replication latency.",
        "Built production AI agents processing 10K+ market signals daily.",
        "Achieved 99.95% platform uptime during high-volatility trading periods.",
      ],
    },
    {
      company: "Upwork",
      role: "AI Full Stack & Mobile Developer",
      period: "Feb 2023 - Oct 2025",
      location: "Remote",
      alignment: "left",
      summary:
        "Developed 100+ projects including AI-powered trading platforms integrating OpenAI APIs with React/Node.js full stack applications for real-time market analysis and automated trading.",
      responsibilities: [
        "Architected AI agents using OpenAI API for NLP-driven trading decisions.",
        "Built responsive React web apps and cross-platform mobile trading apps.",
        "Developed RESTful APIs connecting AI systems to live trading platforms.",
      ],
      achievements: [
        "Delivered production-ready AI trading platform with 99.9% uptime.",
        "Reduced API latency by 65% through intelligent caching strategies.",
        "Onboarded 5 enterprise clients generating $250K+ annual revenue.",
      ],
    },
    {
      company: "Microsoft",
      role: "Microsoft 365 Copilot Extension Developer",
      period: "May 2020 - Sep 2022",
      location: "Remote",
      alignment: "left",
      summary:
        "Developed AI-powered Office Add-ins integrating Azure OpenAI for document automation and intelligent content generation within Microsoft Word ecosystem.",
      responsibilities: [
        "Built custom Word plugins using Office Add-ins framework and Node.js.",
        "Implemented Azure OpenAI models for document drafting and analysis.",
        "Designed prompt engineering systems for business document automation.",
      ],
      achievements: [
        "Deployed plugins used by 10K+ enterprise users across Fortune 500.",
        "Achieved 92% user satisfaction rating for AI document features.",
        "Reduced document creation time by 40% for legal/finance teams.",
      ],
    },
    {
      company: "Amazon",
      role: "Software Developer",
      period: "Apr 2019 - Feb 2020",
      location: "Remote",
      alignment: "left",
      summary:
        "Led full stack development of Rufus AI shopping assistant using Amazon Bedrock LLMs, GraphQL microservices, and AWS Trainium for real-time mobile deployment.",
      responsibilities: [
        "Developed conversational AI frontend with GraphQL backend microservices.",
        "Implemented RAG architecture for efficient product data retrieval.",
        "Optimized inference pipelines using AWS Trainium inference chips.",
      ],
      achievements: [
        "Launched Rufus to 50M+ Amazon Shopping app users on iOS/Android.",
        "Improved query understanding accuracy by 28% using Bedrock LLMs.",
        "Reduced inference latency to under 200ms at enterprise scale.",
      ],
    },
    {
      company: "Freelancer.com & Workana",
      role: "Full Stack Developer",
      period: "Oct 2018 - Feb 2019",
      location: "Remote",
      alignment: "left",
      summary:
        "Delivered high-performance cruise line platforms integrating legacy systems with modern web technologies for seamless guest experiences.",
      responsibilities: [
        "Built Cruise Norwegian booking/entertainment mobile application.",
        "Developed Cruise Freedom platform with DeCurtis Corporation.",
        "Implemented Fiorano ESB for Oracle-Unix system integration.",
      ],
      achievements: [
        "Successfully launched both platforms serving 100K+ monthly passengers.",
        "Migrated legacy systems improving transaction speed by 35%.",
        "Achieved 99.7% uptime during peak cruise booking seasons.",
      ],
    },
    {
      company: "Self-Employed",
      role: "Full Stack Web Developer | Marketing & Sales Projects",
      period: "Jan 2015 - May 2018",
      location: "Remote",
      alignment: "right",
      summary:
        "Architected 100+ high-performance marketing websites managing complete lifecycle from discovery to production deployment and ongoing optimization.",
      responsibilities: [
        "Developed responsive websites using React/Next.js and Node.js stacks.",
        "Integrated headless CMS (WordPress, Strapi) with custom admin dashboards.",
        "Implemented Google Analytics, A/B testing, and Core Web Vitals optimization.",
        "Managed AWS/Vercel hosting, CI/CD pipelines, and domain configurations.",
        "Delivered continuous maintenance and scalability enhancements.",
      ],
      achievements: [
        "Launched 100+ marketing sites achieving 95+ Lighthouse performance scores.",
        "Achieved 40% faster load times through advanced caching/CDN strategies.",
        "Secured 85% client retention through reliable 24/7 support and updates.",
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center text-white p-6">
      <div className="w-full max-w-4xl">
        <div className="font-medium relative text-3xl mt-2 md:mt-4 mb-8 py-3 text-center">
          Work Experience
          <div className="absolute pt-px bg-gradient-to-r from-transparent via-white to-transparent mt-px top-full w-full">
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
          </div>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div
              key={`${experience.company}-${experience.role}`}
              className={`${experience.alignment === "right" ? "md:ml-auto" : ""} w-full md:w-[92%] group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm hover:border-gray-700/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="p-6 space-y-5 relative z-10">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mt-1">
                    <span className="text-blue-300 font-bold text-sm">
                      {experience.company
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {experience.role}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-lg font-semibold text-gray-300 mb-1">{experience.company}</p>
                      <p className="text-gray-300 text-sm">{experience.location}</p>
                      {experience.period ? (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {experience.period}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-200">Summary:</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{experience.summary}</p>
                </div>

                {experience.teamStructure ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-200">Team Structure:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{experience.teamStructure}</p>
                  </div>
                ) : null}

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-200">Core Responsibilities:</h4>
                  <div className="space-y-2">
                    {experience.responsibilities.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-200">Key Achievements:</h4>
                  <div className="space-y-2">
                    {experience.achievements.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History