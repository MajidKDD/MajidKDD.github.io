import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class StarsPlugin extends LitElement {
  static properties = {
    num1: { type: Number },
    num2: { type: Number },
  };

  static getMetaConfig() {
    return {
      controlName: 'Number AdditionS',
      fallbackDisableSubmit: false,
      groupName: 'Calculator2',
      version: '1.20',
      properties: {
        num1: {
          title: 'Number 1',
          type: 'integer',
          description: 'Enter the first number',
          isValueField: true,
        },
        num2: {
          title: 'Number 2',
          type: 'integer',
          description: 'Enter the second number',
          isValueField: true,
        },
      },
      events: [],
    };
  }

  render() {
    const sum = (this.num1) + (this.num2);

    return html`
      <input
        type="number"
        placeholder="Calculated Sum"
        .value=${sum}
      />
    `;
  }
}

const elementName = 'sum-calculator';
customElements.define(elementName, StarsPlugin);
