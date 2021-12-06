import { IResult } from "./interfaces/IResult";
import { ILoader } from "./interfaces/ILoader";
import { IMakeUrlParam } from "./interfaces/ILoader"
import { IArticle } from "../view/interfases/interfaces";

export enum HttpResponsesStatus{
    Unauthorized = 401,
    NotFound = 404,
}

class Loader implements ILoader{

    baseLink: string;
    options: object;
    param: IMakeUrlParam;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        param: IMakeUrlParam,
        callback = () => {
            console.error('No callback for GET response');
        }
    ){
        this.load('GET', param, callback);
    }

    errorHandler(res: IResult) {
        if (!res.ok) {
            if (res.status === HttpResponsesStatus.Unauthorized || res.status === HttpResponsesStatus.NotFound)
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

    load(method: string, param: IMakeUrlParam, callback: (data: IArticle) => void) {
        fetch(this.makeUrl(param), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
