
import { html,css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class LakeTreeRadioButtons extends LitElement {
  `
  static properties = {
    title: {type: String },
    value: {type: String },
    options: {type: String },
    readOnly: { },
  };

  static getMetaConfig() {
    return {
      controlName: 'LakeTree Radio Buttons22',
      iconUrl: "https://laketree.com/wp-content/themes/laketree/img/favicon/favicon-32x32.png",
      groupName : 'LakeTree',
      fallbackDisableSubmit: false,
      version: '2.0',
      standardProperties : {
        description: true,
        defaultValue: true,
        fieldLabel: true,
        readOnly: true,
        required: true,
        visibility: true
      },
      properties: {
        options: {
          type: 'string',
          title: 'Options',
          defaultValue: "Yes,No,Maybe",
          description: 'Comma separated list of options'
        },
        value: {
            type: 'string',
            title: 'Value',
            isValueField: true,
        }
      },
      events: ["ntx-value-change"],
    };
  }

  constructor() {
    super();
  }


  optionClicked(e)  {

  const args = {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: e.srcElement.innerText,
  };
 const event = new CustomEvent('ntx-value-change', args);
 this.dispatchEvent(event);

}

      render() {
       this._arrOptions = [];  

      this._disabledStyle = this.readOnly ? "pointer-events: none;opacity:.5;" : "";  
      this._defaultValue = this._defaultValue ?? "";
      this.value = this.value ?? this._defaultValue;  //set the value to the default value if not set.

      this._options = this.options ?? "Yes,No,Maybe"; 
        const optionsArray = this._options.split(",");
const uniqueOptions = optionsArray.filter((item, index) => optionsArray.indexOf(item) === index);

   this._arrOptions = uniqueOptions.map((item, index) => ({
  id: index,
  value: item,
  checked: this.value === item,
}));
            return html`

                    <div class="lt-radio-buttons-wrapper" style="${this._disabledStyle}">
                        ${this._arrOptions.map((opt) => html`
                            <input type="radio"  name="radioButtonTest" value="${opt.value}" id="${opt.id}" ?checked=${opt.checked} /><label @click=${this.optionClicked} for="${opt.id}">${opt.value}</label>
                        `)}

                    </div>
                    
        `;
    
                  }

}


const elementName = 'laketree-radios';
customElements.define(elementName, LakeTreeRadioButtons);
