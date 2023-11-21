/**
 * An Enum that defines the different bar chart granularities possible inside time based visualizations for spotify.
 * "Year" granularity, for example, means that one bar in the chart represents one year
 * 
 * @author: Simon (scg@mail.upb.de)
 * 
 */
export enum GranularityEnum {
    Year = "Year",
    Month = "Month",
    Day = "Day",
    Hour = "Hour"
}

//Record type annotation guaranties that all the values from the enum are presented in the mapping
export const Granularity2LabelMapping: Record<GranularityEnum, string> = {
    [GranularityEnum.Year]: "Year",
    [GranularityEnum.Month]: "Month",
    [GranularityEnum.Day]: "Day",
    [GranularityEnum.Hour]: "Hour",
};

export function getSmallerGranularity(granularity: GranularityEnum) {
    switch (granularity) {
        case GranularityEnum.Year:
            return GranularityEnum.Month;
        case GranularityEnum.Month:
            return GranularityEnum.Day;
        case GranularityEnum.Day:
            return GranularityEnum.Hour;
        default:
            return null;
    }
}