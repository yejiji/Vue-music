export default class Album {
    constructor({ id, name, image, company, desc }) {
        this.id = id
        this.name = name
        this.image = image
        this.company = company
        this.desc = desc

    }
}

export function creatAlbum(newid, newname, newimage, newcompany, newdesc) {
    return new Album({
        id: newid,
        name: newname,
        image: newimage,
        company: newcompany,
        desc: newdesc

    })
}