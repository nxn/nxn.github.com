import { BreakPoints, MediaQueries } from "@emotion/react";

export const breakPoints: BreakPoints = {
    // - Minimum blurb width: 18 rem (+1rem padding on each side = 20rem = 320px total)
    // - First breakpoint should occur when two blurb columns can fit on screen, so 2x18rem + 2rem outside padding, 1rem
    //   for middle column gap = 39rem
    // - The issue is that desktop scrollbars do not subtract their width from the viewport's total despite them
    //   taking space from DOM elements and shifting them over. This means the query triggers even if when there is less
    //   room than required by the query. There is no standard scrollbar width, some browsers have overlay scrollbars,
    //   others don't, etc, it's not feasible to handle this nonsense without using runtime JS.
    standard: 40,
    sidePanel: 64
}

export const mediaQueries: MediaQueries = {
    standard:   `@media (min-width: ${ breakPoints.standard }rem)`,
    sidePanel:  `@media (min-width: ${ breakPoints.sidePanel }rem)`,
    print:      `@media print`
}