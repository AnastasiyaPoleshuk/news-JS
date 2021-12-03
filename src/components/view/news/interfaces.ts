import { ISource }  from "../sources/sourceinterface";

export interface INewsData extends  ISource{
    source: ISource,
    author: "string",
    title: "string",
    description: "string",
    url: "string",
    urlToImage: "string",
    publishedAt: "string",
    content: "string",
}