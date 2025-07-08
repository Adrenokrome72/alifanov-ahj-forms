import Popover from '../src/popover';
import fs from 'fs';
import path from 'path';

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8');
  document.body.innerHTML = html;
});

describe('Popover Widget', () => {
  let popoverInstance;
  let button;

  beforeEach(() => {
    button = document.querySelector('.btn');
    popoverInstance = new Popover(button);
    popoverInstance.init();
  });

  afterEach(() => {
    if (popoverInstance.popover) {
      popoverInstance.hide();
    }
  });

  test('popover появляется при клике', () => {
    button.click();
    
    const popover = document.querySelector('.popover');
    expect(popover).not.toBeNull();
    expect(popoverInstance.popover).not.toBeNull();
  });

  test('popover исчезает при повторном клике', () => {
    // Первый клик - показ
    button.click();
    expect(document.querySelector('.popover')).not.toBeNull();
    
    // Второй клик - скрытие
    button.click();
    
    // Проверяем как состояние класса, так и DOM
    expect(popoverInstance.popover).toBeNull();
    expect(document.querySelector('.popover')).toBeNull();
  });

  test('popover закрывается при клике вне области', () => {
    button.click();
    expect(document.querySelector('.popover')).not.toBeNull();
    
    // Клик вне popover и кнопки
    document.body.click();
    
    expect(popoverInstance.popover).toBeNull();
    expect(document.querySelector('.popover')).toBeNull();
  });
});