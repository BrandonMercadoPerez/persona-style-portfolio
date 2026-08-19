/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "BrandonMercadoPerez",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "Brandon_mercado@ymail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Payroll Data Processing App",
      tag: "C++", color: "#f34b7d",
      url: "https://github.com/BrandonMercadoPerez/salary-processing",
      cta: "View on GitHub →",
      img: "assets/projects/salary-processing.png",
      desc: "A C++ console application that parses unstructured payroll text files, normalizes inconsistent time formats, applies multiple pay-grade rules, and generates formatted departmental payroll summaries. Built and version-controlled from the ground up on GitHub.",
    },
    {
      title: "UTD Market Optimization Project",
      tag: "Operations", color: "#e60012",
      url: "https://github.com/BrandonMercadoPerez", cta: "View GitHub profile →",
      img: "assets/projects/utd-market.png",
      desc: "Led a summer-long project establishing cost centers, PAR levels, POS optimization, and inventory infrastructure across campus marketplace locations for Chartwells Higher Education Dining Services — completed ahead of the Fall 2025 opening, and led to an expanded role as Marketplace Supervisor.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "salary-processing",
  ],

  // Shown if the GitHub API can't be reached
  // (add more entries here as you create more repos)
  fallbackRepos: [],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "salary-processing": "assets/projects/salary-processing.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Programming & Data", items: [
      ["C++", 65], ["Python", 55], ["SQL", 55],
    ]},
    { group: "Tools & Platforms", items: [
      ["GitHub", 70], ["Visual Studio Code", 75], ["Visual Studio", 65],
    ]},
    { group: "Productivity & Analytics", items: [
      ["Microsoft Excel", 88], ["Microsoft Word", 85], ["Microsoft PowerPoint", 82],
    ]},
    { group: "Leadership & Operations", items: [
      ["Team Training & Supervision", 92], ["Inventory & Vendor Management", 88],
      ["Project Leadership", 85], ["Construction & Skilled Trades", 78],
    ]},
    { group: "Languages", items: [
      ["English", 100], ["Spanish", 95],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
