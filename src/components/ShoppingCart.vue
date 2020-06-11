<template>
    <div class="shopping-cart">
        <table>
            <caption>장바구니에 담긴 도서</caption>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>수량</th>
                <th>가격</th>
            </tr>
            <tr v-for="(book,index) in books" :key="book.id">
                <td>{{ index+1 }}</td>
                <td>{{ book.name }}</td>
                <td>{{ book.quantity }}</td>
                <td>{{ book.price | woo }}</td>
            </tr>
            <tr>
                <th>총계</th>
                <td colspan="2">{{total | won }}</td>
                <td>
                    <button type="button" @click="purchageBooks">구매</button>
                </td>
            </tr>
        </table>
        <div class="notify-status" v-if="$store.state.purchageStatus">
            <p>{{ $store.state.purchageStatus }}</p>
        </div>
    </div>


</template>

<script>
    export default {
        name: "ShoppingCart",
        computed: {
            books() {
                return this.$store.getters.cartBooks
            },
            total() {
                return this.$store.getters.cartTotal
            }
        },
        methods: {
            purchageBooks() {
                this.$store.dispatch('purchage')
            }
        }
    }
</script>

<style scoped>
table{
    width: 100%;
    border-collapse: collapse;
}
table, th, td {
    border: 1px solid #dedede;
}
</style>
