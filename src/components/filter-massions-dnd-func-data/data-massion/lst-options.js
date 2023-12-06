import Data from "./data"
// note: there are duplicates should take care
const Options = {
    'category':[...(new Set(Data.map((item)=>item.category)))],
    'assignee':[...(new Set(Data.map((item)=>item.assignee)))],
    'milestone':[...(new Set (Data.map((item)=>item.milestone)))],
    'issue_type':[...(new Set(Data.map((item)=>item.issue_type)))],
}
export default Options