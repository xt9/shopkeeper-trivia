
export function commaBuilder(items) {
    let str = '';
    items.forEach((item, i) => {
        if (i === items.length - 1 && items.length !== 1) {
            str += `and ${item}.`;
        } else if (i === items.length - 1 || i === 0) {
            str += item;
        } else {
            str += `, ${item} `;
        }
    });
    return str;
}