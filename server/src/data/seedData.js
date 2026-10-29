const programsData = [
  {
    title: "Millet Nutrition & Food Security",
    hindiTitle: "Bhojan Vikas Karyakram (भोजन विकास कार्यक्रम)",
    category: "food-nutrition",
    description: "We educate rural women in the Joshimath block about the rich nutritional values and health benefits of traditional crops like millets and local pulses. Through expert-led recipe workshops and community sessions, we actively encourage healthy food habits and local agricultural sustainability.",
    image: "/Images/millet/015.webp",
    tag: "Bhojan Vikas Karyakram",
    slug: "millet-nutrition",
    order: 1,
    highlights: [
      "Traditional millet culinary and nutrition workshops",
      "Nutritional awareness drives for women and children",
      "Local recipe preservation and healthy dietary practices"
    ]
  },
  {
    title: "Traditional Seed Conservation",
    hindiTitle: "Beej Sanrakhshan Karyakram (बीज संरक्षण कार्यक्रम)",
    category: "agriculture",
    description: "We collect and preserve indigenous seed varieties from high-altitude Himalayan villages across Uttarakhand. By safeguarding these genetic resources and distributing them to progressive farmers, we protect agricultural biodiversity and combat climate vulnerability.",
    image: "/Images/IHBT/003.webp",
    tag: "Beej Sanrakhshan Karyakram",
    slug: "seed-conservation",
    order: 2,
    highlights: [
      "Collection of 30+ indigenous high-altitude Himalayan seed varieties",
      "Community seed banks and farmer exchanges",
      "Preservation of climate-resilient organic strains"
    ]
  },
  {
    title: "Environmental Awareness & Education",
    hindiTitle: "Paryavaran Jagrukta Karyakram (पर्यावरण जागरूकता कार्यक्रम)",
    category: "environment",
    description: "Inspiring youth and communities through interactive webinars, expert lectures, and student activities (painting, quizzes, essay writing). We actively celebrate National Wildlife Week, World Wetlands Day, National Science Day, World Water Day, and Earth Day.",
    image: "/Images/Environment/024.webp",
    tag: "Paryavaran Jagrukta Karyakram",
    slug: "environment-awareness",
    order: 3,
    highlights: [
      "Interactive youth eco-clubs & awareness seminars",
      "Celebrations of World Environment Day & Water Day",
      "Waste segregation and river conservation drives"
    ]
  },
  {
    title: "Cultural Heritage Conservation",
    hindiTitle: "Lok Sanskriti Sanrakshan (लोक संस्कृति संरक्षण)",
    category: "culture",
    description: "Focusing on the Painkhanda (Joshimath) Development Block in Phase I, we document, archive, and promote tangible and intangible Pahadi assets—including folk music, traditional instruments like the Dhol, rituals, and folklore—in partnership with cultural institutions.",
    image: "/Images/CULTURAL/009.webp",
    tag: "Lok Sanskriti Sanrakshan",
    slug: "cultural-heritage",
    order: 4,
    highlights: [
      "Documentation of ancient Dhol beats and ritual lore",
      "Promotion of folk songs, Chanchari, and oral traditions",
      "Revival of traditional handicraft techniques"
    ]
  }
];

