export default abstract class Strings {
  static CapitalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  static ToCamelCase(str: string): string {
    const res = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return ''; // or if (/\s+/.test(match)) for white spaces
      }
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
    return res.replaceAll('-', '');
  }

  static ToKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  static GetStringBetweenChars(str: string, first: string, two: string): string {
    return str.substring(str.indexOf(first) + 2, str.lastIndexOf(two));
  }

  static Translit(str: string, toEachLang?: boolean): string {
    const transliter: Record<string, string> = {
      q: 'й',
      w: 'ц',
      e: 'у',
      r: 'к',
      t: 'е',
      y: 'н',
      u: 'г',
      i: 'ш',
      o: 'щ',
      p: 'з',
      '[': 'х',
      ']': 'ъ',
      a: 'ф',
      s: 'ы',
      d: 'в',
      f: 'а',
      g: 'п',
      h: 'р',
      j: 'о',
      k: 'л',
      l: 'д',
      ';': 'ж',
      "'": 'э',
      z: 'я',
      x: 'ч',
      c: 'с',
      v: 'м',
      b: 'и',
      n: 'т',
      m: 'ь',
      ',': 'б',
      '.': 'ю',
      '/': '.',
    };
    if (toEachLang && /[а-яА-Я]/g.test(str)) {
      return str.replace(/[А-я/,.;'\][]/g, (x: string) => {
        if (x === x.toLowerCase()) {
          const result = Object.keys(transliter).find((key) => transliter[key] === x);
          if (result) return result;
          return '';
        }
        const result = Object.keys(transliter).find((key) => transliter[key] === x.toLowerCase());
        if (result) {
          return result.toUpperCase();
        }
        return '';
      });
    }
    return str.replace(/[A-z/,.;'\][]/g, (x: string) => {
      return x === x.toLowerCase() ? transliter[x] : transliter[x.toLowerCase()].toUpperCase();
    });
  }

  static RemoveEmoji(str: string): string {
    const emoji = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    return str.replace(emoji, '');
  }

  static CanBeTranslited(str: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    return regex.test(str);
  }

  static StringsEquals(str1: string, str2: string): boolean {
    const low1 = str1.toLowerCase().replaceAll(/\s/g, '');
    const low2 = str2.toLowerCase().replaceAll(/\s/g, '');
    const transl1 = Strings.Translit(low1);
    const transl2 = Strings.Translit(low2);
    return low1.includes(low2) || transl1.includes(low2) || low1.includes(transl2);
  }

  static SearchIn(s1: string, s2: string): boolean {
    return Strings.StringsEquals(s1, s2)
  }

  static FormatToPercentage(percent: number): string {
    return `${percent}%`;
  }

  static WrapSubStr(text: string, subStr: string): string {
    var re = new RegExp(Strings.GetVariants(subStr).join("|"), "gi");
    return text.replace(re, `<span class="search-text">${subStr}</span>`)
  }

  static GetVariants(s: string): string[] {
    const st = Strings.Translit(s)
    return [
      s,
      Strings.CapitalizeString(s),
      s.toLowerCase(),
      s.toUpperCase(),
      st,
      Strings.CapitalizeString(st),
      st.toLowerCase(),
      st.toUpperCase(),
    ]
  }
};

