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

  function getStringBetweenChars(str: string, first: string, two: string): string {
    return str.substring(str.indexOf(first) + 2, str.lastIndexOf(two));
  }

  return {
    getStringBetweenChars,
    toCamelCase,
    capitalizeString,
  };
})();

export default StringsService;
