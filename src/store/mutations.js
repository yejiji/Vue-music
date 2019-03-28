import * as types from './mutation-types'

const mutations = {
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_THEME](state, theme) {
        state.theme = theme
    }
}

export default mutations