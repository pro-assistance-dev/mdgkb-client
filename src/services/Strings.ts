const StringsService = (() => {
  function capitalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  function toCamelCase(str: string): string {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
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

  function translit(str: string): string {
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
    if (/[а-яА-Я]/g.test(str)) {
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

  return {
    translit,
    getStringBetweenChars,
    toCamelCase,
    toKebabCase,
    capitalizeString,
  };
})();

export default StringsService;
