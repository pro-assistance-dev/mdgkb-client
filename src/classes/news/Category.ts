import ICategory from "@/interfaces/news/ICategory";

export default class Category implements ICategory{
    id = ''
    name  =''


    constructor(i?: ICategory) {
        if (!i) return
        this.id = i.id
        this.name = i.name
    }
}
