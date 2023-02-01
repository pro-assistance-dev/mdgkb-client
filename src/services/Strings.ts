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

  return {
    toCamelCase,
    capitalizeString,
  };
})();

export default StringsService;
