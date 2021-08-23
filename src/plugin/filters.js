/**
 * 金额千分位格式化
 */
export function moneyFormat(value) {
    if (!value) return '0.00';
    let result = [];
    // [整数, 小数]
    let [integers = '', decimal = ''] = String(value).split('.');
    let reverseInt = integers.split('').reverse();
    for (let i in reverseInt) {
        result.push(reverseInt[i]);
        if ((i + 1)%3 === 0 && Number(i) !== (reverseInt.length - 1)) {
            result.push(',');
        }
    }
    return decimal ? result.reverse().join('') + '.' + decimal : result.reverse().join('');
}
/**
 * 手机号码格式化，隐藏中间四位
 */
export function telFormat(value) {
    if (!value) return '';
    return value.substr(0, 3) + "****" + value.substr(7);
}
/**
 * 时间格式化
 */
export function dateFormat(value) {
    if (!value) return '';
    let dt = new Date(value);
    return `${dt.getFullYear()}-${(dt.getMonth() + 1)}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
}