import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Typography from '@material-ui/core/Typography'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data, color, y_axis, x_axis, indexBy, keys }) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: color }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: x_axis,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: y_axis,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        layout="horizontal"
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

const ResultChart = ({ color, y_axis, x_axis, data, indexBy, title }) => {
    if (!data) return null;

    return (
        <div style={{ width: '100%', height: 100 + 40 * data.data.length, minHeight: 250, minWidth: 600  }}>
            <Typography variant="body1" style={{fontWeight: 600}} align="center">
                {title}
            </Typography>
            <MyResponsiveBar
                indexBy={indexBy}
                keys={data.keys}    
                data={data.data}
                color={color}
                y_axis={y_axis}
                x_axis={x_axis} />
        </div>
    )
}

export default ResultChart
