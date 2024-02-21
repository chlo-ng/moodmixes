import './App.css'

import { MoodChart } from './components/MoodChart'

function App() {

  const data = [
    {name: 'sad music', value: 20},
    {name: 'hsr', value: 80},
    {name: 'tiktok/reels', value: 45},
    {name: 'youtube', value: 60},
    {name: 'persona 5 royale', value: 40},
    {name: 'wildrift', value: 60},
    {name: 'upbeat music', value: 90},
  ]

  return (
    <>
      <div className='main'>
        <h1 className='heading1 saira-stencil'> <span style={{color: '#cb593d'}}>mood</span>mixes.</h1>
        
        <p> Craft your personal soundtrack of emotions with every beat of your day. </p>
        

        <MoodChart data={data} width={500} height={500} />

      </div>
    </>
  )
}

export default App
