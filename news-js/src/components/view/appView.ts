import News from './news/news';
import Sources from './sources/sources';
import { ISouces } from './sources/ISources';
import { INews } from './news/INews';

export interface IAppView{
    news: News,
    sources: Sources,
    drawNews(data: INewsData): void,
    drawSources(data: ISourcesData): void,
};

export class AppView implements IAppView{

    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsData): void {
        const values: INews [] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesData): void{
        const values: ISouces [] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

export interface INewsData{
    articles: INews [],
    status: string,
    totalResults: number,
}

export interface ISourcesData{
    sources: ISouces [],
    status: string,
}
