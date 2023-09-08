//ver 1.2 Alert Working - adding the id 
import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// define the component
export class RSPlugIn extends LitElement {
  static properties = {
    videosrc: { type: String },
    hide: { type: Boolean, enum: [true, false] },
  };

  static getMetaConfig() {
    return {
      controlName: 'rs show',
      fallbackDisableSubmit: false,
      groupName: 'rs show',
      version: '1.2',
      properties: {
        videosrc: {
          type: 'string',
          enum: [true, false], // Enum values for hide property
          title: 'Media Source',
          description: 'Imported YouTube embedded link is needed (e.g., https://www.youtube.com/embed/vpKcM4MxPzc)',
        },
        hide: {
          type: 'boolean',
          title: 'Hide Video',
          description: 'Set to true to hide the video, false to display it.',
        },
      },
    };
  }

  
    ShowHide() {
            alert('Hello 9898');  
  // Get the input element with id="ctrlid" 
    const updatedValue = '${this.videosrc}majid';  
      alert('${updatedValue}');
    console.error('Majidcczcz Input element with id "ctrlid" not found.');
  }

    collectStyleControlIds() {
    const divsWithClass = document.querySelectorAll('.nx-repeating-section-container');
    const styleControlIds = [];
    
    divsWithClass.forEach((div) => {
      const styleControlId = div.getAttribute('stylecontrolid');
      if (styleControlId) {
        styleControlIds.push(styleControlId);
      }
    });

    return styleControlIds.join(';');
  }
  findButtonsWithStyleControlId() {
    const buttons = document.querySelectorAll('button[data-e2e^="btn-new-row"]');
    const buttonsWithStyleControlId = [];

    buttons.forEach((button) => {
      const styleControlId = button.getAttribute('stylecontrolid');
      if (styleControlId) {
        buttonsWithStyleControlId.push(button);
      }
    });

    return buttonsWithStyleControlId;
  }

  renderButtons() {
    const buttons = this.findButtonsWithStyleControlId();

    buttons.forEach((button) => {
      if (this.hide) {
        button.style.display = 'none'; // Hide the button if hide is true
      } else {
        button.style.display = ''; // Show the button if hide is false
      }
    });

    return buttons;
  }
  constructor() {
    super();
    this.videosrc = this.collectStyleControlIds();
this.hide = false;
  }

render() {
    return html`
        <input type="text" id="ctrlid" style="width: 840px;" value="${this.videosrc}">
      <button @click="${this.ShowHide}">Click Me</button>      
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
