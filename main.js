const progressElement = document.querySelector('circular-progress');
const progressValue = document.getElementById('progress-value');
const toggleAnimationSwitch = document.getElementById('toggle-animation');
const toggleHiddenSwitch = document.getElementById('toggle-hidden');

let timeoutId;
const updateProgress = () => {
	clearTimeout(timeoutId);

	timeoutId = setTimeout(
		() => progressElement.setAttribute('value', progressValue.value),
		500,
	);
};

let isAnimated = progressElement.hasAttribute('animated');
const rotateProgress = () => {
	isAnimated
		? progressElement.removeAttribute('animated')
		: progressElement.setAttribute('animated', '');
	isAnimated = !isAnimated;
};

let isHidden = progressElement.hasAttribute('hidden');
const hideProgress = () => {
	isHidden
		? progressElement.removeAttribute('hidden')
		: progressElement.setAttribute('hidden', '');
	isHidden = !isHidden;
};

progressValue.addEventListener('input', updateProgress);
toggleAnimationSwitch.addEventListener('click', rotateProgress);
toggleHiddenSwitch.addEventListener('click', hideProgress);
