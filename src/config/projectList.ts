import type { Project } from "@/types/project";

export const projectList: Project[] = [
  /* mobile projects */
  {
    title: "Cashews Finance",
    period: "2021 - 2022",
    type: "mobile",
    category: "personal",
    priority: "high",
    status: "completed",
    link: [
      { ios: "https://apps.apple.com/us/app/1582436070/" },
      { android: "https://play.google.com/store/apps/details?id=com.cashews.finance" }
    ],
    images: [
      "/images/projects/cashews_finance/cashews_finance_1.webp",
    ],
    tech: [
      "Flutter",
      "BLoC",
      "Plaid",
      "InApp purchases"
    ],
    description: "Meet your smart personal accountant who'll tell you exactly how much you can safely spend."
  },
  {
    title: "Coina",
    type: "mobile",
    category: "personal",
    priority: "high",
    status: "completed",
    source: "https://github.com/snow9351/crypto_app",
    images: [
      "/images/projects/coina/coina1.webp",
      "/images/projects/coina/coina2.webp",
      "/images/projects/coina/coina3.webp",
      "/images/projects/coina/coina4.webp",
      "/images/projects/coina/coina5.webp",
      "/images/projects/coina/coina6.webp",
      "/images/projects/coina/coina7.webp",
    ],
    tech: [
      "iOS App",
      "Android",
      "User Defaults",
      "Ktor Client",
      "Jetpack Compose",
      "Swift UI",
      "Shared Prefs",
      "Realm Kotlin SDK"
    ],
    description: "This Project Built to test the Concept of Sharing the Business Logic between Native Android, iOS Apps using Kotlin Multiplatform with Ktor Client, Offline Caching with Realm Kotlin SDK to share Queries"
  },
  {
    title: "Autohub",
    type: "mobile",
    category: "personal",
    priority: "medium",
    status: "completed",
    source: "https://github.com/snow9351/autohub-android",
    images: [
      "/images/projects/autohub/autohub1.webp",
      "/images/projects/autohub/autohub2.webp",
      "/images/projects/autohub/autohub3.webp",
      "/images/projects/autohub/autohub4.webp",
      "/images/projects/autohub/autohub5.webp",
    ],
    tech: [
      "Kotlin",
      "Android SDK",
      "Gradle",
      "MVVM",
      "Retrofit 2",
      "RxJava 2",
      "Gson",
      "Realm Database",
      "SharedPreferences",
      "Kotlin Coroutines",
      "Timber",
      "LeakCanary",
      "Firebase",
    ],
    description: "Android Application is created to view Github Account Information with Authentication Basic Auth Username and Password Powered By Github Api V3 and the Base Structure of the Project is MVVM with Navigation Components and Kotlin Programming Language"
  },
  {
    title: "Destiny",
    type: "mobile",
    category: "personal",
    priority: "medium",
    status: "completed",
    images: [
      "/images/projects/destiny/destiny_1.webp",
      "/images/projects/destiny/destiny_2.webp",
      "/images/projects/destiny/destiny_3.webp",
      "/images/projects/destiny/destiny_4.webp",
    ],
    tech: [
      "Kotlin",
      "Android SDK",
      "Gradle",
      "MVVM",
      "Retrofit 2",
      "RxJava 2",
      "Gson",
      "Realm Database",
      "SharedPreferences",
      "Kotlin Coroutines",
      "Timber",
      "LeakCanary",
      "Firebase",
    ],
    description: "Android Application Built to show Restaurants and Food Delivery App The Idea of this project is to Build a Food Delivery Api and see the Results on Mobile App and the Mobile App Built with Kotlin and MVVM"
  },
  {
    title: "Lumity - Learn. Share. Grow.",
    type: "mobile",
    category: "client-work",
    priority: "high",
    status: "completed",
    images: [
      "/images/projects/lumity/lumity_1.webp",
      "/images/projects/lumity/lumity_2.webp",
      "/images/projects/lumity/lumity_3.webp",
      "/images/projects/lumity/lumity_4.webp",
      "/images/projects/lumity/lumity_5.webp",
      "/images/projects/lumity/lumity_6.webp",
    ],
    tech: [
      "iOS",
      "Swift",
      "UIKit",
      "SwiftUI",
      "Cloud-hosted REST API",
      "DB + media storage",
      "Authentication",
      "Analytics",
      "Push notifications",
      "Search engine",
      "CDN",
      "Media APIs (podcasts, YouTube, reading lists)",
      "Cloud services (AWS/GCP/Azure)",
    ],
    description: "Build your Learning Community",
    link: "https://apps.apple.com/us/app/lumity-learn-share-grow/id1565191495"
  },
  {
    title: "To-Do app",
    type: "mobile",
    category: "personal",
    priority: "medium",
    status: "completed",
    images: [
      "/images/projects/todoapp.webp",
    ],
    tech: [
      "Flutter",
      "Cross-platform",
      "Material-design",
      "Android",
      "iOS"
    ],
    description: "A modern, cross-platform Todo/Task management mobile application built with Flutter. Features a beautiful UI with dashboard, priority tasks, task categories, and full CRUD operations for managing your daily tasks."
  },
  {
    title: "Ultimatum",
    type: "mobile",
    category: "personal",
    priority: "high",
    status: "completed",
    link: [
      { android: "https://play.google.com/store/apps/details?id=com.ultimatum" }
    ],
    images: [
      "/images/projects/ultimatum/ultimatum1.webp",
      "/images/projects/ultimatum/ultimatum2.webp",
      "/images/projects/ultimatum/ultimatum3.webp",
      "/images/projects/ultimatum/ultimatum4.webp",
      "/images/projects/ultimatum/ultimatum5.webp",
      "/images/projects/ultimatum/ultimatum6.webp",
      "/images/projects/ultimatum/ultimatum7.webp",
      "/images/projects/ultimatum/ultimatum8.webp",
      "/images/projects/ultimatum/ultimatum9.webp",
    ],
    tech: [
      "Flutter",
      "Cross-platform",
      "Android",
      "Live Streaming",
    ],
    description: "An interactive social gaming app that revolutionizes the truth or dare experience. Built with Flutter for cross-platform compatibility, Ultimatum offers two engaging modes: PLAYER mode for livestreaming challenges set by friends and followers, and WATCHER mode for voting on global player performances. The app creates a community-driven platform where users can accept, create, and complete daring challenges while engaging with an international audience through real-time streaming and voting features."
  },
  {
    title: "evköm charge",
    type: "mobile",
    category: "personal",
    priority: "high",
    status: "completed",
    link: [
      { android: "https://play.google.com/store/apps/details?id=com.evk.charge" }
    ],
    images: [
      "/images/projects/evkom/evkom1.webp",
      "/images/projects/evkom/evkom2.webp",
      "/images/projects/evkom/evkom3.webp",
      "/images/projects/evkom/evkom4.webp",
      "/images/projects/evkom/evkom5.webp",
    ],
    tech: [
      "Flutter",
      "Cross-platform",
      "Android",
      "EV Charging",
      "Sustainable Technology"
    ],
    description: "A stylish and modern electric vehicle charging application designed to empower sustainable lifestyles by seamlessly integrating EV charging into daily routines. Built with Flutter for cross-platform excellence, evköm combines cutting-edge technology with elegant design to transform electric vehicle charging into a desirable lifestyle experience. The app revolutionizes charging infrastructure by making it not only functional but also aesthetically pleasing, inspiring users to embrace greener and more connected transportation solutions."
  },
  {
    title: "Exeeria",
    type: "mobile",
    category: "personal",
    priority: "high",
    status: "completed",
    link: [
      { android: "https://play.google.com/store/apps/details?id=com.exeeria" }
    ],
    images: [
      "/images/projects/exeeria/exeeria1.webp",
      "/images/projects/exeeria/exeeria2.webp",
      "/images/projects/exeeria/exeeria3.webp",
      "/images/projects/exeeria/exeeria4.webp",
    ],
    tech: [
      "Flutter",
      "Cross-platform",
      "Android",
      "QR Code Scanning",
      "Healthcare Technology",
      "Patient-Provider Communication"
    ],
    description: "A revolutionary healthcare mobile application that enhances patient-provider interaction through innovative technology. Built with Flutter, Exeeria enables patients to receive personalized medical instructions from their certified healthcare providers via QR code scanning. The app features a patent-protected technology that allows direct communication between patients and providers, enabling users to access, save, and review medical instructions anytime, anywhere. With built-in chat functionality and a comprehensive provider verification system, Exeeria facilitates clear, accurate, and enjoyable health service experiences while maintaining the highest standards of medical information reliability."
  },
  
  /* web projects */
  {
    title: "Sark",
    type: "web",
    category: "personal",
    priority: "high",
    status: "completed",
    source: "https://github.com/snow9351/Sark",
    link: "https://freelancermarketplace.vercel.app/",
    images: [
      "/images/projects/Sark/IMG_1.png",
      "/images/projects/Sark/IMG_2.png",
      "/images/projects/Sark/IMG_3.png",
      "/images/projects/Sark/ResumeAI_GIF.gif"
    ],
    tech: [
      "TALL stack",
      "React",
      "MySQL",
      "JWT",
      "Laravel",
      "RestAPI",
    ],
    description: "Sark is an innovative web application designed to streamline job searching, posting, and career guidance. It serves as a powerful platform for job posters, applicants, and individuals seeking career insights. With a modern, responsive design and AI-driven functionalities, Talx offers an enhanced user experience tailored for today's job market."
  },
  {
    title: "NexusFlow",
    type: "web",
    category: "personal",
    priority: "medium",
    status: "completed",
    source: "https://github.com/snow9351/NexusFlow",
    link: "https://proxima-project.netlify.app/",
    images: [
      "/images/projects/NexusFlow/NexusFlow.PNG"
    ],
    tech: [
      "Node.js",
      "TypeScript",
    ],
    description: "NexusFlow is a modern project management website built using the MERN stack, Context API, JWT, and TailwindCSS. With a sleek and intuitive interface, users can easily create, update, and delete their projects. Proxima also features a secure protected route in the frontend, ensuring user data remains safe and secure."
  },
  {
    title: "Sushi Restaurant Website",
    type: "web",
    category: "personal",
    priority: "medium",
    status: "completed",
    source: "https://github.com/snow9351/Pamy-s-Sushi",
    link: "https://pamys-sushi.vercel.app/#",
    images: [
      "/images/projects/Shushi/1.PNG"
    ],
    tech: [
      "HTML",
      "CSS",
      "JavaScript",
    ],
    description: "This is a hypothetical website developed for a sushi restaurant, showcasing popular dishes, the option to place orders, and information about events."
  },
  {
    title: "American Psychiatrists",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    link: "http://americanpsychiatrists.com/",
    images: [
      "/images/projects/americanpsychiatrists_home.webp",
      "/images/projects/americanpsychiatrists_admin.webp",
    ],
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Axios",
      "EmailJS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Bluehost",
    ],
    description: "Developed a comprehensive web application that connects patients with qualified psychiatrists across the United States. The platform serves as a trusted directory where mental health professionals can showcase their profiles while patients can easily search and find appropriate care providers in their area."
  },
  {
    title: "Backtesting Platform",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    link: "https://beta.traderscasa.com/",
    images: [
      "/images/projects/traderscasa/home.PNG",
      "/images/projects/traderscasa/exprience.PNG",
      "/images/projects/traderscasa/main.PNG",
    ],
    tech: [
      "Next.js",
      "Vite",
      "TradingView Charting Library",
      "React Router",
      "WebSocket",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Firebase/Auth0",
    ],
    description: "TradersCasa is a free, TradingView-powered backtesting and trading journal platform that lets traders test strategies on historical data, track live trades, and analyze performance with 50+ metrics using React, Node.js, and MongoDB."
  },
  {
    title: "Professional Options Trading Analytics Platform",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    link: "https://fantastic-vacherin-48bd87.netlify.app/",
    images: [
      "/images/projects/optionmanager/main.PNG ",
      "/images/projects/optionmanager/main1.PNG",
      "/images/projects/optionmanager/main2.PNG"
    ],
    tech: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL (TimescaleDB)",
      "Polygon.io API",
      "Vercel",
      "Supabase",
      "Supabase Auth"
    ],
    description: "This is a professional options trading analytics platform built with React, TypeScript, Vite, TailwindCSS, Axios, EmailJS, Node.js, Express.js, PostgreSQL, and Bluehost. It allows traders to test strategies on historical data, track live trades, and analyze performance with 50+ metrics."
  },
  {
    title: "Day Trader Canada",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    source: "http://daytradercanada.com",
    images: [
      "/images/projects/daytrader/home.PNG",
      "/images/projects/daytrader/home1.PNG",
      "/images/projects/daytrader/contactme.PNG",
    ],
    description: "Day Trader Canada is a comprehensive real-time cryptocurrency analytics platform that combines live market data with social media insights. Built as a modern full-stack web application, it provides traders, investors, and crypto enthusiasts with essential market intelligence and trending information.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn/UI", "Next.js API Routes", "CoinMarketCap API", "Axios", "RESTful API", "Responsive Design"],
  },
  {
    title: "Booking Platform",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    link: "https://jeskojets.com/",
    images: [
      "/images/projects/jesko/home.PNG",
      "/images/projects/jesko/home1.PNG",
      "/images/projects/jesko/home2.PNG"
    ],
    tech: [
      "Three.js",
      "React",
      "TailwindCSS",
      "Vite",
      "TypeScript",
      "Zustand",
      "React Router",
      "React Hook Form",
      "React Query",
      "React Hook Form",
    ],
    description: "Jesko Jets is a booking platform for a private jet company. It allows users to book a private jet for a specific date and time. It also allows users to view the available jets and the prices."
  },
  /* trading projects */
  {
    title: "IBKR Trading Bot Remote Controller",
    type: "Trading bots",
    category: "client-work",
    priority: "high",
    status: "completed",
    source: [
      { FE: "https://github.com/snow9351/IBKR-Remote-controller" },
    ],
    link: "https://www.stocktrademanagement.com/",
    images: [
      "/images/projects/IBKRTradingbot/main.PNG",
      "/images/projects/IBKRTradingbot/botmanagement.PNG"
    ],
    tech: [
      "FastAPI",
      "Uvicorn",
      "Python",
      "Pandas",
      "NumPy",
      "Pytz",
      "Redis",
      "Google Analytics",
      "PyJWT",
      "OAuth2",
      "HTTPX",
      "Requests",
      "AIOHTTP",
      "WebSockets",
      "TastyTrade",
      "Charles Schwab",
      "TastyTrade DXFeed",
      "EMA",
    ],
    description: "IBKR Trading Bot Remote Controller is a web application that allows users to control their trading bots remotely. It is built with FastAPI, Uvicorn, Python, Pandas, NumPy, Pytz, Redis, Google Analytics, PyJWT, OAuth2, HTTPX, Requests, AIOHTTP, WebSockets, TastyTrade, Charles Schwab, TastyTrade DXFeed, EMA."
  },
  // {
  //   title: "AI Voice Agent - SitePal",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "https://www.sitepal.com/",
  //   description: "AI voice agent platform for automated customer service and interactive voice responses."
  // },
  // {
  //   title: "Village Dental DTC",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "https://www.villagedentaldtc.com/",
  //   description: "Dental clinic website with appointment booking and patient management system."
  // },
  // {
  //   title: "Kiwitaxi",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "https://kiwitaxi.com/",
  //   description: "Taxi booking and transportation service platform."
  // },
  // {
  //   title: "Baby Ape Social Club",
  //   type: "web",
  //   category: "client-work",
  //   priority: "low",
  //   status: "completed",
  //   link: "https://www.babyapesocialclub.com/",
  //   description: "NFT marketplace and social platform for digital collectibles."
  // },
  // {
  //   title: "Scorep",
  //   type: "web",
  //   category: "client-work",
  //   priority: "low",
  //   status: "completed",
  //   link: "https://scorep.co/",
  //   description: "NFT marketplace platform for digital assets and collectibles."
  // },
  // {
  //   title: "Vdara Hotel & Spa",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "https://vdara.mgmresorts.com/",
  //   description: "Vdara Hotel & Spa is a luxury, all-suite, non-smoking, and non-gaming hotel located within the CityCenter complex on the Las Vegas Strip. The website serves as a portal for guests to explore accommodations, amenities, and make reservations.",
  //   tech: ["Angular", ".NET"],
  // },
  // {
  //   title: "Colgate",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "https://www.colgate.com/",
  //   description: "Colgate's website is a global platform providing information about oral health products, educational resources, and company initiatives. It caters to a diverse audience, including consumers and dental professionals.",
  //   tech: ["Angular", ".NET"],
  // },
  // {
  //   title: "Brilliant Earth",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "https://www.brilliantearth.com/",
  //   description: "Brilliant Earth is an e-commerce platform specializing in ethically sourced fine jewelry. The website offers a rich user experience with features like product customization, virtual try-ons, and educational content about ethical sourcing.",
  //   tech: ["Angular", ".NET"],
  // },
  // {
  //   title: "Apps Ninjas - Configuration Platform",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "http://www.appsninjas.com/#/ConfiguracionApps",
  //   description: "Apps Ninjas platform offering mobile app solutions, focusing on payment processing and point-of-sale systems with configuration interface for applications.",
  //   tech: ["Angular", "Express.js"],
  // },
  // {
  //   title: "Baby Box Co",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "https://www.babyboxco.com",
  //   description: "Baby Box Co. is a company that provides baby boxes and educational resources to new parents. Their website offers information about their products, parenting tips, and access to their online courses.",
  //   tech: ["Angular", "Express.js"],
  // },
  // {
  //   title: "My Accent Way",
  //   type: "web",
  //   category: "client-work",
  //   priority: "medium",
  //   status: "completed",
  //   link: "https://myaccentway.com/",
  //   description: "My Accent Way is an online platform offering accent reduction and English pronunciation training. The website provides course information, enrollment options, and resources for non-native English speakers aiming to improve their accent.",
  //   tech: ["Angular", "Express.js"],
  // },
  // {
  //   title: "Berlitz",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "http://www.berlitz.com/",
  //   description: "Berlitz is a global language education company offering language instruction, cultural training, and business communication skills. Their website provides information on courses, locations, and enrollment options.",
  //   tech: ["Angular", "Express.js"],
  // },
  // {
  //   title: "Tellora.ai",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "https://tellora.ai",
  //   description: "Tellora.ai is an AI voice agent designed specifically for dental practices. It answers and handles patient calls, schedules appointments, and manages basic queries—no setup needed. The AI speaks naturally, understands emotions, works in multiple languages, integrates with your tools, runs 24/7, and helps dental clinics save time, reduce staff load, and improve patient satisfaction."
  // },
  {
    title: "Music Maker",
    type: "web",
    category: "client-work",
    priority: "high",
    status: "completed",
    link: "https://musicmaker.vercel.app/",
    source: "https://github.com/snow9351/musicmaker",
    images: [
      "/images/projects/musicmaker/home.PNG",
      "/images/projects/musicmaker/commands.PNG",
      "/images/projects/musicmaker/discord.PNG"
    ],
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
    description: "Music Maker is a web application that allows users to create and share music. It is built with React, Next.js, Tailwind CSS, and Vercel. It allows users to create and share music with a simple and intuitive interface."
  },
  // {
  //   title: "Ceras Health",
  //   type: "web",
  //   category: "client-work",
  //   priority: "high",
  //   status: "completed",
  //   link: "https://cerashealth.com/",
  //   description: "Ceras Health is an innovative digital healthcare platform that empowers patients and providers through real-time remote monitoring, AI-driven insights, and seamless care coordination. The platform aims to enhance patient quality of life, reduce healthcare costs, and improve outcomes by delivering continuous, personalized care throughout the patient lifecycle—from preventative programs to chronic condition management and post-discharge care.",
  //   tech: ["Node.js", "Next.js", "React Native", "TensorFlow", "AWS"],
  // },
  /* ai projects */
  {
    title: "Retell Voice Bot",
    type: "ai",
    category: "personal",
    priority: "high",
    status: "completed",
    source: "https://github.com/snow9351/retell-voice-assistant",
    link: "https://retell-voice-bot.vercel.app/",
    description: "Modern voice assistant built with React and Retell AI. Features real-time voice conversations, beautiful UI with Tailwind CSS, and smooth animations with Framer Motion. Perfect for building conversational AI interfaces with clean, production-ready code.",
    images: [
      "/images/projects/voice-reteller.webp"
    ],
    tech: ["Retell AI", "React", "Tailwind CSS", "Framer Motion", "Voice Recognition"]
  },
  {
    title: "Trading Arts",
    type: "ai",
    category: "client-work",
    priority: "medium",
    status: "completed",
    source: "https://github.com/snow9351/TrdArts",
    link: "https://trdarts.com/",
    images: [
      "/images/projects/trdarts.webp"
    ],
    tech: [
      "AI Blog Generation",
      "Flask",
      "Next.js",
      "Bluehost",
    ],
    description: "Blog Websites for the world of Art, Auctions and NFTs"
  },
  {
    title: "LiveLikeKONG",
    type: "ai",
    category: "client-work",
    priority: "medium",
    status: "completed",
    source: "https://github.com/snow9351/LiveLikeKong",
    link: "https://livelikekong.com/",
    images: [
      "/images/projects/livelikekong.webp"
    ],
    tech: [
      "AI Blog Generation",
      "Flask",
      "Next.js",
      "Bluehost",
    ],
    description: "Live Like Kong is a premier marketing website for the $KONG token, embodying the spirit of luxury, community, and the king of the jungle. From the Jungle to the Moon, we're building a community passionate about living life well, creating wealth, and having fun along the way."
  },
  {
    title: "Goal Moon Shoot",
    type: "ai",
    category: "client-work",
    priority: "low",
    status: "completed",
    source: "https://github.com/snow9351/goalmoonshoot",
    link: "https://goalmoonshot.com/",
    images: [
      "/images/projects/goalmoonshoot.webp"
    ],
    tech: [
      "AI Blog Generation",
      "Flask",
      "Next.js",
      "Bluehost",
    ],
    description: "From the Pitch to the Moon — Welcome to Goal to the Moon! 🌕⚽"
  },
  /* 3D projects */
  // {
  //   title: "Drone 3D Showcase",
  //   type: "3D",
  //   category: "personal",
  //   priority: "medium",
  //   status: "completed",
  //   source: "https://github.com/snow9351/Drone",
  //   link: "https://drone-liard-zeta.vercel.app/",
  //   images: [
  //     "/images/projects/drone.webp"
  //   ],
  //   tech: [
  //     "Three.js",
  //   ],
  //   description: "This project is a 3D web application that showcases an interactive 3D model of a drone using Three.js."
  // },
  // // {
  // //   title: "3D Online Tank Battle in Unity3D",
  // //   type: "3D",
  // //   category: "personal",
  // //   priority: "high",
  // //   status: "completed",
  // //   source: "https://github.com/snow9351/tank-wars-3d-online",
  // //   images: [
  // //     "/images/projects/tank/1.webp",
  // //     "/images/projects/tank/2.webp",
  // //     "/images/projects/tank/3.webp",
  // //     "/images/projects/tank/4.webp",
  // //     "/images/projects/tank/5.webp",
  // //     "/images/projects/tank/6.webp",
  // //   ],
  // //   tech: [
  // //     "C#",
  // //     "Unity",
  // //   ],
  // //   description: "A 3D online multiplayer tank battle game built with Unity3D. Players control tanks (and helicopters) in dynamic environments, featuring destructible terrain, special effects, and a variety of vehicles and weapons."
  // // },
  // {
  //   title: "Borgward 3D Car Showcase",
  //   type: "3D",
  //   category: "personal",
  //   priority: "medium",
  //   status: "completed",
  //   source: "https://github.com/snow9351/borgward",
  //   images: [
  //     "/images/projects/borgward.webp",
  //   ],
  //   tech: [
  //     "C#",
  //     "Unity",
  //   ],
  //   description: "This is a 3D interactive car showcase for the Borgward BX7 SUV, built as a web-based 360° panoramic experience. The project allows users to explore the car in detail through an immersive 3D environment."
  // },
  // {
  //   title: "Global Hotspot Visualization",
  //   type: "3D",
  //   category: "personal",
  //   priority: "high",
  //   status: "completed",
  //   source: "https://github.com/snow9351/globe-hotspot-visualization.git",
  //   link: "https://globe-hotspot-visualization.vercel.app/",
  //   images: [
  //     "/images/projects/global.webp",
  //   ],
  //   tech: [
  //     "WebGL",
  //     "Three.js",
  //     "Hotspots",
  //   ],
  //   description: "Interactive 3D globe visualization displaying data-driven hotspots from CSV files, with info modals, CSV upload, and animated atmosphere/clouds. Built with Three.js."
  // }
]