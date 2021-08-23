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
    let year = dt.getFullYear();
    let month = (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
    let date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    let hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
    let minutes = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
    let seconds = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}