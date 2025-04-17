class CircularProgressBar extends HTMLElement {
	static get observedAttributes() {
		return ['value', 'animated', 'hidden'];
	}

	constructor() {
		super();

		this.innerHTML = `
      <svg
        id="circular-bar"
        width="200"
        height="200"
        viewBox="-25 -25 250 250"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: rotate(-90deg)"
      >
        <circle
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#ebf1f6"
          stroke-width="20"
        ></circle>
        <circle
          id="progress-bar"
          r="90"
          cx="100"
          cy="100"
          stroke="#005bff"
          stroke-width="20"
          stroke-linecap="butt"
          stroke-dashoffset="565.48px"
          fill="transparent"
          stroke-dasharray="565.48px"
        ></circle>
      </svg>
    `;

		this.progressBar = this.querySelector('#progress-bar');
		this.svgElement = this.querySelector('#circular-bar');

		this.totalLength = 2 * Math.PI * 90;
		this.value = parseFloat(this.getAttribute('value')) || 0;
		this.animated = this.hasAttribute('animated');
		this.hidden = this.hasAttribute('hidden');

		this.updateProgress();
	}

	updateProgress() {
		const percentage = Math.max(0, Math.min(100, this.value));
		const progress = this.totalLength - (percentage / 100) * this.totalLength;

		this.progressBar.setAttribute('stroke-dashoffset', progress);

		if (this.animated) {
			this.svgElement.classList.add('rotating');
		} else {
			this.svgElement.classList.remove('rotating');
		}

		if (this.hidden) {
			this.svgElement.classList.add('hidden');
		} else {
			this.svgElement.classList.remove('hidden');
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'value') this.value = parseFloat(newValue) || 0;

		if (name === 'animated') this.animated = newValue !== null;

		this.updateProgress();
	}
}

customElements.define('circular-progress', CircularProgressBar);
