import  {HttpResponsesStatus} from "../loader"
 
export interface IResult extends Response{
    ok: boolean,
    status: HttpResponsesStatus,
    statusText: string,
}