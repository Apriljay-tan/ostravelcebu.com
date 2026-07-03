// Tour package data for O's Travel and Tours Services
// Joiner packages have a single per-pax price.
// Private packages have a tiered price list (1 pax - 12 pax).

const TOUR_PACKAGE_IMG = '/assets/img/tour-packages';

/** Shared image map — joiner and private variants use the same photo per route. */
const packageImageFiles: Record<string, string> = {
  '1d-cebu-city': '1D_CITY_TOUR.jpg',
  '1d-moalboal': '1D_MOABLBOAL_TOUR.jpg',
  '1d-oslob': '1D_OSLOB.jpg',
  '1d-bohol': '1D_BOHOL.jpg',
  '2d1n-cebu-moalboal': '2D1N_CITY+MOALBOAL.jpg',
  '2d1n-cebu-oslob': '2D1N_CITY+OSLOB.jpg',
  '2d1n-cebu-bohol': '2D1N_CITY+BOHOL.jpg',
  '2d1n-moalboal-oslob': '2D1N_MOALBOAL+OSLOB.jpg',
  '2d1n-moalboal-bohol': '2D1N_MOALBOAL+BOHOL.jpg',
  '2d1n-oslob-bohol': '2D1N_OSLOB+BOHOL.jpg',
  '3d2n-cebu-moalboal-oslob': '3D2N_CITY+MOALBOAL+OSLOB.jpg',
  '3d2n-moalboal-oslob-bohol': '3D2N_MOALBOAL+OSLOB+BOHOL.jpg',
  '4d3n-cebu-moalboal-oslob-bohol': '4D3N_CITY+MOALBOAL+OSLOB+BOHOL.jpg',
  // Private 4D package uses the same cover as the full 4D joiner route.
  '4d3n-cebu-bohol': '4D3N_CITY+MOALBOAL+OSLOB+BOHOL.jpg',
};

export function getPackageImage(packageId: string): string {
  const key = packageId.replace(/-(joiner|private)$/, '');
  const file = packageImageFiles[key];
  if (!file) return `${TOUR_PACKAGE_IMG}/1D_CITY_TOUR.jpg`;
  return `${TOUR_PACKAGE_IMG}/${encodeURIComponent(file)}`;
}

export type Block = { heading: string; items: string[] };

export type JoinerPackage = {
  id: string;
  title: string;
  price: string;
  meta: string[];
  blocks: Block[];
};

export type PrivatePackage = {
  id: string;
  title: string;
  intro?: string;
  pricing: { pax: string; price: string }[];
  note?: string;
  blocks: Block[];
};

