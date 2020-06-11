<template>
    <div class="book-list">
        <h1>List</h1>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading ing">
        <ul>
            <li v-for="(book,i) in books" :key="i">
            {{ book.name }} / {{ book.price | woo}}
                <button
                        type="button"
                        @click="addBookToCart(book)"
                >카트 추가</button>
            </li>

        </ul>
    </div>
</template>

<script>

    export default {
        name: "BookList",
        data() {
            return {
                loading:false
            }
        },
        computed: {
            books() {
                return this.$store.getters.availableBooks //[3]
            }
        },
        created() {
            this.loading = true
            this.$store.dispatch('fetchBooks')
                .then(() =>{
                    console.log('promise result')
                    this.loading = false
                })//[2]
        },
        methods: {
            addBookToCart(book) {
                this.$store.dispatch('addBookToCart', book)
            }
        }
    }
</script>

<style scoped>

</style>