const productsData = [
  {
    name: "Pickles & Chutney Powders",
    category: "pickles",
    description: "Authentic garlic, mixed vegetable, lemon, and stuffed chilli pickles, alongside instant dried mountain chutney blends (Bhangjeera, Pudina, Sesame).",
    image: "/Images/products/Pickle/mixed pickle.jpg",
    priceInfo: "Handcrafted in small batches • Fresh harvest",
    featured: true,
    items: ["Garlic Pickle", "Mixed Vegetable Pickle", "Mountain Lemon", "Bhangjeera Chutney Powder"]
  },
  {
    name: "Pahadi Salt (पिस्यू लूँन)",
    category: "spices",
    description: "Traditional rock salt ground on Silbatta with organic seeds and herbs. Available in Hemp seed, Flax seed, Bhangjeera, Garlic/Coriander, Sesame, and Timur flavors.",
    image: "/Images/products/Namak/garlic-corriander hara namak.jpg",
    priceInfo: "100% Rock salt & organic herbs",
    featured: true,
    items: ["Hemp Seed Salt", "Hara Namak (Garlic/Coriander)", "Bhangjeera Salt", "Timur Mountain Salt"]
  },
  {
    name: "Himalayan Pulses & Rajma",
    category: "pulses",
    description: "Pure, chemical-free Chakrata Rajma, Rajma Chhemi, Gehat (Horse gram), Black Gram (Urad), and Yellow/Black Soyabean from high-altitude farms.",
    image: "/Images/products/Badi-Daal/mix-dal.jpg",
    priceInfo: "Organically grown at 2,000m+ elevation",
    featured: true,
    items: ["Chakrata Red Rajma", "Gehat (Horse Gram)", "Bhatt (Black Soyabean)", "Urad Dal"]
  },
  {
    name: "Badi, Flours & Ladoos",
    category: "grains",
    description: "Handcrafted Urad, Moong, and Mixed Dal Badis, organic millet and wheat flours, roasted Chausa blends, and wholesome Manduwa (Ragi) ladoos.",
    image: "/Images/products/Roti/wheat-flour.jpg",
    priceInfo: "Sun-dried & stone-milled",
    featured: true,
    items: ["Manduwa Flour (Finger Millet)", "Urad Badi", "Jhangora (Barnyard Millet)", "Roasted Chausa"]
  },
  {
    name: "Herbal Dhoop & Sacred Goods",
    category: "wellness",
    description: "Hand-rolled organic medicinal herbal dhoop packets, sun-dried apple slices, and pure Gangotri Gangajal sourced directly from the Himalayas.",
    image: "/Images/products/Dhoop and medicinal herbs/medicinal dhoop.jpg",
    priceInfo: "Pure forest herbs & natural resins",
    featured: true,
    items: ["Medicinal Herbal Dhoop", "Gangotri Gangajal", "Dried Mountain Apples"]
  },
  {
    name: "Handcrafted Souvenirs & Art",
    category: "handicrafts",
    description: "Hand-painted keychains and fridge magnets showcasing Uttarakhand heritage, custom canvas mountain paintings, and crochet accessories.",
    image: "/Images/products/handcrafted souvenirs.webp",
    priceInfo: "Handcrafted by Himalayan women artisans",
    featured: true,
    items: ["Heritage Fridge Magnets", "Hand-painted Keychains", "Crochet Accessories", "Canvas Paintings"]
  }
];

