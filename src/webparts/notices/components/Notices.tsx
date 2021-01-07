import * as React from 'react';
import styles from './Notices.module.scss';
import { INoticesProps } from './INoticesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jQuery from "jquery";
import { ClassNotice } from './ClassNotice';
import { INotice } from './INotices';
// import { sp, Web } from "sp-pnp-js";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
//import { Item } from '@pnp/sp/items';
export default class Notices extends React.Component<INoticesProps, any> {
  public constructor(props:INoticesProps,any)
  {
      
      super(props);
      this.state={
          items:new Array<any>()//[]
      };
    this.getListItems();  
  }


  private getListItems(): void {
     if(typeof this.props.listTitle !== "undefined" && this.props.listTitle.length > 0) {
      sp.web.lists.getById(this.props.listTitle).items.select("Title","Notice","Date").top(5).orderBy("Modified", true).get()
        .then((results: Array<any>) => {
          this.setState({
            items: results
          });
        })
        .catch((error:any) => {
          console.log("Failed to get list items!");
          console.log(error);
        });
    }
  }

  public componentDidUpdate(prevProps:INoticesProps): void {
    if(prevProps.listTitle !== this.props.listTitle) {
      this.getListItems();
    }
  }



  public render(): React.ReactElement<INoticesProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none"); jQuery(".SPCanvas-canvas").prop("style", "max-width: none"); jQuery(".CanvasZone").prop("style", "max-width: none");
    let listSelected:boolean = typeof this.props.listTitle !== "undefined" && this.props.listTitle.length > 0;
    return (
      <div className={ styles.notice }>
         <div className={ styles.headline }>
                <div className={ styles.grid }>
                    <div className={ styles.hcard }>
                       <h1>Important Notice </h1>
                    </div> 
                    <div className={ styles.hcard }>
                      <a href="https://axamansard.sharepoint.com/SitePages/Notice.aspx">View All</a>
                    </div> 
                </div> 
            </div>
         <div className={ styles.grid }>
         {
         this.state.items.map((Item:any) => {                 //function(item:INotice){
     return(
       <div className={ styles.card }>
        <h4>{Item.Title}</h4>
        <h4>{Item.Notice}</h4>
       <small>{Item.Date}</small>
       </div>
    )

})
 } 
      
       </div>
       </div>
     );
   }

//   public componentDidMount()
//   {
      
//       // debugger;
//       this._NewsList();
//   }
//   private _NewsList():void
//   {
  
   
//   // let web = new Web(this.props.context.pageContext.web.absoluteUrl);  
//   // web.lists.getByTitle(this.props.listTitle).items.get().then

//   sp.web.lists.getByTitle(`Notice`).items.select("Title","Notice","Date").get();
  
//       ((response)=>{
//         console.log(response)

//           let NewsCollection=response.map(item=> new ClassNotice(item)).reverse();
//           let NewsCard = NewsCollection.slice(0, 6)
//           this.setState({items:NewsCard});
//       }
   
//       )  }



}
