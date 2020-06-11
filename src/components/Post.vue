<template>
    <div>
        <h2>View Post</h2>
        <div v-if="loading">Loading...</div>
        <div v-if="post">
            <h3>[ID : {{post.id}} ]</h3>
            <div>{{post.text}}</div>
        </div>
    </div>
</template>

<script>
    import { Post } from '../api/post'
    export default {
        data() {
            return {
                post: null,
                loading: true
            }
        },
        created() {
            // 컴포넌트 생성시 데이터를 패치한다
            this.fetchData()
        },
        watch: {
          // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.post = null
                this.loading = true
                Post.get(this.$route.params.id)
                .then(data => {
                    this.post = data
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
