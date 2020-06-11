
import Vue from 'vue'
import Vuex from 'vuex'
import shop from "@/api/shop";

Vue.use(Vuex)

const store = new Vuex.Store({
    // 스토어 객체 옵션 설정
    state: {
        // 도서 데이터
        books: [],
        cart: [],
        purchageStatus: '',   // (1)
    },
    mutations: {
        emptyCart(state) { // (5)
            state.cart = [];
        },
        notifyStatus(state, status) { // (6)
          state.purchageStatus = status
        },
        pushBookToCart(state, bookId) { // 쇼핑 카트에 도서를 추가하는 뮤테이션
          state.cart.push({
              id: bookId,
              quantity: 1
          })
        },
        incrementItemQuantity(state, cartItem) { // 쇼핑 카트의 아이템 수량을 증가시키는 뮤테이션
            cartItem.quantity++;
        },
        decrementBookInventory(state, book) { // 도서의 재고 수량을 감소시키는 뮤테이션
            book.inventory--;
        },
        // 도서 설정 메서드
        setBooks(state, books) {
            state.books = books
        }
    },
    actions: {
        purchage({state, commit}) {
            shop.buyBooks(
                state.cart, // (2)
                () => { // (3)
                    commit('emptyCart')
                    commit('notifyStatus', '성공')
                },
                () => { // (4)
                    commit('notifyStatus', '실패')
                }
            )
        },
        addBookToCart({state, commit}, book) {
            if( book.inventory > 0) {   // [1] 전달된 도서의 재고가 있을 경우 조건문이 실행됩니다.
                const cartItem = state.cart.find(item => item.id === book.id) // [2] 전달된 도서의 ID와 쇼핑 카트에 등록된 아이템의 ID와 비교하여 일치하는 도서가 있는지 검토합니다
                if(!cartItem) {
                    commit('pushBookToCart', book.id) // [3] 추가할 도서가 쇼핑 카트의 도서와 일치하지 않을 경우, 쇼핑 카트에 도서를 새롭게 추가합니다.
                } else {
                    commit('incrementItemQuantity', cartItem) // [4] 추가할 도서가 쇼핑 카트의 도서와 일치할 경우, 쇼핑 카트의 도서 수량을 증가합니다.
                }
                commit('decrementBookInventory', book) // [5] 쇼핑 카트에 도서를 추가한 후, 도서의 재고를 감소시킵니다.
            }
        },
        // 도서 데이터 가져오는 액션
        fetchBooks(context) {
            return new Promise((resolve) => {
                shop.getBooks(books => {
                    context.commit('setBooks', books)
                    resolve()
                })
            })
        }
    },
    getters: {
        // 재고가 있어 판매 가능한 도서 데이터 반환
        availableBooks(state) {
            return state.books.filter(book => book.inventory > 0)
        },
        cartBooks(state) {
            return state.cart.map(cartItem => {
                const book = state.books.find(book => book.id === cartItem.id)
                console.log('book임',book)
                return {
                    id: book.id,
                    name: book.name,
                    price: book.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters){
          return getters.cartBooks.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        }
    },
})

export default store
