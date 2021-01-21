# nxn.io
Personal Portfolio -- https://nxn.io

## Issues:
-   [safari] OSD fullscreen mode: swiping down while panning exits fullscreen mode
-   Fix button clicks so that scaling doesn't cancel click event
-   ToC: Glitchy on hot module reload

## Roadmap:
-   Improve instructions and wording on vscode_remote
-   Snackbar
    -   Add unique constraint and reset duration of existing item if there is an attempt to add a duplicate
    -   Use Hideable HoC for animations: This will require items to be positioned independently and also will need 
        dynamic z-index management. Could create a pre-existing slot system and only animate on slot enter/exit? Enter:
        z-index-base + 1, exit: z-index-base - 1.
-   Posts
    -   Use large but very thin font for post summaries
    -   Automatically generate content header section containing title, date, and post graphic
        -   ToC position should be moved down so it is not rendered in the header
        -   Alternatively adapt ToC to be readable on both light and dark bgs
-   Design
    -   Figure out some font strategy because including anymore fonts is probably not a good idea
    -   Programmatically create background image for separating content headers and content bodies
    -   Center logo between navigation items? Defer this until other design changes are implemented
-   Misc
    -   Ctrl+Shift+F "TODO" and weep
