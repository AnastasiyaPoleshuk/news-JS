import { IArticle }  from "./interfaces";

export interface IView{
    draw(data: IArticle []): void,
}