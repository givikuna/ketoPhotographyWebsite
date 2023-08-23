import { ParsedUrlQuery } from "querystring";
import { CATEGORY, SESSION, STILL, Immutable2DArray } from "../types/types";
import { getDataToReturn } from "../select";

export function getStills(): Immutable2DArray<STILL> {
    return JSON.parse(getDataToReturn("stills", {} as ParsedUrlQuery)) as Immutable2DArray<STILL>;
}

export function getCategories(): Immutable2DArray<CATEGORY> {
    return JSON.parse(getDataToReturn("categories", {} as ParsedUrlQuery)) as Immutable2DArray<CATEGORY>;
}

export function getSessions(): Immutable2DArray<SESSION> {
    return JSON.parse(getDataToReturn("sessions", {} as ParsedUrlQuery)) as Immutable2DArray<SESSION>;
}
