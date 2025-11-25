import { Artist } from "../types";

export const artists: Artist[] = [
  {
    id: "ado",
    name: "Ado",
    nameKanji: "アド",
    imageUrl: "/ArtistImages/Ado.svg",
    about:
      'Soloist singer under Cloud Nine. Influenced by vocaloid songs and the culture of singers who conceal their faces, she started her singing career by posting song covers on niconico. She made her major debut on October 23, 2020 with the release of "Usseewa".',
    label: "Virgin Records",
    status: "Aktif",
    genre: ["J-Pop", "Electronic"],
    members: [{ name: "Ado", nameKanji: "アド", role: "Singer" }],
    rating: 4.9,
    debutYear: 2020,
  },
  {
    id: "yoasobi",
    name: "YOASOBI",
    imageUrl: "/ArtistImages/YOASOBI.svg",
    about:
      'Japanese musical duo formed in 2019. It consists of songwriter and producer Ayase and vocalist Lilas Ikuta, under the moniker Ikura. Represented by the slogan "novel into music", the duo\'s songs are originally based on selected fictional stories posted on Monogatary.com, a social media for creative writing operated by Sony Music Entertainment Japan. Later, sources also come from various media, such as fiction written by professional authors, books, letters, messages, plays, and social media posts. Their music has been characterized as a blend of J-pop and Vocaloid music.',
    label: "Sony Music Entertainment Japan",
    status: "Aktif",
    genre: ["J-Pop", "Electronic"],
    members: [
      {
        name: "Ayase",
        nameKanji: "作曲家",
        role: "Songwriter, Producer, Keyboards, Synthesizer, Sampler",
      },
      { name: "Ikura", nameKanji: "ボーカリスト", role: "Vocals" },
    ],
    rating: 4.9,
    debutYear: 2019,
  },
  {
    id: "sumika",
    name: "Sumika",
    imageUrl: "/ArtistImages/Sumika.svg",
    about:
      "Japanese rock band from Kawasaki, Kanagawa. The band formed as an indie rock band in 2013, before being signed to a major label in 2018. The band is also known as Sumika [camp session] during live performances, which are known for including performances by non-musicians such as filmmakers, photographers, painters, sculptors, architects, potters, and poets. The band's music has also been featured in the anime series.",
    label: "Sony Music Entertainment Japan",
    status: "Aktif",
    genre: ["J-Rock", "J-Pop"],
    members: [
      {
        name: "Kenta Kataoka",
        nameKanji: "片岡 健太",
        role: "Lead Vocals, Guitarist",
      },
      { name: "Tomoyuki Arai", nameKanji: "荒井 智之", role: "Drummer" },
      {
        name: "Takayuki Ogawa",
        nameKanji: "小川 貴之",
        role: "Keyboardist, Chorus Vocals",
      },
    ],
    rating: 4.8,
    debutYear: 2013,
  },
  {
    id: "kenshi-yonezu",
    name: "Kenshi Yonezu",
    nameKanji: "米津玄師",
    imageUrl: "/ArtistImages/Yonezu_Kenshi.svg",
    about:
      "Japanese singer and songwriter. He started releasing Vocaloid music under the stage name Hachi (ハチ) in 2009. In 2012, he debuted under his real name, releasing music with his own voice. He has sold at least 4.2 million physical copies and over 7 million digital copies in Japan.",
    label: "SME Records",
    status: "Aktif",
    genre: ["J-Pop", "J-Rock"],
    members: [
      {
        name: "Yonezu Kenshi",
        nameKanji: "米津玄師",
        role: "Singer, Songwriter, Illustrator, Videographer, Record producer",
      },
    ],
    rating: 4.9,
    debutYear: 2012,
  },
  {
    id: "eir-aoi",
    name: "Eir Aoi",
    nameKanji: "藍井 エイル",
    imageUrl: "/ArtistImages/Eir_Aoi.svg",
    about:
      'Japanese singer from Sapporo, Hokkaido, signed to Sacra Music. After being discovered through the Japanese video sharing website Niconico, Aoi made her major debut in 2011 with the release of her first single "Memoria", which was used as the first ending theme to the 2011 anime television series Fate/Zero.',
    label: "Independent",
    status: "Aktif",
    genre: ["J-Pop", "Anisong", "Pop Rock"],
    members: [{ name: "Eir Aoi", nameKanji: "藍井 エイル", role: "Singer" }],
    rating: 4.7,
    debutYear: 2011,
  },
  {
    id: "lisa",
    name: "LiSA",
    nameKanji: "織部 里沙",
    imageUrl: "/ArtistImages/Lisa.svg",
    about:
      'A highly acclaimed Japanese anisong singer, born in Seki, Gifu. She began her musical career as the vocalist of the indie band Chucky, then made her major debut in 2010 with songs for the anime series Angel Beats! as part of the fictional band "Girls Dead Monster."',
    label: "Key Sounds",
    status: "Aktif",
    genre: ["Anisong", "J-Rock", "Pop Rock"],
    members: [{ name: "LiSA", nameKanji: "織部 里沙", role: "Singer" }],
    rating: 4.8,
    debutYear: 2010,
  },
  {
    id: "unison-square-garden",
    name: "UNISON SQUARE GARDEN",
    imageUrl: "/ArtistImages/UNISON_SQUARE_GARDEN.svg",
    about:
      "Japanese rock/pop band with energetic melodies and poetic lyrics; active on the anime scene as well. The band includes Kosuke Saito (vocals/guitar), Tomoya Tabuchi (bass/backing vocals), and Takao Suzuki (drums/backing vocals).",
    label: "Toy's Factory",
    status: "Aktif",
    genre: ["J-Rock", "Pop Rock"],
    members: [
      { name: "Saito Kousuke", nameKanji: "斎藤宏介", role: "Vocal, Guitar" },
      { name: "Tabuchi Tomoya", nameKanji: "田淵智也", role: "Vocal, Bass" },
      { name: "Suzuki Takao", nameKanji: "鈴木貴雄", role: "Vocal, Drums" },
    ],
    rating: 4.6,
    debutYear: 2004,
  },
  {
    id: "radwimps",
    name: "RADWIMPS",
    imageUrl: "/ArtistImages/RADWIMPS.svg",
    about:
      'Japanese rock band who debuted independently in 2003 and signed with Toshiba EMI in 2005. The band\'s name, Radwimps, was formed from two English slang terms, "rad" and "wimp". According to the band, the coined word had several meanings, including "excellent weakling" and "superlative coward".',
    label: "EMI",
    status: "Aktif",
    genre: ["J-Rock"],
    members: [
      {
        name: "Noda Yojiro",
        nameKanji: "野田洋次郎",
        role: "Vocalist, Guitarist",
      },
      { name: "Takeda Yusuke", nameKanji: "武田祐介", role: "Bassist, Chorus" },
    ],
    rating: 4.8,
    debutYear: 2003,
  },
];
