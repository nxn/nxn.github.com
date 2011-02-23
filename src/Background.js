; (function() {
  this.createBackground = function(config) {
    var Background = {}
      , _width = document.documentElement.clientWidth
      , _height = document.documentElement.clientHeight
      , _canvas = config.canvas
      , _context
      , _gradient
  
    Background.canvas = _canvas
    _canvas.width = _width
    _canvas.height = _height
  
    Background.context = _context = _canvas.getContext("2d")

    Background.draw = function() {
      _gradient = _context.createRadialGradient
        ( _width/2
        , 100
        , 0
        , _width/2
        , _height/2
        , _height
        )
  
      _gradient.addColorStop(1, "#aaaaaa")//"#a09789")
      _gradient.addColorStop(0.1, "rgba(255,255,255,255)")

      _context.fillStyle = _gradient
      _context.fillRect(0, 0, _width, _height)
    }

    window.addEventListener('resize', function() {
      _canvas.width = _width = document.documentElement.clientWidth
      _canvas.height = _height = document.documentElement.clientHeight

      Background.draw()
    }, false)

    return Background
  }
}).call(Resume)
