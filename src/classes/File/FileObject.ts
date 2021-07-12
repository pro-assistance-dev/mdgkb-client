import IFileObject from "@/interfaces/files/IFileObject";

export default class FileObject implements IFileObject{
    id: string = ''
    filename_disk: string  =''
    filename_download: string  =''
    title: string  =''
    type: string  =''
    extension: string  =''

    constructor(i?: IFileObject) {
        if (!i) return
        this.id = i.id
        this.filename_disk = i.filename_disk
        this.filename_download = i.filename_download
        this.title = i.title
        this.type = i.type
        this.extension = i.extension
    }
}
