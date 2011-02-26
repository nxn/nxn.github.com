; (function() {
  var _namespace = this

  /* EW (02/06/2011):
   * ItemTarget is a subcomponent of the MainMenu (therefore the private
   * constructor), used for providing the menu with an area where selection
   * of menu items can occur. It has its own canvas to keep the drawing
   * mechanism as simple as possible for the floating MainMenu.
   * */
  var _createItemTarget = function(config) {
    var ItemTarget = {}
      , _canvasWidth = document.documentElement.clientWidth
      , _canvasHeight = document.documentElement.clientHeight
      , _image
      , _imageData
      , _canvas = config.canvas
      , _context
      , _menu = config.menu
      , _item
      , _offset
      , _targetCenterX
      , _targetCenterY
      , _generateCoordinates

    _canvas.width = _canvasWidth
    _canvas.height = _canvasHeight

    ItemTarget.canvas = _canvas
    ItemTarget.context = _context = _canvas.getContext('2d')
  
    ItemTarget.targetWidth = config.targetWidth || 0
    ItemTarget.targetHeight = config.targetHeight || 0
  
    /* EW (02/21/2011):
     * Private helper function for setting the coordinates of the ItemTarget, it
     * gets called whenever the canvas dimentions change, and when the selector
     * image gets loaded initially.
     * */
    _generateCoordinates = function() {
      ItemTarget.x = Math.floor(_canvasWidth/2 - _image.width/2)
      ItemTarget.y = Math.floor(_canvasHeight/2 - _image.height/2)
      ItemTarget.width = _image.width
      ItemTarget.height = _image.height
  
      ItemTarget.targetX = config.targetX + ItemTarget.x
      ItemTarget.targetY = config.targetY + ItemTarget.y

      /* EW (02/21/2011):
       * The actual selection is done via matching an item over a point in the
       * direct center of the target area. Hence we set _targetCenterX and
       * _targetCenterY to mark that exact point.
       * */
      _targetCenterX = ItemTarget.targetX + ItemTarget.targetWidth/2
      _targetCenterY =  ItemTarget.targetY + ItemTarget.targetHeight/2
    }

    ItemTarget.getImageData = function(callback) {
      /* EW (02/24/2011):
       * This getImageData function varies slightly from the other component's
       * implementations because it rellies on loading an image asynchronously.
       * It therefore must have a callback function since it cannot be predicted
       * when the image will be loaded.
       * */
      if (_imageData) {
        callback && callback()
        return _imageData
      }

      if (!config.image) return

      _image = new Image()
      _image.addEventListener('load', function() {
        _generateCoordinates()

        _context.drawImage
          ( _image
          , ItemTarget.x
          , ItemTarget.y
          , ItemTarget.width
          , ItemTarget.height
          )
        _imageData = _context.getImageData
          ( ItemTarget.x
          , ItemTarget.y
          , ItemTarget.width
          , ItemTarget.height
          )
        _context.clearRect
          ( ItemTarget.x
          , ItemTarget.y
          , ItemTarget.width
          , ItemTarget.height
          )

          callback && callback()
        }, false)
      _image.src = config.image
    }

    ItemTarget.fadeIn = function(callback) {
      var _fadeIn = function() {
        _namespace.CanvasEffects.fadeIn.call(ItemTarget, callback)
      }
      ItemTarget.getImageData(_fadeIn)
    }

    /* EW (02/21/2011):
     * Yes, the assumption is all the items are the same height so we can
     * optimize this function a little. (IE avoid looping through each item)
     *
     * Instead we get the distance from the top of the menu to the center point
     * of the target, and use that to figure out which item index it falls over.
     *
     * This is done by getting the height of each item with its padding, and
     * calculating that number's reciprocal (to avoid division since this
     * function gets called a lot). That number will be multiplied by the
     * distance to get the index of the item that is over the target point.
     *
     * When there is no selected item just return null, undefined, or any falsey
     * value in the boolean context.
     * */
    _item = _menu.items[0]
    _offset = 1/(_item.height + (_item.padding))
    ItemTarget.getSelected = function(x,y) {
      var _item, _index

      /* EW (02/25/2011):
       * Leave early if the menu is not over the target point
       * */
      if ( _targetCenterX < x
        || _targetCenterX > x + _menu.width
        || _targetCenterY < y
        || _targetCenterY > y + _menu.height
        ) return null
    
      /* EW (02/25/2011):
       * If we're still in this function we have a selection to do based on the
       * logic explained above.
       * */
      _index = Math.floor( (_targetCenterY - y) * _offset)
    
      /* EW (02/25/2011):
       * If there is no item at the computed index, we return undefined, but
       * that's ok since both null and undefined are false in the boolean
       * context.
       * */
      return _menu.items[_index]
    }

    /* EW (02/25/2011):
     * Since this whole resume rellies on having full window sized canvas
     * elements, we have to keep the canvas size in sync with the window size.
     * */
    window.addEventListener('resize', function() {
      _canvasWidth = document.documentElement.clientWidth
      _canvasHeight = document.documentElement.clientHeight

      _generateCoordinates()

      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being CURRENTLY used to display the main page. Otherwise we'd be
       * resetting, and subsequently CLEARING, the canvas for components
       * unrelated to this one.
       * */
      if (_namespace.currentPage !== _namespace.mainPage) return

      _canvas.width = _canvasWidth
      _canvas.height = _canvasHeight
      _context.putImageData
        ( _imageData
        , ItemTarget.x = Math.floor(_canvasWidth/2 - ItemTarget.width/2)
        , ItemTarget.y = Math.floor(_canvasHeight/2 - ItemTarget.height/2)
        )
    }, false)

    return ItemTarget
  }

  /* EW (02/25/2011):
   * The menu that is used on the MainPage. The fancy part is that it moves with
   * the mouse and the object that handles the selection is stationary. I like
   * to spice things up.
   * */
  this.createMainMenu = function(config) {
    var MainMenu = {}
      , _width = 0
      , _height = 0
      , _canvasWidth = document.documentElement.clientWidth
      , _canvasHeight = document.documentElement.clientHeight
      , _canvas = config.canvas
      , _context
      , _items = []
      , _itemTarget
      , _btn
      , _btnCfg
      , _i
      , _selected
      , _canvasOffsetLeft
      , _canvasOffsetTop
      , _moveHandler
      , _clickHandler

    /* EW (02/13/2011):
     * The canvas offsets will be accessed every time the mouse moves, and since
     * they're, for the most part, static, I am assigning them locally for
     * faster look up speeds.
     *
     * (Same for _canvasWidth, _canvasHeight, and _context -- though with and
     * height can change based on window resizing)
     * */
    _canvasOffsetLeft = _canvas.offsetLeft
    _canvasOffsetTop = _canvas.offsetTop
    _canvas.width = _canvasWidth
    _canvas.height = _canvasHeight

    MainMenu.canvas = _canvas
    MainMenu.x = 0
    MainMenu.y = 0

    MainMenu.context = _context = _canvas.getContext("2d")

    /* EW (01/29/2011):
     * Go through the item configs and create Button instances that will
     * replace the configs.
     * */
    for (_i=0; _btnCfg = config.items[_i]; _i++) {
      /* EW (02/25/2011):
       * They should use the canvas that was given to use via the config object.
       * */
      _btnCfg.canvas = _canvas
      _btnCfg.theme = _btnCfg.theme || 'main'
      _btn = _namespace.createButton(_btnCfg)
  
      _width = (_width >= (_btn.width + _btn.padding)) ?
        _width : _btn.width + _btn.padding
  
      _height += _btn.height + _btn.padding
  
      /* EW (02/03/2011):
       * Set the button's y coordinate in the menu; this is important for tracking
       * selections, when drawing the menu, and when using effects from the
       * CanvasEffects object.
       * */
      _btn.y = (_btn.height*_i) + (_i*_btn.padding)
      _items.push(_btn)

      /* EW (02/03/2011):
       * Prefetching the button's image data, because the procedure takes a
       * while to complete and if the mouse moves before it completes it will
       * try to draw the button twice. Discovered the bug in chrome.
       *
       * SelectedImageData should not be a concern though since it is only
       * displayed when the button is over the target and not every time the
       * mouse moves.
       * */
      _btn.getImageData()
    }
    MainMenu.items = _items
  
    MainMenu.width = _width
    MainMenu.height = _height

    config.itemTarget.menu = MainMenu
    MainMenu.itemTarget = _itemTarget = _createItemTarget(config.itemTarget)

    /* EW (02/24/2011):
     * Will handle the mouse move event, drawing the menu, and maintaining the
     * selection (if any)
     * */
    _moveHandler = function(e) {
      var _x = e.clientX - _canvasOffsetLeft
        , _y = e.clientY - _canvasOffsetTop
        , _paddingSide
        , _item
        , _i
  
      /* EW (01/30/2011):
       * Lots of dumb little arithmetic to make sure we don't put ImageData
       * beyond the bounds of the canvas. Firefox likes to throw js
       * exceptions when things like that happen.
       * */
      _x = (_x + _width) > _canvasWidth?  _canvasWidth - _width : _x
      _y = (_y + _height) > _canvasHeight?  _canvasHeight - _height : _y
  
      /* EW (02/03/2011):
       * Assign _selected to whatever is returned from the itemTarget's
       * getSelected function. Then check if it actually returned some item and
       * not a false value.
       *
       * If there is an item, we want to have the menu "snap" into place so that
       * the selected item is perfectly positioned over the itemtarget/selector.
       * Hence, we reset the _x and _y coordinates to that of the _itemTargets.
       * We have to keep in mind the y coordinate of the selected item and
       * padding to figure out where the menu needs to go.
       * */
      if (_selected = _itemTarget.getSelected(_x, _y)) {
        _paddingSide = _selected.padding/2
        _x = _itemTarget.targetX - _paddingSide
        _y = _itemTarget.targetY - _selected.y - _paddingSide
      }
  
      /* EW (02/16/2011):
       * Now clear the old menu and draw a new one at the _x and _y coordinates
       * we computed.
       * */
      _context.clearRect(MainMenu.x, MainMenu.y, _width , _height)
      for (_i=0; _item = _items[_i]; _i++) {
        _context.putImageData
          ( _item === _selected ? _item.getImageDataSelected() : _item.getImageData()
          , _x
          , _y + _item.y
          )
      }

      /* EW (02/02/2011):
       * The x and y properties must store the position where we last drew
       * the menu. This is done for efficiency reasons; otherwise there would be no
       * way of knowing where the menu was drawn and the whole canvas would have to
       * be cleared (slow performance in large window sizes).
       * */
      MainMenu.x = _x
      MainMenu.y = _y
    }
  
    /* EW (02/24/2011):
     * Function to handle click events. Invokes the selected item's handler
     * function if we have a selected item and it has a handler property. 
     * */
    _clickHandler = function(e) {
      if (_selected && _selected.handler) {
        /* EW (02/05/2011):
         * Execute the button handler and give it a reference to this menu
         * */
        _selected.handler(MainMenu)
        _selected = null
      }
    }
  
    /* EW (02/24/2011):
     * Function that shows the menu and tries to hide the cursor to avoid
     * confusing the users. The cursor part is actually difficult due to
     * different browser's view points on whether the cursor should be allowed
     * to disappear.
     * */
    MainMenu.fadeIn = function(callback) {
      var _i, _btn

      /* EW (02/20/2011):
       * Chrome seems to not want to accept 'none' as a cursor value, even
       * though it is valid in CSS3. It also refuses to take a completely blank
       * image and use it as a cursor, but a 1x1 99.6% transparent image is
       * perfectly ok.
       *
       * Opera on windows on the other hand still does not cooperate. And IE9
       * probably would want us to use the Microsoft cursor format.
       * */
      document.body.style.cursor = "url(img/blank.png), none"
      window.addEventListener('mousemove', _moveHandler, false)
      window.addEventListener('click' , _clickHandler, false)

      _itemTarget.fadeIn(function() {
        callback && callback()
      })
    }
    /* EW (02/24/2011):
     * Basically undo anything done by the fadeIn function
     * */
    MainMenu.fadeOut = function(callback) {
      var _fadeOut = _namespace.CanvasEffects.blurOut

      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', _moveHandler, false)
      window.removeEventListener('click', _clickHandler, false)

      _fadeOut.call(MainMenu, function() {
        _fadeOut.call(_itemTarget, callback)
      })
    }

    /* EW (02/25/2011):
     * Since this whole resume rellies on having full window sized canvas
     * elements, we have to keep the canvas size in sync with the window size.
     * */
    window.addEventListener('resize', function() {
      _canvasWidth = document.documentElement.clientWidth
      _canvasHeight = document.documentElement.clientHeight

      /* EW (02/21/2011):
       * Only ever reset the width and height of the canvas object if it is
       * being CURRENTLY used to display the main page. Otherwise we'd be
       * resetting, and subsequently CLEARING, the canvas for components
       * unrelated to this one.
       * */
      if (_namespace.currentPage !== _namespace.mainPage) return

      _canvas.width = _canvasWidth
      _canvas.height = _canvasHeight
    }, false)

    return MainMenu
  }
  
}).call(Resume)
