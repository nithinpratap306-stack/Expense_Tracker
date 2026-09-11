export const DEFAULT_USER = {
  name: "Nithin Pratap",
  role: "Computer Science Undergrad",
  university: "College of Engineering",
  email: "nithin.pratap@campus.edu",
  currency: "INR",
  currencySymbol: "₹"
};

export const SEED_EXPENSES = [
  // --- September 2026 (Current Month) — Total: Exactly ₹4,760 ---
  {
    id: "exp-001",
    title: "Lunch",
    amount: 120,
    category: "Food",
    date: "2026-09-08",
    paymentMethod: "UPI",
    note: "Campus canteen lunch combo"
  },
  {
    id: "exp-002",
    title: "Bus",
    amount: 40,
    category: "Transport",
    date: "2026-09-07",
    paymentMethod: "Cash",
    note: "Campus to city library transit"
  },
  {
    id: "exp-003",
    title: "Data Structures Book",
    amount: 350,
    category: "Education",
    date: "2026-09-11", // Sep 11 item for 300 + 350 = 650 peak day
    paymentMethod: "UPI",
    note: "Second-hand copy from senior"
  },
  {
    id: "exp-004",
    title: "Spotify Student Plan",
    amount: 59,
    category: "Subscriptions",
    date: "2026-09-05",
    paymentMethod: "Debit Card",
    note: "Monthly student auto-debit"
  },

  // Sep 4 Peak Day: 380 + 400 = ₹780
  {
    id: "exp-005",
    title: "Hostel Canteen Snacks",
    amount: 380,
    category: "Food",
    date: "2026-09-04",
    paymentMethod: "UPI",
    note: "Evening study session group treats"
  },
  {
    id: "exp-006",
    title: "Algorithms Reference Guide",
    amount: 400,
    category: "Education",
    date: "2026-09-04",
    paymentMethod: "UPI",
    note: "Required textbook for midterm"
  },

  // Early September
  {
    id: "exp-007",
    title: "Metro Smartcard Recharge",
    amount: 300,
    category: "Transport",
    date: "2026-09-03",
    paymentMethod: "UPI",
    note: "Bi-weekly metro card top-up"
  },
  {
    id: "exp-008",
    title: "Movie Ticket (Late Show)",
    amount: 250,
    category: "Entertainment",
    date: "2026-09-02",
    paymentMethod: "UPI",
    note: "Weekend film with roommates"
  },
  {
    id: "exp-009",
    title: "Quick Breakfast & Chai",
    amount: 60,
    category: "Food",
    date: "2026-09-02",
    paymentMethod: "Cash",
    note: "College tea stall"
  },
  {
    id: "exp-010",
    title: "Hostel Laundry Tokens",
    amount: 150,
    category: "Accommodation",
    date: "2026-09-01",
    paymentMethod: "Cash",
    note: "Washer/dryer prepaid tokens"
  },

  // Sep 11 Peak Day: 300 + 350 = ₹650
  {
    id: "exp-011",
    title: "Weekend Dinner Outing",
    amount: 300,
    category: "Food",
    date: "2026-09-11",
    paymentMethod: "UPI",
    note: "Dinner with project group"
  },

  // Mid September
  {
    id: "exp-012",
    title: "Shared Auto Fare",
    amount: 80,
    category: "Transport",
    date: "2026-09-12",
    paymentMethod: "Cash",
    note: "Station to campus ride"
  },
  {
    id: "exp-013",
    title: "Gaming Cafe Session",
    amount: 200,
    category: "Entertainment",
    date: "2026-09-13",
    paymentMethod: "UPI",
    note: "Counter-Strike tournament"
  },
  {
    id: "exp-014",
    title: "Campus Stationery & Records",
    amount: 100,
    category: "Education",
    date: "2026-09-14",
    paymentMethod: "UPI",
    note: "Lab record sheets & graph papers"
  },
  {
    id: "exp-015",
    title: "Hostel Room Cleaning Supplies",
    amount: 150,
    category: "Accommodation",
    date: "2026-09-15",
    paymentMethod: "UPI",
    note: "Floor cleaner & dustbin bags"
  },
  {
    id: "exp-016",
    title: "GitHub Copilot Student Pack",
    amount: 181,
    category: "Subscriptions",
    date: "2026-09-16",
    paymentMethod: "Credit Card",
    note: "Coding assistant recurring"
  },

  // Sep 18 Peak Day: 450 + 70 = ₹520
  {
    id: "exp-017",
    title: "Campus Printouts & Binding",
    amount: 70,
    category: "Other",
    date: "2026-09-18",
    paymentMethod: "Cash",
    note: "Seminar report printouts"
  },
  {
    id: "exp-018",
    title: "Canvas Sneakers Clearance",
    amount: 450,
    category: "Shopping",
    date: "2026-09-18",
    paymentMethod: "UPI",
    note: "College everyday shoes"
  },

  // Late September
  {
    id: "exp-019",
    title: "Hostel Mess Dosa Night",
    amount: 90,
    category: "Food",
    date: "2026-09-20",
    paymentMethod: "Cash",
    note: "Special dinner coupon"
  },
  {
    id: "exp-020",
    title: "Auto to Tech Park Hackathon",
    amount: 200,
    category: "Transport",
    date: "2026-09-21",
    paymentMethod: "UPI",
    note: "Inter-college event commute"
  },
  {
    id: "exp-021",
    title: "Badminton Court Booking",
    amount: 250,
    category: "Entertainment",
    date: "2026-09-22",
    paymentMethod: "UPI",
    note: "Sports complex booking"
  },
  {
    id: "exp-022",
    title: "Coffee & Study Group Sandwiches",
    amount: 200,
    category: "Food",
    date: "2026-09-24",
    paymentMethod: "UPI",
    note: "Library cafe group prep"
  },
  {
    id: "exp-023",
    title: "Pharmacy & Paracetamol",
    amount: 80,
    category: "Other",
    date: "2026-09-25",
    paymentMethod: "Cash",
    note: "Flu medicines"
  },
  {
    id: "exp-024",
    title: "Juice & Evening Samosas",
    amount: 300,
    category: "Food",
    date: "2026-09-27",
    paymentMethod: "Cash",
    note: "Campus canteen hangout"
  },

  // --- August 2026 (Previous Month) — Total: Exactly ₹5,420 ---
  {
    id: "exp-prev-001",
    title: "College Semester Registration",
    amount: 1200,
    category: "Education",
    date: "2026-08-04",
    paymentMethod: "NetBanking",
    note: "Lab & library card fees"
  },
  {
    id: "exp-prev-002",
    title: "Hostel Room Setup & Curtains",
    amount: 850,
    category: "Accommodation",
    date: "2026-08-06",
    paymentMethod: "UPI",
    note: "Bedding & room essentials"
  },
  {
    id: "exp-prev-003",
    title: "Textbooks Semester 5",
    amount: 950,
    category: "Education",
    date: "2026-08-10",
    paymentMethod: "UPI",
    note: "DBMS & OS textbooks"
  },
  {
    id: "exp-prev-004",
    title: "Welcome Party Treat",
    amount: 680,
    category: "Entertainment",
    date: "2026-08-14",
    paymentMethod: "UPI",
    note: "Hostel batch treat"
  },
  {
    id: "exp-prev-005",
    title: "Monthly Mess Advance",
    amount: 1100,
    category: "Food",
    date: "2026-08-18",
    paymentMethod: "UPI",
    note: "Special food coupons"
  },
  {
    id: "exp-prev-006",
    title: "Metro Monthly Recharge",
    amount: 450,
    category: "Transport",
    date: "2026-08-22",
    paymentMethod: "UPI",
    note: "Student pass recharge"
  },
  {
    id: "exp-prev-007",
    title: "Emergency Campus Medicals",
    amount: 190,
    category: "Other",
    date: "2026-08-28",
    paymentMethod: "Cash",
    note: "First aid supplies"
  }
];

export const MOCK_EXPENSES = SEED_EXPENSES;
