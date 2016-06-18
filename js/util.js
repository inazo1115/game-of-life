/**
 * utility funcions
 */

/**
 * @return boolean
 */
function get_next_bool() {
  return Math.random() < 0.5;
}

/**
 * @param int degree
 * @return float radian
 */
function to_radian(degree) {
  return degree * (Math.PI / 180);
}
