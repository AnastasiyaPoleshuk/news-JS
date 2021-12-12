import { ILoader } from "./interfaces/ILoader";
import { IMakeUrlParam } from "./interfaces/ILoader";
import { ISouces } from "../view/sources/ISources";
import { INews } from "../view/news/INews";

export enum HttpResponseStatus{
    Unauthorized = 401,
    NotFound = 404,
}

class Loader implements ILoader{

    constructor(public baseLink: string, public options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        param: IMakeUrlParam,
        callback = (data?) => {
            console.error('No callback for GET response');
        }
    ){
        this.load('GET', param, callback);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === HttpResponseStatus.Unauthorized || res.status === HttpResponseStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(param: IMakeUrlParam): string {
        const urlOptions = { ...this.options, ...param.options };
        let url = `${this.baseLink}${param.endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, param: IMakeUrlParam, callback: (data: ISouces | INews) => void) {
        fetch(this.makeUrl(param), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
