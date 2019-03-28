export default class Singer {
    constructor({ id, name, avatar }) {
        this.id = id
        this.name = name
        this.avatar = avatar
    }
}

export function creatSinger(newid, newname, newavatar) {
    return new Singer({
        id: newid,
        name: newname,
        avatar: newavatar

    })
}