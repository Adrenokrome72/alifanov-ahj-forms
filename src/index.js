import './styles.css';
import Popover from './popover';

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.btn');
  const popover = new Popover(button);
  popover.init();
});