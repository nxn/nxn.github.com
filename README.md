https://nxn.io/

iOS:
    - Snackbar Alert text and icon not visible
    
    - Copy button does not show up initially?
    - OSD if browser tabs are visible the toolbar panel is not
    - OSD fullscreen mode:
        - swiping up triggers exit fullscreen gesture (generated frame doesn't set no-scroll?)

Chrome android:
    
    - Anchor links scroll up then 500ms later jump to top of header
    

Resolved?
    - [chrome] Yellow/orange border around OSD: partially visible :focus decoration, removed
    - [safari] OSD image title wraps to new line: added whitespace no-wrap plus overflow styles
    - [common] Copy code button does nothing: navigator.clipboard is not available unless under localhost or https
    - [chrome] No grid gaps anywhere: supported from chrome 66+
    - [chrome] Footer copyright wraps to new line: looks fine in newer version
    - [chrome] Blurb container rounded corners do not mask blurb corners: looks fine in newer version
    - [common] Nav menu drop down displays under page heading: added z-index

TODO:
    - OpenSeaDragon viewer (quirky in edge)
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
            