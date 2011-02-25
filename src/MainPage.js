; (function() {
  var _namespace = this

  /* EW (02/24/2011):
   * The MainPage object simply wraps the menu object. It mainly exists to be
   * a counter part of the SubPage object that has more necessary reasons for
   * existing.
   * */
  this.createMainPage = function(config) {
    /* EW (02/16/2011):
     * Meant to be a singleton, so return the current main page if one already
     * exists.
     * */
    if (_namespace.mainPage)
      return _namespace.mainPage

    var MainPage = {}
      , _menu

    MainPage.menu = _menu = _namespace.createMainMenu(config.menu)

    /* EW (02/16/2011):
     * Since this page only displays the menu, we can just assign the menu fade
     * out function as the page fade out function
     * */
    MainPage.fadeOut = _menu.fadeOut

    MainPage.fadeIn = function(callback) {
      _menu.fadeIn(callback)
      _namespace.currentPage = MainPage
    }

    /* EW (02/16/2011):
     * Assign the MainPage object as a property of the namespace for
     * easier referencing/access in the future, then return it.
     * */
    return _namespace.mainPage = MainPage
  }
}).call(Resume)
