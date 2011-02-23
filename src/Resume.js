/* EW (02/03/2011):
 * The Resume object will serve as the namespace for the app components.
 * */
var Resume = {}

; (function() {
  var _namespace = this
    , _slice = Array.prototype.slice

  this.partial = function(func) {
    var args = _slice.call(arguments, 1)
    return function() {
      func.apply(this, args.concat(_slice.call(arguments)))
    }
  }

  this.sync = function(a, b, callback) {
    var _aDone = false
      , _bDone = false
      , _check

    _check = function() {
      _aDone && _bDone && callback && callback()
    }
    
    a(function() {
      _aDone = true
      _check()
    })
    b(function() {
      _bDone = true
      _check()
    })
  }

  this.Ajax = {
    get: function(url, callback) {
      var _xhr = new XMLHttpRequest()

      /* EW (02/05/2011):
       * Determines the format of the response and treats the data accordingly.
       * IE: if we get xml back, return the xml object; if we get json, return
       * a json object, or otherwise return a string.
       * */
      var _getSuccessfulResult = function() {
        var _mime = _xhr.getResponseHeader("Content-Type")

        if (_mime == "application/json")
          return JSON.parse(_xhr.responseText)

        if (_mime == "text/xml")
          return _xhr.responseXML
        
        return _xhr.responseText
      }

      _xhr.onreadystatechange = function() {
        if (_xhr.readyState == 4 && callback) {
          callback(_getSuccessfulResult())
        }
      }

      _xhr.open("GET", url, true)
      _xhr.send()
    }
  }

  this.CanvasEffects =
  { fadeIn: function(callback, imageData) {
      var _x = this.x
        , _y = this.y
        , _id = imageData || this.getImageData()
        , _context = this.context

      var _passes = 16
        , _step = 1
        , _height = _id.height
        , _width = _id.width
        , _srcData = _id.data
        , _interval

      var _srcLength = _srcData.length
        , _multiplier = (1/_passes)

      var _fadeIn = function() {
        var _ratio = _multiplier * _step
          , _newImageData = _context.createImageData(_width, _height)
          , _i = _srcLength

        var _data = _newImageData.data
        
        while (--_i) {
          _data[_i] = ((_i+1) % 4) ? _srcData[_i] : _ratio * _srcData[_i]
        }
  
        _context.clearRect(_x, _y, _width, _height)
        _context.putImageData(_newImageData, _x, _y)
  
        _step++

        if (_step > _passes) {
          clearInterval(_interval)
          callback && callback()
        }
      }
  
      _interval = setInterval(_fadeIn, 30)
    }
  , fadeOut : function(callback) {
      var _x = this.x
        , _y = this.y

      var _id = this.context.getImageData(_x, _y, this.width, this.height)
        , _context = this.context

      var _passes = 16
        , _step = 1
        , _height = _id.height
        , _width = _id.width
        , _srcData = _id.data
        , _interval

      var _srcLength = _srcData.length
        , _multiplier = (1/_passes)

      var _fadeOut = function() {
        var _ratio = 1 - (_step * _multiplier)
          , _newImageData = _context.createImageData(_width, _height)
          , _i = _srcLength

        var _data = _newImageData.data
        
        while (--_i) {
          _data[_i] = ((_i+1) % 4) ? _srcData[_i] : _ratio * _srcData[_i]
        }
  
        _context.clearRect(_x, _y, _width, _height)
        _context.putImageData(_newImageData, _x, _y)
  
        _step++

        if (_step > _passes) {
          clearInterval(_interval)
          callback && callback()
        }
      }
  
      _interval = setInterval(_fadeOut, 30)
    }
  , blurOut: function(callback) {
      var _x = this.x
        , _y = this.y

      var _source = this.context.getImageData(_x, _y, this.width, this.height)
        , _passes = 16
        , _context = this.context
        , _height = this.height
        , _width = this.width
        , _interval

      var _srcData = _source.data
      var _srcLength = _srcData.length
        
      // -5 because we want to skip the last pixel (4 indexes) and length is 1 based
      var _srcLength2 = _srcLength-5
        , _srcRowOffset = _width*4

      var _blurOut = function() {
        var _ratio = 1 - (1/_passes)
          , _i = _srcLength
          , _c
        
        while (--_i) {
          _c = _srcData[_i]
  
          /* EW (01/31/2011):
           * Blend the left, right, top, and bottom neighbors with the current
           * color channel. This gives a smooth blurry effect... well it's not
           * smooth in firefox, but I try, I really do.
           * */
          if (  _i < _srcLength2 
             && _i > 4 
             && _i > _srcRowOffset
             && _i + _srcRowOffset < _srcLength2 
             )
            _c = ( _c
                 + _srcData[_i+4]
                 + _srcData[_i-4]
                 + _srcData[_i-_srcRowOffset]
                 + _srcData[_i+_srcRowOffset]
                 ) * 0.2
  
          /* EW (01/31/2011):
           * Set the alpha channel to its value times the _ratio of the current
           * step. This gives a smooth fade out effect.
           * */
          _srcData[_i] = ((_i+1) % 4) ? _c : _c * _ratio
        }
  
        _context.clearRect(_x, _y, _width, _height)
        _context.putImageData(_source, _x, _y)
  
        _passes--

        if (_passes <= 0) {
          clearInterval(_interval)
          callback && callback()
        }
      }
      _interval = setInterval(_blurOut, 30)
    }
  }

  var _matches
  if (_matches = navigator.userAgent.match(/firefox\/(\d*)\.(\d*)\.(\d*)/i)) {
    if (_matches[1] <= 3) {
      /* EW (02/20/2011):
       * The blur function is unbearably slow in firefox 3.*, although it is
       * fine in the 4.0 betas. If the visitor is using firefox 3, we change the
       * blurOut function to the fadeOut function
       * */
      this.CanvasEffects.blurOut = this.CanvasEffects.fadeOut
    }
  }
  
}).call(Resume)
