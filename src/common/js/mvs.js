export default class Mvs {
    constructor({ id, name, image, time }) {
        this.id = id
        this.name = name
        this.image = image
        this.time = time

    }
}

export function creatMvs(newid, newname, newimage, newtime) {
    return new Mvs({
        id: newid,
        name: newname,
        image: newimage,
        time: newtime

    })
}