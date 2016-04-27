/**
 * @license
 *
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Map Label.
 *
 * @author Luke Mahe (lukem@google.com),
 *         Chris Broadfoot (cbro@google.com)
 */

/**
 * Creates a new Map Label
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 */
function MapLabel(opt_options) {
  if (!MapLabel.prototype.setValues) {
    for (var property in google.maps.OverlayView.prototype) {
      MapLabel.prototype[property] = google.maps.OverlayView.prototype[property];
    }
  }

  this.set('align', 'center');
  this.set('fontColor', '#000000');
  this.set('fontFamily', 'Roboto,Arial,sans-serif');
  this.set('fontSize', 12);
  this.set('strokeColor', '#ffffff');
  this.set('strokeWeight', 4);
  this.set('zIndex', 1e3);

  this.setValues(opt_options);
}

window['MapLabel'] = MapLabel;


/** @inheritDoc */
MapLabel.prototype.changed = function(prop) {
  switch (prop) {
    case 'fontFamily':
    case 'fontSize':
    case 'fontColor':
    case 'strokeWeight':
    case 'strokeColor':
    case 'align':
    case 'text':
      return this.drawCanvas_();
    case 'maxZoom':
    case 'minZoom':
    case 'position':
      return this.draw();
  }
};

/**
 * Draws the label to the canvas 2d context.
 * @private
 */
MapLabel.prototype.drawCanvas_ = function() {
  var canvas = this.canvas_;
  if (!canvas) return;

  var style = canvas.style;
  style.position = 'absolute';
  style.zIndex = /** @type number */(this.get('zIndex'));

  var ctx = canvas.getContext('2d');
  ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

  var strokeWeight = Number(this.get('strokeWeight'));
  var text = this.get('text');
  var textMeasure = ctx.measureText(text);

  canvas.width = Math.ceil(textMeasure.width + strokeWeight * 2);
  canvas.height = Math.ceil(parseInt(this.get('fontSize')) + strokeWeight * 2);

  if (window.devicePixelRatio > 1) {
    style.width = canvas.width + 'px';
    style.height = canvas.height + 'px';
    canvas.width = canvas.width * window.devicePixelRatio;
    canvas.height = canvas.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  ctx.lineJoin = 'round';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.strokeStyle = this.get('strokeColor');
  ctx.fillStyle = this.get('fontColor');
  ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (text) {
    if (strokeWeight) {
      ctx.lineWidth = strokeWeight;
      ctx.strokeText(text, strokeWeight, strokeWeight);
    }

    ctx.fillText(text, strokeWeight, strokeWeight);
  }
};

/**
 * @inheritDoc
 */
MapLabel.prototype.onAdd = function() {
  var canvas = this.canvas_ = document.createElement('canvas');

  this.drawCanvas_();

  var panes = this.getPanes();
  if (panes) {
    panes.overlayLayer.appendChild(canvas);
  }
};
MapLabel.prototype['onAdd'] = MapLabel.prototype.onAdd;

/**
 * @inheritDoc
 */
MapLabel.prototype.draw = function() {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.canvas_) {
    // onAdd has not been called yet.
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
  if (!latLng) {
    return;
  }
  var pos = projection.fromLatLngToDivPixel(latLng);

  var style = this.canvas_.style;

  style['top'] = pos.y + 'px';
  //style['left'] = pos.x + 'px';

  switch(this.get('align')) {
    case 'left':
      style['left'] = pos.x - (this.canvas_.width / (window.devicePixelRatio ? window.devicePixelRatio : 1)) + 'px';
      style['margin-left'] = '-1em';
      style['margin-top'] = '-0.4em';
      break;
    case 'right':
      style['margin-top'] = '-0.4em';
      style['margin-left'] = '1em';
      style['left'] = pos.x + 'px';
      break;
    default:
      style['margin-top'] = '1em'; //'1em';
      style['left'] = (pos.x - (this.canvas_.width / (window.devicePixelRatio ? window.devicePixelRatio : 1)) / 2) + 'px';
  }

  style['visibility'] = this.getVisible_();
};
MapLabel.prototype['draw'] = MapLabel.prototype.draw;

/**
 * Get the visibility of the label.
 * @private
 * @return {string} blank string if visible, 'hidden' if invisible.
 */
MapLabel.prototype.getVisible_ = function() {
  var minZoom = /** @type number */(this.get('minZoom'));
  var maxZoom = /** @type number */(this.get('maxZoom'));

  if (minZoom === undefined && maxZoom === undefined) {
    return '';
  }

  var map = this.getMap();
  if (!map) {
    return '';
  }

  var mapZoom = map.getZoom();
  if (mapZoom < minZoom || mapZoom > maxZoom) {
    return 'hidden';
  }
  return '';
};

/**
 * @inheritDoc
 */
MapLabel.prototype.onRemove = function() {
  var canvas = this.canvas_;
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
};
MapLabel.prototype['onRemove'] = MapLabel.prototype.onRemove;
