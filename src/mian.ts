import '@/assets/css/index.scss';
import $ from "jquery";

import Grid from '@/ui/grid';

const grid = new Grid($('.game-box'));
grid.build();

// reset

$('.restart').on('click', e => {
  grid.rebuild();
})
