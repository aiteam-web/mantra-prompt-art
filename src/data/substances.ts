import { SubstanceConfig } from './types';

const notes = [
  "Felt strong today", "Work was stressful", "Social dinner, navigated well",
  "Tough morning but pushed through", "Better than yesterday", "Slept well",
  "Had a moment of weakness but stayed strong", "Feeling grateful",
  "Called a friend when it got hard", "Quiet day, stayed focused",
  "Weekend was challenging", "Exercise helped a lot", "One day at a time",
  "", "", "", "", "", "", "", ""
];

const rn = (min: number, max: number) => Math.round((min + Math.random() * (max - min)) * 10) / 10;
const ri = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1));
const pick = <T>(arr: T[]): T => arr[ri(0, arr.length - 1)];
const noteFor = (day: number) => notes[day % notes.length];

export const substances: SubstanceConfig[] = [
  // ===== ALCOHOL =====
  {
    slug: 'alcohol',
    name: 'Alcohol',
    descriptor: 'Beer, wine & spirits',
    icon: '🍷',
    accentVar: '--substance-alcohol',
    trackers: [
      {
        id: 'consumption', name: 'Consumption Log', chartType: 'bar', yAxisLabel: 'Units',
        insight: "You haven't exceeded 1 unit in 11 days. Your liver is already regenerating.",
        fields: [
          { key: 'units', label: 'Units consumed today', type: 'slider', min: 0, max: 20, step: 1 },
          { key: 'drinkType', label: 'Drink type', type: 'chips', options: ['Beer', 'Wine', 'Spirits', 'Mixed', 'None'] },
          { key: 'trigger', label: 'Primary trigger', type: 'chips', options: ['Stress', 'Social', 'Habit', 'Boredom', 'Emotion', 'None'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({
          units: day < 7 ? ri(Math.max(0, 8 - day), Math.max(1, 10 - day)) : day < 14 ? ri(0, Math.max(0, 3 - (day - 7))) : 0,
          drinkType: day < 14 ? pick(['Beer', 'Wine', 'Spirits']) : 'None',
          trigger: day < 14 ? pick(['Stress', 'Social', 'Habit']) : 'None',
          notes: noteFor(day),
        }),
      },
      {
        id: 'cravings', name: 'Craving Intensity', chartType: 'line', yAxisLabel: 'Cravings',
        insight: "Friday evenings remain your hardest time. Plan something active after 6pm.",
        fields: [
          { key: 'count', label: 'Number of cravings today', type: 'slider', min: 0, max: 15, step: 1 },
          { key: 'peakIntensity', label: 'Peak intensity', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'trigger', label: 'Primary trigger', type: 'chips', options: ['Stress', 'Social', 'Evening habit', 'Weekend', 'Boredom', 'Other'] },
          { key: 'coping', label: 'Coping used', type: 'chips', options: ['Exercise', 'Cold water', 'Breathing', 'Called someone', 'Waited it out', 'Gave in'], multiSelect: true },
          { key: 'resisted', label: 'Did you resist?', type: 'single-select', options: ['Yes', 'Partially', 'No'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({
          count: Math.max(0, ri(11 - Math.floor(day * 0.45), 13 - Math.floor(day * 0.5))),
          peakIntensity: Math.max(1, ri(8 - Math.floor(day * 0.3), 10 - Math.floor(day * 0.35))),
          trigger: pick(['Stress', 'Social', 'Evening habit']),
          coping: [pick(['Exercise', 'Breathing', 'Waited it out'])],
          resisted: day > 10 ? 'Yes' : pick(['Yes', 'Partially']),
          notes: noteFor(day),
        }),
      },
      {
        id: 'mood-sleep', name: 'Mood & Sleep', chartType: 'area', yAxisLabel: 'Score',
        insight: "On nights you sleep 7+ hours, your next-day mood is 2.4 points higher.",
        fields: [
          { key: 'mood', label: 'Mood today', type: 'icon-picker', options: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad', 'Angry'] },
          { key: 'energy', label: 'Energy level', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'sleepHours', label: 'Hours slept last night', type: 'slider', min: 0, max: 12, step: 0.5 },
          { key: 'wakeUps', label: 'Wake-ups', type: 'chips', options: ['0', '1-2', '3-5', '5+'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({
          mood: pick(day > 14 ? ['Happy', 'Calm'] : day > 7 ? ['Calm', 'Neutral'] : ['Neutral', 'Anxious', 'Sad']),
          energy: Math.min(10, rn(3 + day * 0.25, 4 + day * 0.3)),
          sleepHours: Math.min(10, rn(3.5 + day * 0.2, 4.5 + day * 0.22)),
          wakeUps: day > 14 ? '0' : day > 7 ? pick(['0', '1-2']) : pick(['1-2', '3-5']),
          notes: noteFor(day),
        }),
      },
      {
        id: 'withdrawal', name: 'Withdrawal Symptoms', chartType: 'stacked-bar', yAxisLabel: 'Burden',
        insight: "Your symptoms are tracking ahead of the expected resolution timeline.",
        fields: [
          { key: 'tremors', label: 'Tremors', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'headaches', label: 'Headaches', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'nausea', label: 'Nausea', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'sweating', label: 'Sweating', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'anxiety', label: 'Anxiety level', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'fatigue', label: 'Fatigue', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => {
          const sevAt = (d: number) => d < 3 ? pick(['Moderate', 'Severe']) : d < 7 ? pick(['Mild', 'Moderate']) : d < 14 ? pick(['None', 'Mild']) : 'None';
          return {
            tremors: sevAt(day), headaches: sevAt(day), nausea: sevAt(day),
            sweating: sevAt(day), anxiety: Math.max(1, ri(8 - Math.floor(day * 0.4), 10 - Math.floor(day * 0.45))),
            fatigue: sevAt(day), notes: noteFor(day),
          };
        },
      },
      {
        id: 'savings', name: 'Financial Savings', chartType: 'area', yAxisLabel: 'Saved',
        insight: "On track to save a lot this year. That's a flight to Japan.",
        fields: [
          { key: 'bought', label: 'Did you buy alcohol today?', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'spent', label: 'Amount spent ', type: 'number', min: 0, max: 10000 },
          { key: 'baseline', label: 'Baseline daily spend ', type: 'number', min: 0, max: 5000 },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({
          bought: day < 10 ? (day < 5 ? 'Yes' : pick(['Yes', 'No'])) : 'No',
          spent: day < 10 ? ri(0, 500) : 0,
          baseline: 876,
          cumulative: Math.round(876 * (21 - day) - ri(0, day < 10 ? 500 : 0)),
          notes: noteFor(day),
        }),
      },
      {
        id: 'risk-situations', name: 'High-Risk Situations', chartType: 'bar', yAxisLabel: 'Situations',
        insight: "Social dinners are your strongest area. Work stress situations are hardest.",
        fields: [
          { key: 'situations', label: 'Situations encountered', type: 'chips', options: ['Party', 'Work stress', 'Social dinner', 'Habit time', 'Argument', 'Boredom', 'None'], multiSelect: true },
          { key: 'difficulty', label: 'Difficulty', type: 'single-select', options: ['Easy', 'Moderate', 'Hard'] },
          { key: 'outcome', label: 'Outcome', type: 'single-select', options: ['Resisted all', 'Partial', 'Gave in'] },
          { key: 'strategy', label: 'Strategy used', type: 'chips', options: ['Left situation', 'AF drink', 'Called someone', 'Delayed', 'Other'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({
          situations: day < 7 ? [pick(['Party', 'Work stress', 'Social dinner'])] : day < 14 ? (Math.random() > 0.5 ? [pick(['Work stress', 'Boredom'])] : ['None']) : ['None'],
          difficulty: day < 7 ? pick(['Moderate', 'Hard']) : 'Easy',
          outcome: day > 7 ? 'Resisted all' : pick(['Resisted all', 'Partial']),
          strategy: pick(['Left situation', 'AF drink', 'Delayed']),
          notes: noteFor(day),
        }),
      },
    ],
    calculator: {
      title: 'Units & Health Impact',
      inputs: [
        { key: 'drinksPerDay', label: 'Drinks per day', type: 'slider', min: 0, max: 20, step: 1, defaultValue: 4 },
        { key: 'drinkingDays', label: 'Drinking days per week', type: 'slider', min: 0, max: 7, step: 1, defaultValue: 5 },
        { key: 'costPerDrink', label: 'Cost per drink ', type: 'slider', min: 50, max: 1000, step: 50, defaultValue: 200 },
      ],
      compute: (inputs) => {
        const weekly = inputs.drinksPerDay * inputs.drinkingDays;
        const monthly = inputs.costPerDrink * inputs.drinksPerDay * inputs.drinkingDays * 4.3;
        const yearly = monthly * 12;
        return [
          { label: 'Weekly units', value: `${weekly} units`, color: weekly > 14 ? 'destructive' : 'primary' },
          { label: 'Safe limit', value: '14 units/week' },
          { label: 'Monthly spend', value: `${Math.round(monthly).toLocaleString}` },
          { label: 'Yearly spend', value: `${Math.round(yearly).toLocaleString}` },
          { label: 'Liver risk', value: weekly > 35 ? 'High' : weekly > 14 ? 'Moderate' : 'Low', color: weekly > 35 ? 'destructive' : weekly > 14 ? 'accent' : 'primary' },
          { label: '1-year savings if quit', value: `${Math.round(yearly).toLocaleString}` },
        ];
      },
      note: "Your liver begins regenerating within 72 hours of stopping.",
    },
    activities: [
      {
        id: 'alcohol-quiz', name: 'Alcohol Myth Buster', duration: '3 min', type: 'quiz',
        description: 'Test your knowledge about alcohol and recovery.',
        questions: [
          { question: 'How quickly does your liver start regenerating after you stop drinking?', options: ['24 hours', '72 hours', '2 weeks', '1 month'], correctIndex: 1, explanation: 'Your liver begins regenerating within 72 hours. It\'s one of the fastest-healing organs in your body.' },
          { question: 'What does alcohol do to REM sleep?', options: ['Enhances it', 'Suppresses it', 'No effect', 'Doubles it'], correctIndex: 1, explanation: 'Alcohol suppresses REM sleep — the deep restorative stage. That\'s why you feel exhausted even after 8 hours of drunk sleep.' },
          { question: 'How long do most alcohol cravings last?', options: ['30 seconds', '3-5 minutes', '1 hour', 'All day'], correctIndex: 1, explanation: 'Most cravings peak and pass within 3-5 minutes. If you can ride the wave, it breaks.' },
          { question: 'Which organ is most damaged by chronic alcohol use?', options: ['Heart', 'Kidneys', 'Liver', 'Lungs'], correctIndex: 2, explanation: 'The liver processes alcohol and takes the most direct damage — but it also recovers remarkably fast with abstinence.' },
          { question: 'What is "kindling" in alcohol withdrawal?', options: ['A warming sensation', 'Each withdrawal gets worse than the last', 'A treatment method', 'Morning shakes'], correctIndex: 1, explanation: 'Kindling means each withdrawal episode is more severe. This is why medical supervision matters for heavy drinkers.' },
        ],
      },
      {
        id: 'liver-bodyscan', name: 'Recovery Body Scan', duration: '4 min', type: 'body-scan',
        description: 'Check in with the parts of your body that are actively healing right now.',
        bodyZones: [
          { name: 'Liver', emoji: '🫁', prompt: 'Place your hand on your right ribs. Your liver is here — regenerating right now. Fat deposits are mobilizing. Enzyme levels are dropping daily.' },
          { name: 'Brain', emoji: '🧠', prompt: 'Your brain\'s GABA receptors are recalibrating. The fog is lifting. Neural pathways that alcohol dulled are reactivating.' },
          { name: 'Heart', emoji: '❤️', prompt: 'Your blood pressure is normalizing. Resting heart rate is dropping. Your cardiovascular risk decreases with every sober day.' },
          { name: 'Stomach', emoji: '🫃', prompt: 'Gastric lining is healing. The inflammation is subsiding. Your gut microbiome is diversifying again.' },
          { name: 'Skin', emoji: '✨', prompt: 'Your skin is rehydrating. Redness is fading. People will start saying you look healthier — and they\'re right.' },
        ],
      },
      {
        id: 'social-script', name: 'Social Situation Rehearsal', duration: '3 min', type: 'affirmation',
        description: 'Swipe through confident responses for when someone offers you a drink.',
        affirmations: [
          'I\'m driving tonight — thanks though.',
          'I\'m on a health kick. Feeling great actually.',
          'Not tonight, but I appreciate it.',
          'I\'m good with this sparkling water.',
          'I don\'t need alcohol to enjoy this moment.',
          'My body is healing and I\'m protecting that.',
          'I choose clarity over temporary numbness.',
          'The best version of me doesn\'t need a drink.',
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'Why alcohol destroys sleep — and when it comes back', tag: 'Health', content: 'Alcohol suppresses REM sleep — the deep stage where your brain repairs itself. You might sleep 8 hours and wake exhausted because the quality throughout was poor.\n\nIn the second half of the night, as your liver metabolizes alcohol, your brain rebounds into hyperactivity — 4am wake-ups, disturbing dreams, fragmented sleep.\n\nThe recovery is faster than people expect. Within 3–5 days of stopping, sleep depth measurably improves. By week 2, REM sleep begins to normalize. Most people report deeper, more restorative sleep after just 7 alcohol-free days.\n\nYour brain knows how to sleep. Alcohol was the interference, not the solution.' },
      { id: 'a2', title: 'What 3 weeks without alcohol does to your liver', tag: 'Science', content: 'Days 1–3: Liver enzymes remain elevated. Fat that accumulated in liver cells begins to mobilize.\n\nDays 4–7: Enzyme levels begin dropping measurably. Early fatty liver reversal is already happening.\n\nWeek 2–3: Enzymes approach normal range. Fatty liver can fully reverse within 2–6 weeks of abstinence.\n\nA blood test at 30 days often surprises people. The liver begins regenerating within 72 hours of stopping.' },
      { id: 'a3', title: 'The HALT method: what\'s actually driving your craving', tag: 'Psychology', content: 'HALT stands for Hungry, Angry, Lonely, Tired. Most cravings aren\'t really about alcohol — they\'re about an unmet need that alcohol trained your brain to address.\n\nHungry: Low blood sugar mimics craving signals biochemically.\n\nAngry: Alcohol was your pressure valve. The craving is a symptom of the frustration.\n\nLonely: Social connection is the most consistently identified protective factor in recovery.\n\nTired: Your prefrontal cortex runs on sleep. Late night plus fatigue is when most relapses occur.' },
      { id: 'a4', title: 'Navigating social situations alcohol-free', tag: 'Practical', content: 'The first sober party feels impossible in advance. It rarely is in practice.\n\nPractical tools: Arrive with your own drink already in hand — sparkling water, AF cocktail, anything.\n\nScripts that work: "I\'m driving tonight." "I\'m on a health kick." "Not drinking at the moment."\n\nThe first sober social event is the hardest. The second is easier. The anxiety shrinks in proportion to the evidence.' },
      { id: 'a5', title: 'Alcohol and anxiety: which came first?', tag: 'Science', content: 'Many people discover too late that alcohol was treating anxiety they didn\'t know they had.\n\nWhen you quit, the GABA system becomes hyperactive — rebound anxiety spikes for 2–4 weeks. This is neurological, not psychological weakness.\n\nAnxiety after quitting is almost always worse short-term and dramatically better by 90 days. People who drink to manage anxiety almost universally have lower baseline anxiety at 3 months sober.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== TOBACCO =====
  {
    slug: 'tobacco',
    name: 'Tobacco / Nicotine',
    descriptor: 'Cigarettes, vaping & pouches',
    icon: '🚬',
    accentVar: '--substance-tobacco',
    trackers: [
      {
        id: 'cigarettes', name: 'Daily Cigarettes', chartType: 'bar', yAxisLabel: 'Cigarettes',
        insight: "Morning cigarettes are the last habit standing. Try a 15-minute walk immediately after waking.",
        fields: [
          { key: 'count', label: 'Cigarettes smoked today', type: 'number', min: 0, max: 60 },
          { key: 'type', label: 'Type', type: 'chips', options: ['Cigarette', 'Vape', 'Pouch', 'Pipe', 'None'] },
          { key: 'occasion', label: 'Occasion', type: 'chips', options: ['Morning', 'After meals', 'Stress', 'Social', 'Boredom', 'Other'], multiSelect: true },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ count: Math.max(0, ri(22 - Math.floor(day * 1.2), 24 - Math.floor(day * 1.1))), type: day > 14 ? 'None' : 'Cigarette', occasion: day < 14 ? [pick(['Morning', 'After meals', 'Stress'])] : ['None'], notes: noteFor(day) }),
      },
      {
        id: 'cravings', name: 'Craving Patterns', chartType: 'line', yAxisLabel: 'Cravings',
        insight: "After-meal cravings are nearly gone. Morning accounts for 73% of your remaining pattern.",
        fields: [
          { key: 'count', label: 'Number of cravings', type: 'slider', min: 0, max: 20, step: 1 },
          { key: 'peakIntensity', label: 'Peak intensity', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'peakTime', label: 'Peak time', type: 'chips', options: ['Morning', 'After meals', 'Afternoon', 'Evening', 'Night'] },
          { key: 'trigger', label: 'Trigger', type: 'chips', options: ['Morning routine', 'After food', 'Stress', 'Boredom', 'Social'] },
          { key: 'outcome', label: 'Outcome', type: 'single-select', options: ['Resisted all', 'Resisted some', 'Gave in'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ count: Math.max(0, ri(12 - Math.floor(day * 0.6), 14 - Math.floor(day * 0.55))), peakIntensity: Math.max(1, ri(7 - Math.floor(day * 0.3), 9 - Math.floor(day * 0.35))), peakTime: pick(['Morning', 'After meals']), trigger: pick(['Morning routine', 'Stress']), outcome: day > 10 ? 'Resisted all' : pick(['Resisted all', 'Resisted some']), notes: noteFor(day) }),
      },
      {
        id: 'respiratory', name: 'Respiratory Health', chartType: 'area', yAxisLabel: 'Breathing Ease',
        insight: "From winded at 2 minutes to 12 minutes of exercise. Real lung recovery happening.",
        fields: [
          { key: 'breathingEase', label: 'Breathing ease', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'coughSeverity', label: 'Cough severity', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'chestTightness', label: 'Chest tightness', type: 'chips', options: ['None', 'Mild', 'Moderate'] },
          { key: 'exerciseTime', label: 'Exercise before breathlessness', type: 'chips', options: ['1 min', '5 min', '10 min', '20 min', '30+ min'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ breathingEase: Math.min(10, rn(2 + day * 0.25, 3 + day * 0.22)), coughSeverity: day > 14 ? 'None' : day > 7 ? pick(['None', 'Mild']) : pick(['Mild', 'Moderate']), chestTightness: day > 10 ? 'None' : pick(['None', 'Mild']), exerciseTime: day > 14 ? '20 min' : day > 7 ? '10 min' : '5 min', notes: noteFor(day) }),
      },
      {
        id: 'mood-irritability', name: 'Mood & Irritability', chartType: 'line', yAxisLabel: 'Score',
        insight: "Irritability down 62% since Day 3. Mood consistently above 7 now.",
        fields: [
          { key: 'irritability', label: 'Irritability', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'mood', label: 'Mood', type: 'icon-picker', options: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Irritable', 'Sad'] },
          { key: 'energy', label: 'Energy', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'stress', label: 'Stress', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ irritability: Math.max(1, rn(9 - day * 0.35, 10 - day * 0.3)), mood: pick(day > 14 ? ['Happy', 'Calm'] : ['Neutral', 'Anxious', 'Irritable']), energy: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.25)), stress: Math.max(1, rn(7 - day * 0.25, 8 - day * 0.2)), notes: noteFor(day) }),
      },
      {
        id: 'nrt', name: 'NRT Tracking', chartType: 'bar', yAxisLabel: 'mg Nicotine',
        insight: "Getting 14mg from NRT vs 40mg when fully smoking. 65% nicotine reduction.",
        fields: [
          { key: 'nrtType', label: 'NRT used', type: 'chips', options: ['Patch', 'Gum', 'Lozenge', 'Inhaler', 'None'] },
          { key: 'patchLevel', label: 'Patch level', type: 'chips', options: ['7mg', '14mg', '21mg'] },
          { key: 'extraCigarettes', label: 'Cigarettes on top', type: 'number', min: 0, max: 20 },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ nrtType: 'Patch', patchLevel: day < 7 ? '21mg' : '14mg', extraCigarettes: Math.max(0, ri(10 - day, 12 - day)), totalNicotine: day < 7 ? ri(30, 40) : ri(14, 20), notes: noteFor(day) }),
      },
      {
        id: 'financial-health', name: 'Financial & Health', chartType: 'area', yAxisLabel: 'Saved',
        insight: "Taste and smell returned on Day 7. Lung cancer risk drops 72% at 10 years.",
        fields: [
          { key: 'bought', label: 'Bought cigarettes?', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'spent', label: 'Amount spent ', type: 'number', min: 0, max: 5000 },
          { key: 'healthMilestone', label: 'Health milestone', type: 'chips', options: ['Improved taste', 'Easier breathing', 'Less cough', 'Better circulation'], multiSelect: true },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ bought: day < 7 ? 'Yes' : 'No', spent: day < 7 ? ri(200, 500) : 0, cumulative: Math.round(533 * Math.max(0, 21 - day)), healthMilestone: day > 7 ? ['Improved taste'] : [], notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Cigarette Cost & Health Impact',
      inputs: [
        { key: 'cigarettesPerDay', label: 'Cigarettes per day', type: 'slider', min: 1, max: 60, step: 1, defaultValue: 15 },
        { key: 'costPerPack', label: 'Cost per pack ', type: 'slider', min: 50, max: 1000, step: 10, defaultValue: 280 },
        { key: 'yearsSmoked', label: 'Years smoked', type: 'slider', min: 1, max: 50, step: 1, defaultValue: 8 },
      ],
      compute: (inputs) => {
        const daily = (inputs.cigarettesPerDay / 20) * inputs.costPerPack;
        const yearly = daily * 365;
        const total = yearly * inputs.yearsSmoked;
        return [
          { label: 'Daily spend', value: `${Math.round(daily)}` },
          { label: 'Yearly spend', value: `${Math.round(yearly).toLocaleString}` },
          { label: 'Total spent', value: `${Math.round(total).toLocaleString}` },
          { label: 'Carcinogens per cigarette', value: '69 known' },
          { label: '10-year benefit', value: '72% lower lung cancer risk' },
        ];
      },
    },
    activities: [
      {
        id: 'craving-tap', name: 'Craving Crusher', duration: '2 min', type: 'tap-game',
        description: 'Nicotine cravings last 3-5 minutes. Smash this one into dust.',
        tapPrompt: 'Each tap weakens the craving. Tap until it\'s gone!',
        tapGoal: 40,
      },
      {
        id: 'lung-visualization', name: 'Lung Healing Journey', duration: '3 min', type: 'visualization',
        description: 'Watch your lungs heal in real time — from the first hour to one year smoke-free.',
        scenes: [
          { text: 'Hour 1: Carbon monoxide is leaving your bloodstream. Oxygen levels are already rising.', emoji: '💨', duration: 8 },
          { text: 'Day 3: Your bronchial tubes are relaxing. Breathing becomes easier. Energy increases.', emoji: '🌬️', duration: 8 },
          { text: 'Week 2: Cilia — the tiny hairs in your lungs — are regrowing. They sweep out mucus and debris.', emoji: '🌱', duration: 8 },
          { text: 'Month 1: Lung function has increased measurably. Coughing and shortness of breath decrease.', emoji: '🫁', duration: 8 },
          { text: 'Month 9: Your lungs are dramatically cleaner. Infection risk has dropped. You can feel the difference.', emoji: '🏔️', duration: 8 },
          { text: 'Year 1: Your risk of heart disease is now HALF that of a smoker. Your body chose healing. You let it.', emoji: '🎉', duration: 10 },
        ],
      },
      {
        id: 'tobacco-sort', name: 'Trigger vs. Choice', duration: '3 min', type: 'sorting',
        description: 'Sort these situations — is it a genuine trigger or a choice in disguise?',
        sortCategories: ['Real Trigger', 'Choice in Disguise'],
        sortItems: [
          { text: 'Having coffee in the morning', correct: 'Choice in Disguise' },
          { text: 'Extreme unexpected stress at work', correct: 'Real Trigger' },
          { text: 'Seeing someone else smoke outside', correct: 'Choice in Disguise' },
          { text: 'Severe anxiety attack', correct: 'Real Trigger' },
          { text: 'Finishing a meal', correct: 'Choice in Disguise' },
          { text: 'Grief or loss of a loved one', correct: 'Real Trigger' },
          { text: 'Waiting for a bus', correct: 'Choice in Disguise' },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'What actually happens to your lungs when you quit', tag: 'Health', content: 'Hours 20–48: Carbon monoxide leaves your bloodstream. Blood oxygen normalizes.\n\nDay 14–30: Lung function measurably increases. Cilia start regrowing.\n\n1–9 months: Cilia fully regenerate. Breathlessness decreases.\n\nYour lungs have been trying to heal. You were interrupting the process.' },
      { id: 'a2', title: 'Nicotine cravings last 3–5 minutes', tag: 'Science', content: 'The acute craving is time-limited. It rises, peaks, and falls in 3–5 minutes.\n\nEvery craving you survive weakens the neural pathway. Set a timer. The craving will pass before it ends.' },
      { id: 'a3', title: 'Smoker\'s identity: who are you without cigarettes?', tag: 'Psychology', content: 'People who say "I\'m not a smoker" rather than "I\'m trying to quit" have significantly better outcomes. The language shift moves the decision from willpower to identity.' },
      { id: 'a4', title: 'Vaping as a quit tool: what the evidence says', tag: 'Research', content: 'Vaping delivers nicotine without combustion products. The evidence cautiously supports it as a harm reduction tool. Less harmful does not mean harmless.' },
      { id: 'a5', title: 'The 6 withdrawal symptoms and when they end', tag: 'Recovery', content: 'Irritability: peaks Days 2–3, resolves Week 2.\nHunger: begins within 24 hours.\nInsomnia: Days 2–5.\nBrain fog: Week 1.\nDepression: Days 3–5.\nConstipation: Days 3–5.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== OPIOIDS =====
  {
    slug: 'opioids', name: 'Opioids', descriptor: 'Prescription & heroin', icon: '💊', accentVar: '--substance-opioids',
    banner: { text: 'On Buprenorphine — Day 21 · Well managed', type: 'info', dismissable: true },
    trackers: [
      { id: 'use-mat', name: 'Use & MAT', chartType: 'bar', yAxisLabel: 'Use instances', insight: '19 consecutive days without illicit use. Buprenorphine has stabilized your baseline.',
        fields: [
          { key: 'usedToday', label: 'Used illicitly today', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'type', label: 'Type', type: 'chips', options: ['Pills', 'Heroin', 'Fentanyl', 'Other'] },
          { key: 'matTaken', label: 'MAT dose taken as prescribed', type: 'single-select', options: ['Yes', 'No', 'Not on MAT'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ usedToday: day < 6 ? (day < 3 ? 'Yes' : pick(['Yes', 'No'])) : 'No', type: day < 6 ? 'Pills' : '', matTaken: 'Yes', useCount: day < 6 ? ri(0, 3 - Math.floor(day * 0.5)) : 0, notes: noteFor(day) }),
      },
      { id: 'craving-pain', name: 'Craving & Pain', chartType: 'line', yAxisLabel: 'Intensity', insight: 'Craving down from 9.4 on Day 1. Pain resolves more slowly but is also declining.',
        fields: [
          { key: 'cravingIntensity', label: 'Craving intensity', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'physicalPain', label: 'Physical pain', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'emotionalPain', label: 'Emotional pain', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'trigger', label: 'Primary trigger', type: 'chips', options: ['Physical pain', 'Stress', 'Boredom', 'Location', 'Person', 'Memory'] },
          { key: 'coping', label: 'Coping used', type: 'chips', options: ['MAT dose', 'Support call', 'Exercise', 'Breathing', 'Distraction'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ cravingIntensity: Math.max(1, rn(9 - day * 0.4, 10 - day * 0.35)), physicalPain: Math.max(1, rn(8 - day * 0.3, 9 - day * 0.25)), emotionalPain: Math.max(1, rn(7 - day * 0.25, 8 - day * 0.2)), trigger: pick(['Physical pain', 'Stress']), coping: pick(['MAT dose', 'Exercise']), notes: noteFor(day) }),
      },
      { id: 'withdrawal', name: 'Withdrawal Symptoms', chartType: 'stacked-bar', yAxisLabel: 'Burden', insight: 'With MAT, your symptom burden was 4× lower than expected.',
        fields: [
          { key: 'bodyAches', label: 'Body aches', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'sweating', label: 'Sweating', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'insomnia', label: 'Insomnia', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'anxiety', label: 'Anxiety', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'restlessness', label: 'Restlessness', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'nausea', label: 'Nausea', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => { const s = (d: number) => d < 3 ? pick(['Moderate', 'Severe']) : d < 7 ? pick(['Mild', 'Moderate']) : d < 14 ? pick(['None', 'Mild']) : 'None'; return { bodyAches: s(day), sweating: s(day), insomnia: s(day), anxiety: Math.max(1, ri(8 - Math.floor(day * 0.4), 10 - Math.floor(day * 0.45))), restlessness: s(day), nausea: s(day), notes: noteFor(day) }; },
      },
      { id: 'sleep-energy', name: 'Sleep & Energy', chartType: 'area', yAxisLabel: 'Hours', insight: 'Sleep improved from 2.4 hrs to 6.8 hrs. Energy recovering steadily.',
        fields: [
          { key: 'sleepHours', label: 'Sleep hours', type: 'slider', min: 0, max: 12, step: 0.5 },
          { key: 'sleepQuality', label: 'Sleep quality', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'energy', label: 'Energy', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'meals', label: 'Meals today', type: 'single-select', options: ['All', 'Some', 'None'] },
          { key: 'showered', label: 'Showered', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ sleepHours: Math.min(9, rn(2.4 + day * 0.22, 3 + day * 0.2)), sleepQuality: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.25)), energy: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.25)), meals: day > 7 ? 'All' : pick(['Some', 'All']), showered: day > 5 ? 'Yes' : pick(['Yes', 'No']), notes: noteFor(day) }),
      },
      { id: 'treatment', name: 'Treatment Engagement', chartType: 'calendar', yAxisLabel: 'Attended', insight: '14 of 21 days with formal support contact.',
        fields: [
          { key: 'naMeeting', label: 'NA meeting', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'therapy', label: 'Therapy session', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'sponsor', label: 'Sponsor contact', type: 'single-select', options: ['Yes', 'No'] },
          { key: 'medication', label: 'Medication as prescribed', type: 'single-select', options: ['Yes', 'No', 'Not prescribed'] },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ naMeeting: day > 11 ? 'Yes' : pick(['Yes', 'No']), therapy: day % 3 === 0 ? 'Yes' : 'No', sponsor: day > 7 ? 'Yes' : pick(['Yes', 'No']), medication: 'Yes', attended: day > 11 || Math.random() > 0.3, notes: noteFor(day) }),
      },
      { id: 'functional', name: 'Functional Recovery', chartType: 'area', yAxisLabel: 'Score', insight: 'All 5 functional areas showing measurable improvement.',
        fields: [
          { key: 'work', label: 'Work/school', type: 'single-select', options: ["Can't", 'Minimal', 'Difficult', 'Normal'] },
          { key: 'social', label: 'Social contact', type: 'single-select', options: ['Isolated', 'Brief', 'Normal'] },
          { key: 'hygiene', label: 'Hygiene', type: 'single-select', options: ['Skipped', 'Minimal', 'Full'] },
          { key: 'nutrition', label: 'Nutrition', type: 'single-select', options: ['None', 'Minimal', 'Full meals'] },
          { key: 'satisfaction', label: 'Life satisfaction', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'notes', label: 'Notes', type: 'textarea' },
        ],
        mockGenerator: (day) => ({ work: day > 14 ? 'Normal' : day > 7 ? 'Difficult' : 'Minimal', social: day > 10 ? 'Normal' : day > 5 ? 'Brief' : 'Isolated', hygiene: day > 7 ? 'Full' : 'Minimal', nutrition: day > 7 ? 'Full meals' : 'Minimal', satisfaction: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.28)), notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'MME & Overdose Risk',
      inputs: [
        { key: 'mgPerDay', label: 'mg per day', type: 'slider', min: 0, max: 500, step: 10, defaultValue: 60 },
        { key: 'bupDose', label: 'Buprenorphine dose (mg/day)', type: 'slider', min: 0, max: 32, step: 2, defaultValue: 8 },
      ],
      compute: (inputs) => [
        { label: 'Daily MME', value: `${inputs.mgPerDay} MME` },
        { label: 'Overdose risk', value: inputs.mgPerDay > 90 ? 'High' : inputs.mgPerDay > 50 ? 'Elevated' : 'Moderate', color: inputs.mgPerDay > 90 ? 'destructive' : 'accent' },
        { label: 'Naloxone note', value: 'Available free at government health centres' },
      ],
    },
    activities: [
      {
        id: 'naloxone-quiz', name: 'Naloxone Emergency Quiz', duration: '3 min', type: 'quiz',
        description: 'Could you save a life? Test your overdose response knowledge.',
        questions: [
          { question: 'What is the first thing you should do if you suspect an opioid overdose?', options: ['Give naloxone', 'Call 112/911', 'Splash cold water', 'Wait and observe'], correctIndex: 1, explanation: 'Always call emergency services FIRST. Naloxone is temporary — professional help is essential.' },
          { question: 'How does naloxone work?', options: ['It metabolizes opioids', 'It blocks opioid receptors', 'It stimulates breathing', 'It induces vomiting'], correctIndex: 1, explanation: 'Naloxone competitively binds to opioid receptors, temporarily reversing the overdose.' },
          { question: 'How long does naloxone last?', options: ['5 minutes', '30-90 minutes', '6 hours', '24 hours'], correctIndex: 1, explanation: 'Naloxone lasts 30-90 minutes. The opioid may outlast it — that\'s why staying and calling 112 is critical.' },
          { question: 'What position should an unconscious person be in?', options: ['On their back', 'Sitting up', 'Recovery position (on side)', 'Standing supported'], correctIndex: 2, explanation: 'The recovery position prevents choking if they vomit. Turn them on their side.' },
        ],
      },
      {
        id: 'pain-bodyscan', name: 'Pain Body Map', duration: '5 min', type: 'body-scan',
        description: 'Separate real pain from craving. Your body knows the difference — learn to listen.',
        bodyZones: [
          { name: 'Head & Mind', emoji: '🧠', prompt: 'Is there a headache, or is it mental fog from craving? Notice without judging. Cravings feel like urgency. Pain feels specific.' },
          { name: 'Gut & Core', emoji: '🫃', prompt: 'Opioid withdrawal hits the gut hard — cramping, nausea. Breathe into this area. This sensation is temporary and means your body is recalibrating.' },
          { name: 'Muscles & Joints', emoji: '💪', prompt: 'Aching, restless legs — your body\'s natural pain system is rebooting. Stretch gently. The discomfort means receptors are waking up.' },
          { name: 'Skin & Nerves', emoji: '🖐️', prompt: 'Goosebumps, sweating, sensitivity — your nervous system is resetting. Touch something textured. Ground into sensation.' },
          { name: 'Chest & Heart', emoji: '❤️', prompt: 'Anxiety or physical tightness? Place both hands here. Slow your breathing. Your heart rate is normalizing with each sober day.' },
        ],
      },
      {
        id: 'safe-affirmations', name: 'Recovery Affirmations', duration: '3 min', type: 'affirmation',
        description: 'Internalize these truths. They become stronger with repetition.',
        affirmations: [
          'I am more than my addiction.',
          'My pain is real, but opioids made it worse long-term.',
          'I deserve to feel — even when it\'s uncomfortable.',
          'MAT is recovery. Taking medication is strength, not weakness.',
          'Every hour clean, my receptors are healing.',
          'I can ask for help without shame.',
          'The worst day sober is better than the best day using.',
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'MAT is not substitution: what buprenorphine actually does', tag: 'Science', content: 'Buprenorphine is a partial opioid agonist. It stabilizes, doesn\'t get you high. People on MAT are 50% less likely to die from opioid overdose. MAT is recovery.' },
      { id: 'a2', title: 'Physical vs psychological withdrawal', tag: 'Recovery', content: 'Physical: Days 1–7. Psychological: Weeks 2+. Both are real. Both resolve. MAT and behavioral therapy together address both phases.' },
      { id: 'a3', title: 'Overdose risk after abstinence', tag: 'Safety', content: 'Tolerance drops rapidly. The dose that was normal before can be fatal after a week without use. Naloxone reverses overdose. Have it and tell someone where it is.' },
      { id: 'a4', title: 'How pain gets managed without opioids', tag: 'Practical', content: 'Physical therapy, NSAIDs, nerve blocks, mindfulness-based pain management. Multiple approaches that build capacity rather than creating tolerance.' },
      { id: 'a5', title: 'NA vs SMART Recovery', tag: 'Resources', content: 'NA: peer-led, spiritually-oriented. SMART: science-based, CBT-derived. Attendance consistency matters more than which program.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== CANNABIS =====
  {
    slug: 'cannabis', name: 'Cannabis', descriptor: 'Flower, edibles & concentrates', icon: '🌿', accentVar: '--substance-cannabis',
    trackers: [
      { id: 'use-log', name: 'Use Log', chartType: 'bar', yAxisLabel: 'Sessions', insight: '16 consecutive days without use. Appetite and sleep are normalizing independently.',
        fields: [{ key: 'sessions', label: 'Sessions today', type: 'number', min: 0, max: 10 }, { key: 'method', label: 'Method', type: 'chips', options: ['Smoked', 'Vaped', 'Edible', 'Dab', 'None'] }, { key: 'amount', label: 'Amount', type: 'chips', options: ['Small', 'Medium', 'Large', 'None'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ sessions: day < 5 ? ri(1, 4 - Math.floor(day * 0.5)) : 0, method: day < 5 ? 'Smoked' : 'None', amount: day < 5 ? pick(['Small', 'Medium']) : 'None', notes: noteFor(day) }),
      },
      { id: 'cravings', name: 'Craving & Triggers', chartType: 'line', yAxisLabel: 'Intensity', insight: 'Evening cravings are your last remaining pattern. Daytime cravings have resolved.',
        fields: [{ key: 'intensity', label: 'Craving intensity', type: 'slider', min: 0, max: 10, step: 1 }, { key: 'trigger', label: 'Trigger', type: 'chips', options: ['Boredom', 'Evening', 'Stress', 'Social', 'Sleep', 'Habit'] }, { key: 'resisted', label: 'Resisted?', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ intensity: Math.max(0, rn(7 - day * 0.3, 8 - day * 0.28)), trigger: pick(['Boredom', 'Evening', 'Stress']), resisted: day > 5 ? 'Yes' : pick(['Yes', 'No']), notes: noteFor(day) }),
      },
      { id: 'sleep', name: 'Sleep Recovery', chartType: 'area', yAxisLabel: 'Hours', insight: 'Night sweats resolved by Day 10. Sleep duration back to 7+ hours.',
        fields: [{ key: 'hours', label: 'Sleep hours', type: 'slider', min: 0, max: 12, step: 0.5 }, { key: 'quality', label: 'Quality', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'nightSweats', label: 'Night sweats', type: 'single-select', options: ['Yes', 'No'] }, { key: 'vividDreams', label: 'Vivid dreams', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ hours: day < 5 ? rn(3, 5) : day < 10 ? rn(5, 6.5) : rn(6.5, 8), quality: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.25)), nightSweats: day < 10 ? 'Yes' : 'No', vividDreams: day > 3 && day < 14 ? 'Yes' : 'No', notes: noteFor(day) }),
      },
      { id: 'appetite', name: 'Appetite & Weight', chartType: 'line', yAxisLabel: 'Score', insight: 'Appetite returned naturally by Day 12. You\'re eating without cannabis.',
        fields: [{ key: 'appetite', label: 'Appetite', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'mealsEaten', label: 'Meals eaten', type: 'chips', options: ['0', '1', '2', '3+'] }, { key: 'nausea', label: 'Nausea', type: 'single-select', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ appetite: Math.min(10, rn(2 + day * 0.35, 3 + day * 0.3)), mealsEaten: day > 10 ? '3+' : day > 5 ? '2' : '1', nausea: day < 5 ? pick(['Mild', 'Moderate']) : 'None', notes: noteFor(day) }),
      },
      { id: 'cognitive', name: 'Mental Clarity', chartType: 'area', yAxisLabel: 'Score', insight: 'Focus improved 3.2 points. Motivation returning steadily.',
        fields: [{ key: 'focus', label: 'Focus', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'motivation', label: 'Motivation', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'memory', label: 'Memory', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'brainFog', label: 'Brain fog', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ focus: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), motivation: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.28)), memory: Math.min(10, rn(4 + day * 0.22, 5 + day * 0.2)), brainFog: Math.max(1, rn(8 - day * 0.3, 9 - day * 0.28)), notes: noteFor(day) }),
      },
      { id: 'mood', name: 'Mood & Anxiety', chartType: 'line', yAxisLabel: 'Score', insight: 'Anxiety peaked at Day 5 and has been declining since. Mood stabilizing.',
        fields: [{ key: 'mood', label: 'Mood', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'anxiety', label: 'Anxiety', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'irritability', label: 'Irritability', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ mood: Math.min(10, rn(3 + day * 0.25, 4 + day * 0.22)), anxiety: Math.max(1, day < 5 ? rn(6, 8) : rn(7 - day * 0.3, 8 - day * 0.28)), irritability: Math.max(1, rn(7 - day * 0.28, 8 - day * 0.25)), notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Usage Cost & Recovery',
      inputs: [
        { key: 'gramsPerWeek', label: 'Grams per week', type: 'slider', min: 1, max: 30, step: 1, defaultValue: 7 },
        { key: 'costPerGram', label: 'Cost per gram ', type: 'slider', min: 100, max: 2000, step: 50, defaultValue: 500 },
      ],
      compute: (inputs) => {
        const weekly = inputs.gramsPerWeek * inputs.costPerGram;
        return [
          { label: 'Weekly spend', value: `${weekly.toLocaleString}` },
          { label: 'Monthly spend', value: `${Math.round(weekly * 4.3).toLocaleString}` },
          { label: 'Yearly spend', value: `${Math.round(weekly * 52).toLocaleString}` },
          { label: 'THC clearance', value: 'Heavy users: 30-90 days' },
          { label: 'Cognitive recovery', value: '2-4 weeks for most functions' },
        ];
      },
    },
    activities: [
      {
        id: 'vivid-dream-journal', name: 'REM Rebound Dream Log', duration: '3 min', type: 'journal',
        description: 'Cannabis suppressed your dreams. Now they\'re back — intense and wild. Capture them.',
        fields: [
          { key: 'dream', label: 'What did you dream about?', type: 'textarea', placeholder: 'Describe every detail you remember — colors, people, emotions...' },
          { key: 'intensity', label: 'Dream intensity', type: 'slider', min: 1, max: 10, step: 1 },
          { key: 'emotion', label: 'Dominant emotion in the dream', type: 'chips', options: ['Fear', 'Joy', 'Confusion', 'Anger', 'Peace', 'Nostalgia'] },
        ],
      },
      {
        id: 'cannabis-tap', name: 'Craving Buster', duration: '2 min', type: 'tap-game',
        description: 'Channel the restless energy into something productive. Smash the craving.',
        tapPrompt: 'Every tap is a craving you\'re defeating. Keep going!',
        tapGoal: 35,
      },
      {
        id: 'cannabis-sort', name: 'Need vs. Want', duration: '3 min', type: 'sorting',
        description: 'Sort these reasons for using — is it a genuine need or a want you can manage differently?',
        sortCategories: ['Genuine Need', 'Manageable Want'],
        sortItems: [
          { text: 'I can\'t sleep without it', correct: 'Manageable Want' },
          { text: 'Severe chronic pain with no alternatives', correct: 'Genuine Need' },
          { text: 'I\'m bored and have nothing to do', correct: 'Manageable Want' },
          { text: 'Chemotherapy-induced nausea', correct: 'Genuine Need' },
          { text: 'Everyone at the party is smoking', correct: 'Manageable Want' },
          { text: 'I feel anxious before social events', correct: 'Manageable Want' },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'Cannabis withdrawal is real — here\'s the timeline', tag: 'Recovery', content: 'Days 1–3: Irritability, sleep disruption, appetite loss. Days 4–7: Peak anxiety, night sweats, vivid dreams. Week 2–3: Gradual normalization. Month 1+: Most symptoms resolved.' },
      { id: 'a2', title: 'Why you can\'t sleep without weed', tag: 'Science', content: 'THC suppresses REM sleep. When you quit, REM rebounds — creating vivid, intense dreams. The rebound resolves in 2–4 weeks.' },
      { id: 'a3', title: 'The motivation question', tag: 'Psychology', content: 'Heavy cannabis use is associated with reduced dopamine in the striatum. The amotivational effect is real during use and resolves with abstinence.' },
      { id: 'a4', title: 'CHS: the vomiting syndrome nobody talks about', tag: 'Health', content: 'Cannabinoid Hyperemesis Syndrome causes severe cyclic vomiting in heavy users. It resolves completely with cessation.' },
      { id: 'a5', title: 'Cannabis and anxiety: the paradox', tag: 'Science', content: 'Cannabis reduces anxiety short-term while increasing baseline anxiety long-term. Most people find anxiety significantly lower at 60–90 days abstinent.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== STIMULANTS =====
  {
    slug: 'stimulants', name: 'Stimulants', descriptor: 'Cocaine, meth & amphetamines', icon: '⚡', accentVar: '--substance-stimulants',
    banner: { text: '⚠️ Cardiovascular Alert: Stimulant use significantly elevates heart attack risk. Monitor your resting heart rate.', type: 'warning', dismissable: true },
    trackers: [
      { id: 'use-frequency', name: 'Use Frequency', chartType: 'bar', yAxisLabel: 'Grams', insight: '14 consecutive days clean. The physical crash phase is behind you.',
        fields: [{ key: 'used', label: 'Used today', type: 'single-select', options: ['Yes', 'No'] }, { key: 'type', label: 'Type', type: 'chips', options: ['Cocaine', 'Crack', 'Meth', 'Adderall', 'Other'] }, { key: 'amount', label: 'Amount (g)', type: 'number', min: 0, max: 10 }, { key: 'cost', label: 'Cost ', type: 'number', min: 0, max: 50000 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ used: day < 8 ? (day < 4 ? 'Yes' : pick(['Yes', 'No'])) : 'No', amount: day < 8 ? rn(0, Math.max(0, 2.5 - day * 0.35)) : 0, type: day < 8 ? 'Cocaine' : '', cost: day < 8 ? ri(0, 5000) : 0, notes: noteFor(day) }),
      },
      { id: 'mood-anhedonia', name: 'Mood & Anhedonia', chartType: 'line', yAxisLabel: 'Score', insight: 'Anhedonia resolves over weeks. Dopamine pathways are actively rebuilding.',
        fields: [{ key: 'depression', label: 'Depression', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'anhedonia', label: 'Can you feel pleasure?', type: 'single-select', options: ['None', 'Faint', 'Some', 'Yes'] }, { key: 'anxiety', label: 'Anxiety', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ depression: Math.max(1, rn(9 - day * 0.2, 10 - day * 0.18)), anhedonia: day > 14 ? 'Some' : day > 7 ? 'Faint' : 'None', anxiety: Math.max(1, rn(8 - day * 0.18, 9 - day * 0.16)), notes: noteFor(day) }),
      },
      { id: 'sleep', name: 'Sleep Recovery', chartType: 'area', yAxisLabel: 'Hours', insight: 'Sleep pattern normalizing after crash hypersomnia phase.',
        fields: [{ key: 'hours', label: 'Sleep hours', type: 'slider', min: 0, max: 18, step: 0.5 }, { key: 'quality', label: 'Quality', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'nightmares', label: 'Night terrors', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ hours: day < 3 ? rn(14, 16) : day < 8 ? rn(3, 5) : rn(6, 8), quality: day < 3 ? rn(2, 4) : day < 8 ? rn(2, 4) : rn(5, 7), nightmares: day < 8 ? 'Yes' : 'No', notes: noteFor(day) }),
      },
      { id: 'physical', name: 'Physical Health', chartType: 'line', yAxisLabel: 'BPM', insight: 'Heart rate normalized from 118 BPM to 72 BPM.',
        fields: [{ key: 'heartRate', label: 'Resting heart rate (BPM)', type: 'number', min: 40, max: 200 }, { key: 'appetite', label: 'Appetite', type: 'single-select', options: ['None', 'Minimal', 'Normal', 'Increased'] }, { key: 'energy', label: 'Energy', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ heartRate: Math.round(118 - day * 2.2), appetite: day > 10 ? 'Normal' : day > 5 ? 'Minimal' : 'None', energy: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.25)), notes: noteFor(day) }),
      },
      { id: 'cravings', name: 'Cravings & Triggers', chartType: 'line', yAxisLabel: 'Cravings', insight: 'Week 3 cravings are largely psychological.',
        fields: [{ key: 'count', label: 'Craving count', type: 'slider', min: 0, max: 15, step: 1 }, { key: 'peakIntensity', label: 'Peak intensity', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'trigger', label: 'Primary trigger', type: 'chips', options: ['Stress', 'Depression', 'Boredom', 'Social', 'Location', 'Person'] }, { key: 'resisted', label: 'Resisted', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ count: Math.max(0, ri(10 - Math.floor(day * 0.4), 12 - Math.floor(day * 0.38))), peakIntensity: Math.max(1, ri(8 - Math.floor(day * 0.3), 9 - Math.floor(day * 0.28))), trigger: pick(['Stress', 'Depression', 'Boredom']), resisted: day > 7 ? 'Yes' : pick(['Yes', 'No']), notes: noteFor(day) }),
      },
      { id: 'risk-behaviors', name: 'Risk Behaviors', chartType: 'bar', yAxisLabel: 'Incidents', insight: 'Zero risk behaviors in 13 days.',
        fields: [{ key: 'behaviors', label: 'Today', type: 'chips', options: ['Drove impaired', 'Financial crisis', 'Relationship incident', 'Legal incident', 'Unsafe sex', 'None'], multiSelect: true }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ behaviors: day < 8 ? [pick(['Financial crisis', 'Relationship incident'])] : ['None'], count: day < 8 ? ri(0, 2) : 0, notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Cardiovascular Risk & Cost',
      inputs: [
        { key: 'gramsPerUse', label: 'Grams per use', type: 'slider', min: 0.1, max: 5, step: 0.1, defaultValue: 0.5 },
        { key: 'timesPerWeek', label: 'Times per week', type: 'slider', min: 1, max: 14, step: 1, defaultValue: 3 },
        { key: 'costPerGram', label: 'Cost per gram ', type: 'slider', min: 1000, max: 20000, step: 500, defaultValue: 5000 },
      ],
      compute: (inputs) => {
        const weekly = inputs.gramsPerUse * inputs.timesPerWeek * inputs.costPerGram;
        return [
          { label: 'Weekly spend', value: `${Math.round(weekly).toLocaleString}` },
          { label: 'Yearly spend', value: `${Math.round(weekly * 52).toLocaleString}` },
          { label: 'Cardiovascular risk', value: 'Cocaine triples heart attack risk for 60 min after each use', color: 'destructive' },
          { label: 'Heart rate recovery', value: '↓ ~40 BPM within 21 days' },
        ];
      },
    },
    activities: [
      {
        id: 'dopamine-visualization', name: 'Dopamine Recovery Journey', duration: '3 min', type: 'visualization',
        description: 'Visualize your brain\'s dopamine system rebooting — from crash to color.',
        scenes: [
          { text: 'Day 1: Your dopamine receptors are nearly empty. Everything feels grey. This is the crash — not your new reality.', emoji: '🌑', duration: 8 },
          { text: 'Week 1: Your brain begins upregulating receptors. Small pleasures start registering — food, warmth, a funny moment.', emoji: '🌒', duration: 8 },
          { text: 'Week 2: Anhedonia is fading. Music sounds better. Sunsets have color again. Your reward system is rebuilding.', emoji: '🌓', duration: 8 },
          { text: 'Month 1: Natural dopamine spikes from exercise, achievement, and connection feel real again.', emoji: '🌔', duration: 8 },
          { text: 'Month 3: Your baseline has shifted. Normal life has texture and reward. The grey phase is behind you.', emoji: '🌕', duration: 10 },
        ],
      },
      {
        id: 'stim-quiz', name: 'Stimulant Science Quiz', duration: '3 min', type: 'quiz',
        description: 'How much do you know about what stimulants do — and how you recover?',
        questions: [
          { question: 'How much dopamine does cocaine release compared to normal?', options: ['Same amount', '2x normal', '3-5x normal', '10x normal'], correctIndex: 2, explanation: 'Cocaine floods the brain with 3-5x normal dopamine. The crash is your brain trying to recalibrate.' },
          { question: 'What is anhedonia?', options: ['Memory loss', 'Inability to feel pleasure', 'Rapid heartbeat', 'Paranoia'], correctIndex: 1, explanation: 'Anhedonia — the inability to feel pleasure — is the hallmark of stimulant withdrawal. It resolves as dopamine receptors recover.' },
          { question: 'Which food directly provides dopamine precursors?', options: ['Sugar', 'Eggs', 'Bread', 'Rice'], correctIndex: 1, explanation: 'Eggs are rich in tyrosine — the amino acid your brain converts directly into dopamine.' },
          { question: 'How long does full dopamine recovery typically take?', options: ['1 week', '2 weeks', '3-6 months', '2+ years'], correctIndex: 2, explanation: 'Most dopamine receptor recovery happens within 3-6 months, with continued improvement up to 18 months.' },
        ],
      },
      {
        id: 'pleasure-relearn', name: 'Pleasure Relearning Log', duration: '3 min', type: 'journal',
        description: 'Anhedonia makes everything feel grey. Track the moments when color returns.',
        fields: [
          { key: 'pleasureMoment', label: 'Did anything feel even slightly good today?', type: 'textarea', placeholder: 'A warm shower, a funny text, sunshine on your face...' },
          { key: 'intensity', label: 'How much pleasure? (even 1 counts)', type: 'slider', min: 0, max: 10, step: 1 },
          { key: 'compare', label: 'Compared to last week, is pleasure...', type: 'chips', options: ['Same', 'Slightly more', 'Noticeably more', 'Way more'] },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'The dopamine crash', tag: 'Science', content: 'Stimulants flood the brain with 3–5x normal dopamine. The crash is the brain recalibrating. Anhedonia peaks then resolves over 2–4 weeks.' },
      { id: 'a2', title: 'Cocaine and your heart', tag: 'Health', content: 'Cocaine constricts coronary arteries while increasing demand. Most common illicit drug cause of cardiac arrest, even in young people.' },
      { id: 'a3', title: 'Managing depression during withdrawal', tag: 'Recovery', content: 'The depression is neurological — dopamine system recovering. Exercise, sleep, sunlight, and social connection directly support dopamine recovery.' },
      { id: 'a4', title: 'Crystal meth and the brain', tag: 'Science', content: 'Meth damages dopamine neuron terminals. Recovery takes 12–18 months. Brain imaging shows measurable recovery in dopamine transporter density.' },
      { id: 'a5', title: 'Nutrition in stimulant recovery', tag: 'Practical', content: 'Tyrosine-rich foods provide dopamine precursors. Magnesium supports sleep. Omega-3s support neural repair.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== BENZODIAZEPINES =====
  {
    slug: 'benzodiazepines', name: 'Benzodiazepines', descriptor: 'Xanax, Valium & Klonopin', icon: '💊', accentVar: '--substance-benzodiazepines',
    banner: { text: 'Medically supervised taper — Dr. Sharma checked in 3 days ago', type: 'info', dismissable: false },
    trackers: [
      { id: 'taper', name: 'Taper Progress', chartType: 'line', yAxisLabel: 'mg/day', insight: 'Perfectly tracking prescribed schedule.',
        fields: [{ key: 'doseTaken', label: 'Dose taken (mg)', type: 'number', min: 0, max: 20 }, { key: 'asPerscribed', label: 'As prescribed', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ doseTaken: day < 7 ? 4 : day < 14 ? 3 : 2, asPrescribed: 'Yes', notes: noteFor(day) }),
      },
      { id: 'anxiety-panic', name: 'Anxiety & Panic', chartType: 'bar', yAxisLabel: 'Level', insight: '2 weeks without a panic attack.',
        fields: [{ key: 'anxiety', label: 'Anxiety', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'panicAttacks', label: 'Panic attacks', type: 'number', min: 0, max: 5 }, { key: 'trigger', label: 'Trigger', type: 'chips', options: ['Morning', 'Dose time', 'Crowded place', 'Alone', 'Other'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ anxiety: Math.max(1, rn(7 - day * 0.25, 8 - day * 0.22)), panicAttacks: day < 7 ? ri(0, 2) : 0, trigger: pick(['Morning', 'Dose time']), notes: noteFor(day) }),
      },
      { id: 'cognitive', name: 'Cognitive Function', chartType: 'area', yAxisLabel: 'Score', insight: 'Brain fog decreased 45% since starting the taper.',
        fields: [{ key: 'memory', label: 'Memory', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'focus', label: 'Focus', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'clarity', label: 'Mental clarity', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'brainFog', label: 'Brain fog', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ memory: Math.min(10, rn(3 + day * 0.25, 4 + day * 0.22)), focus: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), clarity: Math.min(10, rn(3 + day * 0.3, 4 + day * 0.27)), brainFog: Math.max(1, rn(8 - day * 0.3, 9 - day * 0.28)), notes: noteFor(day) }),
      },
      { id: 'withdrawal', name: 'Withdrawal Symptoms', chartType: 'bar', yAxisLabel: 'Severity', insight: 'Symptom burden decreasing with each taper step.',
        fields: [{ key: 'tremors', label: 'Tremors', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'muscleAches', label: 'Muscle aches', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'headaches', label: 'Headaches', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'insomnia', label: 'Insomnia', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => { const s = (d: number) => d < 5 ? pick(['Mild', 'Moderate']) : d < 14 ? pick(['None', 'Mild']) : 'None'; return { tremors: s(day), muscleAches: s(day), headaches: s(day), insomnia: s(day), notes: noteFor(day) }; },
      },
      { id: 'sleep', name: 'Sleep Quality', chartType: 'area', yAxisLabel: 'Hours', insight: 'Sleep improving with taper compliance.',
        fields: [{ key: 'hours', label: 'Hours slept', type: 'slider', min: 0, max: 12, step: 0.5 }, { key: 'quality', label: 'Quality', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'nightAnxiety', label: 'Night anxiety', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ hours: Math.min(9, rn(4 + day * 0.18, 5 + day * 0.15)), quality: Math.min(10, rn(3 + day * 0.25, 4 + day * 0.22)), nightAnxiety: day < 10 ? 'Yes' : 'No', notes: noteFor(day) }),
      },
      { id: 'medical', name: 'Medical Supervision', chartType: 'calendar', yAxisLabel: 'Attended', insight: '87.5% of appointments attended.',
        fields: [{ key: 'doctorCheckIn', label: 'Doctor check-in', type: 'single-select', options: ['Yes', 'No'] }, { key: 'therapy', label: 'Therapy session', type: 'single-select', options: ['Yes', 'No'] }, { key: 'adherence', label: 'Medication adherence', type: 'single-select', options: ['Perfect', 'One miss', 'Multiple misses'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ doctorCheckIn: day % 5 === 0 ? 'Yes' : 'No', therapy: day % 3 === 0 ? 'Yes' : 'No', adherence: 'Perfect', attended: day % 3 === 0 || day % 5 === 0, notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Taper Schedule & Equivalents',
      inputs: [
        { key: 'currentDose', label: 'Current daily dose (mg)', type: 'slider', min: 0.5, max: 20, step: 0.5, defaultValue: 4 },
        { key: 'taperWeeks', label: 'Target weeks to complete', type: 'slider', min: 4, max: 26, step: 1, defaultValue: 12 },
      ],
      compute: (inputs) => {
        const weeklyReduction = inputs.currentDose / inputs.taperWeeks;
        const rate = (weeklyReduction / inputs.currentDose) * 100;
        return [
          { label: 'Weekly reduction', value: `${weeklyReduction.toFixed(2)} mg` },
          { label: 'Taper rate', value: `${rate.toFixed(1)}%/week`, color: rate > 15 ? 'destructive' : rate > 10 ? 'accent' : 'primary' },
          { label: 'Safety', value: rate > 15 ? 'Medical review needed' : rate > 10 ? 'Slightly fast' : 'Safe range' },
          { label: 'Disclaimer', value: 'Your doctor must approve all taper changes' },
        ];
      },
    },
    activities: [
      {
        id: 'gaba-breathing', name: 'GABA Activation Breathing', duration: '5 min', type: 'breathing',
        description: 'This specific breathing ratio activates your GABA system — the same pathway benzos target.',
        phases: [
          { time: 0, text: 'Inhale through your nose for 4 counts. Fill your belly, not your chest.' },
          { time: 4, text: 'Hold gently for 2 counts. No strain.' },
          { time: 6, text: 'Exhale through pursed lips for 8 counts. The long exhale is the key — it stimulates your vagus nerve.' },
          { time: 14, text: 'Pause for 2 counts. Let your body settle before the next breath.' },
        ],
      },
      {
        id: 'benzo-bodyscan', name: 'Withdrawal Body Scan', duration: '4 min', type: 'body-scan',
        description: 'Map where withdrawal is showing up today. Awareness reduces the fear.',
        bodyZones: [
          { name: 'Head', emoji: '🧠', prompt: 'Depersonalization, brain zaps, dizziness? These are GABA receptors recalibrating. It feels terrifying but it\'s not dangerous — just uncomfortable.' },
          { name: 'Eyes & Vision', emoji: '👁️', prompt: 'Visual disturbances, light sensitivity? Your visual cortex is hyperexcitable without benzos dampening it. This normalizes.' },
          { name: 'Muscles', emoji: '💪', prompt: 'Tension, twitching, jaw clenching? Your muscles forgot how to relax naturally. Gentle stretching helps them remember.' },
          { name: 'Stomach', emoji: '🫃', prompt: 'Nausea, loss of appetite? Your gut has GABA receptors too. They\'re adjusting. Small frequent meals help.' },
          { name: 'Nervous System', emoji: '⚡', prompt: 'Tingling, burning skin, internal vibrations? Your nervous system is unmuting itself. Each day the volume turns down slightly.' },
        ],
      },
      {
        id: 'benzo-sort', name: 'Window or Wave?', duration: '3 min', type: 'sorting',
        description: 'Learn to identify whether you\'re in a "window" (good phase) or "wave" (symptom return).',
        sortCategories: ['Window Sign', 'Wave Sign'],
        sortItems: [
          { text: 'Feeling genuinely calm without effort', correct: 'Window Sign' },
          { text: 'Sudden return of anxiety that was gone yesterday', correct: 'Wave Sign' },
          { text: 'Enjoying a meal and tasting it fully', correct: 'Window Sign' },
          { text: 'Insomnia after a week of good sleep', correct: 'Wave Sign' },
          { text: 'Laughing at something spontaneously', correct: 'Window Sign' },
          { text: 'Muscle tension appearing from nowhere', correct: 'Wave Sign' },
          { text: 'Forgetting you\'re in withdrawal for hours', correct: 'Window Sign' },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'Why benzo withdrawal can be dangerous', tag: 'Safety', content: 'Benzos enhance GABA. Abrupt cessation can trigger seizures. Always taper under medical supervision.' },
      { id: 'a2', title: 'The Ashton Manual: gold standard taper guide', tag: 'Science', content: 'Dr. Heather Ashton\'s protocol recommends switching to diazepam and reducing by 10% every 1–2 weeks.' },
      { id: 'a3', title: 'Windows and waves: the benzo withdrawal pattern', tag: 'Recovery', content: 'Recovery isn\'t linear — it alternates between "windows" (feeling normal) and "waves" (symptoms return). Both are expected.' },
      { id: 'a4', title: 'Cognitive recovery after benzos', tag: 'Science', content: 'Memory and processing speed improve significantly after taper completion. Most people report being "sharper than they\'ve been in years."' },
      { id: 'a5', title: 'Natural GABA support', tag: 'Practical', content: 'Magnesium, L-theanine, and regular exercise all support natural GABA activity.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== KRATOM =====
  {
    slug: 'kratom', name: 'Kratom', descriptor: 'Mitragyna speciosa', icon: '🍃', accentVar: '--substance-kratom',
    trackers: [
      { id: 'dose-log', name: 'Dose Log', chartType: 'bar', yAxisLabel: 'Grams', insight: '14 days without kratom. Opioid receptors recalibrating.',
        fields: [{ key: 'grams', label: 'Grams consumed', type: 'number', min: 0, max: 50 }, { key: 'doses', label: 'Number of doses', type: 'number', min: 0, max: 10 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ grams: day < 7 ? rn(Math.max(0, 15 - day * 2.5), Math.max(0, 18 - day * 2)) : 0, doses: day < 7 ? ri(1, Math.max(1, 4 - Math.floor(day * 0.5))) : 0, notes: noteFor(day) }),
      },
      { id: 'withdrawal', name: 'Withdrawal Symptoms', chartType: 'stacked-bar', yAxisLabel: 'Burden', insight: 'Physical symptoms tracking typical opioid withdrawal timeline.',
        fields: [{ key: 'muscleAches', label: 'Muscle aches', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'insomnia', label: 'Insomnia', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'anxiety', label: 'Anxiety', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'restlessness', label: 'Restlessness', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => { const s = (d: number) => d < 3 ? pick(['Moderate', 'Severe']) : d < 7 ? pick(['Mild', 'Moderate']) : d < 14 ? pick(['None', 'Mild']) : 'None'; return { muscleAches: s(day), insomnia: s(day), anxiety: Math.max(1, ri(8 - Math.floor(day * 0.35), 10 - Math.floor(day * 0.3))), restlessness: s(day), notes: noteFor(day) }; },
      },
      { id: 'mood-energy', name: 'Mood & Energy', chartType: 'line', yAxisLabel: 'Score', insight: 'Energy returning to baseline. Natural energy systems recalibrating.',
        fields: [{ key: 'mood', label: 'Mood', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'energy', label: 'Energy', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'motivation', label: 'Motivation', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ mood: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), energy: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.28)), motivation: Math.min(10, rn(2 + day * 0.32, 3 + day * 0.3)), notes: noteFor(day) }),
      },
      { id: 'cravings', name: 'Cravings', chartType: 'line', yAxisLabel: 'Intensity', insight: 'Cravings declining. Environmental triggers remain strongest.',
        fields: [{ key: 'intensity', label: 'Intensity', type: 'slider', min: 0, max: 10, step: 1 }, { key: 'trigger', label: 'Trigger', type: 'chips', options: ['Habit time', 'Stress', 'Pain', 'Boredom', 'Online forums'] }, { key: 'resisted', label: 'Resisted', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ intensity: Math.max(0, rn(8 - day * 0.35, 9 - day * 0.3)), trigger: pick(['Habit time', 'Stress', 'Online forums']), resisted: day > 5 ? 'Yes' : pick(['Yes', 'No']), notes: noteFor(day) }),
      },
      { id: 'sleep', name: 'Sleep Quality', chartType: 'area', yAxisLabel: 'Hours', insight: 'Sleep normalizing after acute withdrawal.',
        fields: [{ key: 'hours', label: 'Sleep hours', type: 'slider', min: 0, max: 12, step: 0.5 }, { key: 'quality', label: 'Quality', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'restlessLegs', label: 'Restless legs', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ hours: Math.min(9, rn(3 + day * 0.25, 4 + day * 0.22)), quality: Math.min(10, rn(2 + day * 0.3, 3 + day * 0.28)), restlessLegs: day < 10 ? 'Yes' : 'No', notes: noteFor(day) }),
      },
      { id: 'financial', name: 'Financial Tracking', chartType: 'area', yAxisLabel: 'Saved', insight: 'Savings accumulating. Redirect to something meaningful.',
        fields: [{ key: 'bought', label: 'Bought kratom?', type: 'single-select', options: ['Yes', 'No'] }, { key: 'spent', label: 'Amount ', type: 'number', min: 0, max: 10000 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ bought: day < 5 ? 'Yes' : 'No', spent: day < 5 ? ri(200, 800) : 0, cumulative: Math.round(400 * Math.max(0, 21 - day)), notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Usage Cost & Dependence',
      inputs: [
        { key: 'gramsPerDay', label: 'Grams per day', type: 'slider', min: 1, max: 50, step: 1, defaultValue: 15 },
        { key: 'costPerKg', label: 'Cost per kg ', type: 'slider', min: 1000, max: 10000, step: 500, defaultValue: 3000 },
      ],
      compute: (inputs) => {
        const daily = (inputs.gramsPerDay / 1000) * inputs.costPerKg;
        return [
          { label: 'Daily cost', value: `${Math.round(daily)}` },
          { label: 'Monthly cost', value: `${Math.round(daily * 30).toLocaleString}` },
          { label: 'Yearly cost', value: `${Math.round(daily * 365).toLocaleString}` },
          { label: 'Opioid receptor binding', value: 'Mitragynine binds mu-opioid receptors' },
        ];
      },
    },
    activities: [
      {
        id: 'kratom-quiz', name: 'Kratom Truth Quiz', duration: '3 min', type: 'quiz',
        description: 'Separate kratom facts from community myths.',
        questions: [
          { question: 'What type of receptors does kratom primarily bind to?', options: ['Serotonin', 'Dopamine', 'Mu-opioid', 'GABA'], correctIndex: 2, explanation: 'Mitragynine binds to mu-opioid receptors — the same ones as morphine and heroin. Kratom IS an opioid.' },
          { question: 'How long do kratom withdrawal symptoms typically last?', options: ['1-2 days', '7-10 days', '1 month', '6 months'], correctIndex: 1, explanation: 'Physical withdrawal mirrors opioid withdrawal, typically resolving in 7-10 days. Psychological symptoms can last longer.' },
          { question: 'Does kratom show up on standard drug tests?', options: ['Always', 'Never', 'Only specialized tests', 'Only blood tests'], correctIndex: 2, explanation: 'Standard panels don\'t detect mitragynine. Specialized kratom-specific tests exist but are rarely used.' },
          { question: 'What makes kratom withdrawal often worse than expected?', options: ['People underestimate it because it\'s "natural"', 'It\'s actually mild', 'It only affects the stomach', 'It\'s psychological only'], correctIndex: 0, explanation: 'The "it\'s just a plant" framing leads people to take high doses for years. The withdrawal surprises them because the dependency is real.' },
        ],
      },
      {
        id: 'kratom-tap', name: 'Endorphin Surge', duration: '2 min', type: 'tap-game',
        description: 'Kratom hijacked your endorphin system. Generate your own rush.',
        tapPrompt: 'Each tap activates your natural reward system. Feel the energy!',
        tapGoal: 50,
      },
      {
        id: 'root-cause', name: 'Root Cause Explorer', duration: '5 min', type: 'journal',
        description: 'Most people started kratom for a reason. Address that reason directly.',
        fields: [
          { key: 'originalReason', label: 'What were you originally treating with kratom?', type: 'textarea', placeholder: 'Chronic pain? Social anxiety? Low energy? Depression?' },
          { key: 'currentState', label: 'Is that original issue better, worse, or the same without kratom?', type: 'textarea', placeholder: 'Be specific about what\'s changed...' },
          { key: 'alternative', label: 'One thing you can do TODAY to address that root cause', type: 'textarea', placeholder: 'Schedule a doctor visit, try a stretch routine, call a therapist...' },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'Kratom withdrawal: harder than expected', tag: 'Recovery', content: 'Mitragynine binds to opioid receptors. Withdrawal mirrors opioid symptoms. Physical symptoms resolve in 7–10 days.' },
      { id: 'a2', title: 'Is kratom addiction real?', tag: 'Science', content: 'Mitragynine and 7-hydroxymitragynine bind to mu-opioid receptors. Physical tolerance and dependence develop on the same timescale as other opioids.' },
      { id: 'a3', title: 'Kratom and anxiety: the self-medication spiral', tag: 'Psychology', content: 'Most people started for a reason. Chronic use downregulates the systems that manage anxiety. Baseline anxiety rises. More kratom is needed just to feel normal.' },
      { id: 'a4', title: 'Reddit, vendors, and the kratom community', tag: 'Psychology', content: 'Online communities normalize heavy use. For people trying to quit, these spaces are reliable craving triggers.' },
      { id: 'a5', title: 'Natural energy after kratom', tag: 'Practical', content: 'Morning sunlight, B-complex vitamins, consistent sleep, and regular exercise. Recovery is faster with exercise.' },
    ],
    communityPosts: [],
    achievements: [],
  },
  // ===== MDMA =====
  {
    slug: 'mdma', name: 'MDMA', descriptor: 'Ecstasy, molly, party drug', icon: '💜', accentVar: '--substance-mdma',
    trackers: [
      { id: 'use-frequency', name: 'Use Frequency', chartType: 'bar', yAxisLabel: 'Uses/month', insight: '32 days since last use. Neurological recovery within reach.',
        fields: [{ key: 'used', label: 'Used today', type: 'single-select', options: ['Yes', 'No'] }, { key: 'amount', label: 'Amount (mg)', type: 'number', min: 0, max: 500 }, { key: 'setting', label: 'Setting', type: 'chips', options: ['Club/festival', 'House party', 'Alone', 'With partner'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ used: day === 0 || day === 14 ? 'Yes' : 'No', amount: day === 0 ? 150 : day === 14 ? 120 : 0, setting: day === 0 ? 'Club/festival' : '', notes: noteFor(day) }),
      },
      { id: 'mood', name: 'Mood & Emotional Recovery', chartType: 'line', yAxisLabel: 'Score', insight: 'Emotional blunting decreased 40%. Authentic emotion returning.',
        fields: [{ key: 'mood', label: 'Overall mood', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'blunting', label: 'Emotional blunting', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'empathy', label: 'Social warmth', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'depression', label: 'Depression', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ mood: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), blunting: Math.max(1, rn(8 - day * 0.3, 9 - day * 0.28)), empathy: Math.min(10, rn(3 + day * 0.3, 4 + day * 0.28)), depression: Math.max(1, rn(7 - day * 0.25, 8 - day * 0.22)), notes: noteFor(day) }),
      },
      { id: 'cognitive', name: 'Cognitive Function', chartType: 'area', yAxisLabel: 'Score', insight: 'Cognitive function improves consistently with abstinence.',
        fields: [{ key: 'memory', label: 'Memory', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'processing', label: 'Processing speed', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'focus', label: 'Focus', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'brainFog', label: 'Brain fog', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ memory: Math.min(10, rn(4 + day * 0.22, 5 + day * 0.2)), processing: Math.min(10, rn(4 + day * 0.25, 5 + day * 0.22)), focus: Math.min(10, rn(4 + day * 0.25, 5 + day * 0.22)), brainFog: Math.max(1, rn(7 - day * 0.28, 8 - day * 0.25)), notes: noteFor(day) }),
      },
      { id: 'sleep', name: 'Sleep Quality', chartType: 'area', yAxisLabel: 'Hours', insight: 'Sleep quality improves significantly by Week 4.',
        fields: [{ key: 'hours', label: 'Hours', type: 'slider', min: 0, max: 12, step: 0.5 }, { key: 'quality', label: 'Quality', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'vividDreams', label: 'Vivid dreams', type: 'single-select', options: ['Yes', 'No'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ hours: Math.min(9, rn(5 + day * 0.15, 6 + day * 0.12)), quality: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), vividDreams: day < 10 ? 'Yes' : 'No', notes: noteFor(day) }),
      },
      { id: 'social', name: 'Social Patterns', chartType: 'bar', yAxisLabel: 'Risk situations', insight: 'Music festivals and club settings remain highest-risk.',
        fields: [{ key: 'situations', label: 'MDMA exposure situations', type: 'chips', options: ['Festival', 'Club', 'House party', 'Friend group', 'None'], multiSelect: true }, { key: 'cravings', label: 'Cravings', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'trigger', label: 'Primary trigger', type: 'chips', options: ['Social setting', 'Music', 'Memory', 'Depression', 'FOMO'] }, { key: 'outcome', label: 'Outcome', type: 'single-select', options: ['Resisted', 'Gave in'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ situations: day % 7 === 0 ? ['Club'] : ['None'], cravings: Math.max(1, rn(6 - day * 0.22, 7 - day * 0.2)), trigger: pick(['Social setting', 'Music', 'FOMO']), outcome: 'Resisted', count: day % 7 === 0 ? 1 : 0, notes: noteFor(day) }),
      },
      { id: 'physical', name: 'Physical Health', chartType: 'line', yAxisLabel: 'Score', insight: 'Physical health improving. Heat regulation normalizing.',
        fields: [{ key: 'energy', label: 'Energy', type: 'slider', min: 1, max: 10, step: 1 }, { key: 'appetite', label: 'Appetite', type: 'single-select', options: ['None', 'Low', 'Normal', 'High'] }, { key: 'jawTension', label: 'Jaw tension', type: 'chips', options: ['None', 'Mild', 'Moderate', 'Severe'] }, { key: 'temperature', label: 'Temperature regulation', type: 'single-select', options: ['Normal', 'Slightly off', 'Hot flashes', 'Chills'] }, { key: 'notes', label: 'Notes', type: 'textarea' }],
        mockGenerator: (day) => ({ energy: Math.min(10, rn(3 + day * 0.28, 4 + day * 0.25)), appetite: day > 7 ? 'Normal' : day > 3 ? 'Low' : 'None', jawTension: day < 5 ? pick(['Mild', 'Moderate']) : 'None', temperature: day < 7 ? 'Slightly off' : 'Normal', notes: noteFor(day) }),
      },
    ],
    calculator: {
      title: 'Neurotoxicity Risk & Recovery',
      inputs: [
        { key: 'dosePerSession', label: 'Average dose (mg)', type: 'slider', min: 50, max: 500, step: 25, defaultValue: 150 },
        { key: 'sessionsPerMonth', label: 'Sessions per month', type: 'slider', min: 1, max: 8, step: 1, defaultValue: 2 },
        { key: 'yearsOfUse', label: 'Years of use', type: 'slider', min: 1, max: 20, step: 1, defaultValue: 3 },
      ],
      compute: (inputs) => {
        const risk = inputs.dosePerSession > 150 && inputs.sessionsPerMonth > 1 ? 'High' : inputs.sessionsPerMonth > 2 ? 'Moderate' : 'Low';
        return [
          { label: 'Neurotoxicity risk', value: risk, color: risk === 'High' ? 'destructive' : risk === 'Moderate' ? 'accent' : 'primary' },
          { label: 'Recovery timeline', value: `${Math.round(inputs.yearsOfUse * 3)} months estimated` },
          { label: 'Key note', value: 'Heavy use (>150mg, >monthly) causes lasting serotonin changes. Recovery is possible.' },
        ];
      },
    },
    activities: [
      {
        id: 'serotonin-visualization', name: 'Serotonin Recovery Journey', duration: '3 min', type: 'visualization',
        description: 'Watch your brain\'s serotonin system rebuild — from depletion to restoration.',
        scenes: [
          { text: 'Day 1 after use: Serotonin reserves are critically low. The "Tuesday blues" hit. Everything feels hollow.', emoji: '🌧️', duration: 8 },
          { text: 'Week 1: Your body is synthesizing new serotonin from tryptophan. Sleep and sunlight accelerate this.', emoji: '🌤️', duration: 8 },
          { text: 'Week 4: Serotonin transporters are normalizing. Emotional range is returning — subtle but real.', emoji: '🌈', duration: 8 },
          { text: 'Month 3: The emotional blunting is lifting. Music moves you. Conversations warm you. This is natural serotonin.', emoji: '☀️', duration: 8 },
          { text: 'Month 6+: Serotonin neuron terminals are regenerating. You feel more deeply than you did even before MDMA.', emoji: '🌟', duration: 10 },
        ],
      },
      {
        id: 'mdma-affirmations', name: 'Authentic Connection Cards', duration: '3 min', type: 'affirmation',
        description: 'MDMA made intimacy feel effortless. These truths remind you it\'s possible sober.',
        affirmations: [
          'Real connection is quieter than MDMA connection — and it lasts longer.',
          'I can be vulnerable without a chemical safety net.',
          'The love I felt on MDMA was MY love. It lives in me, not in a pill.',
          'Emotional depth returns. I\'m patient with the process.',
          'I don\'t need to feel everything at maximum intensity to feel alive.',
          'My friendships are real. They don\'t need MDMA to prove it.',
          'Sober joy is subtle. Sober joy is mine. Sober joy grows.',
        ],
      },
      {
        id: 'mdma-quiz', name: 'Serotonin Science Quiz', duration: '3 min', type: 'quiz',
        description: 'How much do you know about MDMA and your brain?',
        questions: [
          { question: 'How much serotonin does MDMA release compared to normal?', options: ['Same amount', '2x', '3-5x', '10x+'], correctIndex: 2, explanation: 'MDMA causes 3-5x normal serotonin release, creating the intense euphoria and empathy — and the devastating comedown.' },
          { question: 'What is "neurotoxicity" in the context of MDMA?', options: ['Temporary confusion', 'Permanent brain damage', 'Damage to serotonin neuron terminals', 'Headaches'], correctIndex: 2, explanation: 'Heavy MDMA use damages serotonin neuron terminals. The good news: recovery is documented over 12-18 months of abstinence.' },
          { question: 'Why is "Blue Tuesday" worse with alcohol?', options: ['Dehydration', 'Alcohol blocks serotonin recovery', 'Liver competition slows MDMA metabolism', 'It\'s a myth'], correctIndex: 2, explanation: 'Alcohol competes for liver enzymes, prolonging MDMA metabolism and deepening the serotonin crash.' },
          { question: 'What\'s the minimum recommended time between MDMA uses?', options: ['1 week', '2 weeks', '1 month', '3 months'], correctIndex: 3, explanation: 'The 3-month rule allows serotonin stores to fully replenish. More frequent use causes cumulative damage.' },
        ],
      },
    ],
    articles: [
      { id: 'a1', title: 'What MDMA does to serotonin', tag: 'Science', content: 'MDMA causes 3–5x normal serotonin release. With heavy use, cumulative depletion damages serotonin neuron terminals. Recovery documented over 18 months of abstinence.' },
      { id: 'a2', title: 'The "blue Tuesday" phenomenon', tag: 'Health', content: 'The comedown is serotonin rebound. Severity correlates with dose and frequency. Alcohol significantly worsens comedowns.' },
      { id: 'a3', title: 'MDMA and memory', tag: 'Science', content: 'Verbal memory most consistently affected in heavy users. Most cognitive studies show significant improvement with abstinence within 6–12 months.' },
      { id: 'a4', title: 'Harm reduction approach', tag: 'Practical', content: 'Lower doses (75–100mg), infrequent use (max monthly), test substances, stay hydrated but not over-hydrated.' },
      { id: 'a5', title: 'Rebuilding serotonin naturally', tag: 'Practical', content: 'Aerobic exercise, sunlight, tryptophan-rich nutrition, and quality sleep. Exercise is the most consistently effective intervention.' },
    ],
    communityPosts: [],
    achievements: [],
  },
];

export function getSubstance(slug: string): SubstanceConfig | undefined {
  return substances.find(s => s.slug === slug);
}
