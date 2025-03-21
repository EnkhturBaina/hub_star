import moment from 'moment';

export function moneyFormat(
  amount: any | number,
  decimalCount = 0,
  decimal = '.',
  thousands = ',',
  sign = ''
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? '-' : '';
    const i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      10
    ).toString();
    const j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2) +
          sign
        : '')
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const dateFormat = (form: any, time = false as boolean) => {
  const format = time ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  return moment(form).format(format);
};
