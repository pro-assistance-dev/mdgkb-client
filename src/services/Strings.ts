const StringsService = (() => {
  function capitalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  function toCamelCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) {
        return ''; // or if (/\s+/.test(match)) for white spaces
      }
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  function toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  function getStringBetweenChars(str: string, first: string, two: string): string {
    return str.substring(str.indexOf(first) + 2, str.lastIndexOf(two));
  }

  function translit(str: string, toEachLang?: boolean): string {
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

  function removeEmoji(str: string): string {
    const emoji = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    return str.replace(emoji, '');
  }

  function canBeTranslited(str: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    return regex.test(str);
  }

  return {
    removeEmoji,
    translit,
    getStringBetweenChars,
    toCamelCase,
    toKebabCase,
    capitalizeString,
    canBeTranslited,
  };
})();

export default StringsService;