export const joinerPackages: JoinerPackage[] = [
  {
    id: '1d-cebu-city-joiner',
    title: '1D Cebu City Joiner',
    price: '₱1,580 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      { heading: 'Inclusions', items: ['Transportation', 'Guiding Fee', 'Entrance Fee'] },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '1d-moalboal-joiner',
    title: '1D Moalboal Joiner',
    price: '₱2,070 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Airport or Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 6:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      { heading: 'Inclusions', items: ['Transportation', 'Guiding Fee', 'Entrance Fee'] },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '1d-oslob-joiner',
    title: '1D Oslob Joiner',
    price: '₱2,276 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start at 2:30am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 6:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      { heading: 'Inclusions', items: ['Transportation', 'Guiding Fee', 'Entrance Fee'] },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '1d-bohol-joiner',
    title: '1D Bohol Joiner',
    price: '₱3,229 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      { heading: 'Inclusions', items: ['Transport', 'Guide Fee', 'Entrance Fee', 'Ferry Fare'] },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-cebu-moalboal-joiner',
    title: '2D1N Cebu City + Moalboal Joiner',
    price: '₱3,945 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 6:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-cebu-oslob-joiner',
    title: '2D1N Cebu City + Oslob Joiner',
    price: '₱4,130 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 2:30am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-cebu-bohol-joiner',
    title: '2D1N Cebu City + Bohol Joiner',
    price: '₱5,459 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee', 'Ferry Fare'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-moalboal-oslob-joiner',
    title: '2D1N Moalboal + Oslob Joiner',
    price: '₱4,494 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Airport or Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 6:00pm',
          'Drop at Hotel (Oslob)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel (Oslob)',
          'Tour start at 5:00am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 6:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-moalboal-bohol-joiner',
    title: '2D1N Moalboal + Bohol Joiner',
    price: '₱6,208 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Airport or Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 6:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee', 'Ferry Fare'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '2d1n-oslob-bohol-joiner',
    title: '2D1N Oslob + Bohol Joiner',
    price: '₱6,272 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start at 2:30am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (1 Night)', 'Guiding Fee', 'Entrance Fee', 'Ferry Fare'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '3d2n-cebu-moalboal-oslob-joiner',
    title: '3D2N Cebu City + Moalboal + Oslob Joiner',
    price: '₱5,238 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 6:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 5:00pm',
          'Drop at Hotel (Oslob)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel (Oslob)',
          'Tour start at 5:00am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (2 Nights)', 'Guiding Fee', 'Entrance Fee'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '3d2n-moalboal-oslob-bohol-joiner',
    title: '3D2N Moalboal + Oslob + Bohol Joiner',
    price: '₱7,487 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Airport or Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 6:00pm',
          'Drop at Hotel (Oslob)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel or Airport (Oslob)',
          'Tour start at 5:00am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (2 Nights)', 'Guiding Fee', 'Entrance Fee', 'Ferry Fare'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '4d3n-cebu-moalboal-oslob-bohol-joiner',
    title: '4D3N Cebu + Moalboal + Oslob + Bohol Joiner',
    price: '₱7,937 / Pax',
    meta: ['Joiners Package', 'Minimum of 2 Pax'],
    blocks: [
      {
        heading: 'Itinerary — Cebu City Tour',
        items: [
          'Pick up at Hotel or Airport (City)',
          'Tour start 7:00am',
          'Temple of Leah',
          'Sirao Garden',
          'Tops of Cebu',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of tour 6:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne (100/pax)', 'Ancestral House (100/pax)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Moalboal Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start 4:00am',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea turtle Encounter',
          'Sardines Run',
          'Kawasan Falls',
          'End of tour 5:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: [
          'Canyoneering (1,800 /PAX WITH FOOD) — We highly recommend Canyoneering in Cebu, an experience you won’t find anywhere else in the Philippines.',
        ],
      },
      {
        heading: 'Itinerary — Oslob Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 5:00am',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'End of tour 7:00pm',
          'Drop at Hotel (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark (500/pax local, 1000/pax foreigner)', 'Lechon'],
      },
      {
        heading: 'Itinerary — Bohol Countryside Tour',
        items: [
          'Pick up at Hotel (City)',
          'Tour start at 4:00am',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of tour 7:00pm',
          'Drop at SM Cebu (City)',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Atv Ride (1,200-1,400)', 'Loboc Cruise (1,200)'],
      },
      {
        heading: 'Inclusions',
        items: ['Transportation', 'Hotel (3 Nights)', 'Guiding Fee', 'Entrance Fee', 'Ferry Fare'],
      },
      { heading: 'Exclusions', items: ['Optional Activities', 'Food', 'Airfare'] },
    ],
  },
];

