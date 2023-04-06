const isRemove = (n: number) => n === 8 || n === 46;
const isDigit = (n: number) => n > 46 && n < 58;
const isNavigate = (n: number) => n > 34 && n < 41;
// const isSpace = (n: number) => n === 47;
const addDot = (val: string) => val + '.';

const checkInvalidKey = (e: KeyboardEvent, code: number, len: number) => {
  if (isRemove(code) || isNavigate(code)) {
    return;
  }
  if (!isDigit(code) || len > 9) {
    e.preventDefault();
  }
};

function replaceDots(val: string, len: number): string {
  if (len > 8) {
    let day = val.substring(0, 2).replace('.', '1');
    if (Number(day) > 31) {
      day = '31';
    }
    let month = val.substring(3, 5).replace('.', '1');
    if (Number(month) > 12) {
      month = '12';
    }
    let year = val.substring(6, 10).replace('.', '1');
    if (Number(year) > 2100) {
      year = '2100';
    }
    val = day + '.' + month + '.' + year;
  }
  return val;
}

export default function dateFormat(e: KeyboardEvent): void {
  const code = e.keyCode;
  let val = (<HTMLInputElement>e.srcElement).value;
  const len = val.length;
  checkInvalidKey(e, code, len);
  if (!isRemove(code) && (len === 2 || len === 5)) {
    val = addDot(val);
  }

  const allValue = (<HTMLInputElement>e.srcElement).value + String.fromCharCode(e.which);
  if (isRemove(code)) {
    (<HTMLInputElement>e.srcElement).value = val;
    return;
  }

  if (val.length === 0 && Number(allValue) > 3) {
    val = '3';
    e.preventDefault();
  }

  if (val.length === 1 && Number(allValue) > 31) {
    val = '31';
    e.preventDefault();
  }

  if (allValue.length === 5) {
    const month = Number(allValue.substring(3, 5));
    if (month > 12) {
      val = val.substring(0, 3) + '12';
      e.preventDefault();
    }
  }
  val = replaceDots(val, len);
  (<HTMLInputElement>e.srcElement).value = val;
}
