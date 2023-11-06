import DivFilters from './components/filter-massions-dnd-func-data/Show-filters&massion'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';



function App(){
    return(
      <DndProvider backend={HTML5Backend}>
        <DivFilters />
        </DndProvider>
    )
}
export default App