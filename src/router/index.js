import Vue from "vue";
import VueRouter from 'vue-router'
import Posts from "../components/Posts";
import Post from "../components/Post";
import { Auth } from '../api/post'
import NewPost from "../components/NewPost";
import Login from "../components/Login";

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
    if(Auth.loggedIn()) return next()
    next({
        path: '/login',
        query: { redirect: to.fullPath }
    })
}

//VueRouter 클래스 함수로 라우터 객체를 생성한다.
//mode 속성 기본값은 “해쉬뱅 모드”다. 브라우져 history 객체의 pushState() API를 사용하기 위해서는 “history”로 모드값을 설정한다.
export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/login', component: Login },
        { path: '/logout', beforeEnter(to, from, next) {
                Auth.logout()
                next('/')
            }
        },
        { path: '/posts', component: Posts,
            //부모 라우트에서는 자녀 라우트들을 렌더링하기 위한 뷰가 필요한데 /posts 라우트의 컴포넌트에 정의한다.
            //template 부분에 <router-view> 태그를 삽입했다. 중첩된 하위 경로가 변경될때 이 부분에 해당 컴포넌트가 그려진다.

            children: [
                { name: 'new_post', path: 'new', component: NewPost, beforeEnter:requireAuth },
                { name:'post', path: ':id', component: Post },
            ]
        },
        { path: '*', component: { template: '<div>NotFound</div>' } }
    ]
})

