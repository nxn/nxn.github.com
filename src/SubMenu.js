; (function() {
  var _namespace = this

  /* EW (02/06/2011):
   * ItemSelector is a subcomponent of the SubMenu (hence the private
   * constructor), used for providing the menu with a method of
   * selecting items. It has its own canvas to keep the drawing mechanism
   * as simple as possible.
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

    /* EW (02/24/2011):
     * Based on circumstances, such as whether we are fading content in or out
     * at some exact point in time, it may be advantageous to prevent click
     * events temporarily. These functions aim to give that functionality to
     * other components
     * */
    ItemSelector.disableClick = function() {
      _disableClick = true
    }
    ItemSelector.enableClick = function() {
      _disableClick = false
    }

    ItemSelector.fadeIn = function(callback) {
      /* EW (02/25/2011):
       * Find the button that corresponds to the currently loaded page. This is
       * sort of a lame way of doing that as it works by comparing the button's
       * text with the page's title. A less "stringly typed" method could do
       * some good here.
       * */
      var _title = _namespace.currentPage.title
        , _i
      for (_i = 0; _btn = _items[_i]; _i++) {
        if (_btn.text === _title) break 
      }

      ItemSelector.current = _btn
      ItemSelector.index = _i
  
      /* EW (02/24/2011):
       * Position the itemselector exactly over the button for this page, and
       * also set its width and height accordingly so that we can use
       * CanvasEffects functions on the selector.
       * */
      ItemSelector.x = _btn.x
      ItemSelector.y = _btn.y
      ItemSelector.width = _btn.width
      ItemSelector.height = _btn.height

      /* EW (02/24/2011):
       * When the selector is faded in, attach the handlers for click and move
       * events, along with allowing the selector to move
       * */
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

    /* EW (02/24/2011):
     * When this component isn't being shown, disable the handlers to not waste
     * CPU cycles, disable the selector from moving, and then fade it out.
     * */
    ItemSelector.fadeOut = function(callback) {
      window.removeEventListener('click', _clickHandler, false)
      window.removeEventListener('mousemove', _moveHandler, false)
      _stopMoving = true
      _namespace.CanvasEffects.fadeOut.call(ItemSelector, callback)
    }

    _moveHandler = function(e) {
      /* EW (02/13/2011):
       * Try and get an item at the current mouse position
       * */
      var _newItem = ItemSelector.getItemAt(e.clientX, e.clientY)

      /* EW (02/13/2011):
       * If no such item exists at the current position, the selection needs to
       * return to item that represents the current page (ItemSelector.current).
       * When it gets there, the moving flag can be set to false so that the
       * selector can be moved again. The cursor should go back to the default
       * one as well, and then we can exit out of this function.
       * */
      if (!_newItem) {
        document.body.style.cursor = "auto"
        _target = ItemSelector.current
        ItemSelector.move(function() { _moving = false })
        _moving = true
        return
      }

      /* EW (02/24/2011):
       * If we do have a selected item, make the cursor "point" to it
       * */
      document.body.style.cursor = "pointer"

      /* EW (02/13/2011):
       * If the new item is actually the same as the target item we had before,
       * we don't have to do anything since everything has already been set for
       * us by now.
       * */
      if (_newItem === _target) return

      /* EW (02/13/2011):
       * If the new item is different, then we need to move the selection to
       * the new item and mark it as the selected item when the move is complete
       * */
      _target = _newItem
      ItemSelector.move(function() { _moving = false })
      _moving = true
    }

    ItemSelector.move = function(callback) {
      /* EW (02/24/2011):
       * There should only be ONE move handler execution at a time, so if the
       * flag says one is executing already, we don't need to do anything as it
       * will adapt to whatever the _target reference is.
       * */
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
         * want to clearn the interval, and execute the callback if one was
         * given to us.
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

        /* EW (02/24/2011):
         * If at this interval we are within one step's away (left or right)
         * from the final position, just set the selector to it so the previous
         * if statement will catch it during the next interval and finish the
         * move.
         * */
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
      /* EW (02/24/2011):
       * Ensure we are supposed to handle click events at this point in time
       * */
      if (_disableClick) return

      /* EW (02/13/2011):
       * NOTE: Instead of launching the handler for _this.selected when a click
       * occurs, we explicitly get the item at mouse X,Y to avoid problems if
       * the user clicks before the animation is complete.
       * */
      var _newItem = ItemSelector.getItemAt(e.clientX, e.clientY)

      if (!_newItem || _newItem === ItemSelector.current) return

      /* EW (02/20/2011):
       * Only set the current item if the handler doesn't return false.
       * */
      if (_newItem.handler() !== false)
        ItemSelector.current = _newItem
    }

    /* EW (02/24/2011):
     * Given coordinates x,y try to retrieve a reference to an item at that
     * position. If there is no such item return null
     * */
    ItemSelector.getItemAt = function(x,y) {
      var _i = 0
        , _menuX = _menu.menuX
        , _menuY = _menu.menuY
        , _btn

      /* EW (02/24/2011):
       * There may be scrollbars on the page, and we have to take into account
       * how much the window is scrolled down or right when calculating whether
       * there is a selection or not. (ie the menu and button coordinates are
       * relative to the top of the page and the mouse coordinates are not).
       * */
      x += window.pageXOffset
      y += window.pageYOffset

      /* EW (02/13/2011):
       * Make sure the mouse coordinates are within the menu bounds, otherwise
       * just return null
       * */
      if (  y < _menuY
         || y > _menuY + _menu.menuHeight
         || x < _menuX
         || x > _menuX + _menu.menuWidth
         ) return null

      /* EW (02/13/2011):
       * Since the items can be any length, we have to look through them to see
       * which one the mouse is over. When/if found we return it.
       * */
      for (_i = 0; _btn = _items[_i]; _i++)
        if (x >= _btn.x && x < _btn.x + _btn.width)
          return _btn

      /* EW (02/13/2011):
       * Returning null at this point isn't necessary since the function would
       * return undefined and that's a falsey value. Also we probably never
       * even get to this point since the buttons span the whole menu area and
       * for this to occur we'd have to be in that area but not over a button.
       *
       * Either way, just returning for sanity's sake.
       * */
      return null
    }

    /* EW (02/25/2011):
     * Since this whole resume rellies on having full window sized canvas
     * elements, we have to keep the canvas size in sync with the window size.
     * */
    window.addEventListener('resize', function() {
      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being CURRENTLY used to display the sub page. Otherwise we'd be
       * resetting, and subsequently CLEARING, the canvas for components
       * unrelated to this one.
       * */
      if (_namespace.currentPage !== _namespace.subPage) return

      _canvas.width = document.documentElement.clientWidth
      /* EW (02/21/2011):
       * _canvasHeight isn't ever being used for anything in here, but might as
       * well keep it up to date in case it ever does get used for something.
       * */
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

    /* EW (02/24/2011):
     * Since the menuY coordinate is pretty much constant, we can set it now.
     * The menuY coordinate will have to be based on the length of the title
     * that is displayed to the left of the actual menu area -- so we avoid
     * setting it just yet
     * */
    SubMenu.menuY = SubMenu.y + SubMenu.padding

    /* EW (02/24/2011):
     * Go through button configs and create button instances for the MainMenu
     * canvas element
     * */
    for (_i = 0; _btnCfg = config.items[_i]; _i++) {
      _btnCfg.canvas = _canvas
      _btn = _namespace.createButton(_btnCfg)

      /* EW (02/20/2011):
       * Prefetch the image data while the canvas is empty. Otherwise I noticed
       * that if the canvas is not big enough, the getImageData functions might
       * clip the rendered title text (when there already).
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

      /* EW (02/24/2011):
       * Ensure we only do this once.
       * */
      if (_imageData) return _imageData

      _context.save()
      _context.font = "22pt Bebas"
      _context.textAlign = "start"
      _context.textBaseline = "alphabetic"
      _context.fillStyle = _txtCurrentFillStyle


      /* EW (02/13/2011):
       * Figure out how much space we need to give to the label; include 15 pixels
       * of padding on the right for aesthetic reasons
       * */
      _widthOfLabel = _context.measureText(_namespace.title).width + 15

      _offsetX = SubMenu.padding + SubMenu.x + _widthOfLabel

      /* EW (02/20/2011):
       * Set the menuX property to the x coordinate where the actual menu
       * starts.
       * */
      SubMenu.menuX = _offsetX

      for (_i = 0; _btn = _items[_i]; _i++) {
        /* EW (02/13/2011):
         * Set the coordinates of the button to where we will want it to appear
         * when it gets fadedIn.
         * */
        _btn.x = _offsetX
        _btn.y = SubMenu.menuY

        _context.putImageData
          ( _btn.getImageData()
          , _offsetX
          , _btn.y
          )

        /* EW (02/24/2011):
         * Increment the offset to this button's width, so the next button isn't
         * placed over this one
         * */
        _offsetX += _btn.width
      }

      /* EW (02/24/2011):
       * _offsetX now contains the right most x coordinate of the button area,
       * so set that to the menu width.
       * */
      SubMenu.menuWidth = _offsetX

      /* EW (02/24/2011):
       * Lame way of setting the menu height, because it assumes all buttons are
       * equal height.
       * */
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

    /* EW (02/24/2011):
     * This menu contains everything needed by the itemSelector to be initiated
     * now. Primarily the items array and also the coordinates of menuX, menuY,
     * menuWidth, and menuHeight.
     * */
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

    /* EW (02/24/2011):
     * Since this whole resume rellies on having full window sized canvas
     * elements, we have to keep the canvas size in sync with the window size.
     * */
    window.addEventListener('resize', function() {
      /* EW (02/21/2011):
       * _canvasHeight isn't ever being used for anything inhere, but might as
       * well keep it up to date in case it ever does get used for something.
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

      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being CURRENTLY used to display the sub page. Otherwise we'd be
       * resetting, and subsequently CLEARING, the canvas for components
       * unrelated to this one.
       * */
      if (_namespace.currentPage !== _namespace.subPage) return
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
