export interface Episode {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  featured: boolean;
  transcriptUrl: string;
}

const episodes: Episode[] = [
  {
    id: "24",
    title: "BluNews N°24",
    date: "11 Marzo 2025",
    description: "QUANDO I LIBRI TI CAMBIANO LA VITA!",
    imageUrl: "../../public/images/blunews24.png",
    audioUrl: "../../public/audio/blunews24.mp3",
    duration: "4:30",
    featured: true,
    transcriptUrl: "/transcripts/episode24.txt"
  },
  {
    id: "23",
    title: "BluNews N°23",
    date: "4 Marzo 2025",
    description: "PERCHÉ I BAMBINI DI OGGI HANNO SEMPRE PIÙ DIFFICOLTÀ ANCHE NELLE ATTIVITÀ PIÙ SEMPLICI?",
    imageUrl: "../../public/images/blunews23.png",
    audioUrl: "../../public/audio/blunews23.mp3",
    duration: "4:37",
    featured: true,
    transcriptUrl: "/transcripts/episode23.txt"
  },
  {
    id: "22",
    title: "BluNews N°22",
    date: "25 Febbraio 2025",
    description: "LA BELLEZZA DELL'UNIVERSO",
    imageUrl: "../../public/images/blunews22.png",
    audioUrl: "../../public/audio/blunews22.mp3",
    duration: "",
    featured: true,
    transcriptUrl: "/transcripts/episode22.txt"
  },
  {
    id: "21",
    title: "BluNews N°21",
    date: "25 Febbraio 2025",
    description: "NON TEMERE L'ERRORE",
    imageUrl: "../../public/images/blunews21.png",
    audioUrl: "../../public/audio/blunews21.mp3",
    duration: "",
    featured: true,
    transcriptUrl: "/transcripts/episode21.txt"
  },
  {
    id: "20",
    title: "BluNews N°20",
    date: "25 Febbraio 2025",
    description: "IL DOVERE DI INSEGNARE LA SCIENZA",
    imageUrl: "../../public/images/blunews20.png",
    audioUrl: "../../public/audio/blunews20.mp3",
    duration: "",
    featured: true,
    transcriptUrl: "/transcripts/episode20.txt"
  }
];

export default episodes;
