/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("events").del();

  // Inserts seed entries
  await knex("events").insert([
    {
      event_name: "Tech Expo 2024",
      description: "A major tech expo showcasing innovative technologies.",
      start_date: "2024-11-20 09:00:00",
      location: "San Francisco, CA",
      status: "UPCOMING", // Corrected from 'UPCOMIG'
      ticket_price: 200,
      event_logo: "tech_expo_logo.png",
      event_poster: "tech_expo_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Music Fest",
      description: "An outdoor music festival featuring top artists.",
      start_date: "2024-09-10 15:00:00",
      location: "Los Angeles, CA",
      status: "PAST",
      ticket_price: 120,
      event_logo: "music_fest_logo.png",
      event_poster: "music_fest_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Startup Pitch Night",
      description: "An event for startups to pitch their ideas to investors.",
      start_date: "2024-12-05 18:00:00",
      location: "New York, NY",
      status: "UPCOMING", // Corrected from 'UPCOMIG'
      ticket_price: 100,
      event_logo: "pitch_night_logo.png",
      event_poster: "pitch_night_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Food Truck Festival",
      description: "A celebration of street food and gourmet food trucks.",
      start_date: "2024-07-15 12:00:00",
      location: "Austin, TX",
      status: "PAST",
      ticket_price: 50,
      event_logo: "food_truck_logo.png",
      event_poster: "food_truck_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Fashion Week",
      description: "An exclusive fashion event featuring top designers.",
      start_date: "2024-10-01 10:00:00",
      location: "Paris, France",
      status: "ONGOING",
      ticket_price: 300,
      event_logo: "fashion_week_logo.png",
      event_poster: "fashion_week_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Marathon 2024",
      description: "Annual city marathon for runners of all levels.",
      start_date: "2024-04-25 07:00:00",
      location: "Boston, MA",
      status: "PAST",
      ticket_price: 80,
      event_logo: "marathon_logo.png",
      event_poster: "marathon_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Film Festival",
      description: "An international film festival showcasing indie films.",
      start_date: "2024-08-20 14:00:00",
      location: "Cannes, France",
      status: "PAST",
      ticket_price: 250,
      event_logo: "film_festival_logo.png",
      event_poster: "film_festival_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "AI Summit",
      description: "A summit discussing the future of artificial intelligence.",
      start_date: "2024-10-20 09:30:00",
      location: "Seattle, WA",
      status: "UPCOMING", // Corrected from 'UPCOMIG'
      ticket_price: 180,
      event_logo: "ai_summit_logo.png",
      event_poster: "ai_summit_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Gaming Convention",
      description: "A convention for gamers, streamers, and developers.",
      start_date: "2024-09-15 10:00:00",
      location: "Las Vegas, NV",
      status: "PAST",
      ticket_price: 150,
      event_logo: "gaming_convention_logo.png",
      event_poster: "gaming_convention_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "Startup Bootcamp",
      description: "A week-long bootcamp for aspiring entrepreneurs.",
      start_date: "2024-11-05 08:00:00",
      location: "Silicon Valley, CA",
      status: "UPCOMING", // Corrected from 'UPCOMIG'
      ticket_price: 500,
      event_logo: "startup_bootcamp_logo.png",
      event_poster: "startup_bootcamp_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};