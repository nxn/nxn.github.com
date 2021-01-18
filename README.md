https://nxn.io/

iOS:
    - Snackbar Alert text and icon not visible
    - Copy code button does nothing
    - Copy button does not show up initially?
    - OSD image title wraps to new line
    - OSD if browser tabs are visible the toolbar panel is not
    - OSD fullscreen mode:
        - swiping up triggers exit fullscreen gesture (generated frame doesn't set no-scroll?)

Chrome android:
    - Yellow/orange border around OSD
    - No grid gaps anywhere (supported from chrome 66+)
    - Again, copy button does not do anything
    - Anchor links scroll up then 500ms later jump to top of header
    - Nav menu drop down displays under page heading
    - Blurb container rounded corners do not mask blurb corners
    - Footer copyright wraps to new line

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
            