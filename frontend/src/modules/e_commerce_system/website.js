export const website_config = [
  {
    name: "",
    path: "",
    icon: "fa fa-home",
    label: "Home",
    renderMode: "webpage",
    widgets: [
      {
        type: "hero-carousel",
        props: {
          carouselItems: [
            {
              title: "Welcome to Kent Innovations",
              subtitle: "Crafting Dreams into Reality",
              description: "Experience the fusion of Malawian tradition and modern architecture in every home we build.",
              imageUrl: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              imageAlt: "Modern House in Malawi",
              button: {
                label: "Explore Our Services",
                link: "/services",
                icon: "fa fa-tools",
              },
            },
            {
              title: "Innovative Designs, Timeless Homes",
              subtitle: "Where Comfort Meets Sustainability",
              description: "Our designs blend seamlessly with Malawi's natural beauty, creating homes that stand the test of time.",
              imageUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              imageAlt: "Sustainable Home Design",
              button: {
                label: "View Our Projects",
                link: "/projects",
                icon: "fa fa-project-diagram",
              },
            },
            {
              title: "Building Malawi's Future",
              subtitle: "One Home at a Time",
              description: "Join us in shaping Malawi's skyline with structures that reflect our nation's growth and aspirations.",
              imageUrl: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              imageAlt: "Construction in Progress",
              button: {
                label: "Meet Our Team",
                link: "/about",
                icon: "fa fa-users",
              },
            },
          ],
          autoplay: true,
          interval: 5000,
        },
      },
      {
        type: "cards",
        props: {
          title: "Our Expertise",
          cards: [
            {
              icon: "fa fa-home",
              title: "Residential Marvels",
              description: "From cozy bungalows to luxurious estates, we bring your dream home to life with a touch of Malawian charm.",
              link: "/services#residential",
            },
            {
              icon: "fa fa-building",
              title: "Commercial Wonders",
              description: "Elevate your business with our cutting-edge commercial spaces that blend functionality with aesthetic appeal.",
              link: "/services#commercial",
            },
            {
              icon: "fa fa-drafting-compass",
              title: "Visionary Designs",
              description: "Our architects craft unique designs that tell your story while embracing Malawi's rich cultural heritage.",
              link: "/services#design",
            },
            {
              icon: "fa fa-hammer",
              title: "Transformative Renovations",
              description: "Breathe new life into your space with our innovative renovation solutions, merging the old with the new.",
              link: "/services#renovations",
            },
          ],
        },
      },
      {
        type: "testimonial",
        props: {
          quote: "Kent Innovations turned our dream into a reality. Their attention to detail and commitment to quality is unmatched. Our home is not just a house, it's a masterpiece that reflects our personality and Malawi's beauty.",
          author: "Chifundo Banda",
          position: "Proud Homeowner",
          imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      },
      {
        type: "team",
        props: {
          title: "The Visionaries Behind Kent Innovations",
          members: [
            {
              name: "Chisomo Banda",
              position: "Founder & CEO",
              imageUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
              name: "Tadala Mwale",
              position: "Chief Architect",
              imageUrl: "https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
            {
              name: "Kondwani Phiri",
              position: "Head of Construction",
              imageUrl: "https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            },
          ],
        },
      },
      {
        type: "cta",
        props: {
          title: "Ready to Build Your Malawian Dream?",
          description: "Let's embark on a journey to create a home that celebrates your vision and Malawi's spirit. Our team is ready to bring your ideas to life.",
          button: {
            label: "Start Your Project",
            link: "/contact",
            icon: "fa fa-envelope",
          },
          backgroundColor: "bg-secondary",
        },
      },
    ],
  },
  {
    name: "services",
    path: "services",
    icon: "fa fa-tools",
    label: "Services",
    renderMode: "webpage",
    widgets: [
      {
        type: "hero",
        props: {
          title: "Our Services",
          subtitle: "Building Excellence in the Heart of Africa",
          imageUrl: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          imageAlt: "Construction Site in Malawi",
          button: {
            label: "Explore Our Offerings",
            link: "#services-list",
            icon: "fa fa-list",
          },
        },
      },
      {
        type: "cards",
        props: {
          title: "Tailored Solutions for Every Need",
          cards: [
            {
              icon: "fa fa-home",
              title: "Residential Construction",
              description: "Experience the joy of coming home to a space that's uniquely yours, built with the finest Malawian craftsmanship.",
              link: "#residential",
            },
            {
              icon: "fa fa-building",
              title: "Commercial Construction",
              description: "Create inspiring workspaces that boost productivity and reflect your company's vision in the heart of Malawi.",
              link: "#commercial",
            },
            {
              icon: "fa fa-drafting-compass",
              title: "Architectural Design",
              description: "Our designs blend modern aesthetics with Malawian cultural elements, creating spaces that tell your unique story.",
              link: "#design",
            },
            {
              icon: "fa fa-hammer",
              title: "Renovations & Remodeling",
              description: "Breathe new life into your existing space with our expert renovation services, tailored to Malawi's unique climate and lifestyle.",
              link: "#renovations",
            },
          ],
        },
      },
      {
        type: "pricing",
        props: {
          title: "Our Service Packages",
          description: "Choose the perfect package for your construction needs",
          plans: [
            {
              name: "Basic Build",
              price: "MWK 15,000,000",
              period: "starting from",
              features: [
                "Standard house design",
                "Quality local materials",
                "3-month completion time",
                "1-year warranty",
              ],
              button: {
                label: "Get Started",
                link: "/contact",
              },
              highlighted: false,
            },
            {
              name: "Premium Construction",
              price: "MWK 25,000,000",
              period: "starting from",
              features: [
                "Custom architectural design",
                "Premium materials",
                "5-month completion time",
                "3-year warranty",
                "Energy-efficient features",
              ],
              button: {
                label: "Choose Premium",
                link: "/contact",
              },
              highlighted: true,
            },
            {
              name: "Luxury Development",
              price: "MWK 40,000,000",
              period: "starting from",
              features: [
                "Bespoke luxury design",
                "Imported high-end materials",
                "7-month completion time",
                "5-year warranty",
                "Smart home integration",
                "Landscaping included",
              ],
              button: {
                label: "Go Luxury",
                link: "/contact",
              },
              highlighted: false,
            },
          ],
        },
      },
    ],
  },
  {
    name: "projects",
    path: "projects",
    icon: "fa fa-project-diagram",
    label: "Projects",
    renderMode: "webpage",
    widgets: [
      {
        type: "gallery",
        props: {
          title: "Our Proudest Achievements",
          images: [
            {
              url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              alt: "Luxury Villa in Lilongwe",
              caption: "Serenity Heights: A modern oasis in the heart of Lilongwe",
            },
            {
              url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              alt: "Commercial Building in Blantyre",
              caption: "Blantyre Business Hub: Redefining the city's skyline",
            },
            {
              url: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              alt: "Residential Complex in Mzuzu",
              caption: "Green Haven: Sustainable living in the heart of Mzuzu",
            },
          ],
        },
      },
    ],
  },
  {
    name: "about",
    path: "about",
    icon: "fa fa-info-circle",
    label: "About Us",
    renderMode: "webpage",
    widgets: [
      {
        type: "hero",
        props: {
          title: "The Kent Innovations Story",
          subtitle: "Building Malawi's Future, One Structure at a Time",
          imageUrl: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          imageAlt: "Kent Innovations Team",
          button: {
            label: "Discover Our Journey",
            link: "#our-story",
            icon: "fa fa-book",
          },
        },
      },
      {
        type: "timeline",
        props: {
          title: "Our Journey of Growth and Innovation",
          events: [
            {
              year: "2010",
              title: "A Vision Takes Shape",
              description: "Kent Innovations is born from a dream to revolutionize Malawi's construction industry.",
            },
            {
              year: "2015",
              title: "Expanding Our Horizons",
              description: "We open our second office in Blantyre, bringing our innovative designs to more of Malawi.",
            },
            {
              year: "2020",
              title: "Embracing Sustainability",
              description: "Launch of our 'Green Malawi' initiative, focusing on eco-friendly construction practices.",
            },
            {
              year: "2023",
              title: "Recognition of Excellence",
              description: "Awarded 'Best Innovative Construction Company' at the Malawi Business Awards.",
            },
          ],
        },
      },

    ],
  },
];