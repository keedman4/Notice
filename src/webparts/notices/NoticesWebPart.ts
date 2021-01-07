import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'NoticesWebPartStrings';
import Notices from './components/Notices';
import { INoticesProps } from './components/INoticesProps';
import { sp } from "@pnp/sp";

export interface INoticesWebPartProps {
  description: string;
  Name: string;
  Title: string;
  Notice:string;
  url:string;
  Date:string;
  listTitle: string;
}

export default class NoticesWebPart extends BaseClientSideWebPart<INoticesWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }


  public render(): void {
    const element: React.ReactElement<INoticesProps> = React.createElement(
      Notices,
      {
        listTitle: this.properties.listTitle,
        description: this.properties.description,
        Name: this.properties.Name,
        Title: this.properties.Title,
        Notice: this.properties.Notice,
        url: this.properties.url,
        Date: this.properties.Date,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldListPicker('listTitle', {
                  label: 'Select a list',
                  selectedList: this.properties.listTitle,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  webAbsoluteUrl: this.context.pageContext.web.absoluteUrl,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
