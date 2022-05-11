const StringsService = (() => {
  function _capitalizeString(str: string): string {
    if (!str) {
      return '';
    }
    return str[0].toUpperCase() + str.slice(1);
  }

  return {
    capitalizeString: _capitalizeString,
  };
})();

export default StringsService;
