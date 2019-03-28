import Vue from 'vue'
import Router from 'vue-router'
import UserPlay from '../components/user-play/user-play'
import Recommend from '../components/recommend/recommend'
import MusicStore from '../components/music-store/music-store'
import Disc from 'components/disc/disc'
import SingerDetail from 'components/singerdetail/singerdetail'
import Singer from 'components/singer/singer'
import songdisc from 'components/songdisc/songdisc'
import SongTheme from 'components/song-theme/song-theme'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/musicstore'
        },
        {
            path: '/musicstore',
            component: MusicStore,
            children: [{
                path: ':id',
                component: Disc
            }]
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/userplay',
            component: UserPlay
        },
        {
            path: '/singerDetail',
            component: SingerDetail
        }, {
            path: '/singer',
            component: Singer
        }, {
            path: '/songdisc',
            component: songdisc,
            children: [{
                path: ':id',
                component: SongTheme
            }]
        }, {
            path: '/disc',
            component: Disc
        }
    ]
})