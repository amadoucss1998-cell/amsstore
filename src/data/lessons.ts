export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  readingMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  content: Section[];
}

export interface Section {
  heading: string;
  body: string;
  tips?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  lessonCount: number;
}

export const CATEGORIES: Category[] = [
  { id: 'finance',       name: 'Finance',        icon: '💰', color: 'from-emerald-500 to-teal-600',    description: 'Budgeting, saving, investing & debt management', lessonCount: 6 },
  { id: 'health',        name: 'Health',         icon: '🩺', color: 'from-rose-500 to-pink-600',       description: 'Nutrition, exercise, mental health & first aid', lessonCount: 5 },
  { id: 'cooking',       name: 'Cooking',        icon: '🍳', color: 'from-orange-400 to-red-500',      description: 'Meal prep, nutrition, kitchen skills & recipes', lessonCount: 5 },
  { id: 'legal',         name: 'Legal Basics',   icon: '⚖️', color: 'from-violet-500 to-purple-600',  description: 'Know your rights, contracts, taxes & more', lessonCount: 4 },
  { id: 'relationships', name: 'Relationships',  icon: '🤝', color: 'from-blue-400 to-indigo-600',    description: 'Communication, conflict resolution & boundaries', lessonCount: 4 },
  { id: 'career',        name: 'Career',         icon: '💼', color: 'from-yellow-400 to-amber-600',   description: 'Job hunting, networking, interviews & raises', lessonCount: 5 },
  { id: 'home',          name: 'Home & DIY',     icon: '🏠', color: 'from-cyan-400 to-sky-600',       description: 'Maintenance, cleaning, renting & buying', lessonCount: 4 },
  { id: 'digital',       name: 'Digital Safety', icon: '🔐', color: 'from-slate-400 to-gray-600',     description: 'Privacy, scams, passwords & online safety', lessonCount: 4 },
];

