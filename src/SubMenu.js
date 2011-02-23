; (function() {
  var _namespace = this

  /* EW (02/06/2011):
   * ItemSelector is a subcomponent of the SubMenu, used for providing the menu
   * with a method of selecting items. It has its own canvas * to keep the 
   * drawing mechanism as simple as possible.
   * */
  var _createItemSelector = function(config) {
    var ItemSelector = {}
      , _btn
      , _menu
      , _items
      , _canvas = config.canvas
      , _context
      , _stopMoving = true
      , _moving = false
      , _disableClick = false
      , _target
      , _moveHandler
      , _clickHandler

    _canvas.width = document.documentElement.clientWidth
    _canvas.height = document.documentElement.clientHeight

    ItemSelector.canvas = _canvas
    ItemSelector.context = _context = _canvas.getContext('2d')

    ItemSelector.menu = _menu = config.menu
    _items = _menu.items

    ItemSelector.disableClick = function() {
      _disableClick = true
    }
    ItemSelector.enableClick = function() {
      _disableClick = false
    }

    ItemSelector.fadeIn = function(callback) {
      var _title = _namespace.currentPage.title
        , _i
      for (_i = 0; _btn = _items[_i]; _i++) {
        if (_btn.text === _title) break 
      }

      /* EW (02/13/2010):
       * Current: the button that represents the currently loaded page
       * */
      ItemSelector.current = _btn
      ItemSelector.index = _i
  
      ItemSelector.x = _btn.x
      ItemSelector.y = _btn.y
      ItemSelector.width = _btn.width
      ItemSelector.height = _btn.height

      _target = _btn

      _namespace.CanvasEffects.fadeIn.call
        ( ItemSelector
        , function() {
            window.addEventListener('click', _clickHandler, false)
            window.addEventListener('mousemove', _moveHandler, false)
            _stopMoving = false
            callback && callback()
          }
        , _btn.getImageDataSelected()
        )
    }

    ItemSelector.fadeOut = function(callback) {
      window.removeEventListener('click', _clickHandler, false)
      window.removeEventListener('mousemove', _moveHandler, false)
      _stopMoving = true
      _namespace.CanvasEffects.fadeOut.call(ItemSelector, callback)
    }

    _moveHandler = function(e) {
      /* EW (02/13/2010):
       * Try and get an item at the current mouse position
       * */
      var _newItem = ItemSelector.getItemAt(e.clientX, e.clientY)

      /* EW (02/13/2010):
       * If no such item exists at the current position, the selection needs to
       * return to item that represents the current page (_this.current)
       * */
      if (!_newItem) {
        document.body.style.cursor = "auto"
        _target = ItemSelector.current
        ItemSelector.move(function() { _moving = false })
        _moving = true
        return
      }
      document.body.style.cursor = "pointer"

      /* EW (02/13/2010):
       * If the item at the location is already the selected item, just return
       * early since nothing needs to be done
       * */
      if (_newItem === _target) return

      /* EW (02/13/2010):
       * If neither of the above is true, then we need to move the selection to
       * the new item and mark it as the selected item when the move is complete
       * */
      _target = _newItem
      ItemSelector.move(function() { _moving = false })
      _moving = true
    }

    ItemSelector.move = function(callback) {
      if (_moving) return

      /* EW (02/20/2011):
       * For optimization reasons, assign the width, height, x, and y properties
       * to local variables, and reassign them to the properties when the move
       * is finished
       * */
      var _interval
        , _context = ItemSelector.context
        , _step = 10
        , _itemSelectorX = ItemSelector.x
        , _itemSelectorY = ItemSelector.y

      _interval = setInterval(function() {
        var _targetX = _target.x

        /* EW (02/20/2011):
         * If either the selector is exactly at the new position, or the
         * _stopAnimation flag has been triggered by the fadeOut functions, we
         * want to clearn the interval, and execute the callback if there
         * */
        if (_targetX === _itemSelectorX || _stopMoving ) {
          clearInterval(_interval)
          callback && callback()
          return
        }

        _context.clearRect
          ( _itemSelectorX
          , _itemSelectorY
          , ItemSelector.width
          , ItemSelector.height
          )

        if (Math.abs(_itemSelectorX - _targetX) < _step)
          _itemSelectorX = _targetX
        else
          _itemSelectorX += _targetX > _itemSelectorX ? _step : -_step

        _context.putImageData
          ( _target.getImageDataSelected()
          , _itemSelectorX
          , _itemSelectorY
          )

        ItemSelector.x = _itemSelectorX
        ItemSelector.y = _itemSelectorY
        ItemSelector.width = _target.width
        ItemSelector.height = _target.height
      }, 10)
    }

    _clickHandler = function(e) {
      /* EW (02/13/2010):
       * NOTE: Instead of launching the handler for _this.selected when a click
       * occurs, we explicitly get the item at mouse X,Y to avoid problems if
       * the user clicks before the animation is complete.
       * */
      var _newItem = ItemSelector.getItemAt(e.clientX, e.clientY)

      if (_disableClick) return

      if (!_newItem || _newItem === ItemSelector.current) return

      /* EW (02/20/2011):
       * Only set the current item if the handler doesn't return false
       * */
      if (_newItem.handler() !== false)
        ItemSelector.current = _newItem
    }

    ItemSelector.getItemAt = function(x,y) {
      var _i = 0
        , _menuX = _menu.menuX
        , _menuY = _menu.menuY
        , _btn

      x += window.pageXOffset
      y += window.pageYOffset

      /* EW (02/13/2010):
       * Make sure the mouse coordinates are within the menu bounds, otherwise
       * just return null
       * */
      if (  y < _menuY
         || y > _menuY + _menu.menuHeight
         || x < _menuX
         || x > _menuX + _menu.menuWidth
         ) return null

      /* EW (02/13/2010):
       * Since the items can be any length, we have to look through them to see
       * which one the mouse is over. When found we return it
       * */
      for (_i = 0; _btn = _items[_i]; _i++)
        if (x >= _btn.x && x < _btn.x + _btn.width)
          return _btn

      /* EW (02/13/2010):
       * In the event the mouse is within bounds of the menu, but not over any
       * item, return null.
       * */
      return null
    }

    window.addEventListener('resize', function() {
      if (_namespace.currentPage !== _namespace.subPage) return
    
      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being used to display items from this object, because doing so clears
       * everything on it.
       * */
      _canvas.width = document.documentElement.clientWidth
      _canvas.height = document.documentElement.clientHeight

      ItemSelector.x = ItemSelector.current.x
      ItemSelector.y = ItemSelector.current.y

      _context.putImageData
        ( ItemSelector.current.getImageDataSelected()
        , ItemSelector.x
        , ItemSelector.y
        )
    
    }, false)

    return ItemSelector
  }




  this.createSubMenu = function(config) {
    var SubMenu = {}
      , _canvas = config.canvas
      , _canvasWidth = document.documentElement.clientWidth
      , _canvasHeight = document.documentElement.clientHeight
      , _context
      , _items = []
      , _btn
      , _btnCfg
      , _i
      , _itemSelector
      , _txtCurrentFillStyle = config.txtCurrentFillStyle || "#2e3436"
      , _imageData

    _canvas.width = _canvasWidth
    _canvas.height = _canvasHeight

    SubMenu.canvas = _canvas
    SubMenu.current = config.current
    SubMenu.context = _context = _canvas.getContext('2d')

    SubMenu.width = config.width || 800
    SubMenu.height = config.height || 50

    SubMenu.padding = 10

    SubMenu.x = config.x || Math.floor(_canvasWidth/2 - SubMenu.width/2 - SubMenu.padding)
    SubMenu.y = config.y || Math.floor(25 - SubMenu.padding)

    SubMenu.menuY = SubMenu.y + SubMenu.padding

    for (_i = 0; _btnCfg = config.items[_i]; _i++) {
      _btnCfg.canvas = _canvas
      _btn = _namespace.createButton(_btnCfg)

      /* EW (02/20/2011):
       * Prefetch the image data while the canvas is empty. Otherwise I noticed
       * that if the canvas is not big enough, the getImageData functions might
       * clip the already rendered title text.
       *
       * */
      _btn.getImageDataSelected()

      _items.push(_btn)
    }
    SubMenu.items = _items

    SubMenu.getImageData = function() {
      var _i
        , _btn
        , _offsetX
        , _widthOfLabel
      if (_imageData) return _imageData

      _context.save()
      _context.font = "22pt Bebas"
      _context.textAlign = "start"
      _context.textBaseline = "alphabetic"
      _context.fillStyle = _txtCurrentFillStyle


      /* EW (02/13/2010):
       * Figure out how much space we need to give to the label; include 15 pixels
       * of padding on the right for aesthetic reasons
       * */
      _widthOfLabel = _context.measureText(_namespace.title).width + 15

      _offsetX = SubMenu.padding + SubMenu.x + _widthOfLabel

      /* EW (02/20/2011):
       * The actual x, y coordinates of the menu portion of the SubMenu
       * */
      SubMenu.menuX = _offsetX

      for (_i = 0; _btn = _items[_i]; _i++) {
        /* EW (02/13/2010):
         * Set the coordinates of the button to where we will be drawing it.
         * */
        _btn.x = _offsetX
        _btn.y = SubMenu.menuY

        _context.putImageData
          ( _btn.getImageData()
          , _offsetX
          , _btn.y
          )

        _offsetX += _btn.width
      }

      SubMenu.menuWidth = _offsetX
      SubMenu.menuHeight = _items[0].height

      /* EW (02/20/2011):
       * Due to cross browser compatibility problems I gave up on trying to
       * position the fonts in any type of clean way. So 64 it is.
       * */
      _context.fillText
        ( _namespace.title
        , SubMenu.x + SubMenu.padding/2
        , 54
        )
      _imageData = _context.getImageData
        ( SubMenu.x
        , SubMenu.y
        , SubMenu.width + (SubMenu.padding * 2)
        , SubMenu.height + (SubMenu.padding * 2)
        )

      _context.clearRect
        ( SubMenu.x
        , SubMenu.y
        , SubMenu.width + (SubMenu.padding * 2)
        , SubMenu.height + (SubMenu.padding * 2)
        )

      _context.restore()
      return _imageData
    }

    SubMenu.itemSelector = _itemSelector = _createItemSelector(
      { menu: SubMenu
      , canvas: config.itemSelector.canvas
      }
    )

    SubMenu.fadeIn = function(callback) {
      _namespace.CanvasEffects.fadeIn.call(SubMenu, function() {
        _itemSelector.fadeIn(callback)
      })
    }

    SubMenu.fadeOut = function(callback) {
      _itemSelector.fadeOut(function() {
        _namespace.CanvasEffects.blurOut.call(SubMenu, callback)
      })
    }

    window.addEventListener('resize', function() {
      /* EW (02/21/2011):
       * _canvasHeight isn't ever being used for anything, but might as well
       * keep it up to date in case it ever does get used for something.
       * */
      _canvasWidth = document.documentElement.clientWidth
      _canvasHeight = document.documentElement.clientHeight
      SubMenu.x = config.x || Math.floor(_canvasWidth/2 - SubMenu.width/2 - SubMenu.padding)
      SubMenu.y = config.y || Math.floor(25 - SubMenu.padding)

      /* EW (02/21/2011):
       * Since the button x coordinates are probably all wrong now, might as
       * well just wipe the imageData and force it to be regenerated when it is
       * displayed.
       * */
      _imageData = null

      if (_namespace.currentPage !== _namespace.subPage) return

      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being used to display items from this menu, because doing so clears
       * everything on it
       * */
      _canvas.width = _canvasWidth
      _canvas.height = _canvasHeight

      _context.putImageData
        ( SubMenu.getImageData()
        , SubMenu.x
        , SubMenu.y
        )
    }, false)

    return SubMenu
  }
}).call(Resume)
