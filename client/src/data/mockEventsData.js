export const mockEvents = [
  {
    id: "evt-201",
    title: "Global Tech Alumni Summit 2026",
    category: "Networking",
    description: "Connect with alumni leaders in AI, Cloud Computing, and Venture Capital. Includes keynote speeches, industry break-out circles, and direct networking lounges.",
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    startDate: "2026-11-15T18:00:00.000Z",
    endDate: "2026-11-15T21:30:00.000Z",
    venue: "Main University Auditorium & Virtual Live Stream",
    isOnline: false,
    registrationDeadline: "2026-11-12T23:59:59.000Z",
    capacity: 250,
    registeredCount: 184,
    status: "upcoming",
    organizer: "Alumni Association & Tech SIG",
    speakers: [
      { name: "Dr. Sarah Chen", role: "Staff AI Research Scientist, Anthropic" },
      { name: "Marcus Vance", role: "VP of Product, Stripe" }
    ],
    agenda: [
      { time: "06:00 PM", title: "Registration & Welcome Drinks" },
      { time: "06:45 PM", title: "Keynote: The Next Decade of Generative Tech" },
      { time: "07:45 PM", title: "Breakout Panels by Industry" },
      { time: "08:45 PM", title: "Open Networking Dinner" }
    ]
  },
  {
    id: "evt-202",
    title: "Young Alumni Career Guidance & Mentorship Mixer",
    category: "Career guidance",
    description: "An intimate, speed-mentoring session connecting recent graduates (2021–2024) with senior alumni in engineering, product management, and consulting.",
    bannerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    startDate: "2026-11-28T17:00:00.000Z",
    endDate: "2026-11-28T19:30:00.000Z",
    venue: "Innovation Hub, West Campus, Room 302",
    isOnline: false,
    registrationDeadline: "2026-11-25T23:59:59.000Z",
    capacity: 60,
    registeredCount: 52,
    status: "upcoming",
    organizer: "Career Services & Mentorship Board",
    speakers: [
      { name: "Priya Ramanathan", role: "Principal Cloud Architect, Microsoft" },
      { name: "David O'Connor", role: "Sr. Engineering Manager, AWS" }
    ],
    agenda: [
      { time: "05:00 PM", title: "Mentorship Orientation" },
      { time: "05:20 PM", title: "Roundtable 1: Resume & Interview Strategies" },
      { time: "06:10 PM", title: "Roundtable 2: Negotiating Offers & Career Growth" },
      { time: "07:00 PM", title: "Mixer & Matchmaking Wrap-Up" }
    ]
  },
  {
    id: "evt-203",
    title: "Venture Roundtable: Pitching to Top Tier VCs",
    category: "Workshops",
    description: "Learn what institutional investors look for in seed stage pitches, term sheets, cap table hygiene, and how to scale from prototype to Series A.",
    bannerImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80",
    startDate: "2026-12-05T19:00:00.000Z",
    endDate: "2026-12-05T20:30:00.000Z",
    venue: "Zoom Interactive Webinar",
    isOnline: true,
    registrationDeadline: "2026-12-04T23:59:59.000Z",
    capacity: 500,
    registeredCount: 340,
    status: "upcoming",
    organizer: "Apex Founders Network",
    speakers: [
      { name: "Alexander Brooks", role: "Partner, Benchmark Capital" },
      { name: "Rajesh Kumar Gupta", role: "CEO, HealthBridge (YC W21)" }
    ],
    agenda: [
      { time: "07:00 PM", title: "Current State of Venture Funding" },
      { time: "07:30 PM", title: "Live Teardown of Fictional Pitch Deck" },
      { time: "08:00 PM", title: "Audience Q&A & Founder Office Hours" }
    ]
  },
  {
    id: "evt-204",
    title: "Decade Milestone Reunion: Class of 2016",
    category: "Reunions",
    description: "A celebration of 10 remarkable years since graduation. Catch up with old friends, tour renovated campus facilities, and celebrate class achievements.",
    bannerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    startDate: "2026-12-18T16:00:00.000Z",
    endDate: "2026-12-18T22:00:00.000Z",
    venue: "Grand Alumni Courtyard, Main Campus",
    isOnline: false,
    registrationDeadline: "2026-12-10T23:59:59.000Z",
    capacity: 200,
    registeredCount: 168,
    status: "upcoming",
    organizer: "Class of 2016 Committee",
    speakers: [],
    agenda: [
      { time: "04:00 PM", title: "Campus Walk & Memory Lane Exhibit" },
      { time: "06:00 PM", title: "President's Welcome & Class Toast" },
      { time: "07:30 PM", title: "Gala Dinner & DJ Night" }
    ]
  },
  {
    id: "evt-205",
    title: "Masterclass: High-Scale Systems in Practice",
    category: "Guest lectures",
    description: "Deep dive into real-world distributed architectures: handling millions of concurrent video streams and database replication under extreme throughput.",
    bannerImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
    startDate: "2026-12-22T18:30:00.000Z",
    endDate: "2026-12-22T20:00:00.000Z",
    venue: "Virtual Live Stream & Tech Lab 101",
    isOnline: true,
    registrationDeadline: "2026-12-21T23:59:59.000Z",
    capacity: 300,
    registeredCount: 289,
    status: "upcoming",
    organizer: "CS Alumni Chapter",
    speakers: [
      { name: "Arjun Mehta", role: "Staff Engineer, Netflix" }
    ],
    agenda: [
      { time: "06:30 PM", title: "Architecture Case Study" },
      { time: "07:20 PM", title: "Live Code Walkthrough & Bottleneck Analysis" },
      { time: "07:45 PM", title: "Interactive Q&A" }
    ]
  },
  {
    id: "evt-206",
    title: "London Alumni Chapter Evening Mixer",
    category: "Alumni meetups",
    description: "Informal drinks and networking for alumni based in the UK and Europe. Meet fellow graduates living across London.",
    bannerImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    startDate: "2027-01-14T19:00:00.000Z",
    endDate: "2027-01-14T21:30:00.000Z",
    venue: "The Goldsmiths Pavilion, Covent Garden, London",
    isOnline: false,
    registrationDeadline: "2027-01-10T23:59:59.000Z",
    capacity: 80,
    registeredCount: 65,
    status: "upcoming",
    organizer: "UK Alumni Regional Chapter",
    speakers: [],
    agenda: []
  }
];
