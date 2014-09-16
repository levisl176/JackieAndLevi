
window.SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
window.HALF_PI = Math.PI * 0.5;
window.THREE_HALVES_PI = Math.PI * 1.5;
window.TWO_PI = Math.PI * 2;
window.RAD_TO_DEG = 180 / Math.PI;
window.SQUISH_COMPRESS_EASING_FUNCTION = 'easeOutQuad';
window.SQUISH_EXPAND_EASING_FUNCTION = 'easeInQuad';
window.SQUISH_MIN_RADIUS_EASING_FUNCTION = 'easeOutQuad';

window.initializeDependentConstants = function () {
  window.COEFF_OF_FRICTION_INVERSE = 1 - PARAMS.COEFF_OF_FRICTION;
  window.SQUISH_ENABLED = PARAMS.SQUISH_ON && PARAMS.MAX_SQUISHINESS > 0 && PARAMS.COEFF_OF_SQUISHINESS > 0;
  window.DISSOLVE_ANIMATION_DOTS_PER_CIRCUMFERENCE_UNIT = 1 / (PARAMS.ANIMATION.DISSOLVE.DOT_HALF_WIDTH_START * 2) * PARAMS.ANIMATION.DISSOLVE.DOT_DENSITY;
  window.CHILD_VELOCITY_CHANGE_MAGNITUDE_TIMES_RADIUS_THRESHOLD = PARAMS.POP.VELOCITY_CHANGE_MAGNITUDE_TIMES_RADIUS_THRESHOLD * PARAMS.POP.CHILD_VELOCITY_CHANGE_MAGNITUDE_RADIUS_THRESHOLD_RATIO;
  window.POP_MAX_SPEED_CHANGE = PARAMS.TOUCH.MAX_SPEED_CHANGE * PARAMS.POP.POP_TO_TOUCH_MAX_SPEED_CHANGE_RATIO;
  window.POP_MAX_DISTANCE = PARAMS.TOUCH.MAX_DISTANCE * PARAMS.POP.POP_TO_TOUCH_MAX_DISTANCE_RATIO;
};
