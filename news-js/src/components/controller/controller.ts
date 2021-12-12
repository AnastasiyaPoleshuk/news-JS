import AppLoader from './appLoader';
import { IMakeUrlParam } from './interfaces/ILoader';
import { ISourcesData } from '../view/appView';
import { INewsData } from '../view/appView';
import { INews } from '../view/news/INews';


export interface IAppController{
    getSources(calback: (data: ISourcesData) => void): void,
    getNews(e: Event, calback: (data: INewsData) => void): void, 
}

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data: ISourcesData) => void): void {
        const param: IMakeUrlParam = {
            endpoint: 'sources',
            options: {},
        } ;
        super.getResp(
            param,
            callback
        );
    }

    getNews(e: Event, callback: (data: INewsData) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;


