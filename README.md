https://nxn.io/

Common: 
    - Copy button does not show up initially?

iOS:
    - Snackbar Alert text and icon not visible
    - OSD fullscreen mode:
        - swiping up triggers exit fullscreen gesture (generated frame doesn't set no-scroll?)

Retest:
    - [safari] OSD if browser tabs are visible the toolbar panel is not
    - [safari] OSD image title wraps to new line: added whitespace no-wrap plus overflow styles
    


TODO:
    - Improve instructions and wording on vscode_remote

    - Post Release:
        - ToC
            - Glitchy on hot module reload

        - Snackbar
            - Unique constraint

        - Hideable
            - HOC accepting hide-behavior configuration
                - Should work for:
                    - Snackbar Alerts

        - Misc
            - Fix button clicks so that scaling doesn't cancel click event
            