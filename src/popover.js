export default class Popover {
  constructor(element) {
    this.element = element;
    this.popover = null;
    // Привязываем контекст для обработчиков
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  init() {
    this.element.addEventListener('click', this.handleButtonClick);
  }

  handleButtonClick(e) {
    e.stopPropagation();
    
    if (this.popover) {
      this.hide();
    } else {
      this.show();
      // Добавляем обработчик документа только при показе popover
      document.addEventListener('click', this.handleDocumentClick);
    }
  }

  handleDocumentClick(e) {
    if (!this.popover.contains(e.target) && e.target !== this.element) {
      this.hide();
    }
  }

  show() {
    const title = this.element.dataset.title;
    const content = this.element.dataset.content;
    
    this.popover = document.createElement('div');
    this.popover.className = 'popover';
    this.popover.innerHTML = `
      <div class="popover-header">${title}</div>
      <div class="popover-body">${content}</div>
      <div class="popover-arrow"></div>
    `;

    document.body.appendChild(this.popover);
    this.positionPopover();
  }

  positionPopover() {
    const rect = this.element.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    
    const top = window.scrollY + rect.top - popoverRect.height - 10;
    const left = window.scrollX + rect.left + (rect.width - popoverRect.width) / 2;
    
    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${Math.max(10, left)}px`;
  }

  hide() {
    if (this.popover) {
      this.popover.remove();
      this.popover = null;
      // Удаляем обработчик документа при скрытии popover
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }
}