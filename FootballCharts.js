import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WeeklyGainersLosersTables from './WeeklyGainersLosersTables';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#ffc0cb', '#40e0d0', '#ff6347', '#ba55d3'];

const playerNames = [
  "Ramblin' Gamblin'", "Griffin Sweeney", "Reid Loftsgard", "Jimmy Bohn", "Will Tornberg",
  "Rocco Mangin", "Mike Gorny", "Sam Hart", "Kevin Bronson", "Nick Campanella",
  "Max Goodspeed", "Luke Demos", "Sex Mike", "Chris Gearon", "Jesse Dankle",
  "Michael Lewiston", "Troy Steinfest", "Colin Gunn", "Adam Lockwood", "Justin Winters",
  "James Krecji", "Mack Gust", "Jerm Windt", "Cooper Kohout", "Alex Parrott",
  "Eric Beightol", "Connor Jones", "Trey Nelson", "Eric Schemmel", "Ben Greene",
  "Bobby Meagher", "Brandon Flynn", "Henry Kay", "Justin Sanchez", "Aaron Wales",
  "Eric Smith", "Isaak Moore", "Kenyon Stevens", "Mr. Maicke", "Mitch Fortman",
  "Mark Deacon", "Eric Ryberg", "Jackson Kohout", "Ian Culver"
];

