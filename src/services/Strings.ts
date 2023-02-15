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

  return {
    getStringBetweenChars,
    toCamelCase,
    toKebabCase,
    capitalizeString,
  };
})();

export default StringsService;
