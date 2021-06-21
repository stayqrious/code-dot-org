import * as Sentry from '@sentry/browser';


Sentry.init({ dsn: 'https://93ee53fab0ef471d8da898849309536e@o353341.ingest.sentry.io/5286225', environment: process.env.NODE_ENV });

/*** Canvas patching ***/
const getCanvasContext = HTMLCanvasElement.prototype.getContext;
const event = new Event("canvas_change", { bubbles: true });

HTMLCanvasElement.prototype.getContext = function () {
  const context = getCanvasContext.apply(this, arguments)
  
  const canvas = this;

  const patchFunctions = ['drawImage', 'closePath', 'fill', 'fillRect', 'stroke'];

  patchFunctions.forEach((fx) => {
  	const existing = context[fx];
  	context[fx] = function() {
  		existing.apply(this, arguments);
      canvas.dispatchEvent(event);
  	}
  });

  return context
}

if(window.Phaser) {
  function streamChanges() {
    const game = document.getElementById("phaser-game");
    if (!game) {
      window.setTimeout(streamChanges, 300);
      return;
    }

    const canvas = game.querySelector("canvas");
    if (!canvas) {
      window.setTimeout(streamChanges, 300);
      return;
    }
    canvas.dispatchEvent(event);
    requestAnimationFrame(streamChanges);
  }

  window.setTimeout(streamChanges, 300);
}
/*** End Canvas patching ***/