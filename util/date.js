export default function getFormattedDate(date) {
    // return `${date.getFullYear()}--${date.getMonth() + 1}--${date.getDate()}`;
    return date.toISOString().slice(0, 10);
}
export function getDateMinusGivenDays(date, daysToMinus) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysToMinus);
}
