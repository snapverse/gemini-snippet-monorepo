// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SkeletonLoading {
  element = document.createElement('section');

  public constructor() {
    this.onInit();
  }

  private onInit() {
    this.element.classList.add('gem_SkeletonLoading');

    this.element.innerHTML = /*html*/ `
    <img width="32" height="32" src="${chrome.runtime.getURL('gemini-colored.svg')}" />
    <div class="gem_SkeletonLoadingWrapper">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
    </div>
		`;
  }
}
