export interface Genre {
  slug: string;
  name: string;
  description: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  tags: string[];
}

// prettier-ignore
export const genres: Genre[] = [
    { 
      slug: "art", 
      name: "Art", 
      description: "Art encompasses diverse forms of human expression through visual, auditory, or performing artifacts that convey ideas, emotions, or technical skill. Dating back to prehistoric cave paintings, art has evolved across cultures and time periods, embracing movements from classical to contemporary. Art books explore techniques, art history, individual artists, specific movements, critical theory, and aesthetic philosophy. They may include lavish illustrations, photographs, and reproductions that help readers appreciate and understand artistic achievements throughout human civilization." 
    },
    { 
      slug: "biography", 
      name: "Biography", 
      description: "Biography is a literary genre that documents the life and experiences of a person, typically focusing on the subject's achievements, challenges, and influences. Written by either the subject (autobiography) or a third party, biographies provide insight into significant historical figures, celebrities, politicians, artists, scientists, and other notable individuals. They combine factual information with narrative storytelling to create a comprehensive portrait that contextualizes the subject within their historical period and explores how their contributions shaped society, science, art, or other fields of human endeavor." 
    },
    { 
      slug: "business", 
      name: "Business", 
      description: "Business literature encompasses works on commerce, economics, management, entrepreneurship, leadership, marketing, and organizational behavior. This genre includes practical guides for professional development, case studies of successful companies, theoretical frameworks for organizational strategy, and personal accounts from industry leaders. Business books aim to provide readers with insights, models, and actionable advice to improve performance, drive innovation, understand market dynamics, enhance leadership skills, and navigate the complexities of modern economic systems and workplace environments." 
    },
    { 
      slug: "chick-lit", 
      name: "Chick Lit", 
      description: "Chick Lit emerged in the 1990s as a genre primarily focusing on the personal and professional experiences of modern women. Characterized by a humorous, light-hearted tone and first-person narrative, these novels typically feature protagonists in their 20s or 30s navigating career challenges, romantic relationships, friendships, and self-discovery. While often containing romantic elements, Chick Lit distinguishes itself from traditional romance by emphasizing the heroine's personal growth and independence alongside any romantic plot. Popular authors include Helen Fielding, Sophie Kinsella, and Candace Bushnell." 
    },
    { 
      slug: "childrens", 
      name: "Children's", 
      description: "Children's literature comprises books specifically created for readers from infancy through adolescence. This diverse genre includes picture books, early readers, chapter books, middle-grade novels, and educational texts, all tailored to different developmental stages. Children's books often feature age-appropriate themes, simplified language, illustrative elements, and narrative structures designed to engage young minds. Beyond entertainment, they serve crucial roles in literacy development, moral education, cultural socialization, and inspiring imagination while introducing children to the wider world through accessible stories and characters." 
    },
    { 
      slug: "christian", 
      name: "Christian", 
      description: "Christian literature encompasses works that explore faith, spirituality, theology, and religious practice from a Christian perspective. This genre includes biblical studies, devotionals, inspirational memoirs, theological treatises, Christian fiction, and practical guides for living according to Christian principles. Whether academic or accessible in approach, these books aim to strengthen readers' understanding of Christian doctrine, deepen their spiritual connection, provide guidance for faith-based living, or present narratives that reflect Christian worldviews and values. Authors range from theologians and clergy to lay writers sharing personal faith journeys." 
    },
    { 
      slug: "classics", 
      name: "Classics", 
      description: "Classics are literary works that have stood the test of time, continuing to resonate with readers long after their initial publication. These enduring novels, plays, and poetry are distinguished by their artistic quality, cultural significance, innovative style, universal themes, and profound insights into human nature. Spanning from ancient Greek epics to 20th century masterpieces, classics transcend their original context to speak to successive generations. They form the literary canon studied in academic settings and continue to influence contemporary authors, while offering modern readers a window into different historical periods and enduring human experiences." 
    },
    { 
      slug: "comics", 
      name: "Comics", 
      description: "Comics are a visual medium that combines images with text to tell stories through sequential panels. Evolving from newspaper comic strips, the format has developed into diverse expressions including superhero narratives, graphic journalism, memoirs, and experimental art. Comics employ a unique visual language with conventions like speech bubbles, motion lines, and panel transitions to convey narrative. The medium spans genres from action-adventure to literary fiction, historical documentation to fantasy, allowing creators to explore complex themes through the interplay of words and images that engage readers in distinctive storytelling experiences." 
    },
    { 
      slug: "contemporary", 
      name: "Contemporary", 
      description: "Contemporary fiction reflects current society, set roughly within the present or recent past, addressing modern issues, relationships, and cultural contexts. Unlike historical fiction, it captures the zeitgeist of its creation, featuring realistic characters navigating recognizable social landscapes. These novels often explore themes like technology's impact, changing family dynamics, identity politics, globalization, and evolving social norms. Contemporary fiction may incorporate elements from other genres while maintaining its focus on realistic portrayals of modern life, providing readers both entertainment and insight into the complexities of living in today's world." 
    },
    { 
      slug: "cookbooks", 
      name: "Cookbooks", 
      description: "Cookbooks are instructional texts that provide recipes, cooking techniques, and culinary guidance. Beyond mere recipe collections, modern cookbooks often include cultural context, personal narratives, nutritional information, and photography. They range from comprehensive general references to specialized volumes focusing on specific cuisines, ingredients, dietary requirements, or cooking methods. Cookbooks serve multiple purposes: preserving culinary traditions, introducing new flavors and techniques, addressing health concerns, celebrating cultural heritage, and inspiring creativity in the kitchen. They reflect both the practical necessity of food preparation and the cultural significance of cooking as an art form." 
    },
    { 
      slug: "crime", 
      name: "Crime", 
      description: "Crime fiction centers on criminal acts and the effort to solve, punish, or prevent them. Spanning subgenres like detective stories, police procedurals, legal thrillers, and heist narratives, these works explore the darker aspects of human behavior through mysteries, investigations, and moral questions about justice. Crime fiction typically features protagonists working within or outside the law to solve cases or execute crimes, with plots driven by suspense, clues, motive analysis, and character psychology. The genre examines social issues, legal systems, and ethical dilemmas while entertaining readers with compelling mysteries and the intellectual challenge of solving crimes alongside the characters." 
    },
    { 
      slug: "ebooks", 
      name: "Ebooks", 
      description: "Ebooks are digital publications that can be read on electronic devices like e-readers, tablets, computers, and smartphones. Rather than a content genre itself, ebooks represent a format that encompasses all literary categories in digital form. They offer features unavailable in print, including adjustable text size, built-in dictionaries, search capabilities, hyperlinking, and in some cases multimedia elements. Ebooks have revolutionized publishing by reducing production and distribution costs, enabling self-publishing, providing instant access to vast libraries, and allowing readers to carry numerous books on a single device, transforming how people consume and interact with written content." 
    },
    { 
      slug: "fantasy", 
      name: "Fantasy", 
      description: "Fantasy literature creates imaginary worlds where magic, mythical creatures, and supernatural elements are fundamental to the setting, characters, or plot. This genre encompasses diverse subgenres including high fantasy, urban fantasy, dark fantasy, and magical realism, each with distinctive conventions and themes. Fantasy works often feature heroes on quests, battles between good and evil, magical systems with established rules, and richly developed secondary worlds with their own histories and mythologies. The genre allows authors to explore human themes through metaphorical and imaginative frameworks, providing readers with escapism while often addressing deeper philosophical and moral questions through fantastical narratives." 
    },
    { 
      slug: "fiction", 
      name: "Fiction", 
      description: "Fiction encompasses imaginative storytelling that, while potentially inspired by real events or environments, presents narratives that are primarily invented rather than factual. This broad category includes numerous genres and subgenres, from literary fiction to genre fiction like mystery, romance, or science fiction. Fiction employs elements like character development, plot, setting, theme, and conflict to create engaging narratives that may entertain, educate, or provide insight into human experience. Through invented scenarios and characters, fiction allows writers to explore complex ideas, emotions, and possibilities in ways that can resonate deeply with readers despite—or often because of—its departure from strict reality." 
    },
    { 
      slug: "graphic-novels", 
      name: "Graphic Novels", 
      description: "Graphic novels are extended comics that present complete narratives through the combination of sequential art and text. Distinguished from traditional comic books by their longer format, self-contained stories, and often more complex themes, graphic novels span diverse genres including memoir, historical fiction, fantasy, and literary adaptation. The medium uses visual storytelling techniques where illustration and layout work in concert with dialogue and narration to convey plot, character, and theme. Since the 1980s, graphic novels have gained critical recognition as a sophisticated literary and artistic form capable of addressing mature subjects with nuance while offering readers a visually immersive narrative experience." 
    },
    { 
      slug: "historical-fiction", 
      name: "Historical Fiction", 
      description: "Historical fiction blends factual historical settings, events, or figures with fictional characters and narratives. Set in the past, these novels recreate specific time periods with attention to social conditions, cultural attitudes, and historical details, while weaving imagined elements throughout. Authors research extensively to accurately portray historical contexts, from ancient civilizations to the recent past, while using creative license to fill gaps in historical record or to personalize larger events through individual stories. The genre allows readers to experience history through immersive storytelling, often providing emotional and sensory dimensions that purely factual accounts might lack, while potentially illuminating lesser-known historical perspectives." 
    },
    { 
      slug: "history", 
      name: "History", 
      description: "History (from Greek ἱστορία - historia, meaning \"inquiry, knowledge acquired by investigation\") is the discovery, collection, organization, and presentation of information about past events. History can also mean the period of time after writing was invented. Scholars who write about history are called historians. It is a field of research which uses a narrative to examine and analyse the sequence of events, and it sometimes attempts to investigate objectively the patterns of cause and effect that determine events. Historians debate the nature of history and its usefulness. This includes discussing the study of the discipline as an end in itself and as a way of providing \"perspective\" on the problems of the present. The stories common to a particular culture, but not supported by external sources (such as the legends surrounding King Arthur) are usually classified as cultural heritage rather than the \"disinterested investigation\" needed by the discipline of history. Events of the past prior to written record are considered prehistory.Amongst scholars, the fifth century BC Greek historian Herodotus is considered to be the \"father of history\", and, along with his contemporary Thucydides, forms the foundations for the modern study of history. Their influence, along with other historical traditions in other parts of their world, have spawned many different interpretations of the nature of history which has evolved over the centuries and are continuing to change. The modern study of history has many different fields including those that focus on certain regions and those which focus on certain topical or thematical elements of historical investigation. Often history is taught as part of primary and secondary education, and the academic study of history is a major discipline in University studies." 
    },
    { 
      slug: "horror", 
      name: "Horror", 
      description: "Horror literature aims to evoke fear, dread, disgust, or existential terror in readers by exploring disturbing concepts, supernatural threats, or psychological fears. Dating back to Gothic novels, this genre has evolved to encompass diverse subgenres from supernatural horror featuring monsters and paranormal entities to psychological horror delving into human psyche and bodily horror examining physical corruption. Horror often functions as social commentary, using terrifying narratives to reflect cultural anxieties, taboos, and societal fears. Through suspense, atmosphere, and unflinching examination of the macabre, horror provides both visceral thrills and a safe space to confront the darker aspects of human experience." 
    },
    { 
      slug: "humor-and-comedy", 
      name: "Humor and Comedy", 
      description: "Humor and comedy in literature encompass works primarily intended to amuse and entertain through wit, situational comedy, satire, parody, or absurdist elements. This diverse genre includes humorous essays, comedic novels, satirical works, parodies, and joke collections that employ literary devices like irony, exaggeration, and wordplay to generate laughter or amusement. Beyond entertainment, comedic literature often serves deeper purposes: social criticism through satire, emotional release through humor during difficult times, or exploration of serious themes through comedic frameworks. The genre reflects cultural contexts, as humor varies across societies and eras, while connecting readers through the universal human experience of laughter." 
    },
    { 
      slug: "manga", 
      name: "Manga", 
      description: "Manga are Japanese comic books and graphic novels characterized by their distinctive art style featuring large expressive eyes, dynamic lines, and compressed action sequences. Read right-to-left in the traditional Japanese format, manga spans diverse genres including action, romance, horror, science fiction, fantasy, and slice-of-life, catering to all ages from children to adults. Originally developed in Japan, manga has become a global cultural phenomenon influencing art, animation, and storytelling worldwide. The medium is distinguished by its visual storytelling techniques, genre conventions, character archetypes, and ability to address complex themes through sequential art that blends visual and textual narrative elements." 
    },
    { 
      slug: "memoir", 
      name: "Memoir", 
      description: "Memoir is a form of autobiographical writing focusing on significant moments, themes, or relationships from the author's life rather than presenting a comprehensive chronological account. Unlike autobiography, which typically spans a lifetime, memoirs examine specific aspects of personal experience—relationships, challenges, transformative periods, or professional journeys—through subjective perspective and reflective analysis. The genre employs literary techniques of narrative storytelling, character development, and thematic exploration while maintaining commitment to truth as the author recalls it. Memoirs offer readers intimate glimpses into individual lives that often illuminate broader human experiences, historical events, or cultural contexts through personal testimony." 
    },
    { 
      slug: "music", 
      name: "Music", 
      description: "Music literature encompasses diverse works examining musical theory, history, biography, criticism, and instruction. This genre includes musician biographies and autobiographies, technical manuals on composition and performance, scholarly analyses of musical traditions and innovations, historical surveys of musical periods or genres, and cultural studies of music's social impact. Music books might concentrate on specific instruments, genres, regional traditions, or influential artists, offering both specialized knowledge for practitioners and broader cultural context for general enthusiasts. Whether academic or popular in approach, music literature explores the technical elements, historical development, cultural significance, and personal stories behind this universal art form." 
    },
    { 
      slug: "mystery", 
      name: "Mystery", 
      description: "Mystery fiction centers on the investigation and resolution of puzzling events, typically crimes, where characters work to uncover hidden information and solve the central enigma. Featuring detectives (professional or amateur), complex plotting, strategic revelation of clues, red herrings, and suspense, mysteries engage readers in an intellectual challenge alongside the protagonist. The genre encompasses various subgenres like traditional whodunits, cozy mysteries, hardboiled detective fiction, and police procedurals, each with distinctive conventions. Mystery novels rely on logical problem-solving, character psychology, and narrative tension as investigators navigate motives, alibis, and evidence toward the ultimate revelation that resolves the central question driving the narrative." 
    },
    { 
      slug: "non-fiction", 
      name: "Non-Fiction", 
      description: "Non-fiction encompasses written works based on facts, real events, and actual people rather than imagined scenarios. This vast category includes diverse formats such as biographies, memoirs, historical accounts, academic texts, essays, journalism, self-help books, travel writing, and instructional works. Non-fiction aims to inform, analyze, explain, or persuade through factual accuracy, research, and real-world observation, though presentation styles range from objective reporting to personal narrative. These works provide knowledge, insight, and perspective on everything from historical events and scientific discoveries to personal experiences and practical skills, helping readers better understand the actual world around them." 
    },
    { 
      slug: "nonfiction", 
      name: "Nonfiction", 
      description: "Nonfiction encompasses written works based on facts, real events, and actual people rather than imagined scenarios. This vast category includes diverse formats such as biographies, memoirs, historical accounts, academic texts, essays, journalism, self-help books, travel writing, and instructional works. Nonfiction aims to inform, analyze, explain, or persuade through factual accuracy, research, and real-world observation, though presentation styles range from objective reporting to personal narrative. These works provide knowledge, insight, and perspective on everything from historical events and scientific discoveries to personal experiences and practical skills, helping readers better understand the actual world around them." 
    },
    { 
      slug: "paranormal", 
      name: "Paranormal", 
      description: "Paranormal literature explores phenomena beyond scientific understanding or normal human experience, including ghosts, psychic abilities, supernatural creatures, unexplained events, and alternate dimensions. This genre spans fiction subcategories including paranormal romance, paranormal mystery, paranormal horror, and urban fantasy, where supernatural elements intersect with otherwise recognizable worlds. While often incorporating elements of fantasy and horror, paranormal fiction distinctively focuses on extraordinary occurrences within or alongside ordinary reality rather than in entirely secondary worlds. These narratives examine the mysterious and unexplained through characters encountering supernatural forces, often using these elements to explore themes of mortality, unknown dimensions of existence, and the boundaries of human perception." 
    },
    { 
      slug: "philosophy", 
      name: "Philosophy", 
      description: "Philosophy literature encompasses works examining fundamental questions about existence, knowledge, reality, ethics, reason, mind, and language. Dating from ancient wisdom traditions to contemporary analytical and continental approaches, philosophy books include primary texts by philosophers presenting original theories, secondary works interpreting philosophical traditions, introductory guides to philosophical concepts, and applications of philosophical thinking to specific issues. The genre employs various methodologies including logical argument, conceptual analysis, thought experiments, and dialogue to foster critical thinking about core aspects of human experience. Philosophy works aim both to present cohesive systems of thought and to stimulate readers' own intellectual engagement with enduring questions about the nature of being and understanding." 
    },
    { 
      slug: "poetry", 
      name: "Poetry", 
      description: "Poetry is a literary form using carefully arranged language to evoke emotion, convey ideas, and create aesthetic experiences through elements like rhythm, sound patterns, imagery, and condensed meaning. Spanning numerous traditions from ancient epic poems to modern experimental verse, poetry employs specialized techniques including meter, rhyme, alliteration, metaphor, and distinctive line arrangement on the page. Poetry collections may be organized around thematic concerns, formal approaches, or a poet's development over time. The genre encompasses diverse forms including sonnets, haiku, free verse, concrete poetry, and spoken word, each with distinct conventions while sharing poetry's fundamental concern with language's expressive and sonic possibilities beyond ordinary communication." 
    },
    { 
      slug: "psychology", 
      name: "Psychology", 
      description: "Psychology literature encompasses works exploring human behavior, mental processes, development, and emotional functioning through scientific inquiry and theoretical frameworks. This genre includes academic textbooks, research studies, theoretical treatises, case studies, self-help books, and popular science works addressing various aspects of psychological science. Psychology books examine topics such as cognitive processes, personality theory, mental health conditions, developmental stages, social dynamics, and therapeutic approaches. Whether written for professional, academic, or general audiences, these works aim to enhance understanding of human psychological functioning, offer evidence-based interventions for psychological challenges, explain research findings, or apply psychological principles to everyday life, relationships, and personal growth." 
    },
    { 
      slug: "religion", 
      name: "Religion", 
      description: "Religious literature encompasses texts exploring faith traditions, spiritual practices, theology, religious history, and sacred writings. This genre includes primary religious texts considered sacred within particular traditions, theological works examining religious doctrines, historical analyses of religious movements and institutions, comparative studies of multiple faiths, personal spiritual memoirs, and practical guides to religious observance. Religious books may approach their subjects from devotional, scholarly, critical, or personal perspectives, offering insights into belief systems that have profoundly influenced human cultures, moral frameworks, philosophical thought, and individual lives throughout history. They examine transcendent questions about existence, purpose, ethics, and humanity's relationship with the divine across diverse spiritual traditions." 
    },
    { 
      slug: "romance", 
      name: "Romance", 
      description: "Romance literature centers on romantic relationships and emotional fulfillment, characterized by the development of a central love story and emotionally satisfying conclusions. This popular genre spans numerous subgenres including historical romance, contemporary romance, paranormal romance, and romantic suspense, each combining romance with elements from other literary categories. While romantic relationships form the narrative core, these novels often explore additional themes like personal growth, family dynamics, social issues, and community connections. Romance fiction frequently follows genre conventions regarding relationship development, obstacles to overcome, and resolution while reflecting evolving social attitudes about relationships, featuring diverse characters and relationship models that connect with readers seeking both emotional engagement and ultimately hopeful endings." 
    },
    { 
      slug: "science", 
      name: "Science", 
      description: "Science literature encompasses works explaining scientific principles, discoveries, methodologies, and their implications across disciplines like physics, biology, chemistry, astronomy, and more. This genre includes academic research papers, textbooks, popular science books translating complex concepts for general readers, histories of scientific development, biographies of scientists, and explorations of scientific controversies. Science books aim to communicate factual information about natural phenomena, technological innovations, theoretical frameworks, and experimental findings, employing various approaches from technical precision to accessible narrative. They may focus on specialized topics within particular fields or offer interdisciplinary perspectives, helping readers understand both fundamental scientific principles and cutting-edge developments shaping our understanding of the natural world." 
    },
    { 
      slug: "sci-fi", 
      name: "Science Fiction", 
      description: "Science fiction explores speculative concepts based on scientific principles, technological developments, or future possibilities. Distinguished by its concern with the consequences of scientific innovation, the genre examines how advances might affect individuals, societies, and humanity's understanding of existence. Science fiction encompasses numerous subgenres from hard science fiction grounded in plausible scientific extrapolation to space opera featuring interstellar conflicts, cyberpunk exploring digital realms, and dystopian narratives examining potential societal breakdowns. Through imagined futures, alternative histories, or extraterrestrial encounters, science fiction provides both entertainment and thoughtful exploration of philosophical questions about consciousness, technological ethics, social organization, and humanity's place in the universe through speculative frameworks that illuminate present realities." 
    },
    { 
      slug: "self-help", 
      name: "Self Help", 
      description: "Self-help literature provides guidance for personal improvement, offering strategies, principles, and techniques for enhancing various aspects of life. This genre addresses diverse areas including mental health, productivity, relationships, career development, spiritual growth, physical wellness, and financial management. Self-help books typically combine theoretical frameworks with practical applications, often featuring exercises, case studies, personal anecdotes, and action plans to help readers implement suggested approaches. While some works focus on specific challenges like anxiety or time management, others present broader philosophies for living well. The genre reflects evolving psychological understanding and cultural values about individual agency, personal transformation, and the pursuit of fulfillment through deliberate effort and mindset shifts." 
    },
    { 
      slug: "spirituality", 
      name: "Spirituality", 
      description: "Spirituality literature explores the search for meaning, purpose, and connection beyond material existence, often distinct from organized religion while sometimes incorporating religious elements. This genre includes works on meditation practices, mindfulness, consciousness exploration, nature-based spirituality, mystical experiences, and holistic approaches to well-being. Spirituality books may draw from various wisdom traditions, contemporary psychological insights, or personal revelations to offer perspectives on transcendent dimensions of human experience. Whether practical guides to spiritual practices, philosophical explorations of non-material reality, or personal accounts of spiritual journeys, these works address fundamental questions about existence, interconnection, inner growth, and the search for authentic living and deeper awareness beyond purely physical or intellectual paradigms." 
    },
    { 
      slug: "sports", 
      name: "Sports", 
      description: "Sports literature encompasses works exploring athletic competition, physical achievement, and the cultural significance of organized games. This genre includes athlete biographies and memoirs, historical accounts of significant sporting events or teams, analytical examinations of sports science and strategy, instructional guides for specific activities, and sociological studies of sports' cultural impact. Sports books may focus on professional leagues, amateur competition, Olympic events, extreme sports, or traditional games, examining them through lenses of personal narrative, statistical analysis, cultural critique, or practical instruction. Beyond documenting physical feats, the genre explores sports as reflections of social values, vehicles for personal development, and arenas where broader themes of human striving, teamwork, and overcoming limitations are dramatically displayed." 
    },
    { 
      slug: "suspense", 
      name: "Suspense", 
      description: "Suspense literature creates tension and excitement by developing uncertainty about outcomes, featuring situations where characters face impending danger, difficult choices, or mysterious circumstances. This genre employs narrative techniques including cliffhangers, foreshadowing, withholding critical information, time constraints, and escalating threats to generate anticipation and concern for characters. While sharing elements with mystery and thriller genres, suspense distinctively focuses on emotional tension through the reader's awareness of threats unknown to protagonists or through delayed resolution of perilous situations. Suspense novels may incorporate elements from other genres while maintaining their core focus on building and sustaining anticipatory tension that keeps readers engaged through psychological, situational, or atmospheric uncertainty about how events will unfold." 
    },
    { 
      slug: "thriller", 
      name: "Thriller", 
      description: "Thriller fiction creates heightened feelings of suspense, excitement, surprise, and anxiety through fast-paced, plot-driven narratives featuring high stakes, danger, and conflict. This genre encompasses various subgenres including psychological thrillers, legal thrillers, political thrillers, spy novels, and technological thrillers, each combining tension with specialized settings or themes. Thrillers typically feature protagonists facing formidable antagonists, life-threatening situations, time pressure, and complex obstacles while working to prevent disasters, solve crimes, or overcome conspiracies. The genre employs literary techniques including cliffhangers, plot twists, and escalating action to maintain a sense of threat and urgency, offering readers vicarious experiences of danger and heroism through narratives that build relentlessly toward climactic resolutions." 
    },
    { 
      slug: "travel", 
      name: "Travel", 
      description: "Travel literature documents journeys to specific locations, exploring geographical, cultural, historical, and personal dimensions of place-based experiences. This genre includes travelogues narrating personal adventures, guidebooks providing practical information for visitors, cultural studies examining regional traditions, historical accounts of exploration, and reflective essays on the transformative aspects of travel. Travel books may focus on particular regions, cities, wilderness areas, or modes of transportation, offering both factual information and subjective impressions. Beyond merely describing destinations, the genre often examines themes of cultural encounter, self-discovery through displacement, the relationship between traveler and environment, and the distinction between tourist experiences and deeper engagement with unfamiliar places, peoples, and ways of life." 
    },
    { 
      slug: "young-adult", 
      name: "Young Adult", 
      description: "Young Adult literature targets readers approximately 12-18 years old, featuring adolescent protagonists navigating experiences relevant to teen development including identity formation, independence, relationships, and social awareness. This category spans genres from contemporary realism to fantasy, science fiction, and historical fiction, united by their focus on adolescent perspectives and coming-of-age themes. Young Adult novels often address complex issues including mental health, sexuality, prejudice, and ethical dilemmas through accessible narratives balancing entertainment with exploration of challenging topics. The genre has evolved to include increasingly diverse protagonists, sophisticated themes, and literary approaches that resonate with teen readers while attracting significant adult readership, becoming a cultural force that bridges entertainment with substantive examination of adolescent experience." 
    },
  ];

