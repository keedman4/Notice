import { INotice } from "./INotices";
export class ClassNotice{
    public Name:string;
    public Title:string;
    public Notice:string;
    public url:string;
    public Date:string;

   


    constructor(item: INotice){
        this.Name = item.Name;
        this.Title = item.Title;
        this.Notice = item.url;
        this.Notice = item.Notice;
        this.url = item.url;
        this.Date = item.Date;
       
    }
}