const weeklyPositions = [
  {
    week: "Week 1",
    "Ramblin' Gamblin'": 1, "Griffin Sweeney": 2, "Reid Loftsgard": 2, "Jimmy Bohn": 2, "Will Tornberg": 2,
    "Rocco Mangin": 2, "Mike Gorny": 2, "Sam Hart": 2, "Kevin Bronson": 2, "Nick Campanella": 2,
    "Max Goodspeed": 12, "Luke Demos": 12, "Sex Mike": 12, "Chris Gearon": 12, "Jesse Dankle": 12,
    "Michael Lewiston": 12, "Troy Steinfest": 12, "Colin Gunn": 12, "Adam Lockwood": 12, "Justin Winters": 12,
    "James Krecji": 12, "Mack Gust": 12, "Jerm Windt": 24, "Cooper Kohout": 24, "Alex Parrott": 24,
    "Eric Beightol": 24, "Connor Jones": 24, "Trey Nelson": 24, "Eric Schemmel": 24, "Ben Greene": 31,
    "Bobby Meagher": 31, "Brandon Flynn": 31, "Henry Kay": 31, "Justin Sanchez": 35, "Aaron Wales": 35,
    "Eric Smith": 37, "Isaak Moore": 38, "Kenyon Stevens": 38, "Mr. Maicke": 38, "Mitch Fortman": 38,
    "Mark Deacon": 38, "Eric Ryberg": 43, "Jackson Kohout": 43, "Ian Culver": 43
  },
  {
    week: "Week 2",
    "Ramblin' Gamblin'": 2, "Griffin Sweeney": 2, "Reid Loftsgard": 16, "Jimmy Bohn": 6, "Will Tornberg": 2,
    "Rocco Mangin": 2, "Mike Gorny": 9, "Sam Hart": 1, "Kevin Bronson": 6, "Nick Campanella": 9,
    "Max Goodspeed": 19, "Luke Demos": 9, "Sex Mike": 6, "Chris Gearon": 36, "Jesse Dankle": 9,
    "Michael Lewiston": 19, "Troy Steinfest": 32, "Colin Gunn": 19, "Adam Lockwood": 32, "Justin Winters": 9,
    "James Krecji": 19, "Mack Gust": 27, "Jerm Windt": 16, "Cooper Kohout": 36, "Alex Parrott": 19,
    "Eric Beightol": 16, "Connor Jones": 27, "Trey Nelson": 27, "Eric Schemmel": 9, "Ben Greene": 27,
    "Bobby Meagher": 36, "Brandon Flynn": 9, "Henry Kay": 36, "Justin Sanchez": 42, "Aaron Wales": 36,
    "Eric Smith": 44, "Isaak Moore": 32, "Kenyon Stevens": 19, "Mr. Maicke": 19, "Mitch Fortman": 19,
    "Mark Deacon": 27, "Eric Ryberg": 42, "Jackson Kohout": 32, "Ian Culver": 45
  },
  {
    week: "Week 3",
    "Ramblin' Gamblin'": 2, "Griffin Sweeney": 8, "Reid Loftsgard": 39, "Jimmy Bohn": 18, "Will Tornberg": 14,
    "Rocco Mangin": 2, "Mike Gorny": 2, "Sam Hart": 1, "Kevin Bronson": 11, "Nick Campanella": 14,
    "Max Goodspeed": 34, "Luke Demos": 2, "Sex Mike": 18, "Chris Gearon": 26, "Jesse Dankle": 20,
    "Michael Lewiston": 14, "Troy Steinfest": 34, "Colin Gunn": 20, "Adam Lockwood": 14, "Justin Winters": 2,
    "James Krecji": 34, "Mack Gust": 11, "Jerm Windt": 11, "Cooper Kohout": 26, "Alex Parrott": 20,
    "Eric Beightol": 7, "Connor Jones": 26, "Trey Nelson": 26, "Eric Schemmel": 8, "Ben Greene": 26,
    "Bobby Meagher": 26, "Brandon Flynn": 8, "Henry Kay": 39, "Justin Sanchez": 44, "Aaron Wales": 26,
    "Eric Smith": 43, "Isaak Moore": 34, "Kenyon Stevens": 20, "Mr. Maicke": 34, "Mitch Fortman": 20,
    "Mark Deacon": 26, "Eric Ryberg": 41, "Jackson Kohout": 20, "Ian Culver": 41
  },
  {
    week: "Week 4",
    "Ramblin' Gamblin'": 1, "Griffin Sweeney": 13, "Reid Loftsgard": 29, "Jimmy Bohn": 18, "Will Tornberg": 34,
    "Rocco Mangin": 2, "Mike Gorny": 6, "Sam Hart": 2, "Kevin Bronson": 10, "Nick Campanella": 13,
    "Max Goodspeed": 23, "Luke Demos": 13, "Sex Mike": 10, "Chris Gearon": 20, "Jesse Dankle": 23,
    "Michael Lewiston": 6, "Troy Steinfest": 44, "Colin Gunn": 6, "Adam Lockwood": 20, "Justin Winters": 6,
    "James Krecji": 34, "Mack Gust": 10, "Jerm Windt": 22, "Cooper Kohout": 23, "Alex Parrott": 34,
    "Eric Beightol": 5, "Connor Jones": 34, "Trey Nelson": 23, "Eric Schemmel": 13, "Ben Greene": 29,
    "Bobby Meagher": 29, "Brandon Flynn": 4, "Henry Kay": 23, "Justin Sanchez": 43, "Aaron Wales": 42,
    "Eric Smith": 29, "Isaak Moore": 18, "Kenyon Stevens": 34, "Mr. Maicke": 34, "Mitch Fortman": 23,
    "Mark Deacon": 29, "Eric Ryberg": 34, "Jackson Kohout": 13, "Ian Culver": 34
  }
];

