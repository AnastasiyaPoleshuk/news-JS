import  AppController  from '../controller/controller';
import { AppView } from '../view/appView';
import { IAppView } from '../view/appView';
import { IAppController } from '../controller/controller';

interface IApp {
    controller: IAppController,
    view: IAppView,
    start(): void,
} 

class App implements IApp {

    controller: IAppController;
    view: IAppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
