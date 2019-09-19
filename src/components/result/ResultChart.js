import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { compose } from 'recompose'

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
const data = [
    {
        "country": "AD",
        "hot dog": 196,
        "burger": 49,
        "sandwich": 154,
        "kebab": 45,
        "fries": 77,
        "donut": 53,
    },
    {
        "country": "AE",
        "hot dog": 93,
        "burger": 177,
        "sandwich": 120,
        "kebab": 196,
        "fries": 189,
        "donut": 188,
    },
    {
        "country": "AF",
        "hot dog": 89,
        "burger": 102,
        "sandwich": 21,
        "kebab": 51,
        "fries": 76,
        "donut": 146,
    },
    {
        "country": "AG",
        "hot dog": 3,
        "burger": 129,
        "sandwich": 95,
        "kebab": 140,
        "fries": 126,
        "donut": 168,

    },
    {
        "country": "AI",
        "hot dog": 165,
        "burger": 122,
        "sandwich": 45,
        "kebab": 152,
        "fries": 122,
        "donut": 181,
    },
    {
        "country": "AL",
        "hot dog": 168,
        "burger": 92,
        "sandwich": 144,
        "kebab": 49,
        "fries": 25,
        "donut": 105,
    },
    {
        "country": "AM",
        "hot dog": 21,
        "burger": 68,
        "sandwich": 104,
        "kebab": 153,
        "fries": 161,
        "donut": 119,
    },
    {
        "country": "BD",
        "hot dog": 196,
        "burger": 49,
        "sandwich": 154,
        "kebab": 45,
        "fries": 77,
        "donut": 53,
    },
    {
        "country": "BE",
        "hot dog": 93,
        "burger": 177,
        "sandwich": 120,
        "kebab": 196,
        "fries": 189,
        "donut": 188,
    },
    {
        "country": "BF",
        "hot dog": 89,
        "burger": 102,
        "sandwich": 21,
        "kebab": 51,
        "fries": 76,
        "donut": 146,
    },
    {
        "country": "BG",
        "hot dog": 3,
        "burger": 129,
        "sandwich": 95,
        "kebab": 140,
        "fries": 126,
        "donut": 168,

    },
    {
        "country": "BI",
        "hot dog": 165,
        "burger": 122,
        "sandwich": 45,
        "kebab": 152,
        "fries": 122,
        "donut": 181,
    },
    {
        "country": "BL",
        "hot dog": 168,
        "burger": 92,
        "sandwich": 144,
        "kebab": 49,
        "fries": 25,
        "donut": 105,
    },
    {
        "country": "CM",
        "hot dog": 21,
        "burger": 68,
        "sandwich": 104,
        "kebab": 153,
        "fries": 161,
        "donut": 119,
    },
    {
        "country": "CD",
        "hot dog": 196,
        "burger": 49,
        "sandwich": 154,
        "kebab": 45,
        "fries": 77,
        "donut": 53,
    },
    {
        "country": "CE",
        "hot dog": 93,
        "burger": 177,
        "sandwich": 120,
        "kebab": 196,
        "fries": 189,
        "donut": 188,
    },
    {
        "country": "CF",
        "hot dog": 89,
        "burger": 102,
        "sandwich": 21,
        "kebab": 51,
        "fries": 76,
        "donut": 146,
    },
    {
        "country": "CG",
        "hot dog": 3,
        "burger": 129,
        "sandwich": 95,
        "kebab": 140,
        "fries": 126,
        "donut": 168,

    },
    {
        "country": "CI",
        "hot dog": 165,
        "burger": 122,
        "sandwich": 45,
        "kebab": 152,
        "fries": 122,
        "donut": 181,
    },
    {
        "country": "CL",
        "hot dog": 168,
        "burger": 92,
        "sandwich": 144,
        "kebab": 49,
        "fries": 25,
        "donut": 105,
    },
    {
        "country": "CM",
        "hot dog": 21,
        "burger": 68,
        "sandwich": 104,
        "kebab": 153,
        "fries": 161,
        "donut": 119,
    }
]
const ResultChart = ({ color, y_axis, x_axis, data, indexBy }) => {
    if (!data) return null;

    return (
        <div style={{ width: '100%', height: 100 + 40 * data.data.length, minHeight: 250,  }}>
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
