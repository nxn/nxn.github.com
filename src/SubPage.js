; (function() {
  var _namespace = this
  /* EW (02/24/2011):
   * The SubPage is responsible for displaying a SubMenu and also handling
   * loading and storing page content along with DOM interactions.
   * */
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
     * already been created.
     * */
    if (_namespace.subPage)
      return _namespace.subPage

    SubPage.menu = _menu = _namespace.createSubMenu(config.menu)

    /* EW (02/24/2011):
     * Given a url and a callback, request the content of the url, wrap it in a
     * completely transparent div, and put it in the page element lookup object.
     * 
     * This is just a helper function put here to keep logic looking cleaner
     * later on.
     * */
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
         * If there is something there, execute the callback function after
         * updating the current page title.
         * */
        SubPage.title = title
        callback && callback(_currentEl)
      } else {
        /* EW (02/16/2011):
         * If there isn't, request it, and then execute the callback function
         * along with updating the current page title.
         * */
        _getPage(url, function(el) {
          _currentEl = el
          SubPage.title = title
          callback && callback(_currentEl)
        })
      }
    }

    /* EW (02/24/2011):
     * Provides a way of smoothly fading in DOM content, _currentEL is assumed
     * to store the element that should be faded in when this function gets
     * called.
     * */
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
          /* EW (02/24/2011):
           * After the fadeIn process is complete, we need to allow the menu to
           * handle click events again
           * */
          _menu.itemSelector.enableClick()
          clearInterval(_interval)
          callback && callback()
        }
        _step++
      }
      _interval = setInterval(_fadeIn, 30)
    }

    /* EW (02/24/2011):
     * Counter part to the fadeIn function, also requires _currentEl to be set
     * to the element we want fadedOut
     * */
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

    /* EW (02/24/2011):
     * The public API method of switching to a new sub page
     * */
    SubPage.switchTo = function(url, title, callback) {
      var _callback

      /* EW (02/24/2011):
       * The callback function needs to be wrapped in something that will ensure
       * content is fadedIn before the callback is executed
       * */
      _callback = function() {
        _contentFadeIn(function() {
          callback && callback()
        })
      }

      /* EW (02/24/2011):
       * The new subpage content cannot be faded in until the old content is
       * faded out and the new content is actually retrieved either form the
       * lookup object or the server.
       *
       * We therefore sync those two events and set the above callback as the
       * action to take when they are both complete.
       *
       * The sync method needs to pass its own callback function to the
       * functions it is syncing. That's easy in the case of the fadeOut since
       * it only takes a callback function as an argument. But the SubPage.load
       * function requires other parameters along with a callback; we therefore
       * need to partially apply the function with all but the last argument.
       * */
      _namespace.sync
        ( _contentFadeOut
        , _namespace.partial(SubPage.load, url, title)
        , _callback
        )
    }

    SubPage.fadeIn = function(callback) {
      /* EW (02/16/2011):
       * Set the currentPage property in the resume namespace to this object so
       * we can easily reference it when loading another page
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
