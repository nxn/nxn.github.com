import { BreakPoints, MediaQueries } from "@emotion/react";

export const breakPoints: BreakPoints = {
    standard: 48
}

export const mediaQueries: MediaQueries = {
    standard:   `@media (min-width: ${ breakPoints.standard }rem)`,
    print:      `@media print`
}