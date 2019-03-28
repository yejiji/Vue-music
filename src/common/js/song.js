export default class Song {
    constructor({ id, singer, name, image, alid, alname, url }) {
        this.id = id
        this.singer = singer
        this.name = name
        this.image = image
        this.alid = alid
        this.alname = alname
        this.url = url

    }
}

export function creatSong(newid, newsinger, newname, newimage, newalid, newalname) {
    return new Song({
        id: newid,
        singer: newsinger,
        name: newname,
        image: newimage,
        alid: newalid,
        alname: newalname,
        url: `http://music.163.com/song/media/outer/url?id=${newid}.mp3`
    })
}