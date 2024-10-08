import React from 'react';

const WeeklyGainersLosersTable = ({ weeklyPositions }) => {
  const calculateChanges = (week, prevWeek) => {
    const changes = Object.keys(week).map(player => {
      if (player === 'week') return null;
      const currentPos = week[player];
      const prevPos = prevWeek ? prevWeek[player] : currentPos;
      return { player, change: prevPos - currentPos };
    }).filter(Boolean);

    const biggestGainer = changes.reduce((max, obj) => obj.change > max.change ? obj : max, { change: -Infinity });
    const biggestLoser = changes.reduce((min, obj) => obj.change < min.change ? obj : min, { change: Infinity });

    return { biggestGainer, biggestLoser };
  };

  const weeklyChanges = weeklyPositions.slice(1).map((week, index) => {
    const prevWeek = weeklyPositions[index];
    const { biggestGainer, biggestLoser } = calculateChanges(week, prevWeek);
    return {
      week: week.week,
      gainer: biggestGainer,
      loser: biggestLoser
    };
  });

  return (
    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
      <thead>
        <tr>
          <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Week</th>
          <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Biggest Gainer</th>
          <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Positions Gained</th>
          <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Biggest Loser</th>
          <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2'}}>Positions Lost</th>
        </tr>
      </thead>
      <tbody>
        {weeklyChanges.map((weekData) => (
          <tr key={weekData.week}>
            <td style={{border: '1px solid #ddd', padding: '8px'}}>{weekData.week}</td>
            <td style={{border: '1px solid #ddd', padding: '8px'}}>{weekData.gainer.player}</td>
            <td style={{border: '1px solid #ddd', padding: '8px', color: 'green'}}>+{weekData.gainer.change}</td>
            <td style={{border: '1px solid #ddd', padding: '8px'}}>{weekData.loser.player}</td>
            <td style={{border: '1px solid #ddd', padding: '8px', color: 'red'}}>{weekData.loser.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeeklyGainersLosersTable;