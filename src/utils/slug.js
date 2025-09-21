/**
 * Создание ЧПУ.
 */
export function createSlug(text) {
  if (typeof text !== "string") {
    return "";
  }

  const transliteratedText = text
    .toLowerCase()
    .replace(/а/g, "a")
    .replace(/б/g, "b")
    .replace(/в/g, "v")
    .replace(/г/g, "g")
    .replace(/д/g, "d")
    .replace(/е/g, "e")
    .replace(/ё/g, "yo")
    .replace(/ж/g, "zh")
    .replace(/з/g, "z")
    .replace(/и/g, "i")
    .replace(/й/g, "y")
    .replace(/к/g, "k")
    .replace(/л/g, "l")
    .replace(/м/g, "m")
    .replace(/н/g, "n")
    .replace(/о/g, "o")
    .replace(/п/g, "p")
    .replace(/р/g, "r")
    .replace(/с/g, "s")
    .replace(/т/g, "t")
    .replace(/у/g, "u")
    .replace(/ф/g, "f")
    .replace(/х/g, "kh")
    .replace(/ц/g, "ts")
    .replace(/ч/g, "ch")
    .replace(/ш/g, "sh")
    .replace(/щ/g, "shch")
    .replace(/ъ/g, "")
    .replace(/ы/g, "y")
    .replace(/ь/g, "")
    .replace(/э/g, "e")
    .replace(/ю/g, "yu")
    .replace(/я/g, "ya");

  const slug = transliteratedText
    .replace(/[^a-z0-9\s-]/g, "") // Удаление символов, кроме букв, цифр, пробелов и дефисов
    .replace(/\s+/g, "-") // Замена одного или нескольких пробелов на один дефис
    .replace(/-+/g, "-") // Замена нескольких дефисов на один
    .replace(/^-|-$/g, ""); // Удаление дефисов в начале и конце строки

  return slug;
}
