
// ---------------------------------------------------------
// 🔧 USER CONFIGURATION AREA
// ---------------------------------------------------------

// Words that appear when a cord is snapped
export const VENTING_WORDS = [
  // User provided samples
  "チッ", "くそかよ", "きてるわ", "なるほどなるほど", "やっぱしね", 
  "みたわさっき", "それなんかいめ？", "わたしよくやってる", "大丈夫", 
  "おまえめしぬきな", "ゆるせと？", "きこえてないわたしは",

  // Short reactions (Instant anger)
  "は？", "あ？", "え？", "ふーん", "ほう", "へぇ", "あーね", 
  "おい", "マ？", "うわぁ", "出たよ", "また？", "嘘でしょ", "まじか",

  // Resignation / Apathy
  "はいはい", "知ってた", "ですよねー", "想定内", "通常運転", 
  "もう疲れた", "無", "虚無", "スンッ", "遠い目", "どうでもいいわ", 
  "なるようになる", "終わった", "さようなら", "解散",

  // Sarcasm / Bravado
  "元気でよろしい", "素晴らしいね（棒）", "天才かよ", "斬新すぎる", 
  "個性的だこと", "楽しそうで何より", "ご立派", "感動した（嘘）", 
  "ノーベル賞もの", "期待を裏切らない", "逆にすごい",

  // Doubt / Escapism
  "日本語通じてる？", "宇宙人かな？", "ここ地球？", "デジャヴ？", 
  "夢なら覚めて", "幻聴かな", "見間違いだよね", "記憶にございません", 
  "なんで？", "どうしてこうなった", "リセットボタンどこ",

  // Self-consolation / Self-praise
  "私えらすぎ", "褒めて私を", "誰か金くれ", "時給発生して", 
  "仏になれる", "徳を積んでる", "修行中", "私は女優", "笑顔笑顔", 
  "深呼吸", "落ち着け私", "耐えてる私", "ご褒美買うわ", "偉人レベル",

  // Small murderous intent / Quiet anger
  "燃やすぞ", "埋めるか", "しばく", "一回座ろうか", "表出ろ", 
  "次はない", "覚悟しとけ", "名前覚えたぞ", "呪ってやる", "塩まくぞ", 
  "来世で会おう", "地獄行き", "消しゴム貸して", "記憶ごと消す", 
  "秒で忘れる", "お前がやれ", "自分でやれ",

  // Parenting / Caregiving specific
  "さっき片付けた", "聞いてない", "見てない", "喋るな", "寝ろ", 
  "頼むから寝て", "トイレ行かせろ", "座らせて", "耳栓ほしい", 
  "ご飯なに？って聞くな", "靴下どこ？知らん", "ママ辞職したい", 
  "有給とらせて", "定時退社します", "残業代請求します", 
  "血管ピキッ", "血圧上昇中", "寿命縮んだ", "白髪増えた"
];

// Difficulty options (number of cords)
export const DIFFICULTY_OPTIONS = [3, 4, 5];

// Asset Paths
// To use your own sound, replace 'null' with a path like '/sounds/snap.mp3'
// Note: Browsers may block auto-playing audio without interaction.
export const SOUND_SNAP_URL: string | null = null; 
export const SOUND_EXPLOSION_URL: string | null = null;

// Visual Colors
export const COLORS = {
  bg: '#fdf6e3',
  bag: '#eaddcf',
  bagOutline: '#d4c5b0',
  cordIntact: '#b91c1c', // Deep Red
  cordBroken: '#9ca3af', // Gray
  textMain: '#431407',
};

// ---------------------------------------------------------
// 🔧 END CONFIGURATION
// ---------------------------------------------------------
