import { WebPartContext } from "@microsoft/sp-webpart-base"; 
export interface INoticesProps {
  description: string;
  Name: string;
  Title: string;
  Notice:string;
  url:string;
  Date:string;
  context:WebPartContext; 
  listTitle: string;
}
