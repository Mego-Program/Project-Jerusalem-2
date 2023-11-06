import Data from "./data"
// note: there are duplicates should take care
const Options = {
    'category':(Data.map((item)=>item.category)),
    'assignee':(Data.map((item)=>item.assignee)),
    'milestone':(Data.map((item)=>item.milestone)),
    'issue_type':(Data.map((item)=>item.issue_type)),
}
export default Options