const teamData = [
  {
    name: "Dr. Nand Kishore Hatwal",
    role: "President",
    bio: "Dr. Nand Kishore Hatwal is an acclaimed author, scholar, poet, artist, and folklorist from Dehradun, Uttarakhand, with over four decades of experience in documenting and preserving the rich folk culture, traditions, and social realities of the Himalayan region. He has done PhD in Economics. wrote the story, songs, and Garhwali dialogues for the critically noted film Dholi, directed by Dinesh P. Bhonsle, which explores social equality and the cultural significance of the Dholi community. His literary contributions include Bhaymukt Bugyal tatha Anya Kahaniya (2021) and Chanchari, a collection of Uttarakhandi folk songs. Through his scholarship and creative work, he has made significant contributions to the preservation and promotion of Uttarakhand's intangible cultural heritage. As the President of HIMWAL Society, he provides leadership and guidance to the organization's efforts in safeguarding Himalayan cultural traditions, promoting indigenous knowledge, and supporting sustainable community development.",
    image: "/Images/about/1.webp",
    isAdvisor: false,
    order: 1
  },
  {
    name: "Dr. Deepika Dimri",
    role: "Founder & Scientist",
    bio: "Dr. Deepika Dimri is an environmental scientist, researcher, and academician with a Ph.D. in Environmental Science from Doon University, Dehradun. She is the Founder of HIMWAL (Himalayan Women, Awareness and Livelihood Society), an organization dedicated to biodiversity conservation, sustainable natural resource management, preservation of Himalayan traditional knowledge, and empowering rural communities, particularly women, through science and technology-based livelihood initiatives. With research experience at prestigious institutions in India and abroad, including IIT Delhi, UCOST, and the University of Pannonia, Hungary, her expertise encompasses water quality, limnology, climate change, biodiversity, and sustainable Himalayan livelihoods. She has contributed to several national and international research publications and currently serves as a Visiting Faculty at Graphic Era Hill University, Dehradun. As Principal Investigator of research projects supported by UCOST, she actively works towards integrating scientific innovation with indigenous knowledge to promote environmental sustainability, community development, and livelihood opportunities in the Himalayan region.",
    image: "/Images/about/2.webp",
    isAdvisor: false,
    order: 2
  },
  {
    name: "Dr. Shalini",
    role: "Project Coordinator",
    bio: "Shalini is currently working as a Project Coordinator at the HIMWAL Research Organization in Uttarakhand, where she assists with environmental conservation projects. Her work at HIMWAL involves water quality assessment, livelihood programs, waste management, and guiding communities on the sustainable use of natural resources. She also conducts environmental awareness programs for school students regarding stewardship in the Himalayan region. Alongside her role at HIMWAL, she is pursuing her PhD at Lovely Professional University, focusing her research on wastewater treatment. Her extensive background includes previous research and internships with organizations like USAID (IPE Global), the University of Stirling, and the Wildlife Institute of India. Furthermore, she has contributed to academic literature through co-authored book chapters and research papers addressing environmental issues.",
    image: "/Images/about/3.webp",
    isAdvisor: false,
    order: 3
  },
  {
    name: "Mr. Utkarsh Semalti",
    role: "Operations and Outreach Associate, Co-Founder",
    bio: "Utkarsh is a dedicated professional currently serving as an Operations and Outreach Associate at HIMWAL (Himalayan Women Awareness and Livelihood Society). In this role, he has been actively involved in community development and livelihood initiatives. His professional journey reflects a strong commitment to impactful grassroots work and stakeholder engagement. Academically, Utkarsh has a distinguished background having completed his integrated bachelor's program (IPM) from IIM Indore. Building on this strong foundation, he is currently pursuing his MBA at IIM Ahmedabad. During his academic journey, he has demonstrated exceptional scholastic achievements, including scoring a high percentile in the CAT examination.",
    image: "/Images/about/4.webp",
    isAdvisor: false,
    order: 4
  },
  {
    name: "Ms. Pragya Semalti",
    role: "IT and Digital Operations Associate",
    bio: "Pragya is currently pursuing her B.Tech in Electronics and Communication Engineering at the College of Technology, GBPUA&T, Pantnagar. She began her journey with HIMWAL as a student volunteer and now serves as their IT and Digital Operation Associate. Her professional background includes valuable internship experience working with the Uttarakhand Space Application Center.",
    image: "/Images/about/5.webp",
    isAdvisor: false,
    order: 5
  },
  {
    name: "Mr. Saurav Singh Negi",
    role: "Technical Member",
    bio: "Drives web technologies, technical infrastructure, and software solutions for HIMWAL. Saurav develops digital platforms and interactive features that empower the organization's outreach, data-driven initiatives, and online educational resources.",
    image: "/Images/about/10.webp",
    isAdvisor: false,
    order: 6
  },
  {
    name: "Mr. Aakash Singh Mahori",
    role: "Technical Member",
    bio: "Contributes to technical development, digital systems, and website maintenance. Aakash specializes in developing scalable digital tools, ensuring platform performance, and supporting technological integration for community-facing projects.",
    image: "/Images/about/11.webp",
    isAdvisor: false,
    order: 7
  },
  // Advisors
  {
    name: "Shri Chandi Prasad Bhatt",
    role: "Principal Advisor",
    bio: "Shri Chandi Prasad Bhatt is a renowned Indian environmentalist, Gandhian social activist, and pioneer of the historic Chipko Movement in Uttarakhand. He is widely recognized for his remarkable contribution to forest conservation, environmental protection, and sustainable development in the Himalayan region. Through his leadership, he promoted nonviolent community-based movements to protect forests from deforestation and exploitation. He has dedicated his life to empowering local communities, particularly women, through environmental awareness and sustainable natural resource management. His outstanding contributions have been recognized with prestigious honours, including the Ramon Magsaysay Award, Padma Shri, and Padma Bhushan. As the Senior Advisor of HIMWAL Society, his invaluable experience, wisdom, and guidance inspire the organization's initiatives in biodiversity conservation, environmental sustainability, and community-based rural livelihoods in the Himalayan region.",
    image: "/Images/about/6.webp",
    isAdvisor: true,
    order: 8
  },
  {
    name: "Dr. Manmohan Rawat",
    role: "Advisor, Ph.D (Geology)",
    bio: "Dr. Manmohan Rawat is an expert geologist and researcher advising HIMWAL on hydro-geological mapping, slope stabilization, and traditional water spring (Dhara/Naula) rejuvenation across Uttarakhand.",
    image: "/Images/about/7.webp",
    isAdvisor: true,
    order: 9
  },
  {
    name: "Prof. B.P. Purohit",
    role: "Advisor & Academician",
    bio: "Prof. B.P. Purohit brings decades of academic leadership in biological sciences and mountain ecology, providing strategic guidance on biodiversity assessments and scientific validation of indigenous agricultural varieties.",
    image: "/Images/about/8.webp",
    isAdvisor: true,
    order: 10
  },
  {
    name: "Prof. (Dr.) Manisha Nigam",
    role: "Advisor & Research Mentor",
    bio: "Prof. (Dr.) Manisha Nigam mentors HIMWAL's women empowerment initiatives, skill development curriculums, and value-added agro-processing programs for rural livelihood self-reliance.",
    image: "/Images/about/9.webp",
    isAdvisor: true,
    order: 11
  }
];

