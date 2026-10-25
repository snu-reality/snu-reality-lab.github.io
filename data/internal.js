// =================================================================
//  INTERNAL / LAB-MEMBER RESOURCES
//  -----------------------------------------------------------------
//  Edit this file to add / remove / update resources for lab members.
//  Order in this array = display order on /internal/.
//
//  Fields:
//    title       : display name
//    url         : Google Doc / Drive / Notion / Sheet / anything URL
//    description : short note shown next to the title
//    section     : which group it appears under (see INTERNAL_SECTIONS)
// =================================================================

window.INTERNAL_SECTIONS = [
  { id: "lab",     title: "Lab" },
  { id: "compute", title: "Servers & GPUs" },
  { id: "beta",    title: "Beta", note: "Work in progress — feedback welcome." }
];

window.INTERNAL_RESOURCES = [
  {
    section: "lab",
    title: "Onboarding",
    url: "https://docs.google.com/document/d/1-FMBRAyMRGtNk9Y9Q1OtUmYpeH-h-vj1hu421UvYSBE/edit?usp=sharing",
    description: "Welcome guide — read this first if you just joined the lab."
  },
  {
    section: "lab",
    title: "Lab Handbook",
    url: "https://docs.google.com/document/d/1Eqvjj1_XSiQXCjRgv8caJgvUUP8LCCjPJJ5T3dw6PfA?usp=drive_fs",
    description: "Living reference for how we work — IT, GitHub, drive, Slack, reimbursements."
  },
  {
    section: "lab",
    title: "Inventory",
    url: "https://docs.google.com/spreadsheets/d/14QED6zM396mHo-JgXRlwcIS7rcaocPWJ1_PusQa_BSY/edit?usp=sharing",
    description: "Lab equipment, optics, and shared hardware — check before ordering."
  },
  {
    section: "compute",
    title: "Server Guide",
    url: "https://docs.google.com/document/d/1sMuXIckfYZTRBHgxucS7vufapVNkfDwFWmHe3OgbXCI/edit?usp=sharing",
    description: "How to access and work on the lab GPU servers."
  },
  {
    section: "compute",
    title: "GPU Booking",
    url: "https://docs.google.com/spreadsheets/d/1Y5lcAoEz0zpomw4DQmJR2fiDgSPICsi5FahpHjUakG0/edit?usp=sharing",
    description: "Monthly GPU reservation calendar — write your name in the cells you need."
  },
  {
    section: "beta",
    title: "Recommended Courses at SNU",
    url: "https://docs.google.com/document/d/1vwshC7B1cxlNXKd5mOClYShwbBz1GL3cVaUctx77ZS0/edit?usp=sharing",
    description: "Courses we recommend taking at SNU, by topic."
  }
];
