import { ISouces } from "../sources/ISources";
import { INews } from "../news/INews";

export interface IView{
    draw(data: ISouces [] | INews []): void,
}