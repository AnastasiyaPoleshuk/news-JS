import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '207ca9a63d8f4c6380889c55d03ce162', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