const newsData = [
  {
    title: "New Memorandum of Understanding (MoU) Signed",
    description: "HIMWAL has officially signed a new MoU to strengthen strategic partnerships and expand our community livelihood initiatives across the region.",
    image: "/Images/mou.webp",
    pdfLink: "/PDFs/mou.pdf",
    type: "featured",
    category: "Partnership"
  },
  {
    title: "Annual Cultural Preservation Programme",
    description: "Celebrating our rich regional heritage, our recent cultural outreach programme brought together local artisans, performers, and community members.",
    image: "/Images/CULTURAL/007.webp",
    pdfLink: "/PDFs/cultural.pdf",
    type: "featured",
    category: "Culture"
  },
  {
    title: "New Livelihood Cohort Begins Training in Joshimath Block",
    description: "Comprehensive vocational and food processing training launched for rural women in the Joshimath valley.",
    pdfLink: "/PDFs/project.pdf",
    type: "notice",
    category: "Livelihood"
  },
  {
    title: "HIMWAL Product Catalogue & Price List Published",
    description: "Official publication of pure organic Pahadi grains, spices, pickles, and handicrafts catalog.",
    pdfLink: "/PDFs/finalcatalogue.pdf",
    type: "notice",
    category: "Products"
  }
];

const galleryAlbumsData = [
  {
    albumId: "millet",
    title: "Millet Nutrition Program",
    folder: "/Images/millet",
    total: 58,
    ext: "webp",
    coverImage: "/Images/millet/012.webp",
    description: "Photographs from our Millet Nutrition workshops, culinary demonstrations, and women empowerment sessions across Uttarakhand."
  },
  {
    albumId: "seeds",
    title: "Traditional Seeds Collection",
    folder: "/Images/IHBT",
    total: 32,
    ext: "webp",
    coverImage: "/Images/products/108.webp",
    description: "Documenting rare, high-altitude indigenous seed varieties gathered in collaboration with agricultural scientists and local farming communities."
  },
  {
    albumId: "environment",
    title: "Environment Awareness Program",
    folder: "/Images/Environment",
    total: 25,
    ext: "webp",
    coverImage: "/Images/Environment/020.webp",
    description: "School workshops, student art competitions, wetland preservation walks, and eco-conservation campaigns."
  },
  {
    albumId: "cultural",
    title: "Cultural Heritage Conservation",
    folder: "/Images/CULTURAL",
    total: 40,
    ext: "webp",
    coverImage: "/Images/CULTURAL/009.webp",
    description: "Documentation of folk rituals, Dhol drum rhythms, traditional attire, and oral folklore of the Painkhanda region."
  },
  {
    albumId: "women",
    title: "Women Empowerment Initiatives",
    folder: "/Images/women",
    total: 17,
    ext: "webp",
    coverImage: "/Images/women/001.webp",
    description: "Field activities, vocational training batches, and self-help group meetings empowering local Pahadi women."
  },
  {
    albumId: "misc",
    title: "Field Work & Community Outreach",
    folder: "/Images/ODW",
    total: 17,
    ext: "webp",
    coverImage: "/Images/ODW/001.webp",
    description: "Community engagement, survey work, and grassroots outreach across remote Himalayan hamlets."
  }
];

module.exports = {
  programsData,
  productsData,
  teamData,
  newsData,
  galleryAlbumsData
};