const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of wealth, love, and the American Dream in the 1920s.",
    genre: "fiction",
    tags: ["classic", "american literature"],
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    description:
      "A science fiction epic set in a distant future amidst a feudal interstellar society.",
    genre: "sci-fi",
    tags: ["space", "politics"],
  },
  {
    id: "3",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey.",
    genre: "fantasy",
    tags: ["adventure", "dragons"],
  },
  // Add more books for each genre
  {
    id: "4",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "A survey of the history of humankind from the evolution of archaic human species to the present day.",
    genre: "non-fiction",
    tags: ["history", "anthropology"],
  },
  {
    id: "5",
    title: "Murder on the Orient Express",
    author: "Agatha Christie",
    description:
      "Detective Hercule Poirot investigates a murder on the famous train.",
    genre: "mystery",
    tags: ["detective", "classic"],
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage.",
    genre: "romance",
    tags: ["classic", "regency"],
  },
  {
    id: "7",
    title: "The Shining",
    author: "Stephen King",
    description:
      "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
    genre: "horror",
    tags: ["supernatural", "psychological"],
  },
];

export const history = [
  {
    title: "Gentlemen of the Woods: Manhood, Myth, and the American Lumberjack",
    author: "Willa Hammitt Brown",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1718979838l/212342368._SX318_.jpg",
    rating: "5.00 avg rating — 3 ratings",
    publicationYear: "2025",
    description: "The men, the myth, and the making of an American legend. The folk hero Paul Bunyan, burly, bearded, wielding his big ax, stands astride the story of the upper Midwest—a manly symbol of the labor that cleared the vast north woods for the march of industrialization while somehow also maintaining an aura of pristine nature. This idea, celebrated in popular culture with songs and folktales, receives a long overdue and thoroughly revealing correction in Gentlemen of the Woods, a cultural history of the life and lore of the real lumberjack and his true place in American history."
  },
  {
    title: "Between Two Rivers",
    author: "Moudhy Al-Rashid",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1739294683l/190862826.jpg",
    rating: "4.75 avg rating — 12 ratings",
    publicationYear: "2025",
    description: "Ancient Mesopotamia, a land between two rivers, is known as the 'cradle of civilisation'. At the height of its influence, this region saw the birth of the world's first cities, the first writing system, the first historical records, as well as myths, medicine, literature, astronomy and religion that went on to revolutionise societies around the world."
  },
  {
    title: "Accidental Tyrant: The Life of Kim Il-sung",
    author: "Fyodor Tertitskiy",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1709239158l/209318777._SY475_.jpg",
    rating: "5.00 avg rating — 1 rating",
    publicationYear: "2025",
    description: "Kim Il-sung was the enigmatic architect of North Korea. His life is an extraordinary tale of improbable once a barely educated guerrilla fighter, he rose to lead the nation at the young age of 33. Against all odds, he established a horrifyingly stable dictatorial regime, one that still struggles to provide for its people, yet could obliterate Hollywood, Silicon Valley and much of East Asia in nuclear strikes."
  },
  {
    title: "Paris Undercover",
    author: "Matthew Goodman",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1722135018l/212807703._SY475_.jpg",
    rating: "4.20 avg rating — 106 ratings",
    publicationYear: "2025",
    description: "Two women in Nazi-occupied Paris created a daring escape line that rescued dozens of Allied servicemen. With one in a German prison camp, the other wrote a book about it—a memoir that was built on lies. Now the bestselling author of Eighty Days shares their incredible, never-before-told full story."
  },
  {
    title: "The Age of Choice: A History of Freedom in Modern Life",
    author: "Sophia Rosenfeld",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1721685139l/213878918._SY475_.jpg",
    rating: "3.70 avg rating — 10 ratings",
    publicationYear: "2025",
    description: "A sweeping history of the rise of personal choice in the modern world and how it became equated with freedom. Choice touches virtually every aspect of our lives, from what to buy and where to live to whom to love, what profession to practice, and even what to believe."
  }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getBooksByGenre(genreSlug: string) {
  // await delay(300);
  return books.filter((book) => book.genre === genreSlug);
}

export async function getGenres() {
  await delay(300);
  return genres;
}
