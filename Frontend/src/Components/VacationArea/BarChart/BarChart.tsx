import VacationModel from "../../../Models/VacationModel";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme, VictoryTooltip  } from 'victory';
import "./BarChart.css";
import { useEffect, useState } from "react";

interface BarChartProps {
	vacations: VacationModel[];
}

function BarChart(props: BarChartProps): JSX.Element {
    const [data,setData] = useState<any>();

    useEffect(() => {
        let vacations: VacationModel[] = props.vacations;
        
        if(vacations.length > 0) localStorage.setItem("chartVacations",JSON.stringify(vacations));
        else vacations = JSON.parse(localStorage.getItem("chartVacations"));
        
        const tempData: any = [];
        vacations.forEach(v => v.followersCount > 0 && tempData.push({destination: v.vacationId, followers: v.followersCount, label: v.destination}));
        setData(tempData);  
        
        
    }, []);

    return (
        <div className="BarChart">
            
            <VictoryChart theme={VictoryTheme.material} domainPadding={40} width={900}>
                <VictoryLabel
                    text={`Followers Per Vacation`}
                    x={450}
                    y={18}
                    textAnchor="middle"
                    style={{  fontSize: 25 }}
                />
                <VictoryAxis tickFormat={x => x} />

                <VictoryLabel
                    text={`Vacation ID`}
                    x={450}
                    y={340}
                    textAnchor="middle"
                    style={{  fontSize: 15 }}
                />

                <VictoryAxis
                    dependentAxis
                    tickFormat={x => x}
                    
                />

                <VictoryLabel
                    text={`Followers Count`}
                    angle={-90}
                    x={15}
                    y={180}
                    textAnchor="middle"
                    style={{  fontSize: 15 }}
                />
                
                <VictoryBar data={data} x="destination" y="followers" barRatio={0.2} labelComponent={<VictoryTooltip />}/>
                
            </VictoryChart>

        </div>
    );
}

export default BarChart;
