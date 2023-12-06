import {
  InstaKeywordSearch,
  InstaTagSearch, InstaUserSearch
} from "../../models";

export default interface InstaUserSearchDataModel {
  keywordSearch: InstaKeywordSearch[];
  tagSearch: InstaTagSearch[];
  userSearch: InstaUserSearch[];
}
