import { html,LitElement,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class StarzPluginz extends LitElement {
  static properties = {
    slid: {type: Boolean},
  };
  static styles = css`
        *{
            margin: 0;
            padding: 0;
        }
        .rate {
            float: left;
            height: 46px;
            padding: 0 10px;
        }
        .rate:not(:checked) > input {
            position:absolute;
            top:-9999px;
        }
        .rate:not(:checked) > label {
            float:right;
            width:1em;
            overflow:hidden;
            white-space:nowrap;
            cursor:pointer;
            font-size:30px;
            color:#ccc;
        }
        .rate:not(:checked) > label:before {
            content: 'â˜… ';
        }
        .rate > input:checked ~ label {
            color: #ffc700;    
        }
        .rate:not(:checked) > label:hover,
        .rate:not(:checked) > label:hover ~ label {
            color: #deb217;  
        }
        .rate > input:checked + label:hover,
        .rate > input:checked + label:hover ~ label,
        .rate > input:checked ~ label:hover,
        .rate > input:checked ~ label:hover ~ label,
        .rate > label:hover ~ input:checked ~ label {
            color: #c59b08;
        }
        /* Modified from: https://github.com/mukulkant/Star-rating-using-pure-css */        
  `;
   static async getMetaConfig() {
    return {
      controlName: 'Star Ratingzzs',
      fallbackDisableSubmit: false,
      groupName: 'Ratingzz',
      version: '1.2',
      properties: { 
              inputValue: {
              type: 'integer',
              title: "Input Value"
            },
        outcome: {
          title: 'Rating',
          type: 'integer',
        	description: 'Insert a Variable, to save the Rating',
          isValueField: true
        },        
      },
      events: ["ntx-value-change"],
    };
  }


  updated(changedProperties) {
    if (changedProperties.has('inputValue')) {
      this.requestUpdate();
    }
  }
  
_handleClick(e) {
   const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        // value coming from input change event. 
        detail:e,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
    console.log(e);
  }
  constructor() {
    super();
  }

  render() {
  const inputValue = this.inputValue || 0; // Use inputValue from properties or default to 0
  return html`
    <div class="rate">
      <input type="radio" id="star5" name="rate" value="5" ?checked=${inputValue === 5} @click=${() => this._handleClick(5)} />
      <label for="star5" title="text">5 stars</label>
      <input type="radio" id="star4" name="rate" value="4" ?checked=${inputValue === 4} @click=${() => this._handleClick(4)}/>
      <label for="star4" title="text">4 stars</label>
      <input type="radio" id="star3" name="rate" value="3" ?checked=${inputValue === 3} @click=${() => this._handleClick(3)}/>
      <label for="star3" title="text">3 stars</label>
      <input type="radio" id="star2" name="rate" value="2" ?checked=${inputValue === 2} @click=${() => this._handleClick(2)}/>
      <label for="star2" title="text">2 stars</label>
      <input type="radio" id="star1" name="rate" value="1" ?checked=${inputValue === 1} @click=${() => this._handleClick(1)}/>
      <label for="star1" title="text">1 star</label>
    </div>
    <input type="text" .value=${inputValue} @input=${(e) => this.inputValue = parseInt(e.target.value)} />
  `;
}

}
const elementName = 'starz-pluginz';
customElements.define(elementName, StarzPluginz);
