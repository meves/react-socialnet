import { SearchStringType } from "shared/types";

export const parseSearchString = (searchString: string): SearchStringType => {
    const arr: Array<Array<string>>  = [];
    for (let str of searchString.substring(1).split('&')) {
        arr.push(str.split('='));
    }
    return getParametersForSearchString(arr);
}

const getParametersForSearchString = (searchStringArray: Array<Array<string>>) => {
    const searchParams: SearchStringType  = {
        term: "", friend: null, page: 1
    };
    for (let [key, value] of searchStringArray) {
        if (key === 'term') { searchParams.term = value }
        if (key === 'friend') { searchParams.friend = value === "null" ? null : value === "true" ? true : false } 
        if (key === 'page') { searchParams.page = Number(value) } 
    }            
    return searchParams;
}
