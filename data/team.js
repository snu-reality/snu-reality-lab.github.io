// =================================================================
//  TEAM MEMBERS
//  -----------------------------------------------------------------
//  Edit this file to add / remove / update lab members.
//
//  Each member has:
//    id          : unique slug (used for view-transition matching)
//    name        : full name
//    role        : 신분 (e.g., "Principal Investigator", "PhD Student",
//                  "MS Student", "Incoming grad student",
//                  "Undergraduate Researcher", "Visiting Scholar")
//    photo       : path or URL to portrait photo
//    link        : (optional) personal page URL
//    facePosition: where this person's face sits in the landing group
//                  photo. All values are PERCENTAGES of the photo box.
//                    left   : % from photo's left edge to face center
//                    top    : % from photo's top edge to face center
//                    size   : face crop size as % of photo width
//
//  TIP for facePosition: when you swap in a real group photo, hover
//  over each face, eyeball x/y, and nudge until the overlay sits on it.
// =================================================================

window.TEAM_MEMBERS = [
  {
    id: "suyeon",
    name: "Suyeon Choi",
    role: "Faculty | Group Leader",
    photo: "https://choisuyeon.github.io/assets/images/profile2.jpg",
    link: "https://choisuyeon.github.io/",
    email: "suyeon.choi@snu.ac.kr",
    facePosition: { left: 62, top: 50, size: 8 }
  },
  {
    id: "jinwoo",
    name: "Jinwoo Lee",
    role: "Incoming Graduate Student",
    photo: "",
    link: "https://scholar.google.com/citations?user=Nn5VCx0AAAAJ",
    facePosition: { left: 38, top: 50, size: 8 }
  },
  {
    id: "yujin",
    name: "Yujin Kim",
    role: "Incoming Graduate Student",
    photo: "",
    link: "https://scholar.google.com/citations?user=d3bHAWMAAAAJ",
    facePosition: { left: 50, top: 45, size: 10 }
  }
];

// =================================================================
//  "Interested in joining us?" copy.
//  One entry per sentence — each becomes its own paragraph.
//  "Suyeon" is auto-linked to suyeon.choi@snu.ac.kr on render.
// =================================================================
window.TEAM_JOIN_COPY = [
  "If you're already at SNU as an undergraduate, the best way to get involved is to take the <a href=\"../class/computational-imaging/\" target=\"_blank\" rel=\"noopener\">Computational Imaging course</a>! If you'd like to intern or join the lab, please email Suyeon with a short note on your research interests.",
  "If you're outside SNU and interested in joining or collaborating, please reach out to Suyeon via email with a short note on your research interests."
];
