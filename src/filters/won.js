// export default function won(value) {
//     //가격(숫자)을 원화로 필터링 하는 필터를 정의합니다.
//     return `${String(value)
//         .split('')
//         .reverse()
//         .map((c,i) => ((i > 0 && i % 3 === 0) ? c + ',' : c))
//         .reverse()
//         .join('')} 원`;
// }
function won(value) {
    return `${String(value)
        .split('')
        .reverse()
        .map((c,i) => ((i > 0 && i % 3 === 0) ? c + ',' : c))
        .reverse()
        .join('')} 원`;
}
function woo(value) {
    return `${String(value)
        .split('')
        .reverse()
        .map((c,i) => ((i > 0 && i % 3 === 0) ? c + ',' : c))
        .reverse()
        .join('')} 원`;
}
export { won, woo };
