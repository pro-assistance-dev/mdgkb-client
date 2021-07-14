import INews from "@/interfaces/news/INews";
import ICategory from "@/interfaces/news/ICategory";
import ITag from "@/interfaces/news/ITag";
import Category from "@/classes/news/Category";
import Tag from "@/classes/news/Tag";
import PreviewThumbnailFile from "@/classes/File/PreviewThumbnailFile";
import IMeta from "@/interfaces/news/IMeta";
import Meta from "@/classes/news/Meta";

export default class News implements INews{
    id  = ''
    status  = ''
    title = ''
    category: ICategory = new Category()
    tags:ITag[] = []
    preview_thumbnail_file = new PreviewThumbnailFile()
    published_on: Date = new Date()
    __meta__: IMeta = new Meta()

    constructor(i?: INews) {
        if (!i) return
        this.id = i.id
        this.status = i.status
        this.title = i.title
        this.category = new Category(i.category)
        this.tags = i.tags.map((item: ITag) => new Tag(item))
        this.preview_thumbnail_file = new PreviewThumbnailFile(i.preview_thumbnail_file)
        this.published_on = i.published_on
        this.__meta__= i.__meta__
    }
}
