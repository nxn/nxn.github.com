; (function() {
  var _namespace = this
  this.createSubPage = function(config) {
    var SubPage = {}
      , _getData
      , _pageEls = []
      , _currentEl
      , _contentFadeIn
      , _contentFadeOut
      , _getPage
      , _menu
      , _placeHolder = config.placeHolder

    /* EW (02/16/2011):
     * Just like the main page, the sub page is meant to be a singleton object,
     * therefore we want to return the existing object if an instance has
     * already been created
     * */
    if (_namespace.subPage)
      return _namespace.subPage

    SubPage.menu = _menu = _namespace.createSubMenu(config.menu)

    _getPage = function(url, callback) {
      _namespace.Ajax.get(url, function(response) {
        var _wrapper = document.createElement('div')
        _wrapper.style.opacity = "0.0"
        _wrapper.innerHTML = response
        _pageEls[url] = _wrapper
        callback && callback(_wrapper)
      })
    }

    SubPage.load = function(url, title, callback) {
      /* EW (02/16/2011):
       * Blissfully assume this page was already requested and exists in the
       * _pages look up object.
       * */
      _currentEl = _pageEls[url]

      if (_currentEl) {
        /* EW (02/16/2011):
         * If there is something there, execute the callback function.
         * */
        SubPage.title = title
        callback && callback(_currentEl)
      } else {
        /* EW (02/16/2011):
         * If there isn't, request it, and then execute the callback function.
         * */
        _getPage(url, function(el) {
          _currentEl = el
          SubPage.title = title
          callback && callback(_currentEl)
        })
      }
    }

    _contentFadeIn = function(callback) {
      var _passes = 16
        , _step = 1
        , _interval
      var _multiplier = (1/_passes)

      /* EW (02/16/2011):
       * Add the current page element to the document body
       * */
      _placeHolder.appendChild(_currentEl)

      /* EW (02/16/2011):
       * In order to prevent glitchy behavior if a user double clicks on a menu
       * item, it is necessary to temporarily prevent further switching until
       * the new content is fully displayed.
       * */
      _menu.itemSelector.disableClick()

      var _fadeIn = function() {
        _currentEl.style.opacity = _step * _multiplier
        if (_step >= _passes) {
          _menu.itemSelector.enableClick()
          clearInterval(_interval)
          callback && callback()
        }
        _step++
      }
      _interval = setInterval(_fadeIn, 30)
    }

    _contentFadeOut = function(callback) {
      var _passes = 16
        , _step = 0
        , _interval
        , _oldEl = _currentEl
      var _multiplier = (1/_passes)

      _menu.itemSelector.disableClick()
      var _fadeOut = function() {
        _oldEl.style.opacity = 1 - (_step * _multiplier)
        if (_step >= _passes) {
          _menu.itemSelector.enableClick()
          clearInterval(_interval)
          _placeHolder.removeChild(_oldEl)
          callback && callback()
        }
        _step++
      }
      _interval = setInterval(_fadeOut, 30)
    }

    SubPage.switchTo = function(url, title, callback) {
      var _callback

      _callback = function() {
        _contentFadeIn(function() {
          /* EW (02/16/2011):
           * Allow switching to occur again.
           * */
          callback && callback()
        })
      }

      _namespace.sync
        ( _contentFadeOut
        , _namespace.partial(SubPage.load, url, title)
        , _callback
        )
    }

    SubPage.fadeIn = function(callback) {
      /* EW (02/16/2011):
       * Set the currentPage property in the namespace to this object so we can
       * easily reference it when loading another page
       * */
      _namespace.currentPage = SubPage
      _menu.fadeIn(function() {
        _contentFadeIn(callback)
      })
    }

    SubPage.fadeOut = function(callback) {
      _menu.fadeOut(function() {
        _contentFadeOut(callback)
      })
    }

    /* EW (02/16/2011):
     * Assign the SubPage object as a property of the namespace for easier
     * referencing/access, and then return it.
     * */
    return _namespace.subPage = SubPage
  }
}).call(Resume)