export const privatePackages: PrivatePackage[] = [
  {
    id: '1d-cebu-city-private',
    title: '1D Cebu City Private Tour',
    pricing: [
      { pax: '1 pax', price: '₱6,354/pax' },
      { pax: '2 pax', price: '₱3,412/pax' },
      { pax: '3 pax', price: '₱2,431/pax' },
      { pax: '4 pax', price: '₱2,266/pax' },
      { pax: '5 pax', price: '₱2,174/pax' },
      { pax: '6 pax', price: '₱1,950/pax' },
      { pax: '7 pax', price: '₱1,739/pax' },
      { pax: '8 pax', price: '₱1,580/pax' },
      { pax: '9 pax', price: '₱1,457/pax' },
      { pax: '10 pax', price: '₱1,358/pax' },
      { pax: '11 pax', price: '₱1,277/pax' },
      { pax: '12 pax', price: '₱1,210/pax' },
    ],
    blocks: [
      {
        heading: 'Itinerary — Private Cebu City Tour',
        items: [
          'Pick up at hotel or airport based on arranged schedule',
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'Drop-off at preferred Cebu City area',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['La Vie Parisienne', 'Ancestral House', 'Lechon stopover'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Guide assistance', 'Selected entrance fees'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare'] },
    ],
  },
  {
    id: '1d-moalboal-private',
    title: '1D Moalboal Private Tour',
    pricing: [
      { pax: '1 pax', price: '₱6,450/pax' },
      { pax: '2 pax', price: '₱4,430/pax' },
      { pax: '3 pax', price: '₱3,346/pax' },
      { pax: '4 pax', price: '₱2,930/pax' },
      { pax: '5 pax', price: '₱2,580/pax' },
      { pax: '6 pax', price: '₱2,346/pax' },
      { pax: '7 pax', price: '₱2,251/pax' },
      { pax: '8 pax', price: '₱2,117/pax' },
      { pax: '9 pax', price: '₱2,013/pax' },
      { pax: '10 pax', price: '₱1,930/pax' },
      { pax: '11 pax', price: '₱1,861/pax' },
      { pax: '12 pax', price: '₱1,805/pax' },
    ],
    blocks: [
      {
        heading: 'Itinerary — Private Moalboal Tour',
        items: [
          'Private early morning pick-up',
          'Sardines Run',
          'Sea Turtle Encounter',
          'Snorkeling',
          'Moalboal beach activity',
          'Optional Kawasan Falls or Canyoneering add-on',
          'Private drop-off after activity',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Kawasan Falls', 'Canyoneering', 'Snorkeling gear upgrade if applicable'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Local coordination', 'Tour assistance'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '1d-oslob-private',
    title: '1D Oslob Private Tour',
    pricing: [
      { pax: '1 pax', price: '₱7,480/pax' },
      { pax: '2 pax', price: '₱4,230/pax' },
      { pax: '3 pax', price: '₱3,146/pax' },
      { pax: '4 pax', price: '₱2,855/pax' },
      { pax: '5 pax', price: '₱2,480/pax' },
      { pax: '6 pax', price: '₱2,230/pax' },
      { pax: '7 pax', price: '₱2,194/pax' },
      { pax: '8 pax', price: '₱2,042/pax' },
      { pax: '9 pax', price: '₱1,924/pax' },
      { pax: '10 pax', price: '₱1,830/pax' },
      { pax: '11 pax', price: '₱1,759/pax' },
      { pax: '12 pax', price: '₱1,688/pax' },
    ],
    note: 'Private Oslob package is best for groups who prefer direct coordination and privacy.',
    blocks: [
      {
        heading: 'Itinerary — Private Oslob Tour',
        items: [
          'Private early morning pick-up',
          'Whale shark activity assistance',
          'Tumalog Falls if available',
          'Sumilon Island',
          'Oslob Cuartel',
          'Simala Church depending on route and timing',
          'Private drop-off after tour',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Sumilon Island', 'Additional side trips', 'GoPro rental if applicable'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Guide assistance', 'Local coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '1d-bohol-private',
    title: '1D Bohol Countryside Private Tour',
    pricing: [
      { pax: '1 pax', price: '₱6,630/pax' },
      { pax: '2 pax', price: '₱4,180/pax' },
      { pax: '3 pax', price: '₱3,363/pax' },
      { pax: '4 pax', price: '₱3,080/pax' },
      { pax: '5 pax', price: '₱2,810/pax' },
      { pax: '6 pax', price: '₱2,660/pax' },
      { pax: '7 pax', price: '₱2,527/pax' },
      { pax: '8 pax', price: '₱2,467/pax' },
      { pax: '9 pax', price: '₱2,385/pax' },
      { pax: '10 pax', price: '₱2,320/pax' },
      { pax: '11 pax', price: '₱2,266/pax' },
      { pax: '12 pax', price: '₱2,221/pax' },
    ],
    blocks: [
      {
        heading: 'Itinerary — Private Bohol Countryside Tour',
        items: [
          'Ferry assistance / arrival coordination',
          'Chocolate Hills',
          'Tarsier viewing',
          'Man-made Forest',
          'Baclayon Church',
          'Blood Compact Shrine',
          'Private countryside tour setup',
          'Ferry return assistance',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Loboc River Cruise', 'ATV', 'Other Bohol side activities'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation in Bohol', 'Ferry assistance', 'Countryside tour', 'Guide assistance'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-city-moalboal-private',
    title: '2D1N City + Moalboal Private Tour',
    intro: 'Private Cebu City + Moalboal tour for your own group, with smoother pacing and private transportation.',
    pricing: [
      { pax: '1 pax', price: '₱13,450/pax' },
      { pax: '2 pax', price: '₱7,450/pax' },
      { pax: '3 pax', price: '₱5,600/pax' },
      { pax: '4 pax', price: '₱4,975/pax' },
      { pax: '5 pax', price: '₱4,400/pax' },
      { pax: '6 pax', price: '₱4,016/pax' },
      { pax: '7 pax', price: '₱3,885/pax' },
      { pax: '8 pax', price: '₱3,662/pax' },
      { pax: '9 pax', price: '₱3,488/pax' },
      { pax: '10 pax', price: '₱3,400/pax' },
      { pax: '11 pax', price: '₱3,145/pax' },
      { pax: '12 pax', price: '₱3,030/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Cebu City Tour',
        items: [
          'Pickup: Hotel/Airport 7:00 AM onwards',
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of Tour 5:00 PM onwards — Drop at Hotel',
        ],
      },
      {
        heading: 'Day 2 — Private Moalboal Tour',
        items: [
          'Private early morning pick-up',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Kawasan Falls', 'Canyoneering', 'Private group side activities'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Hotel coordination', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-city-oslob-private',
    title: '2D1N City + Oslob Private Tour',
    intro: 'Private Cebu City + Oslob tour for guests who want private transport, flexible pacing, and direct coordination.',
    pricing: [
      { pax: '1 pax', price: '₱13,800/pax' },
      { pax: '2 pax', price: '₱7,550/pax' },
      { pax: '3 pax', price: '₱5,616/pax' },
      { pax: '4 pax', price: '₱5,000/pax' },
      { pax: '5 pax', price: '₱4,390/pax' },
      { pax: '6 pax', price: '₱4,083/pax' },
      { pax: '7 pax', price: '₱3,885/pax' },
      { pax: '8 pax', price: '₱3,780/pax' },
      { pax: '9 pax', price: '₱3,561/pax' },
      { pax: '10 pax', price: '₱3,450/pax' },
      { pax: '11 pax', price: '₱3,343/pax' },
      { pax: '12 pax', price: '₱3,230/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Cebu City Tour',
        items: [
          'Pickup: Hotel/Airport 7:00 AM onwards',
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of Tour 5:00 PM onwards — Drop at Hotel',
        ],
      },
      {
        heading: 'Day 2 — Private Oslob Tour',
        items: [
          'Private early morning pick-up',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel Heritage',
          'Oslob Church',
          'Simala Church',
          'Carcar Pasalubong',
          'Souvenir',
          'Whale shark activity assistance',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark fee', 'Sumilon Island', 'Lechon stopover'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Hotel coordination', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-city-bohol-private',
    title: '2D1N City + Bohol Private Tour',
    intro: 'Private Cebu City + Bohol tour package with arranged transfers, ferry assistance, and countryside tour coordination.',
    pricing: [
      { pax: '1 pax', price: '₱11,900/pax' },
      { pax: '2 pax', price: '₱6,900/pax' },
      { pax: '3 pax', price: '₱5,383/pax' },
      { pax: '4 pax', price: '₱4,850/pax' },
      { pax: '5 pax', price: '₱4,390/pax' },
      { pax: '6 pax', price: '₱4,083/pax' },
      { pax: '7 pax', price: '₱3,978/pax' },
      { pax: '8 pax', price: '₱3,800/pax' },
      { pax: '9 pax', price: '₱3,661/pax' },
      { pax: '10 pax', price: '₱3,550/pax' },
      { pax: '11 pax', price: '₱3,504/pax' },
      { pax: '12 pax', price: '₱3,425/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Cebu City Tour',
        items: [
          'Pickup: Hotel/Airport 7:00am Onwards',
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
          'End of Tour 5PM Onwards — Drop at Hotel',
        ],
      },
      {
        heading: 'Day 2 — Private Bohol Countryside Tour',
        items: [
          'Pickup 3:00am Onwards — Drop at Cebu Pier',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of Tour 5PM Onwards — Drop at SM',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['ATV Ride', 'Loboc Cruise'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Ferry assistance', 'Guiding assistance', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-moalboal-oslob-private',
    title: '2D1N Moalboal + Oslob Private Tour',
    intro: 'Private Moalboal + Oslob tour for your own group with ocean adventures and private travel coordination.',
    pricing: [
      { pax: '1 pax', price: '₱12,350/pax' },
      { pax: '2 pax', price: '₱7,100/pax' },
      { pax: '3 pax', price: '₱5,500/pax' },
      { pax: '4 pax', price: '₱4,875/pax' },
      { pax: '5 pax', price: '₱4,400/pax' },
      { pax: '6 pax', price: '₱4,083/pax' },
      { pax: '7 pax', price: '₱3,978/pax' },
      { pax: '8 pax', price: '₱3,971/pax' },
      { pax: '9 pax', price: '₱3,644/pax' },
      { pax: '10 pax', price: '₱3,550/pax' },
      { pax: '11 pax', price: '₱3,454/pax' },
      { pax: '12 pax', price: '₱3,375/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Moalboal Tour',
        items: [
          'Private early morning pick-up',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
          'End of Tour 5PM Onwards',
        ],
      },
      {
        heading: 'Day 2 — Private Oslob Tour',
        items: [
          'Private early morning pick-up',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Souvenir',
          'Whale shark activity assistance',
          'End of Tour 6PM Onwards',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Canyoneering', 'Sumilon Island'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Driver assistance', 'Hotel coordination', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-moalboal-bohol-private',
    title: '2D1N Moalboal + Bohol Private Tour',
    intro: 'Private Moalboal + Bohol package with ocean activity, ferry assistance, and Bohol countryside tour.',
    pricing: [
      { pax: '1 pax', price: '₱12,950/pax' },
      { pax: '2 pax', price: '₱7,700/pax' },
      { pax: '3 pax', price: '₱6,100/pax' },
      { pax: '4 pax', price: '₱5,525/pax' },
      { pax: '5 pax', price: '₱5,040/pax' },
      { pax: '6 pax', price: '₱4,716/pax' },
      { pax: '7 pax', price: '₱4,600/pax' },
      { pax: '8 pax', price: '₱4,412/pax' },
      { pax: '9 pax', price: '₱4,266/pax' },
      { pax: '10 pax', price: '₱4,200/pax' },
      { pax: '11 pax', price: '₱4,100/pax' },
      { pax: '12 pax', price: '₱4,016/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Moalboal Tour',
        items: [
          'Private early morning pick-up',
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
          'End of Tour 5PM Onwards',
        ],
      },
      {
        heading: 'Day 2 — Private Bohol Countryside Tour',
        items: [
          'Pickup 3:00am Onwards — Drop at Cebu Pier',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Blood Compact',
          'End of Tour 6PM Onwards — Drop at SM',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['ATV Ride', 'Loboc Cruise'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Ferry assistance', 'Guide assistance', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '2d1n-oslob-bohol-private',
    title: '2D1N Oslob + Bohol Private Tour',
    intro: 'Private Oslob + Bohol tour for guests who want ocean adventure and Bohol countryside in one smooth package.',
    pricing: [
      { pax: '1 pax', price: '₱13,300/pax' },
      { pax: '2 pax', price: '₱7,800/pax' },
      { pax: '3 pax', price: '₱6,100/pax' },
      { pax: '4 pax', price: '₱5,550/pax' },
      { pax: '5 pax', price: '₱5,030/pax' },
      { pax: '6 pax', price: '₱4,683/pax' },
      { pax: '7 pax', price: '₱4,664/pax' },
      { pax: '8 pax', price: '₱4,450/pax' },
      { pax: '9 pax', price: '₱4,283/pax' },
      { pax: '10 pax', price: '₱4,200/pax' },
      { pax: '11 pax', price: '₱4,100/pax' },
      { pax: '12 pax', price: '₱4,016/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Oslob Tour',
        items: [
          'Private early morning pick-up',
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Car-car Pasalubong',
          'Souvenir',
          'Whale shark activity assistance',
          'End of Tour 6PM Onwards — Drop at Hotel',
        ],
      },
      {
        heading: 'Day 2 — Private Bohol Countryside Tour',
        items: [
          'Pickup 3:00am Onwards — Drop at Cebu Pier',
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'End of Tour 6PM Onwards — Drop at SM',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Whale shark fee', 'ATV Ride', 'Loboc Cruise'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Ferry assistance', 'Guiding assistance', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '3d2n-city-moalboal-oslob-private',
    title: '3D2N City + Moalboal + Oslob Private Tour',
    intro: 'Private 3D2N Cebu package covering Cebu City, Moalboal, and Oslob with hotel coordination and private transport.',
    note: 'Private 3D2N package is recommended for families, couples, and groups who want a complete Cebu experience.',
    pricing: [
      { pax: '1 pax', price: '₱17,800/pax' },
      { pax: '2 pax', price: '₱9,800/pax' },
      { pax: '3 pax', price: '₱7,433/pax' },
      { pax: '4 pax', price: '₱6,600/pax' },
      { pax: '5 pax', price: '₱5,900/pax' },
      { pax: '6 pax', price: '₱5,433/pax' },
      { pax: '7 pax', price: '₱5,285/pax' },
      { pax: '8 pax', price: '₱5,012/pax' },
      { pax: '9 pax', price: '₱4,800/pax' },
      { pax: '10 pax', price: '₱4,700/pax' },
      { pax: '11 pax', price: '₱4,554/pax' },
      { pax: '12 pax', price: '₱4,433/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Cebu City Tour',
        items: [
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
        ],
      },
      {
        heading: 'Day 2 — Private Moalboal Tour',
        items: [
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
        ],
      },
      {
        heading: 'Day 3 — Private Oslob Tour',
        items: [
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Souvenir',
          'Whale shark activity assistance',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Canyoneering', 'Sumilon Island'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Hotel accommodation coordination', 'Driver assistance', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '3d2n-moalboal-oslob-bohol-private',
    title: '3D2N Moalboal + Oslob + Bohol Private Tour',
    intro: 'Private 3D2N tour covering Moalboal, Oslob, and Bohol with ocean activities and countryside tour.',
    pricing: [
      { pax: '1 pax', price: '₱17,300/pax' },
      { pax: '2 pax', price: '₱10,050/pax' },
      { pax: '3 pax', price: '₱7,933/pax' },
      { pax: '4 pax', price: '₱7,150/pax' },
      { pax: '5 pax', price: '₱6,540/pax' },
      { pax: '6 pax', price: '₱6,316/pax' },
      { pax: '7 pax', price: '₱6,100/pax' },
      { pax: '8 pax', price: '₱6,000/pax' },
      { pax: '9 pax', price: '₱5,577/pax' },
      { pax: '10 pax', price: '₱5,500/pax' },
      { pax: '11 pax', price: '₱5,372/pax' },
      { pax: '12 pax', price: '₱5,266/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Moalboal Tour',
        items: [
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
        ],
      },
      {
        heading: 'Day 2 — Private Oslob Tour',
        items: [
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Simala Church',
          'Souvenir',
          'Whale shark activity assistance',
        ],
      },
      {
        heading: 'Day 3 — Private Bohol Countryside Tour',
        items: [
          'Chocolate Hills',
          'Man-made Forest',
          'Tarsier Conservation',
          'Baclayon Church',
          'Blood Compact',
          'ATV Ride',
          'Loboc Cruise',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Canyoneering', 'Sumilon Island', 'Whale shark fee'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Ferry assistance', 'Hotel accommodation coordination', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
  {
    id: '4d3n-cebu-bohol-private',
    title: '4D3N Cebu + Bohol Private Tour',
    pricing: [
      { pax: '1 pax', price: '₱21,000/pax' },
      { pax: '2 pax', price: '₱13,300/pax' },
      { pax: '3 pax', price: '₱10,416/pax' },
      { pax: '4 pax', price: '₱8,575/pax' },
      { pax: '5 pax', price: '₱8,290/pax' },
      { pax: '6 pax', price: '₱7,700/pax' },
      { pax: '7 pax', price: '₱7,507/pax' },
      { pax: '8 pax', price: '₱7,162/pax' },
      { pax: '9 pax', price: '₱6,894/pax' },
      { pax: '10 pax', price: '₱6,680/pax' },
      { pax: '11 pax', price: '₱6,504/pax' },
      { pax: '12 pax', price: '₱6,358/pax' },
    ],
    blocks: [
      {
        heading: 'Day 1 — Private Cebu City Tour',
        items: [
          'Temple of Leah',
          'Sirao Garden',
          'Taoist Temple',
          'Cebu Heritage Monument',
          "Magellan's Cross",
          'Sto. Niño Church',
          'Pasalubong Center',
          'CCLEX',
          '10K Roses',
        ],
      },
      {
        heading: 'Day 2 — Private Moalboal Tour',
        items: [
          'Coral Watching',
          'Snorkeling',
          'Dolphins Watching (seasonal)',
          'Sea Turtle Encounter',
          'Sardines Run',
          'Optional Kawasan Falls / Canyoneering',
        ],
      },
      {
        heading: 'Day 3 — Private Oslob Tour',
        items: [
          'Tumalog Falls',
          'Sumilon Island',
          'Oslob Cuartel heritage',
          'Oslob Church',
          'Car-car Pasalubong',
          'Simala Church',
          'Souvenir',
          'Whale shark activity assistance',
        ],
      },
      {
        heading: 'Day 4 — Private Bohol Countryside Tour',
        items: [
          'Chocolate Hills',
          'Man-made Forest',
          'Python',
          'Tarsier Conservation',
          'Butterfly',
          'Baclayon Church',
          'Souvenir Shop',
          'Blood Compact',
          'ATV Ride',
          'Loboc Cruise',
        ],
      },
      {
        heading: 'Optional Activities — Guest Expense',
        items: ['Canyoneering', 'Whale shark fee', 'ATV Ride', 'Loboc Cruise'],
      },
      {
        heading: 'Inclusions',
        items: ['Private transportation', 'Hotel accommodation coordination', 'Ferry assistance', 'Tour coordination'],
      },
      { heading: 'Exclusions', items: ['Optional activities', 'Food', 'Airfare', 'Personal expenses'] },
    ],
  },
];

export type TourRouteOption = {
  routeKey: string;
  label: string;
  joinerId: string;
  privateId: string;
};

const privateIdOverrides: Record<string, string> = {
  '4d3n-cebu-moalboal-oslob-bohol': '4d3n-cebu-bohol-private',
};

/** All tour routes for search dropdowns — derived from joiner packages. */
export const tourRouteOptions: TourRouteOption[] = joinerPackages.map((pkg) => {
  const routeKey = pkg.id.replace(/-joiner$/, '');
  return {
    routeKey,
    label: pkg.title.replace(/\s+Joiner$/, ''),
    joinerId: pkg.id,
    privateId: privateIdOverrides[routeKey] ?? `${routeKey}-private`,
  };
});

export function getPackageId(routeKey: string, type: 'joiner' | 'private'): string | undefined {
  const route = tourRouteOptions.find((r) => r.routeKey === routeKey);
  if (!route) return undefined;
  return type === 'joiner' ? route.joinerId : route.privateId;
}

export function getJoinerPackageById(id: string): JoinerPackage | undefined {
  return joinerPackages.find((p) => p.id === id);
}

export function getPrivatePackageById(id: string): PrivatePackage | undefined {
  return privatePackages.find((p) => p.id === id);
}

export function getPrivatePriceForPax(
  pkg: PrivatePackage,
  pax: number
): { pax: string; price: string } | undefined {
  return pkg.pricing.find((tier) => parseInt(tier.pax, 10) === pax);
}

export type BookingDetails = {
  packageId: string;
  routeKey: string;
  type: 'joiner' | 'private';
  title: string;
  price: string;
  priceNote: string;
  tourTypeLabel: string;
  durationLabel: string;
  nights: number;
};

export function extractDurationLabel(title: string): { label: string; nights: number } {
  const multi = title.match(/^(\d+)D(\d+)N/i);
  if (multi) {
    const nights = parseInt(multi[2], 10);
    return { label: `${multi[1]} Days / ${nights} Nights`, nights };
  }
  const single = title.match(/^(\d+)D/i);
  if (single) return { label: `${single[1]} Day tour`, nights: 0 };
  return { label: 'Day tour', nights: 0 };
}

export function getBookingDetailsByPackageId(packageId: string, pax = 2): BookingDetails | null {
  const isPrivate = packageId.endsWith('-private');
  const { label: durationLabel, nights } = extractDurationLabel(
    isPrivate
      ? getPrivatePackageById(packageId)?.title ?? ''
      : getJoinerPackageById(packageId)?.title ?? ''
  );

  if (isPrivate) {
    const pkg = getPrivatePackageById(packageId);
    if (!pkg) return null;
    const tier = getPrivatePriceForPax(pkg, pax);
    const fallback = pkg.pricing[pkg.pricing.length - 1];
    return {
      packageId,
      routeKey: packageId.replace(/-private$/, ''),
      type: 'private',
      title: pkg.title,
      price: tier?.price ?? fallback.price,
      priceNote: tier ? `for ${tier.pax}` : `from ${fallback.pax}`,
      tourTypeLabel: 'Private Tour',
      durationLabel,
      nights,
    };
  }

  const pkg = getJoinerPackageById(packageId);
  if (!pkg) return null;
  return {
    packageId,
    routeKey: packageId.replace(/-joiner$/, ''),
    type: 'joiner',
    title: pkg.title,
    price: pkg.price,
    priceNote: pkg.meta.join(' · '),
    tourTypeLabel: 'Joiner Tour',
    durationLabel,
    nights,
  };
}

export function getBookingUrl(opts: {
  packageId?: string;
  routeKey?: string;
  type?: 'joiner' | 'private';
  pax?: number;
}): string {
  const params = new URLSearchParams();
  if (opts.packageId) {
    params.set('pkg', opts.packageId);
  } else if (opts.routeKey && opts.type) {
    params.set('route', opts.routeKey);
    params.set('type', opts.type);
  }
  params.set('pax', String(opts.pax ?? 2));
  return `/contact?${params.toString()}`;
}

export function resolveBookingFromSearchParams(
  pkgParam: string | null,
  routeParam: string | null,
  typeParam: string | null,
  paxParam: string | null
): { details: BookingDetails | null; pax: number } {
  const pax = Math.min(12, Math.max(1, parseInt(paxParam || '2', 10) || 2));
  let packageId = pkgParam;
  if (!packageId && routeParam && (typeParam === 'joiner' || typeParam === 'private')) {
    packageId = getPackageId(routeParam, typeParam) ?? undefined;
  }
  if (!packageId) return { details: null, pax };
  return { details: getBookingDetailsByPackageId(packageId, pax), pax };
}
