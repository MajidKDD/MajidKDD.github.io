import {html, css, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MotionCarousel extends LitElement {

 static styles = css` 
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 455px;  
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
  overflow: hidden;
  border: 2px solid #002071;
  background: #e1e2e1;
}

.card {
  background: #e1e2e1;
  border-radius: 8px;
  border: 1px solid #002071;
  height: 90px; 
  padding: 8px;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8.2rem;
  cursor: pointer;
  user-select: none;
}
`;

  static properties = {
    selected: { type: Number },
  };
   // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'images Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        height: {
          type: 'number',
          title: 'percentage',          
          description: 'Type the percentage here'
        }
      }
    };
  }
  constructor() {
    super();
    this.selected = 0;
  }

 data = Array(7).fill(null, 0);

  render() {
    return html`
      <section class="container">
        ${this.data.map((_v, i) => {
          const count = this.data.length;
          const center = Math.trunc(count / 2);
          const order = (count + center + i - this.selected) % count;
          const zIndex = order === 0 || order === count - 1 ? -1 : 1;
          const fraction = i / this.data.length;
          return html`<div
            @click=${order < center ? this.dec : this.inc}
            style=${styleMap({
              order: String(order),
              zIndex: String(zIndex),
              background: `hsl(
                    ${Math.trunc(360 * fraction)},
                    ${20 + Math.trunc(60 * fraction)}%,
                    ${30 + Math.trunc(30 * fraction)}%)`,
            })}
            class="card"
           }
          >
            ${i}
          </div>`;
        })}
      </section>
    `;
  }

  shift(i) {
    const last = this.data.length - 1;
    return i > last ? 0 : i < 0 ? last : i;
  }

  dec() {
    this.selected = this.shift(this.selected - 1);
  }
  inc() {
    this.selected = this.shift(this.selected + 1);
  }
}
customElements.define('m-car', MotionCarousel);
