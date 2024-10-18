function createErrorPopup() {
	const popup = document.createElement('dialog');
	popup.setAttribute('open', true);
	popup.classList.add('error-popup');

	popup.innerHTML = `<div><span>Connection issues!</span>
  <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M222.917 78.125C231.25 86.4584 231.25 100 222.917 107.292L193.75 136.458L112.5 55.2084L141.667 26.0417C150 17.7084 163.542 17.7084 170.833 26.0417L189.583 44.7917L220.833 13.5417L235.417 28.125L204.167 59.375L222.917 78.125ZM162.5 138.542L147.917 123.958L118.75 153.125L96.8749 131.25L126.042 102.083L111.458 87.5L82.2916 116.667L66.6666 102.083L37.4999 131.25C29.1666 139.583 29.1666 153.125 37.4999 160.417L56.2499 179.167L14.5833 220.833L29.1666 235.417L70.8333 193.75L89.5833 212.5C97.9166 220.833 111.458 220.833 118.75 212.5L147.917 183.333L133.333 168.75L162.5 138.542Z" fill="white"/>
  </svg> 
  <p>Establish the connection and refresh the page!</p></div>
  
  
    `;

	return popup;
}

export function errorPopup() {
	const body = document.body;
	const popup = createErrorPopup();

	body.style.overflow = 'hidden';
	body.prepend(popup);
}
