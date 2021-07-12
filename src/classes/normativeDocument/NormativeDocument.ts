import INormativeDocument from "@/interfaces/normativeDocument/INormativeDocument";
import IFileObject from "@/interfaces/files/IFileObject";
import FileObject from "@/classes/File/FileObject";

export default class NormativeDocument implements INormativeDocument{
    id: string = ''
    name: string  =''
    file: number = 0
    type: number = 0
    status: string = ''
    file_object: IFileObject = new FileObject()


    constructor(i?: INormativeDocument) {
        if (!i) return
        this.id = i.id

        this.name = i.name
        this.file = i.file
        this.type = i.type
        this.status = i.status
        this.file_object = new FileObject(i.file_object)
        console.log(this)
    }
}
