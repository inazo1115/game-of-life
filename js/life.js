/**
 * game-of-life
 */
function life() {

  /* init */
  var field = [
    [F, F, F, T, T, F, F, F, F, F, F, T, T, F, F, F],
    [F, F, T, F, F, T, F, F, F, F, T, F, F, T, F, F],
    [F, T, F, F, F, F, T, F, F, T, F, F, F, F, T, F],
    [T, F, F, F, F, F, F, T, T, F, F, F, F, F, F, T],
    [T, F, F, F, F, F, F, T, T, F, F, F, F, F, F, T],
    [F, T, F, F, F, F, T, F, F, T, F, F, F, F, T, F],
    [F, F, T, F, F, T, F, F, F, F, T, F, F, T, F, F],
    [F, F, F, T, T, F, F, F, F, F, F, T, T, F, F, F],
    [F, F, F, T, T, F, F, F, F, F, F, T, T, F, F, F],
    [F, F, T, F, F, T, F, F, F, F, T, F, F, T, F, F],
    [F, T, F, F, F, F, T, F, F, T, F, F, F, F, T, F],
    [T, F, F, F, F, F, F, T, T, F, F, F, F, F, F, T],
    [T, F, F, F, F, F, F, T, T, F, F, F, F, F, F, T],
    [F, T, F, F, F, F, T, F, F, T, F, F, F, F, T, F],
    [F, F, T, F, F, T, F, F, F, F, T, F, F, T, F, F],
    [F, F, F, T, T, F, F, F, F, F, F, T, T, F, F, F]
  ];

  /**
   * unit process
   */
  function unit() {
    /* init */
    var next_field = [
      [], [], [], [], [], [], [], [],
      [], [], [], [], [], [], [], []
    ];

    /**
     * @param int x
     * @param int y
     * @return boolean live or death
     */
    function proceed_cell(x, y) {
      /* init */
      var is_live   = field[x][y];
      var num_live  = 0;
      var num_death = 0;
      var x_min = (x - 1 < 0)            ? 0     : x - 1       ;
      var x_max = (x + 1 < (SIZE_X - 1)) ? x + 1 : (SIZE_X - 1);
      var y_min = (y - 1 < 0)            ? 0     : y - 1       ;
      var y_max = (y + 1 < (SIZE_Y - 1)) ? y + 1 : (SIZE_Y - 1);

      /* check neighbor cell */
      for(var i = x_min; i <= x_max; i++) {
        for(var j = y_min; j <= y_max; j++) {
          if(i == x && j == y) continue;
          (field[i][j]) ? num_live++ : num_death++;
        }
      }

      if(!is_live && num_live == 3) {
        // come to life
        return T;
      } else if(is_live && (num_live == 2 || num_live == 3)) {
        // unchanged
        return T;
      } else if(is_live && num_live <= 1) {
        // underpopulation
        return F;
      } else if(is_live && num_live >= 4) {
        // overpopulation
        return F;
      } else {
        // other
        return F;
      }
    }

    function set_next_field(func) {
      for(var x = 0; x < SIZE_X; x++) {
        for(var y = 0; y < SIZE_Y; y++) {
          next_field[x][y] = func(x, y);
        }
      }
    }

    /* update */
    (global_counter % 256 == 0) ? set_next_field(get_next_bool) : set_next_field(proceed_cell);
    field = next_field;
  }

  /**
   * call every frame
   * @return updated field
   */
  return function() {
    unit();
    return field;
  };
}
