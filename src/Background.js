/* EW (02/24/2011):
 * Draws a nice gradient onto the entire area of some given canvas. Meant to be
 * used in its own canvas element that is positioned behind one or more other
 * canvas elements. Doing it this way means there is no need for redrawing it
 * again -- unless of course the dimentions of the window (and therefore the
 * canvas since it is assumed the canvas spans the entire window area) change.
 * */
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
  
      _gradient.addColorStop(1, "#aaaaaa")
      _gradient.addColorStop(0.1, "rgba(255,255,255,255)")

      _context.fillStyle = _gradient
      _context.fillRect(0, 0, _width, _height)
    }

    /* EW (02/24/2011):
     * Should the window proportions change, make the canvas span the entire
     * area of the window, then redraw the background
     * */
    window.addEventListener('resize', function() {
      _canvas.width = _width = document.documentElement.clientWidth
      _canvas.height = _height = document.documentElement.clientHeight

      Background.draw()
    }, false)

    return Background
  }
}).call(Resume)
