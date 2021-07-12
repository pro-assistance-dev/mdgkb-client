import ILike from "@/interfaces/likes/ILike";

export default class Like implements ILike{
    id?: string;
    constructor(i?: ILike) {
        if (!i) return
        this.id = i.id
    }
}
