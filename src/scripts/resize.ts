document.addEventListener('DOMContentLoaded', () => {
  const resizer = document.getElementsByClassName('resizer')[0] as HTMLElement;
  const leftSide = resizer.previousElementSibling as HTMLElement;

  let x = 0;
  let y = 0;
  let leftWidth = 0;

  function mouseDownHandler(e: MouseEvent) {
    x = e.clientX;
    y = e.clientY;
    leftWidth = leftSide.getBoundingClientRect().width;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  function mouseMoveHandler(e: MouseEvent) {
    const dx = e.clientX - x;
    const newLeftWidth = ((leftWidth + dx) * 100) / (resizer.parentElement as HTMLElement).getBoundingClientRect().width;
    leftSide.style.width = newLeftWidth + '%';
    document.body.style.cursor = 'col-resize';

    const elements = [...document.getElementsByClassName('date'), ...document.getElementsByClassName('length')];
    if (newLeftWidth < 18) elements.forEach((element) => ((element as HTMLElement).style.display = 'none'));
    else elements.forEach((element) => ((element as HTMLElement).style.display = 'block'));
  }

  function mouseUpHandler() {
    document.body.style.removeProperty('cursor');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }

  resizer.addEventListener('mousedown', mouseDownHandler);
});
