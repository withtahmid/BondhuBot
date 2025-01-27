import { useEffect, useState } from 'react'
import './App.css'
import { fetchAllConversations } from './store/coreSlice'
import { useAppDispatch, useAppSelector } from './store'
import AllData from './components/AllData'
import Drawer from './components/Drawer'
import MaleFemale from './components/MaleFemale'
import TimeProgress from './components/TimeProgress'
import ScoreAvg from './components/ScoreAvg'
import Distribution from "./analytics/Distribution"
import DepressionByAgeChart from './analytics/DepressionByAgeChart'
import DepressionByGenderChart from './analytics/DepressionByGenderChart'
import DepressionByFieldOfStudyChart from './analytics/DepressionByFieldOfStudyChart'
import DepressionByAreaChart from './analytics/DepressionByAreaChart'
import DepressionDoughnutChart from './analytics/DepressionDoughnutChart'
import AvgTimeToCompleteChart from './analytics/TimeToComplete'
import FeedbackStackedBarChart from './analytics/FeedbackStackedBarChart'
import ScatterPlot from './analytics/ScatterPlot'
function App() {
  const dispatch = useAppDispatch();
  const con = useAppSelector(state => state.core.conversations)
  useEffect(() => {
    dispatch(fetchAllConversations());
  }, [])
  return (
    // <Drawer />
    <div> 
      {/* <MaleFemale /> */}
       {/* <TimeProgress /> */}
       
       {/* <ScoreAvg /> */}
       {/* <AllData /> */}
       {/* <Distribution /> */}
       {/* <DepressionByAgeChart /> */}
       {/* <DepressionByGenderChart /> */}
       {/* <DepressionByFieldOfStudyChart /> */}
       {/* <DepressionByAreaChart /> */}
       {/* <DepressionDoughnutChart /> */}
       {/* <AvgTimeToCompleteChart /> */}
       <FeedbackStackedBarChart />
       {/* <ScatterPlot /> */}
    </div>

  )
}

export default App
