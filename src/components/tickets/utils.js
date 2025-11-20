const tickets = [
  {
    id: '689630dc5d10d2e70bc24dd8',
    name: 'Visitor Pass',
    slug: 'visitor-pass',
    description:
      'Step in & explore — exhibitions, showcases, and startup stalls await.',
    pricing: {
      is_free: true,
      has_discount: false,
      discount_info: {},
      base_currency: 'INR',
      currency_prices: [],
    },
    features: [
      { feature: 'Entry to the exhibition arena and startup stalls' },
      { feature: 'Meet and engage with exhibitors, founders, and innovators' },
      { feature: 'Access to sector-specific pavilions and showcases' },
      {
        feature:
          'Networking Dinner access is excluded for this category of pass.',
      },
    ],
  },
  {
    id: '689630e85d10d2e70bc24df2',
    name: 'Delegate Pass',
    slug: 'delegate-pass',
    description:
      'Go beyond the floor — unlock all sessions, keynotes, lounges, and B2B networking.',
    badge_text: 'Prices go up after 30th Sep',
    pricing: {
      is_free: false,
      has_discount: true,
      discount_info: {
        discount_text: 'Prices go up after 30th Sep',
      },
      base_currency: 'INR',
      currency_prices: [
        {
          currency: 'INR',
          actual_price: 5000,
          discounted_price: 3500,
          unit: '1',
          gst: {
            tax_applicable: true,
            tax_rate: 18,
            tax_inclusive: false,
          },
          currency_notes:
            'Additional 10% Discount for DPIIT/StartupTN Smart Card Startups',
        },
      ],
    },
    features: [
      {
        feature:
          'All Visitor Pass benefits: Exhibition, networking, pavilions, and showcases',
      },
      {
        feature:
          'AI-powered Matchmaking on the Mobile App — connect intelligently with startups, investors, and peers tailored to your interests',
      },
      {
        feature:
          'Exclusive access to conference sessions, panels, and keynote addresses',
      },
      { feature: 'Entry to the Networking Lounge' },
      {
        feature:
          'Access to the B2B Meeting Zone for curated networking and business discussions',
      },
      {
        feature:
          'Networking Dinner access is excluded for this category of pass.',
      },
    ],
  },
  {
    id: '68dbd2915c201ee919851f9d',
    name: 'Networking Dinner',
    slug: 'networking-dinner',
    description:
      'For those who want exclusive access to the Global Startup Stakeholders Dinner.',
    pricing: {
      is_free: false,
      has_discount: false,
      discount_info: {
        discount_text:
          'Dinner At Le Meridian Hotel, Coimbatore on Oct 9th, 7PM Onwards',
      },
      base_currency: 'INR',
      currency_prices: [
        {
          currency: 'INR',
          actual_price: 3000,
          discounted_price: 3000,
          gst: {
            tax_applicable: false,
            tax_inclusive: false,
          },
          currency_notes:
            'Dinner At Le Meridian Hotel, Coimbatore on Oct 9th, 7PM Onwards',
        },
      ],
    },
    features: [
      { feature: 'Join 250+ innovators and stakeholders from 39 countries.' },
      {
        feature:
          "Network with global leaders, experience Tamil Nadu's thriving startup ecosystem, and discover opportunities.",
      },
      { feature: 'Registration is mandatory for entry.' },
      {
        feature: 'Dinner invitation is strictly personal and non-transferable.',
      },
      {
        feature:
          'Limited seats available; confirmation on a first-come, first-serve basis.',
      },
      { feature: 'Organisers reserve the right to admission.' },
    ],
  },
]

const exhibitors = [
  {
    id: '68af8ddc1b7b72c3f78f6656',
    name: 'Exhibitor - 6x8',
    slug: 'exhibitor-6x8',
    pricing: {
      is_free: false,
      has_discount: false,
      discount_info: {},
      base_currency: 'INR',
      currency_prices: [
        {
          currency: 'INR',
          actual_price: 20000,
          discounted_price: 20000,
          unit: '6x8',
          gst: {
            tax_applicable: true,
            tax_rate: 18,
            tax_inclusive: false,
          },
        },
      ],
    },
    features: [
      { feature: '2 Exclusive Delegate Passes for Stall Managers' },
      { feature: 'Networking lounge access' },
      { feature: 'Full access to conference sessions, panels, and keynotes' },
    ],
  },
  {
    id: '68af9310b865cf20927cf169',
    name: 'Exhibitor - 8x8',
    slug: 'exhibitor-8x8',
    pricing: {
      is_free: false,
      has_discount: false,
      discount_info: {},
      base_currency: 'INR',
      currency_prices: [
        {
          currency: 'INR',
          actual_price: 30000,
          unit: '8x8',
          gst: {
            tax_applicable: true,
            tax_rate: 18,
            tax_inclusive: false,
          },
        },
      ],
    },
    features: [
      { feature: '2 Exclusive Delegate Passes for Stall Managers' },
      { feature: 'Networking lounge access' },
      { feature: 'Full access to conference sessions, panels, and keynotes' },
    ],
  },
  {
    id: '68af9341b865cf20927cf191',
    name: 'Exhibitor - 16x8',
    slug: 'exhibitor-16x8',
    pricing: {
      is_free: false,
      has_discount: false,
      discount_info: {},
      base_currency: 'INR',
      currency_prices: [
        {
          currency: 'INR',
          actual_price: 50000,
          unit: '16x8',
          gst: {
            tax_applicable: true,
            tax_rate: 18,
            tax_inclusive: false,
          },
        },
      ],
    },
    features: [
      { feature: '3 Exclusive Delegate Passes for Stall Managers' },
      { feature: 'Networking lounge access' },
      { feature: 'Full access to conference sessions, panels, and keynotes' },
    ],
  },
]

const guidelines = {
  guidelines: [
    {
      name: 'Exhibitor Guidelines',

      points: [
        {
          point:
            'Traders, Consultancy and Service based Companies are not allowed to book a stall. Organiser have the right to cancel the stall without any prior intimation.',
          id: '68b1279a4e54a95307132073',
        },

        {
          point: 'No Business transaction is allowed during the event.',
          id: '68b127a64e54a95307132075',
        },

        {
          point:
            'A special discount of 10% is allowed on the stall cost for Exhibitors who are registered DPIIT startups.',
          id: '68b127ca4e54a95307132077',
        },

        {
          point:
            'Please provide correct E-Mail id and Mobile Number. Any update will be sent to only the registered E-Mail id and Mobile Number. Any change MUST be informed to us immediately.',
          id: '68b127d54e54a95307132079',
        },

        {
          point: 'Please make sure you are providing the correct GST number.',
          id: '68b127ec4e54a9530713207b',
        },

        {
          point:
            'Please make sure the company name, contact person name and other details are accurate and without any spelling mistake.',
          id: '68b127f54e54a9530713207d',
        },

        {
          point:
            'Post Booking, Please update the necessary details like booth manager pass and stall design.',
          id: '68b128034e54a9530713207f',
        },

        {
          point: 'No selling should happen in the expo.',
          id: '68b128074e54a95307132081',
        },

        {
          point:
            'Please note that 20% discount is applicable for TANSEED, and 30% discount for SC/ST Beneficiaries.',
          id: '68b128134e54a95307132083',
        },

        {
          point: 'The exhibitor has access to all event stages.',
          id: '68b128204e54a95307132085',
        },
      ],
      id: '68b127804e54a95307132071',
    },
  ],
}

export { tickets, exhibitors, guidelines }