function FootballCharts() {
  const [visiblePlayers, setVisiblePlayers] = useState(playerNames.slice(0, 10));
  const [sortCriteria, setSortCriteria] = useState('latest');

  const togglePlayerVisibility = (player) => {
    setVisiblePlayers(prev => 
      prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]
    );
  };

  const getPositionChange = (player, weekIndex) => {
    if (weekIndex === 0) return "-";
    const currentPosition = weeklyPositions[weekIndex][player];
    const previousPosition = weeklyPositions[weekIndex - 1][player];
    const change = previousPosition - currentPosition;
    if (change > 0) {
      return <span style={{color: 'green'}}>▲{change}</span>;
    } else if (change < 0) {
      return <span style={{color: 'red'}}>▼{Math.abs(change)}</span>;
    } else {
      return "−";
    }
  };

  const playerStats = useMemo(() => playerNames.map(player => {
    const positions = weeklyPositions.map(week => week[player]);
    return {
      name: player,
      averagePosition: positions.reduce((a, b) => a + b, 0) / positions.length,
      weeksInTop5: positions.filter(pos => pos <= 5).length,
      latestPosition: positions[positions.length - 1],
      biggestImprovement: Math.max(...positions) - Math.min(...positions)
    };
  }), []);

  const sortedPlayers = useMemo(() => [...playerStats].sort((a, b) => {
    if (sortCriteria === 'average') return a.averagePosition - b.averagePosition;
    if (sortCriteria === 'latest') return a.latestPosition - b.latestPosition;
    if (sortCriteria === 'topFive') return b.weeksInTop5 - a.weeksInTop5;
    return 0;
  }), [playerStats, sortCriteria]);

  const currentLeader = sortedPlayers[0].name;
  const biggestImprovement = sortedPlayers.reduce((a, b) => a.biggestImprovement > b.biggestImprovement ? a : b).name;
  const top3Players = new Set(sortedPlayers.slice(0, 3).map(p => p.name));

  return (
  <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
    <h1 style={{textAlign: 'center', marginBottom: '20px'}}>7th Annual CJ Fiedorowicz Scrambled Egg Brains Challenge For Boys Only</h1>
    <div style={{height: '400px', marginBottom: '20px'}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weeklyPositions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="week" 
            interval={0}
            angle={-45}
            textAnchor="end"
            height={50}
            tick={{fontSize: 10}}
          />
          <YAxis reversed domain={[1, 'dataMax']} />
          <Tooltip />
          <Legend 
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{paddingBottom: '20px'}}
          />
          {visiblePlayers.map((player, index) => (
            <Line 
              key={player} 
              type="monotone" 
              dataKey={player} 
              stroke={COLORS[index % COLORS.length]} 
              strokeWidth={player === currentLeader ? 3 : 1}
              dot={{r: 3}}
              activeDot={{r: 5}}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
    
    
    
    <div style={{marginTop: '20px', marginBottom: '20px'}}>
      <h3>Toggle Players:</h3>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
        {playerNames.map((player) => (
          <button 
            key={player} 
            onClick={() => togglePlayerVisibility(player)} 
            style={{
              padding: '5px 10px',
              backgroundColor: visiblePlayers.includes(player) ? '#4CAF50' : '#f1f1f1',
              color: visiblePlayers.includes(player) ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {player}
          </button>
        ))}
      </div>
      <div style={{marginTop: '20px', marginBottom: '20px'}}>
      <h3>Biggest Movers</h3>
      <WeeklyGainersLosersTables weeklyPositions={weeklyPositions} />
    </div>
    </div>
    <div style={{marginBottom: '20px'}}>
      <h3>Sort by:</h3>
      <button onClick={() => setSortCriteria('latest')} style={{marginRight: '10px'}}>Latest Position</button>
      <button onClick={() => setSortCriteria('average')} style={{marginRight: '10px'}}>Average Position</button>
      <button onClick={() => setSortCriteria('topFive')}>Weeks in Top 5</button>
    </div>
    <div style={{overflowX: 'auto'}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Player</th>
            {weeklyPositions.map(week => (
              <th key={week.week} style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>
                {week.week}<br/>Pos (Chg)
              </th>
            ))}
            <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Weeks in Top 5</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map(({name: player, weeksInTop5}) => (
            <tr key={player} style={{backgroundColor: player === currentLeader ? '#e6ffe6' : player === biggestImprovement ? '#fff0e6' : 'white'}}>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>
                {player === currentLeader && <span style={{color: 'gold', marginRight: '5px'}}>👑</span>}
                {top3Players.has(player) && <span style={{color: 'green', marginRight: '5px'}}>💲</span>}
                {player}
              </td>
              {weeklyPositions.map((week, index) => (
                <td key={week.week} style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                  {week[player]} ({getPositionChange(player, index)})
                </td>
              ))}
              <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>{weeksInTop5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default FootballCharts;