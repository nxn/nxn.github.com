import { BreakPoints, MediaQueries } from "@emotion/react";

export const breakPoints: BreakPoints = {
    standard: 9
}

export const mediaQueries: MediaQueries = {
    standard:   `@media (min-width: ${ breakPoints.standard }in)`,
    print:      `@media print`
}