import AppLoader from './appLoader';
import { IMakeUrlParam } from './interfaces/ILoader';

export interface IAppController{
    getSources(calback: (data) => void): void,
    getNews(e, calback: (data) => void): void, 
}

class AppController extends AppLoader implements IAppController {
    getSources(callback): void {
        const param: IMakeUrlParam = {
            endpoint: 'sources',
            options: {},
        } ;
        super.getResp(
            param,
            callback
        );
    }

    getNews(e, callback): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

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
            target = target.parentNode;
        }
    }
}

export default AppController;
function IMakeUrlParam(arg0: { endpoint: string; }, IMakeUrlParam: any, callback: any) {
    throw new Error('Function not implemented.');
}

