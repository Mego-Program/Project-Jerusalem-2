import DivFilters from './components/filter-massions-dnd-func-data/Show-filters&massion'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import BorderFilter from './components/borderFilter'; 



function App(){
    return(
      <div>
        <BorderFilter>
        </BorderFilter>
      
      <DndProvider backend={HTML5Backend}>
        <DivFilters />
        </DndProvider>
      </div>
    )
}
export default App