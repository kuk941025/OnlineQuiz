import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data, color }) => (
    <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
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
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
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
        "hot dogColor": "hsl(104, 70%, 50%)",
        "burger": 49,
        "burgerColor": "hsl(358, 70%, 50%)",
        "sandwich": 154,
        "sandwichColor": "hsl(108, 70%, 50%)",
        "kebab": 45,
        "kebabColor": "hsl(207, 70%, 50%)",
        "fries": 77,
        "friesColor": "hsl(16, 70%, 50%)",
        "donut": 53,
        "donutColor": "hsl(62, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 93,
        "hot dogColor": "hsl(302, 70%, 50%)",
        "burger": 177,
        "burgerColor": "hsl(280, 70%, 50%)",
        "sandwich": 120,
        "sandwichColor": "hsl(55, 70%, 50%)",
        "kebab": 196,
        "kebabColor": "hsl(267, 70%, 50%)",
        "fries": 189,
        "friesColor": "hsl(283, 70%, 50%)",
        "donut": 188,
        "donutColor": "hsl(82, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 89,
        "hot dogColor": "hsl(26, 70%, 50%)",
        "burger": 102,
        "burgerColor": "hsl(114, 70%, 50%)",
        "sandwich": 21,
        "sandwichColor": "hsl(321, 70%, 50%)",
        "kebab": 51,
        "kebabColor": "hsl(291, 70%, 50%)",
        "fries": 76,
        "friesColor": "hsl(118, 70%, 50%)",
        "donut": 146,
        "donutColor": "hsl(166, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 3,
        "hot dogColor": "hsl(317, 70%, 50%)",
        "burger": 129,
        "burgerColor": "hsl(127, 70%, 50%)",
        "sandwich": 95,
        "sandwichColor": "hsl(275, 70%, 50%)",
        "kebab": 140,
        "kebabColor": "hsl(259, 70%, 50%)",
        "fries": 126,
        "friesColor": "hsl(311, 70%, 50%)",
        "donut": 168,
        "donutColor": "hsl(312, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 165,
        "hot dogColor": "hsl(198, 70%, 50%)",
        "burger": 122,
        "burgerColor": "hsl(329, 70%, 50%)",
        "sandwich": 45,
        "sandwichColor": "hsl(3, 70%, 50%)",
        "kebab": 152,
        "kebabColor": "hsl(359, 70%, 50%)",
        "fries": 122,
        "friesColor": "hsl(41, 70%, 50%)",
        "donut": 181,
        "donutColor": "hsl(181, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 168,
        "hot dogColor": "hsl(342, 70%, 50%)",
        "burger": 92,
        "burgerColor": "hsl(253, 70%, 50%)",
        "sandwich": 144,
        "sandwichColor": "hsl(97, 70%, 50%)",
        "kebab": 49,
        "kebabColor": "hsl(351, 70%, 50%)",
        "fries": 25,
        "friesColor": "hsl(193, 70%, 50%)",
        "donut": 105,
        "donutColor": "hsl(45, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 21,
        "hot dogColor": "hsl(127, 70%, 50%)",
        "burger": 68,
        "burgerColor": "hsl(151, 70%, 50%)",
        "sandwich": 104,
        "sandwichColor": "hsl(205, 70%, 50%)",
        "kebab": 153,
        "kebabColor": "hsl(171, 70%, 50%)",
        "fries": 161,
        "friesColor": "hsl(249, 70%, 50%)",
        "donut": 119,
        "donutColor": "hsl(97, 70%, 50%)"
    }
]
const ResultChart = ({ color }) => {
    return (
        <div style={{ width: '100%', height: 600 }}>
            <MyResponsiveBar data={data} color={color} />
        </div>
    )
}

export default ResultChart
