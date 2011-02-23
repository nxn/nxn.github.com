; (function() {
  var _namespace = this
    , _drawOutline = function(ctx,x,y,w,h) {
        var r = h/2
          , bottom = Math.PI/2
          , top = (3*Math.PI)/2
        ctx.beginPath()
        ctx.arc(x+r, y+r, r, bottom, top, false)
        ctx.arc(x+w-r, y+h-r, r, top, bottom, false)
        ctx.closePath()
      }

  var _applySubTheme = function(btn) {
    var _txtFillStyle = "rgba(46, 52, 54, 0.75)"
      , _txtFillStyleSelected = "#2e3436"
      , _lineWidth = 5
      , _txt = btn.text.replace(/\s/, '     ')
      , _context = btn.context
      , _imageData
      , _imageDataSelected


    btn.width = btn.context.measureText(_txt).width + 40
    btn.height = 32

    btn.getImageData = function() {
      if (_imageData) return _imageData

      _context.save()
      _context.textAlign = "center"
      _context.textBaseline = "alphabetic"
      _context.font = "12px Bebas"

      _context.fillStyle = _txtFillStyle

      /* EW (02/20/2011):
       * Due to cross browser compatibility problems I gave up on trying
       * position the fonts in any type of clean way. So 21 it is.
       * */
      _context.fillText
        ( _txt
        , btn.width/2
        , 21
        )
  
      _imageData = _context.getImageData(0, 0, btn.width, btn.height)
      _context.clearRect(0, 0, btn.width, btn.height)
      _context.restore()

      return _imageData
    }

    btn.getImageDataSelected = function() {
      if (_imageDataSelected) return _imageDataSelected

      _context.save()
      _drawOutline
        ( _context
        , _lineWidth/2
        , _lineWidth/2
        , btn.width - _lineWidth
        , btn.height - _lineWidth
        )

      _context.strokeStyle = "#2e3436"
      _context.lineWidth = _lineWidth
      _context.stroke()

      _imageDataSelected = _context.getImageData(0, 0, btn.width, btn.height)
      _context.clearRect(0, 0, btn.width, btn.height)
      _context.restore()

      return _imageDataSelected
    }
  }

  var _applyMainTheme = function(btn) {
    var _context = btn.context
      , _imageData
      , _imageDataSelected

    btn.height = 25
    btn.width = 150
    btn.padding = 10
    btn.radius = btn.height/2

    var _txtFillStyle = "#ccc"
      , _txtFillStyleSelected = "#fff"
      , _bgFillStyle = "rgba(46, 52, 54, 0.9)"
      , _strokeStyle = "#fff"
      , _strokeWidth = 2
      , _strokeWidthSelected = 2
      , _totalHeight = btn.padding + btn.height
      , _totalWidth = btn.padding + btn.width
  
    var _bgFillStyleSelected = function() {
      var _gradient = _context.createLinearGradient(0, btn.padding/2, 0, btn.height)
      _gradient.addColorStop(0, "#47595f")
      _gradient.addColorStop(1, "#2e3436")
      return _gradient
    }()
  
    var _strokeStyleSelected = function() {
      var _gradient = _context.createLinearGradient(0, btn.padding/2, 0, btn.height)
      _gradient.addColorStop(0, "#fff")
      _gradient.addColorStop(1, "#666")
      return _gradient
    }()
  

    btn.getImageData = function() {
      if (_imageData) return _imageData

      _context.save()
  
      _context.textAlign = "center"
      _context.textBaseline = "alphabetic"
      _context.font = "bold 12px Verdana"

      _drawOutline
        ( _context
        , btn.padding/2
        , btn.padding/2
        , btn.width
        , btn.height
        )

      _context.fillStyle = _bgFillStyle
      _context.fill()
  
      _context.fillStyle = _txtFillStyle

      /* EW (02/20/2011):
       * Due to cross browser compatibility problems I gave up on trying
       * position the fonts in any type of clean way. So 21 it is.
       * */
      _context.fillText
        ( btn.text
        , _totalWidth/2
        , 21
        )
  
      _imageData = _context.getImageData(0, 0, _totalWidth, _totalHeight)
      _context.clearRect(0, 0, _totalWidth, _totalHeight)
      _context.restore()

      return _imageData
    }
  
    btn.getImageDataSelected = function() {
      if (_imageDataSelected) return _imageDataSelected

      _context.save()
  
      _context.textAlign = "center"
      _context.textBaseline = "alphabetic"
      _context.font = "bold 12px Verdana"

      _drawOutline
        ( _context
        , btn.padding/2
        , btn.padding/2
        , btn.width
        , btn.height
        )
      _context.fillStyle = _bgFillStyleSelected
      _context.fill()
  
      _context.strokeStyle = _strokeStyleSelected
      _context.lineWidth = _strokeWidthSelected
      _context.stroke()
  
      _context.fillStyle = _txtFillStyleSelected

      /* EW (02/20/2011):
       * Due to cross browser compatibility problems I gave up on trying
       * position the fonts in any type of clean way. So 21 it is.
       * */
      _context.fillText
        ( btn.text
        , _totalWidth/2
        , 21
        )
  
      _imageDataSelected = _context.getImageData(0, 0, _totalWidth, _totalHeight)
      _context.clearRect(0, 0, _totalWidth, _totalHeight)
      _context.restore()

      return _imageDataSelected
    }
  }

  this.createButton = function(config) {
    var Button = {}
      , _canvas = config.canvas
      , _context

    Button.context = _context = _canvas.getContext('2d')
  
    Button.x = config.x || 0
    Button.y = config.y || 0
    Button.text = config.text || "Button"
  
    Button.handler = config.handler

    if (config.theme == "main") _applyMainTheme(Button)
    else _applySubTheme(Button)

    return Button
  }
}).call(Resume)
