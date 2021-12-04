import { IView }  from "./Iview";

export interface IArticle{
    id: string,
    name: string,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
}