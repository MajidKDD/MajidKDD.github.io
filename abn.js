import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class abnControl extends LitElement {
  
  static properties = {
    videoUrl: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'abn Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        videoUrl: {
          type: 'string',
          title: 'abnURL',
          // isValueField: true,
          description: 'Type the YouTube URL here'
        }
      }
    };
  }
  
  
  renderCountry(country) {
    this.videoUrl =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
 //   const abnvar = 'https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN?searchString='+this.videoUrl+'&includeHistoricalDetails=N&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417';
 const abnvar =   'https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2017?name='+this.videoUrl+'&legalName=&tradingName=&businessName=&activeABNsOnly=&NSW=&SA=&ACT=&postcode=&VIC=&WA=&NT=&QLD=&TAS=&authenticationGuid=a1aceb80-e8bd-46f0-a5e1-e232c4a4c417&searchWidth=&minimumScore=&maxSearchResults=';
  const response = await fetch(abnvar);
    const myJson = await response.text();
    const countryPromise = Promise.resolve(myJson);
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(myJson, 'text/xml');
        //const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("effectiveFrom")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("ASICNumber")[0].childNodes[0].nodeValue;
          const xpathResult = xmlDoc.getElementsByTagName("organisationName")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("score")[0].childNodes[0].nodeValue+'|   '+xmlDoc.getElementsByTagName("identifierValue")[0].childNodes[0].nodeValue;
    const country = await xpathResult; 
    return country;
    //html `  <div>Country: ${country}</div>  `;  
  }
  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.videoUrl = await this.load();
        //await this.load();
    }
  
 render() {
    return html`ABN Datat:<p>"${this.videoUrl}" </p>`;
 }
//  render() {
//    return html`   <div>    <b>Country:</b>   </div>   `;
//  }     

}

// registering the web component
const elementName = 'abn-control';
customElements.define(elementName, abnControl);
