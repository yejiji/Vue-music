export default class SongSheet {
    constructor({ id, name, avatar }) {
        this.id = id
        this.name = name
        this.avatar = avatar
    }
}

export function creatSongSheet(newid, newname, newavatar) {
    return new Singer({
        id: newid,
        name: newname,
        avatar: newavatar

    })
}