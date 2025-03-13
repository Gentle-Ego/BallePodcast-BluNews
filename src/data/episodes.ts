
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
    id: "1",
    title: "Le notizie della settimana",
    date: "10 Maggio 2023",
    description: "In questo episodio parliamo delle notizie più importanti della settimana, dai nuovi sviluppi politici agli eventi sportivi.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    audioUrl: "https://sample-videos.com/audio/mp3/crowd-cheering.mp3",
    duration: "24:16",
    featured: true,
    transcriptUrl: "/transcripts/episode1.txt"
  },
  {
    id: "2",
    title: "Intervista con Marco Ballerini",
    date: "17 Maggio 2023",
    description: "Un'intervista speciale con Marco Ballerini, parlando dei progetti futuri e delle novità in arrivo.",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    audioUrl: "https://sample-videos.com/audio/mp3/wave.mp3",
    duration: "32:40",
    featured: true,
    transcriptUrl: "/transcripts/episode2.txt"
  },
  {
    id: "3",
    title: "Speciale tecnologia",
    date: "24 Maggio 2023",
    description: "Parliamo delle ultime novità nel mondo della tecnologia, con focus sulle innovazioni italiane.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-1.mp3",
    duration: "18:22",
    featured: false,
    transcriptUrl: "/transcripts/episode3.txt"
  },
  {
    id: "4",
    title: "Cultura e arte italiana",
    date: "31 Maggio 2023",
    description: "Un viaggio attraverso la cultura e l'arte italiana, dai musei agli artisti contemporanei.",
    imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-2.mp3",
    duration: "26:48",
    featured: false,
    transcriptUrl: "/transcripts/episode4.txt"
  },
  {
    id: "5",
    title: "Economia e mercati",
    date: "7 Giugno 2023",
    description: "Analisi dell'economia italiana e dei mercati globali, con previsioni e consigli.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1715&q=80",
    audioUrl: "https://sample-videos.com/audio/mp3/sample-file-3.mp3",
    duration: "29:15",
    featured: true,
    transcriptUrl: "/transcripts/episode5.txt"
  }
];

export default episodes;