export const LESSONS: Lesson[] = [
  // ── FINANCE ───────────────────────────────────────────
  {
    id: 'finance-budget',
    categoryId: 'finance',
    title: 'Build Your First Budget',
    summary: 'Learn the 50/30/20 rule and how to track every dollar you earn.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['budgeting', 'money', 'savings'],
    content: [
      {
        heading: 'Why budgeting matters',
        body: 'A budget is simply a plan for your money. Without one, spending tends to expand to fill whatever is available. Studies show that people who budget save 20% more on average than those who don\'t.',
      },
      {
        heading: 'The 50/30/20 rule',
        body: 'Divide your after-tax income into three buckets: 50% for needs (rent, food, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment.',
        tips: [
          'Start tracking for one month before cutting anything.',
          'Use a free app like YNAB, Mint, or even a simple spreadsheet.',
          'Review your budget every month — life changes, so should your plan.',
        ],
      },
      {
        heading: 'Fixed vs. variable expenses',
        body: 'Fixed expenses (rent, loan payments) stay the same each month. Variable expenses (groceries, fuel) fluctuate. Focus on cutting variable costs first — they\'re easiest to change without disrupting your life.',
      },
      {
        heading: 'The pay-yourself-first method',
        body: 'Before you pay any bill, automatically transfer your savings amount out of your checking account. Treating savings as a non-negotiable expense is the single best habit you can build.',
        tips: [
          'Set up an automatic transfer on payday.',
          'Even $25/week adds up to $1,300 a year.',
          'Keep savings in a separate account so you won\'t spend it.',
        ],
      },
    ],
  },
  {
    id: 'finance-emergency',
    categoryId: 'finance',
    title: 'Emergency Fund 101',
    summary: 'Why you need 3–6 months of expenses saved and exactly how to build it.',
    readingMinutes: 5,
    difficulty: 'beginner',
    tags: ['savings', 'emergency', 'security'],
    content: [
      {
        heading: 'What is an emergency fund?',
        body: 'An emergency fund is money set aside exclusively for unexpected events: job loss, medical bills, car repairs. It\'s not for vacations or sales — it\'s insurance against life\'s surprises.',
      },
      {
        heading: 'How much do you need?',
        body: 'Aim for 3 months of essential expenses if you have a stable job and 6 months if you\'re self-employed or work in a volatile industry. Essential expenses = rent + utilities + food + minimum debt payments.',
        tips: [
          'Calculate your monthly essentials and multiply by 3.',
          'Start with a $1,000 mini-emergency fund as your first milestone.',
          'Keep it in a high-yield savings account earning 4–5% interest.',
        ],
      },
      {
        heading: 'Building it quickly',
        body: 'Sell unused items, pause subscriptions temporarily, and redirect any windfalls (tax refunds, bonuses) directly into the fund. Treat it as a short-term sprint, not a decade-long project.',
      },
    ],
  },
  {
    id: 'finance-debt',
    categoryId: 'finance',
    title: 'Destroy Your Debt',
    summary: 'Avalanche vs. snowball method — which works best and why.',
    readingMinutes: 8,
    difficulty: 'intermediate',
    tags: ['debt', 'credit card', 'loans'],
    content: [
      {
        heading: 'Know what you owe',
        body: 'List every debt: balance, interest rate, and minimum payment. Credit cards often charge 20–30% APR. Student loans might be 5–7%. Knowing the numbers removes the anxiety of the unknown.',
      },
      {
        heading: 'The avalanche method (fastest)',
        body: 'Pay minimums on all debts, then put every extra dollar toward the highest-interest debt. This saves the most money in interest. Best for people who are motivated by math.',
        tips: [
          'Rank debts by interest rate, highest first.',
          'When a debt is paid off, roll that payment into the next.',
          'This is mathematically optimal — it saves the most money.',
        ],
      },
      {
        heading: 'The snowball method (most motivating)',
        body: 'Pay minimums on all debts, then attack the smallest balance first. You get quick wins that build momentum. Best for people who need psychological wins to stay on track.',
        tips: [
          'Rank debts by balance, smallest first.',
          'Celebrate each debt you eliminate.',
          'Research shows this method helps people stay motivated.',
        ],
      },
      {
        heading: 'Negotiating with creditors',
        body: 'If you\'re behind, call your creditors. Ask for a hardship program, lower interest rate, or settlement. Many will work with you — they prefer partial payment over nothing.',
      },
    ],
  },
  {
    id: 'finance-credit',
    categoryId: 'finance',
    title: 'Understanding Credit Scores',
    summary: 'What affects your score, how to read your report, and how to improve it.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['credit', 'score', 'report'],
    content: [
      {
        heading: 'What is a credit score?',
        body: 'A credit score (300–850) is a number that tells lenders how likely you are to repay a debt. Higher is better. Above 700 is good; above 750 is excellent.',
      },
      {
        heading: 'The 5 factors',
        body: 'Payment history (35%) is the biggest factor — pay on time, always. Credit utilization (30%) means keep balances below 30% of your limit. Length of history (15%), credit mix (10%), and new inquiries (10%) make up the rest.',
        tips: [
          'Set up autopay for at least the minimum payment.',
          'Never close your oldest credit card.',
          'Check your free report at annualcreditreport.com.',
        ],
      },
      {
        heading: 'Improving your score',
        body: 'Pay down credit card balances, dispute any errors on your report, and avoid applying for new credit unnecessarily. Scores can improve 50–100 points within six months of consistent good behavior.',
      },
    ],
  },
  {
    id: 'finance-investing',
    categoryId: 'finance',
    title: 'Investing for Beginners',
    summary: 'Index funds, compound interest, and why starting early beats everything else.',
    readingMinutes: 9,
    difficulty: 'intermediate',
    tags: ['investing', 'stocks', 'retirement', 'compound interest'],
    content: [
      {
        heading: 'Compound interest — the 8th wonder',
        body: '$100/month invested at 7% average return for 40 years becomes over $260,000. For 30 years, it\'s $121,000. Starting 10 years earlier more than doubles your result. Time is your greatest asset.',
      },
      {
        heading: 'Index funds vs. picking stocks',
        body: 'Over 20 years, 90%+ of actively managed funds underperform a simple S&P 500 index fund. Index funds hold hundreds of companies, charge tiny fees (0.03%), and require no expertise. They\'re the default answer for most people.',
        tips: [
          'Start with a Total Market Index Fund (e.g., VTSAX, FZROX).',
          'Use a Roth IRA or 401k for tax advantages.',
          'Never try to time the market — time IN the market beats timing.',
        ],
      },
      {
        heading: 'The investing order of operations',
        body: '1) Get any employer 401k match (free money). 2) Pay off high-interest debt (>7%). 3) Max out Roth IRA ($7,000/year in 2024). 4) Max out 401k. 5) Invest in a taxable brokerage account.',
      },
      {
        heading: 'When markets crash',
        body: 'Markets have crashed dozens of times and recovered every single time. A crash is a sale — a chance to buy more shares at discount. The worst thing you can do is sell in a panic. Keep investing consistently.',
      },
    ],
  },
  {
    id: 'finance-taxes',
    categoryId: 'finance',
    title: 'Taxes: What You Actually Need to Know',
    summary: 'How income tax works, deductions, and free filing options.',
    readingMinutes: 7,
    difficulty: 'intermediate',
    tags: ['taxes', 'IRS', 'deductions', 'refund'],
    content: [
      {
        heading: 'How income tax brackets work',
        body: 'Tax brackets are marginal — if you\'re in the 22% bracket, you don\'t pay 22% on all income. You pay 10% on the first $11k, 12% on the next chunk, and 22% only on income above the threshold. Your effective rate is lower than your bracket.',
      },
      {
        heading: 'Standard vs. itemized deductions',
        body: 'The standard deduction ($14,600 single / $29,200 married in 2024) reduces taxable income. Most people take it. Itemizing makes sense if your deductible expenses (mortgage interest, charity, state taxes) exceed the standard amount.',
        tips: [
          'Track charitable donations — they\'re deductible.',
          'Contribute to a 401k or IRA to reduce taxable income.',
          'File free using IRS Free File if income is under $79,000.',
        ],
      },
      {
        heading: 'Why getting a big refund isn\'t great',
        body: 'A large tax refund means you overpaid the government throughout the year — essentially giving them an interest-free loan. Adjust your W-4 withholding to keep more money each paycheck.',
      },
    ],
  },

  // ── HEALTH ─────────────────────────────────────────────
  {
    id: 'health-nutrition',
    categoryId: 'health',
    title: 'Nutrition Without the BS',
    summary: 'What to eat, what to avoid, and how to build sustainable habits.',
    readingMinutes: 8,
    difficulty: 'beginner',
    tags: ['nutrition', 'diet', 'food'],
    content: [
      {
        heading: 'The basics that actually matter',
        body: 'Eat mostly whole foods: vegetables, fruits, lean proteins, legumes, and whole grains. Minimize ultra-processed foods, added sugars, and excessive alcohol. That\'s 80% of good nutrition.',
        tips: [
          'Aim for 5 servings of vegetables/fruit daily.',
          'Protein at every meal keeps you full longer.',
          'Drink water before meals to reduce calorie intake.',
        ],
      },
      {
        heading: 'Reading nutrition labels',
        body: 'Check serving size first — packages often contain 2–3 servings. Look at added sugars (aim for <25g/day), sodium (<2,300mg/day), and the ingredient list. The shorter the list, the better.',
      },
      {
        heading: 'Protein: the most important macro',
        body: 'Protein (chicken, eggs, fish, beans, tofu) builds muscle, keeps you full, and stabilizes blood sugar. Aim for 0.7–1g of protein per pound of body weight if active.',
      },
      {
        heading: 'Sustainable eating vs. diets',
        body: 'Fad diets work short-term but fail long-term 95% of the time. The best "diet" is the one you can maintain for life. Small consistent changes beat drastic temporary restrictions.',
      },
    ],
  },
  {
    id: 'health-exercise',
    categoryId: 'health',
    title: 'Exercise for Real People',
    summary: 'How much you need, what type works best, and how to actually stick to it.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['exercise', 'fitness', 'habits'],
    content: [
      {
        heading: 'The minimum effective dose',
        body: 'WHO recommends 150 minutes of moderate activity per week (brisk walking counts!) plus 2 strength sessions. That\'s 30 minutes, 5 days a week. Less than this offers dramatically less benefit.',
        tips: [
          'Walking is underrated — 30 min/day reduces mortality by 35%.',
          'Strength training 2x/week preserves muscle and bone density.',
          'Consistency beats intensity every time.',
        ],
      },
      {
        heading: 'Why strength training matters for everyone',
        body: 'After 30, you lose 3–8% of muscle mass per decade without resistance training. Muscle mass affects your metabolism, posture, injury prevention, and quality of life in old age.',
      },
      {
        heading: 'How to actually stick to it',
        body: 'Schedule workouts like appointments. Start with less than you think you need — 10 minutes beats 0. Find something you don\'t hate (dance, hiking, sports all count). Habit stacking (workout after coffee) makes it automatic.',
      },
    ],
  },
  {
    id: 'health-sleep',
    categoryId: 'health',
    title: 'Sleep: The Master Habit',
    summary: 'How sleep affects everything and how to dramatically improve yours.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['sleep', 'recovery', 'mental health'],
    content: [
      {
        heading: 'What sleep deprivation actually does',
        body: 'Sleeping under 7 hours regularly is linked to 200%+ higher risk of heart disease, impaired immune function, weight gain, memory problems, and shortened life expectancy. It\'s not a productivity hack — it\'s self-harm.',
      },
      {
        heading: 'Sleep hygiene basics',
        body: 'Wake up at the same time every day (including weekends). Keep your bedroom cool, dark, and quiet. Avoid screens 30 min before bed. Don\'t drink caffeine after 2pm.',
        tips: [
          'Consistent wake time is more important than bedtime.',
          'Blackout curtains are a cheap game-changer.',
          'Magnesium glycinate supplement can help — evidence is moderate.',
        ],
      },
      {
        heading: 'Alcohol and sleep quality',
        body: 'Alcohol helps you fall asleep but destroys sleep quality — it suppresses REM sleep and causes fragmented rest. Even one drink measurably degrades sleep. This surprises most people.',
      },
    ],
  },
  {
    id: 'health-mental',
    categoryId: 'health',
    title: 'Mental Health Fundamentals',
    summary: 'Recognizing stress, anxiety, and depression — and what actually helps.',
    readingMinutes: 8,
    difficulty: 'beginner',
    tags: ['mental health', 'anxiety', 'stress', 'therapy'],
    content: [
      {
        heading: 'The basics of stress vs. anxiety',
        body: 'Stress is a response to an external cause and goes away when the situation resolves. Anxiety persists even without a clear cause and can become chronic. Both are treatable.',
      },
      {
        heading: 'Evidence-based coping strategies',
        body: 'Exercise is one of the most effective treatments for mild-to-moderate depression. Journaling reduces rumination. Deep breathing (4 counts in, hold 4, out 6) activates the parasympathetic nervous system within minutes.',
        tips: [
          '5 minutes of daily journaling significantly reduces anxiety.',
          'Even a 20-min walk has measurable mood benefits.',
          'Social connection is the strongest predictor of wellbeing.',
        ],
      },
      {
        heading: 'When to seek professional help',
        body: 'If symptoms persist over two weeks, interfere with work or relationships, or involve thoughts of self-harm — see a professional. Therapy (especially CBT) has strong evidence. Medication helps many people too. Asking for help is strength.',
      },
    ],
  },
  {
    id: 'health-firstaid',
    categoryId: 'health',
    title: 'Basic First Aid Everyone Should Know',
    summary: 'CPR, choking, bleeding, burns and when to call emergency services.',
    readingMinutes: 10,
    difficulty: 'beginner',
    tags: ['first aid', 'CPR', 'emergency'],
    content: [
      {
        heading: 'CPR basics',
        body: 'If someone is unresponsive and not breathing normally: call 911, then give hard, fast chest compressions (100–120/min) in the center of the chest. Push down 2–2.4 inches. Don\'t stop until help arrives.',
        tips: [
          'Compression-only CPR (no rescue breaths) is effective for adults.',
          'The beat of "Stayin\' Alive" is the right compression tempo.',
          'Take a certified CPR course every 2 years.',
        ],
      },
      {
        heading: 'Choking (Heimlich maneuver)',
        body: 'If someone can\'t cough, speak, or breathe: stand behind them, make a fist above their navel, cover with your other hand, and give sharp upward thrusts until the object is expelled or they lose consciousness.',
      },
      {
        heading: 'Severe bleeding',
        body: 'Apply firm, direct pressure with a clean cloth. Don\'t remove the cloth — add more on top. Elevate the limb if possible. Maintain pressure for at least 10 minutes without peeking.',
      },
      {
        heading: 'Burns',
        body: 'Cool the burn with cool (not cold) running water for 20 minutes. Don\'t use ice, butter, or toothpaste. Cover loosely with cling film. Seek help for burns larger than your palm or any burn on the face/hands/genitals.',
      },
    ],
  },

  // ── COOKING ────────────────────────────────────────────
  {
    id: 'cooking-basics',
    categoryId: 'cooking',
    title: 'Kitchen Skills 101',
    summary: 'Knife skills, heat control, and the 5 cooking methods every adult should know.',
    readingMinutes: 8,
    difficulty: 'beginner',
    tags: ['cooking', 'knife skills', 'basics'],
    content: [
      {
        heading: 'Knife safety and technique',
        body: 'A sharp knife is safer than a dull one — it requires less pressure and is less likely to slip. Use a "claw" grip: curl fingertips under, knuckles guide the blade. Never cut toward your body.',
        tips: [
          'Sharpen or hone your knife before every use.',
          'A chef\'s knife handles 90% of kitchen tasks.',
          'Cut on a stable board — dampen a towel underneath to stop it sliding.',
        ],
      },
      {
        heading: 'Understanding heat levels',
        body: 'Low heat cooks slowly without burning (eggs, sauces). Medium heat is for most sautéing. High heat sears proteins and caramelizes vegetables quickly. The biggest beginner mistake is cooking on too-low heat — food steams instead of browns.',
      },
      {
        heading: 'The 5 essential methods',
        body: 'Sauté (pan + fat + high heat), roast (oven + dry heat), boil/simmer (water or broth), steam (above boiling water), and bake. Mastering these covers virtually every recipe you\'ll encounter.',
      },
      {
        heading: 'Seasoning properly',
        body: 'Salt and pepper are 80% of seasoning. Season in layers — add some at each stage, not all at the end. Taste constantly. Acid (lemon juice, vinegar) brightens any dish that tastes flat.',
      },
    ],
  },
  {
    id: 'cooking-mealprep',
    categoryId: 'cooking',
    title: 'Meal Prep: Eat Well, Save Money',
    summary: 'How to cook once and eat healthy all week without getting bored.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['meal prep', 'budget', 'time saving'],
    content: [
      {
        heading: 'The Sunday strategy',
        body: 'Dedicate 1–2 hours once a week to batch cooking. Roast a tray of vegetables, cook a large grain (rice, quinoa), and prepare a protein (chicken, beans). Mix and match these into 5 different meals.',
        tips: [
          'A rice cooker is worth every penny.',
          'Sheet-pan meals: protein + veg + oil + seasoning at 400°F for 25 min.',
          'Freeze half to avoid meal fatigue.',
        ],
      },
      {
        heading: 'Budget grocery shopping',
        body: 'Eggs, canned beans, rice, oats, frozen vegetables, and seasonal produce are nutritious and cheap. Meat is the most expensive category — reduce it by one meal per week and save $30–50/month.',
      },
      {
        heading: 'Storage that works',
        body: 'Glass containers last longer and don\'t absorb odors. Label everything with a date. Cooked food stays safe in the fridge for 4 days, frozen for 3 months. When in doubt, throw it out.',
      },
    ],
  },
  {
    id: 'cooking-pantry',
    categoryId: 'cooking',
    title: 'The Essential Pantry',
    summary: '20 ingredients that let you cook almost anything at any time.',
    readingMinutes: 5,
    difficulty: 'beginner',
    tags: ['pantry', 'ingredients', 'shopping'],
    content: [
      {
        heading: 'Dry goods',
        body: 'Rice, pasta, oats, lentils, canned tomatoes, canned beans (chickpeas, black beans, kidney beans), and vegetable/chicken broth. These form the backbone of hundreds of meals.',
        tips: [
          'Buy dried beans in bulk — they\'re 5x cheaper than canned.',
          'Whole grains keep for a year in sealed containers.',
          'Coconut milk is incredibly versatile for sauces and curries.',
        ],
      },
      {
        heading: 'Flavor builders',
        body: 'Olive oil, soy sauce, hot sauce, Dijon mustard, honey, apple cider vinegar, and garlic. These transform simple ingredients into complex dishes.',
      },
      {
        heading: 'The spice basics',
        body: 'Salt, black pepper, garlic powder, cumin, paprika, chili flakes, oregano, and turmeric cover 90% of world cuisines. Buy whole spices when possible — they last years and taste better.',
      },
    ],
  },
  {
    id: 'cooking-food-safety',
    categoryId: 'cooking',
    title: 'Food Safety Essentials',
    summary: 'Prevent food poisoning with these simple but critical rules.',
    readingMinutes: 5,
    difficulty: 'beginner',
    tags: ['food safety', 'hygiene', 'storage'],
    content: [
      {
        heading: 'The temperature danger zone',
        body: 'Bacteria multiply rapidly between 40°F (4°C) and 140°F (60°C). Keep cold food cold and hot food hot. Don\'t leave cooked food at room temperature for more than 2 hours (1 hour above 90°F).',
        tips: [
          'Use a food thermometer — internal temp of chicken must reach 165°F.',
          'Thaw meat in the fridge, not on the counter.',
          'When in doubt, throw it out.',
        ],
      },
      {
        heading: 'Cross-contamination',
        body: 'Raw meat juices can contaminate other foods. Use separate cutting boards for meat and vegetables. Wash hands for 20 seconds with soap after handling raw poultry, eggs, or unwashed produce.',
      },
    ],
  },
  {
    id: 'cooking-5-recipes',
    categoryId: 'cooking',
    title: '5 Recipes Every Adult Should Know',
    summary: 'Simple, nutritious meals you can cook in under 30 minutes.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['recipes', 'easy', 'quick'],
    content: [
      {
        heading: 'Scrambled eggs (5 min)',
        body: 'Whisk 2–3 eggs with a splash of milk. Low heat, butter in pan. Add eggs and stir gently and constantly until just set. Remove from heat while slightly underdone — residual heat finishes them. Season and serve.',
      },
      {
        heading: 'One-pot pasta (20 min)',
        body: 'Add pasta, canned tomatoes, garlic, olive oil, salt, and just enough water to cover in one pot. Boil until pasta is done and sauce is thick. Top with Parmesan.',
        tips: ['Add spinach at the end.', 'Any pasta shape works.'],
      },
      {
        heading: 'Sheet-pan chicken & veg (30 min)',
        body: 'Toss chicken thighs and any vegetables in olive oil, salt, pepper, garlic powder, and paprika. Roast at 400°F/200°C for 25–30 minutes until chicken reaches 165°F internal temp.',
      },
      {
        heading: 'Rice and beans (25 min)',
        body: 'Sauté onion and garlic, add canned beans with their liquid, cumin, salt. Simmer 10 min. Serve over rice with hot sauce. This is complete protein, fiber, and costs under $2/serving.',
      },
      {
        heading: 'Overnight oats (2 min prep)',
        body: 'Mix oats + milk + chia seeds in a jar. Add sweetener and fruit. Refrigerate overnight. Ready to eat cold in the morning — no cooking required.',
      },
    ],
  },

  // ── LEGAL ───────────────────────────────────────────────
  {
    id: 'legal-rights',
    categoryId: 'legal',
    title: 'Know Your Basic Rights',
    summary: 'What police can and cannot do, your right to remain silent, and how to protect yourself.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['rights', 'police', 'constitution'],
    content: [
      {
        heading: 'Your right to remain silent',
        body: 'You have the right not to answer questions from police. Say clearly: "I am invoking my right to remain silent." Anything you say can be used against you — even innocent-sounding statements can hurt you.',
        tips: [
          'Always ask: "Am I free to go?"',
          'If detained, say: "I want a lawyer."',
          'Be calm and respectful — this isn\'t about being combative.',
        ],
      },
      {
        heading: 'Search and seizure',
        body: 'Police generally need a warrant to search your home. For your car, they need probable cause. You can say "I do not consent to a search" — clearly and calmly. This doesn\'t stop them but protects your legal rights later.',
      },
      {
        heading: 'Tenant rights',
        body: 'Landlords must give notice (usually 24–48 hours) before entering. They must maintain habitable conditions (heat, water, no pest infestations). Security deposits have rules — get everything in writing.',
      },
    ],
  },
  {
    id: 'legal-contracts',
    categoryId: 'legal',
    title: 'Contracts: Before You Sign',
    summary: 'What to look for in any contract — leases, employment agreements, and more.',
    readingMinutes: 6,
    difficulty: 'intermediate',
    tags: ['contracts', 'legal', 'signing'],
    content: [
      {
        heading: 'Always read before you sign',
        body: 'A signature is legally binding regardless of whether you read it. "Standard" doesn\'t mean unchangeable. Take time to review. If you don\'t understand something, ask or get legal help.',
        tips: [
          'Look for automatic renewal clauses.',
          'Check arbitration clauses — they limit your right to sue.',
          'Note termination conditions and any penalties.',
        ],
      },
      {
        heading: 'Key clauses to watch',
        body: 'Indemnification (you agree to cover someone else\'s losses), limitation of liability (they cap what they owe you), non-compete (can\'t work for competitors), and governing law (which state\'s laws apply in disputes).',
      },
      {
        heading: 'Getting free legal help',
        body: 'Legal aid societies offer free help for low-income individuals. Many bar associations have lawyer referral services. Law school clinics provide free advice. LegalZoom and similar services handle simple documents affordably.',
      },
    ],
  },
  {
    id: 'legal-consumer',
    categoryId: 'legal',
    title: 'Consumer Protection Basics',
    summary: 'Chargebacks, refunds, scam recovery and how to fight for your money.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['consumer rights', 'scams', 'refunds'],
    content: [
      {
        heading: 'Credit card chargebacks',
        body: 'If a merchant won\'t refund a fraudulent or undelivered charge, call your credit card company and dispute it. They can reverse the charge — this is called a chargeback. Use it for genuine disputes, not buyer\'s remorse.',
        tips: [
          'Keep receipts and screenshots as evidence.',
          'Dispute within 60 days of the charge.',
          'Credit cards offer more protection than debit cards.',
        ],
      },
      {
        heading: 'Filing complaints',
        body: 'The Consumer Financial Protection Bureau (CFPB) handles financial complaints. The FTC handles general consumer fraud. Your state Attorney General handles local issues. These complaints create records and sometimes lead to refunds.',
      },
    ],
  },
  {
    id: 'legal-estate',
    categoryId: 'legal',
    title: 'Basic Estate Planning',
    summary: 'Why everyone needs a will, what happens without one, and how to get started.',
    readingMinutes: 7,
    difficulty: 'intermediate',
    tags: ['estate', 'will', 'beneficiary'],
    content: [
      {
        heading: 'What happens if you die without a will',
        body: 'The state decides who gets your assets — often not who you\'d choose. Your family may face long, expensive court processes. Minor children\'s guardianship could be contested. A will prevents all of this.',
      },
      {
        heading: 'What a basic will includes',
        body: 'Who gets your assets (beneficiaries), who manages your estate (executor), and if you have children — who becomes their guardian. It doesn\'t have to be complex.',
        tips: [
          'Online services like Trust & Will cost $100–200 for a basic will.',
          'Update beneficiary designations on retirement accounts — these override your will.',
          'Store your will somewhere your executor can find it.',
        ],
      },
      {
        heading: 'Power of attorney and healthcare directives',
        body: 'A healthcare directive (living will) tells doctors what care you want if incapacitated. A power of attorney designates someone to make financial decisions for you. Both are critical for adults of all ages.',
      },
    ],
  },

  // ── RELATIONSHIPS ───────────────────────────────────────
  {
    id: 'rel-communication',
    categoryId: 'relationships',
    title: 'Communication That Actually Works',
    summary: 'Active listening, conflict resolution and how to say hard things well.',
    readingMinutes: 8,
    difficulty: 'beginner',
    tags: ['communication', 'listening', 'conflict'],
    content: [
      {
        heading: 'Active listening',
        body: 'Listening isn\'t waiting for your turn to speak. Put away your phone. Make eye contact. Don\'t interrupt. Reflect back what you heard: "So what I\'m hearing is..." This alone resolves most conflicts.',
        tips: [
          'Ask clarifying questions before responding.',
          'Avoid "you always" and "you never" — they trigger defensiveness.',
          'Silence is okay — don\'t rush to fill it.',
        ],
      },
      {
        heading: 'I-statements',
        body: 'Instead of "You never listen," try "I feel unheard when we\'re talking and you\'re on your phone." I-statements describe your experience without blaming, which keeps conversations from becoming defensive.',
      },
      {
        heading: 'The repair attempt',
        body: 'In conflict, a "repair attempt" is any gesture that de-escalates tension — a joke, a touch, an apology, "let\'s take a break." Couples who make and accept repair attempts have dramatically more stable relationships.',
      },
    ],
  },
  {
    id: 'rel-boundaries',
    categoryId: 'relationships',
    title: 'Boundaries: The Foundation of Healthy Relationships',
    summary: 'What boundaries are, why they\'re not selfish, and how to set them clearly.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['boundaries', 'self-respect', 'relationships'],
    content: [
      {
        heading: 'What a boundary actually is',
        body: 'A boundary is a limit you set to protect your wellbeing — your time, energy, values, and body. Boundaries aren\'t punishments or ultimatums. They\'re honest communication about what you need.',
      },
      {
        heading: 'How to set one',
        body: 'Be clear and specific: "I\'m not available after 9pm for work calls." Don\'t over-explain or apologize. Enforce it — a boundary you don\'t enforce trains people to ignore it.',
        tips: [
          'You don\'t need permission to have a boundary.',
          'Expect pushback from people used to having no limits.',
          'Start small — practice on low-stakes situations.',
        ],
      },
      {
        heading: 'Recognizing when yours are being crossed',
        body: 'Signs include feeling resentful, anxious, exhausted, or used after interactions. These feelings are data. Ask: "What limit would prevent this feeling?" That\'s your boundary.',
      },
    ],
  },
  {
    id: 'rel-toxic',
    categoryId: 'relationships',
    title: 'Recognizing Toxic Relationships',
    summary: 'Red flags, manipulation tactics, and how to safely exit unhealthy dynamics.',
    readingMinutes: 8,
    difficulty: 'intermediate',
    tags: ['toxic', 'manipulation', 'red flags'],
    content: [
      {
        heading: 'Red flags to watch for',
        body: 'Consistent disrespect, controlling behavior (monitoring your location, controlling finances, isolating you from friends), gaslighting (making you question your own perception), and love-bombing followed by devaluation.',
      },
      {
        heading: 'The cycle of abuse',
        body: 'Tension builds → incident (abuse) → reconciliation ("honeymoon phase") → calm → repeat. The cycle explains why people stay — the good periods feel real. But the pattern always continues.',
        tips: [
          'Trust the pattern, not the apology.',
          'Talk to someone outside the relationship — isolation is a tactic.',
          'National DV Hotline: 1-800-799-7233',
        ],
      },
      {
        heading: 'Leaving safely',
        body: 'If you\'re planning to leave a controlling relationship: don\'t announce it in advance, have a safety plan, save documents and money separately, and reach out to a domestic violence resource for guidance.',
      },
    ],
  },
  {
    id: 'rel-friendship',
    categoryId: 'relationships',
    title: 'Building and Keeping Real Friendships',
    summary: 'Why adult friendships fade and how to actively maintain them.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['friendship', 'social', 'connection'],
    content: [
      {
        heading: 'Why friendships fade',
        body: 'After school, friendships require intentional effort. Proximity and repeated unplanned interaction — what builds friendships naturally in school — disappears. You have to deliberately create contact.',
      },
      {
        heading: 'The "reach out first" habit',
        body: 'Most people wait to be contacted. Be the one who reaches out — a text saying "thinking of you" or "saw this and thought of you" maintains bonds with almost no effort. People remember who shows up.',
        tips: [
          'Schedule regular catch-ups — treat them like appointments.',
          'Shared activities (classes, sports) create natural connection.',
          'Vulnerability deepens friendship faster than anything else.',
        ],
      },
    ],
  },

  // ── CAREER ──────────────────────────────────────────────
  {
    id: 'career-resume',
    categoryId: 'career',
    title: 'Write a Resume That Gets Interviews',
    summary: 'What hiring managers actually look for and how to make yours stand out.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['resume', 'job search', 'hiring'],
    content: [
      {
        heading: 'The 6-second rule',
        body: 'Hiring managers spend an average of 6 seconds on a first scan. Your name, current role, company, dates, and 1–2 bullet points get that attention. Make those 6 seconds count.',
      },
      {
        heading: 'Achievement bullets, not duty lists',
        body: 'Don\'t write what you were supposed to do — write what you achieved. "Managed social media" → "Grew Instagram from 2k to 18k followers in 8 months, driving 30% of web traffic." Quantify everything possible.',
        tips: [
          'Use numbers: %, $, time saved, people managed.',
          'Start each bullet with an action verb: Built, Led, Increased, Reduced.',
          'Tailor your resume to each job description — match their keywords.',
        ],
      },
      {
        heading: 'The ATS problem',
        body: 'Most large companies use Applicant Tracking Systems that scan for keywords before a human sees your resume. Mirror the exact language from the job posting. A plain Word/PDF format beats fancy templates for ATS.',
      },
    ],
  },
  {
    id: 'career-negotiation',
    categoryId: 'career',
    title: 'Negotiate Your Salary (And Win)',
    summary: 'Most people never negotiate — here\'s how to do it confidently and effectively.',
    readingMinutes: 7,
    difficulty: 'intermediate',
    tags: ['negotiation', 'salary', 'money'],
    content: [
      {
        heading: 'Why you must negotiate',
        body: 'Employers expect negotiation and rarely rescind offers over it. The person who negotiates a $5,000 higher starting salary, assuming 3% annual raises, will earn $150,000+ more over a 30-year career.',
      },
      {
        heading: 'The script',
        body: 'When given an offer: "Thank you — I\'m very excited about this role. Based on my research and experience, I was expecting something closer to [X]. Is there flexibility there?" Then stop talking. Silence is powerful.',
        tips: [
          'Research salary ranges on Glassdoor, Levels.fyi, LinkedIn.',
          'Ask for 10–20% above your target — expect to meet in the middle.',
          'If they can\'t move on salary, negotiate sign-on bonus, remote days, or PTO.',
        ],
      },
      {
        heading: 'The counteroffer trap',
        body: 'If you accept a counteroffer to stay when leaving, statistics show 80% of those who accept counteroffers leave within 12 months anyway — often involuntarily. The underlying issues rarely change.',
      },
    ],
  },
  {
    id: 'career-networking',
    categoryId: 'career',
    title: 'Networking Without Being Weird About It',
    summary: 'How to build a professional network authentically — even if you hate networking.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['networking', 'career', 'LinkedIn'],
    content: [
      {
        heading: 'The mindset shift',
        body: '"Networking" sounds transactional. Replace it with: building genuine relationships with people you find interesting. Be curious about their work. Offer help before asking for anything.',
        tips: [
          'The best time to network is before you need anything.',
          'One coffee conversation can change your career trajectory.',
          'Follow up within 24 hours of meeting someone.',
        ],
      },
      {
        heading: 'LinkedIn that actually works',
        body: 'Post about things you\'re genuinely learning or working on. Comment thoughtfully on others\' posts. Send connection requests with a personal note. A complete LinkedIn profile gets 21x more views.',
      },
    ],
  },
  {
    id: 'career-interview',
    categoryId: 'career',
    title: 'Ace Any Job Interview',
    summary: 'The STAR method, research strategy, and questions that actually impress.',
    readingMinutes: 8,
    difficulty: 'beginner',
    tags: ['interview', 'STAR', 'job'],
    content: [
      {
        heading: 'Research first',
        body: 'Know the company\'s mission, recent news, products, and competitors. Read the job description line by line and prepare examples for each requirement. Interviewers can immediately tell who prepared.',
      },
      {
        heading: 'The STAR method',
        body: 'For behavioral questions ("Tell me about a time..."), use: Situation (context), Task (your role), Action (what YOU did), Result (quantified outcome). Practice 5–6 versatile stories covering challenge, leadership, failure, teamwork.',
        tips: [
          'Prepare 3 questions to ask — shows genuine interest.',
          'Research the interviewer on LinkedIn beforehand.',
          'Send a thank-you email within 2 hours of the interview.',
        ],
      },
      {
        heading: 'Common questions decoded',
        body: '"Tell me about yourself" = 90-second career narrative leading to why you want this role. "Weakness" = a real weakness you\'re actively improving. "Why this company" = specific, researched reason — not "great culture."',
      },
    ],
  },
  {
    id: 'career-raise',
    categoryId: 'career',
    title: 'How to Get a Raise',
    summary: 'Build your case, pick the right moment, and have the conversation.',
    readingMinutes: 6,
    difficulty: 'intermediate',
    tags: ['raise', 'promotion', 'salary'],
    content: [
      {
        heading: 'Build your case with receipts',
        body: 'Keep a running "brag document" — every win, project, positive feedback, and impact. When asking for a raise, you\'re making a business case, not an emotional plea. Quantify your contributions.',
        tips: [
          'Research market rate — know what others in your role earn.',
          'Ask after a visible win, not after a failure or stressful period.',
          'Bring data: revenue generated, costs reduced, problems solved.',
        ],
      },
      {
        heading: 'The conversation',
        body: '"I\'d like to discuss my compensation. Based on my contributions over the past year [cite examples] and market data showing the range for this role is [X], I\'d like to discuss moving to [specific number]."',
      },
    ],
  },

  // ── HOME ────────────────────────────────────────────────
  {
    id: 'home-renting',
    categoryId: 'home',
    title: 'Renting Smart: Protect Yourself',
    summary: 'Lease red flags, security deposits, and what your landlord owes you.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['renting', 'lease', 'tenant'],
    content: [
      {
        heading: 'Before you sign a lease',
        body: 'Read the entire lease. Check: lease term, rent increase conditions, early termination penalties, what utilities you pay, pet policy, subletting rules, and renewal terms. Ask to change anything unfair — many landlords will negotiate.',
        tips: [
          'Document every existing damage with photos/video on move-in day.',
          'Email (not text) your landlord so you have written records.',
          'Get any verbal agreements added to the lease in writing.',
        ],
      },
      {
        heading: 'Security deposits',
        body: 'Most states cap deposits at 1–2 months\' rent and require return within 14–30 days after move-out. Landlords can only deduct for damage beyond normal wear and tear. If they wrongfully keep it, you may be owed 2–3x the amount.',
      },
      {
        heading: 'Habitability standards',
        body: 'Landlords must provide heat, hot water, working locks, no pest infestations, and safe electrical/plumbing. If they refuse to make essential repairs after written notice, you may be able to withhold rent (check your state\'s laws).',
      },
    ],
  },
  {
    id: 'home-maintenance',
    categoryId: 'home',
    title: 'Home Maintenance Basics',
    summary: 'What to check, what to fix yourself, and when to call a professional.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['maintenance', 'DIY', 'home'],
    content: [
      {
        heading: 'Monthly checks',
        body: 'Test smoke and CO detectors (press test button). Check for leaks under sinks. Keep drains clear with a monthly baking soda + vinegar flush. Clean dryer lint trap after every load — it\'s a fire hazard.',
        tips: [
          'Change HVAC/furnace filters every 1–3 months.',
          'Know where your main water shutoff is — crucial in an emergency.',
          'A basic toolkit: hammer, screwdrivers, pliers, tape measure, level.',
        ],
      },
      {
        heading: 'Easy DIY fixes',
        body: 'Unclog a drain with a plunger or drain snake. Fix a running toilet by replacing the flapper ($5 part, 10 minutes). Patch small drywall holes with spackling compound. These save $100–300 in service calls.',
      },
      {
        heading: 'When to call a professional',
        body: 'Anything involving electricity in the walls, gas lines, structural issues, or major plumbing. DIY electrical mistakes cause house fires. The cost of a professional is always less than the cost of fixing a mistake.',
      },
    ],
  },
  {
    id: 'home-cleaning',
    categoryId: 'home',
    title: 'Clean Your Home Efficiently',
    summary: 'A system that keeps your home clean in 30 minutes a week.',
    readingMinutes: 5,
    difficulty: 'beginner',
    tags: ['cleaning', 'organization', 'habits'],
    content: [
      {
        heading: 'Daily habits (10 min)',
        body: 'Make your bed (sets the tone for the day). Wipe kitchen counters after cooking. Do dishes before sleeping. Put things back where they belong immediately. These 5 minutes of habit prevent hours of cleanup.',
      },
      {
        heading: 'The weekly clean (30 min)',
        body: 'Vacuum all floors, wipe bathrooms (toilet, sink, mirror), mop kitchen floor, clean stovetop. Do laundry. If you do this consistently, you never face a multi-hour cleaning emergency.',
        tips: [
          'Clean top-to-bottom, left-to-right — dust falls down.',
          'A squeegee after showers prevents most bathroom mold.',
          'Declutter before you clean — you can\'t clean around chaos.',
        ],
      },
    ],
  },
  {
    id: 'home-buying',
    categoryId: 'home',
    title: 'Buying a Home: What School Didn\'t Teach You',
    summary: 'Down payments, mortgages, hidden costs and the process explained simply.',
    readingMinutes: 9,
    difficulty: 'advanced',
    tags: ['mortgage', 'buying', 'real estate'],
    content: [
      {
        heading: 'The real costs of buying',
        body: 'Beyond the down payment (3–20%), budget for closing costs (2–5% of price), home inspection ($300–500), moving costs, and immediate repairs. A $300k home might cost $330k out of pocket to buy.',
      },
      {
        heading: 'How mortgages work',
        body: 'A mortgage is a loan secured by the property. Your monthly payment includes principal (reduces balance), interest (cost of borrowing), property taxes, and insurance (PITI). Early payments are mostly interest — you build equity slowly at first.',
        tips: [
          'Get pre-approved before house hunting — shows sellers you\'re serious.',
          'Compare rates from 3+ lenders — a 0.5% rate difference saves tens of thousands.',
          'Don\'t buy the maximum you\'re approved for — leave buffer.',
        ],
      },
      {
        heading: 'Renting vs. buying',
        body: 'Buying isn\'t always better. The "break-even point" (when buying beats renting) is typically 5–7 years. If you might move sooner, renting is often the smarter financial choice.',
      },
    ],
  },

  // ── DIGITAL SAFETY ──────────────────────────────────────
  {
    id: 'digital-passwords',
    categoryId: 'digital',
    title: 'Passwords and Account Security',
    summary: 'Why your current passwords are probably dangerous and how to fix it in an hour.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['passwords', 'security', 'accounts'],
    content: [
      {
        heading: 'The problem with most passwords',
        body: 'Reusing passwords is catastrophic — when one site is hacked, attackers try that password everywhere. "123456" is the most common password in the world. Using your dog\'s name + birth year is almost as bad.',
      },
      {
        heading: 'Password managers: the solution',
        body: 'A password manager (Bitwarden is free, 1Password is excellent) generates and stores unique 20-character random passwords for every site. You only remember one master password. This single change eliminates 90% of account security risk.',
        tips: [
          'Bitwarden is free, open-source, and excellent.',
          'Set up the browser extension — it takes 5 minutes.',
          'Use a long passphrase as your master password: "correct-horse-battery-staple".',
        ],
      },
      {
        heading: 'Two-factor authentication (2FA)',
        body: 'Enable 2FA on your email, bank, and any important account. An authenticator app (like Authy) is better than SMS. Even if someone steals your password, they can\'t log in without your phone.',
      },
    ],
  },
  {
    id: 'digital-scams',
    categoryId: 'digital',
    title: 'Scam Recognition & Prevention',
    summary: 'How the most common scams work and how to never fall for them.',
    readingMinutes: 7,
    difficulty: 'beginner',
    tags: ['scams', 'phishing', 'fraud'],
    content: [
      {
        heading: 'The anatomy of a scam',
        body: 'Almost every scam creates urgency ("Act now!"), fear ("Your account will be suspended"), or excitement ("You won!"). Slow down. Legitimate organizations never demand immediate action or payment via gift card or wire transfer.',
      },
      {
        heading: 'Phishing emails',
        body: 'Hover over links before clicking — the actual URL often reveals the fake. Check the sender\'s email address carefully (amazon.com vs. amazon-support.net). When in doubt, go directly to the website instead of clicking the link.',
        tips: [
          'Your bank will never email you asking for your password.',
          'The IRS contacts you by mail first — never email or phone.',
          'If grandma calls saying she\'s in trouble and needs wire money: call grandma back on her real number.',
        ],
      },
      {
        heading: 'If you\'ve been scammed',
        body: 'Report to the FTC at ReportFraud.ftc.gov. Contact your bank immediately if money was transferred. Change passwords for any compromised accounts. Place a fraud alert with the credit bureaus. You\'re not alone — billions are lost to scams annually.',
      },
    ],
  },
  {
    id: 'digital-privacy',
    categoryId: 'digital',
    title: 'Online Privacy Basics',
    summary: 'What data is collected about you, why it matters, and simple steps to protect it.',
    readingMinutes: 7,
    difficulty: 'intermediate',
    tags: ['privacy', 'data', 'tracking'],
    content: [
      {
        heading: 'What\'s collected about you',
        body: 'Every search, click, location, purchase, and social interaction is collected and sold. Your data profile — used to target ads, set insurance rates, and influence behavior — is sold to thousands of brokers.',
      },
      {
        heading: 'Easy wins',
        body: 'Use a VPN on public WiFi. Use DuckDuckGo instead of Google. Use Signal for sensitive conversations. Opt out of data broker sites (DeleteMe service automates this). Use a separate email for signups.',
        tips: [
          'Brave browser blocks ads and trackers automatically.',
          'Limit app permissions — most apps don\'t need your microphone or location.',
          'Review privacy settings on social media annually.',
        ],
      },
    ],
  },
  {
    id: 'digital-social',
    categoryId: 'digital',
    title: 'Social Media: Using It Without Losing Yourself',
    summary: 'Algorithms, mental health effects, and how to use social media intentionally.',
    readingMinutes: 6,
    difficulty: 'beginner',
    tags: ['social media', 'mental health', 'screen time'],
    content: [
      {
        heading: 'How the algorithm manipulates you',
        body: 'Social media algorithms maximize "engagement" — which means outrage, fear, and envy keep you scrolling longer than joy. You\'re not the customer; you\'re the product. Your attention is sold to advertisers.',
      },
      {
        heading: 'The research on mental health',
        body: 'Heavy social media use is correlated with higher rates of anxiety, depression, loneliness, and poor sleep — especially in teens. Passive consumption (scrolling) is far more harmful than active use (posting, messaging friends).',
        tips: [
          'Remove apps from your phone\'s home screen.',
          'Set a daily time limit in phone settings.',
          'Take a 1-week break annually — notice how you feel.',
        ],
      },
      {
        heading: 'Using it intentionally',
        body: 'Curate ruthlessly — unfollow anything that consistently makes you feel bad. Use social media as a tool, not a default activity. Ask: "Am I choosing to open this, or is it a reflex?"',
      },
    ],
  },
];
