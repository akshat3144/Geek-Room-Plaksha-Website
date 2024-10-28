const blogData = {
  newsletters: [
    {
      title: "#01",
      slug: "newsletters",
      thumbnail: "/images/newsletters/01.png",
      shortDescription:
        "Latest tech updates featuring Google's nuclear-powered AI centers, Meta's MovieGen AI breakthrough, SpaceX's innovative rocket recovery system, and FTC's new subscription cancellation rules.",
      tags: [
        { label: "Technology" },
        { label: "AI" },
        { label: "Space" },
        { label: "Energy" },
        { label: "Consumer Rights" }
      ],
      authors: [
        {
          username: "Kuhuk",
          name: "Kuhuk",
          image: "/images/team/kuhuk.png"
        },
        {
          username: "Shreya",
          name: "Shreya",
          image: "/images/team/shreya.png"
        },
        {
          username: "Proshita",
          name: "Proshita",
          image: "/images/team/proshita.png"
        },
        {
          username: "Trinav",
          name: "Trinav",
          image: "/images/team/trinav.jpg"
        }
      ],
      date: "2024-10-25T00:00:00Z",
      link: "https://www.instagram.com/p/DBjMB8fSlmF/?img_index=1"
    }
  ],
  blogs: [
    {
      title: "Blog 1",
      slug: "blogs",
      thumbnail: "/images/blog1.png",
      shortDescription: "This is a short description of blog 1.",
      tags: [{ label: "Tag5" }, { label: "Tag6" }],
      authors: [
        {
          username: "author3",
          name: "Author 3",
          image: "/images/author3.png"
        }
      ],
      date: "2023-10-03T00:00:00Z"
    }
  ],
  devlogs: [
    {
      title: "Boids Simulation",
      slug: "devlogs",
      thumbnail: "/images/devlog1.png",
      shortDescription:
        "Discover the fascinating world of Boids simulation by Craig Reynolds, where computational design meets nature. Watch as virtual birds follow simple rules to create complex, organic flocking patterns, demonstrating the beautiful emergence of collective behavior through code.",
      tags: [
        { label: "Unity" },
        { label: "Computational Design" },
        { label: "Emergent Behaviour" }
      ],
      authors: [
        {
          username: "Suraj",
          name: "Suraj",
          image: "/images/team/suraj.jpg"
        }
      ],
      date: "2024-10-04T00:00:00Z"
    }
  ]
};

export default blogData;
