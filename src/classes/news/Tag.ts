import ITag from "@/interfaces/news/ITag";

export default class Tag implements ITag{
    id  = ''
    color = ''
    label = ''

    constructor(i?: ITag) {
        if (!i) return
        this.id = i.id
        this.color = i.color
        this.label = i.label
    }
}
