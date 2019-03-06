import black from './atoms/black.png'
import green from './atoms/green.png'
import green_selected from './atoms/green_selected.png'
import pink from './atoms/pink.png'
import pink_selected from './atoms/pink_selected.png'
import red from './atoms/red.png'
import red_selected from './atoms/red_selected.png'
import yellow from './atoms/yellow.png'
import yellow_selected from './atoms/yellow_selected.png'

import city from './entities/city.png'
//import city_selected from './entities/city_selected.png'
import monad from './entities/monad.png'
//import monad_selected from './entities/monad_selected.png'
import place from './entities/place.png'
//import place_selected from './entities/place_selected.png'

import notification from './symbols/notification.png'

import mouseDrag from './mouse-drag-icon.png'
import mouseLeftClick from './mouse-left-click-icon.png'
import mouseRightClick from './mouse-right-click-icon.png'
import parrot from './parrot.svg'

const atoms = {
  black,
  green,
  green_selected,
  pink,
  pink_selected,
  red,
  red_selected,
  yellow,
  yellow_selected
}

const entities = {
  city,
  department: city,
  place,
  monad
}

const symbols = {
  parrot,
  notification
}

const icons = {
  ...atoms,
  ...entities,
  ...symbols,
  mouseDrag,
  mouseLeftClick,
  mouseRightClick,
  parrot
}

export default icons
