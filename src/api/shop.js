const _books = [
    {
        id: 1,
        name: '세계사의 거장들',
        price: 22500,
        inventory: 7
    },
    {
        id: 2,
        name: '당신이 옳다',
        price: 14200,
        inventory: 1
    },
    {
        id: 3,
        name: '꽃을 보듯 너를 본다',
        price: 9000,
        inventory: 13
    }
]
// import axios from 'axios'
export default {
    // getBooks (cb) {
    //     fetch('https://api.myjson.com/bins/18zxeg')
    //         .then(response => response.json())
    //         .then(data => cb(data))
    // },
    getBooks (cb) {
        window.setTimeout(() => cb(_books), 3000)
    },
    // getBooks(cb) {
    //     axios.get('http://jsonplaceholder.typicode.com/posts')
    //         .then(response => cb(response.data))
    // },

    //쇼핑 카트에 있는 아이템 구매를 시뮬레이션 하는 메서드입니다. 0.3초 지연된 시간을 가진 후, 랜덤으로 구매 성공 또는 실패 콜백 함수를 실행합니다.
    buyBooks (products, cb, errorCb) {
        window.setTimeout(() => {
            (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
                ? cb()
                : errorCb()
        }, 300)
    }
}
