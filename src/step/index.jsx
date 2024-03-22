
import React, { useState, useCallback } from "react"
import { Button, Steps, message } from 'antd'
import StepProgressBar from './StepProgressBar'

const Step = (props) => {

    // 默认第一条
    const [stepsList, setStepsList] = useState([{ id: 1, status: 0, title: '步骤条1', description: '2021年7月7日' }])
    const [stepsItems, setStepsItems] = useState([{ id: '1', title: '1', description: <div style={{ width: '100%', height: '300px' }}><Button onClick={() => nextstep(1)}>确定</Button></div> }])

    const list = [
        {
            id: 1,
            status: 0,
            title: '步骤条1',
            description: '2021年7月7日'
        },
        {
            id: 2,
            status: 0,
            title: '步骤条2',
            description: '2021年11月19日'
        },
        {
            id: 3,
            status: 0,
            title: '步骤条3',
            description: '2021年12月31日'
        },
        {
            id: 4,
            status: 0,
            title: '步骤条4步骤条4',
            description: '2022年4月19日',
            children: {
                status: 0,
                title: '步骤条4分支',
                description: '2022年4月19日'
            }
        },
        {
            id: 5,
            status: 0,
            title: '步骤条5',
            description: '2022年5月1日'
        },
        {
            id: 6,
            status: 0,
            title: '步骤条6',
            description: '2022年5月1日'
        },
        {
            id: 7,
            status: 0,
            title: '步骤条7',
            description: '2022年7月1日'
        },
        {
            id: 8,
            status: 0,
            title: '步骤条8',
            description: '2022年8月1日'
        },
        {
            id: 9,
            status: 0,
            title: '步骤条9',
            description: '未完成',
            // children: {
            //     status: 0,
            //     title: '步骤条9分支',
            //     description: '2022年4月19日'
            // }
        },
        {
            id: 10,
            status: 0,
            title: '步骤条10',
            description: '2021年7月7日'
        },
        {
            id: 11,
            status: 0,
            title: '步骤条11',
            description: '2021年11月19日'
        },
        {
            id: 12,
            status: 0,
            title: '步骤条12',
            description: '2021年12月31日'
        },
        {
            id: 13,
            status: 0,
            title: '步骤条13',
            description: '2022年4月19日'
        },
        {
            id: 14,
            status: 0,
            title: '步骤条14',
            description: '2022年5月1日'
        },
        {
            id: 15,
            status: 0,
            title: '步骤条15',
            description: '2022年5月1日'
        },
        {
            id: 16,
            status: 0,
            title: '步骤条16',
            description: '2022年7月1日'
        },
        {
            id: 17,
            status: 0,
            title: '步骤条17',
            description: '2022年8月1日'
        },
        {
            id: 18,
            status: 0,
            title: '步骤条18',
            description: '未完成'
        },
        {
            id: 19,
            status: 0,
            title: '步骤条19',
            description: '未完成'
        },
        {
            id: 20,
            status: 0,
            title: '步骤条20',
            description: '未完成'
        }
    ]

    const Items = [
        {
            id: '1',
            title: '1',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(1)}>确定</Button></div>
        },
        {
            id: '2',
            title: '2',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(2)}>确定</Button></div>
        },
        {
            id: '3',
            title: '3',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(3)}>确定</Button></div>
        },
        {
            id: '4',
            title: '4',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(4)}>确定</Button></div>
        },
        {
            id: '5',
            title: '5',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(5)}>确定</Button></div>
        },
        {
            id: '6',
            title: '6',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(6)}>确定</Button></div>
        },
        {
            id: '7',
            title: '7',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(7)}>确定</Button></div>
        },
        {
            id: '8',
            title: '8',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(8)}>确定</Button></div>
        },
        {
            id: '9',
            title: '9',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(9)}>确定</Button></div>
        },
        {
            id: '10',
            title: '10',
            description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(10)}>确定</Button></div>
        },
        // {
        //     id: '11',
        //     title: '11',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(11)}>确定</Button></div>
        // },
        // {
        //     id: '12',
        //     title: '12',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(12)}>确定</Button></div>
        // },
        // {
        //     id: '13',
        //     title: '13',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(13)}>确定</Button></div>
        // },
        // {
        //     id: '14',
        //     title: '14',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(14)}>确定</Button></div>
        // },
        // {
        //     id: '15',
        //     title: '15',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(15)}>确定</Button></div>
        // },
        // {
        //     id: '16',
        //     title: '16',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(16)}>确定</Button></div>
        // },
        // {
        //     id: '17',
        //     title: '17',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(17)}>确定</Button></div>
        // },
        // {
        //     id: '18',
        //     title: '18',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(18)}>确定</Button></div>
        // },
        // {
        //     id: '19',
        //     title: '19',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep(19)}>确定</Button></div>
        // },
        // {
        //     id: '20',
        //     title: '20',
        //     description: <div style={{ width: '100%', height: '300px', marginBottom: '10px', border: '1px solid', borderRadius: '6px' }}><Button onClick={() => nextstep()}>确定</Button></div>
        // },
    ]

    // 点击追踪到对应的步骤
    const scrollToAnchor = (id) => {
        let anchorElement = document.getElementById(id);
        let stepProgressBar = document.getElementById('step-progress-bar');
        if (anchorElement) {
            var offsetTop = anchorElement.offsetTop - stepProgressBar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // 可选，实现平滑滚动
            });
        }
    }

    const nextstep = useCallback((key) => {
        if (!key) { message.success('所有流程已完成'); return }
        setStepsList((keys) => {
            keys[key - 1].status = 1
            return [...keys, list[key]]
        });
        setStepsItems((keys => {
            return [...keys, Items[key]]
        }));
    }, [stepsList])

    return <div style={{ backgroundColor: '#f0f2f5' }}>
        {/* 隐藏还是滚动看需求 */}
        <div style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: '#fff', margin: '20px 0' }} >
            <StepProgressBar steps={stepsList} scrollToAnchor={scrollToAnchor} />
        </div>

        <div style={{ padding: '0 10px' }}>
            <Steps
                direction="vertical"
                current={stepsItems.length - 1}
                items={stepsItems}
            />
        </div>

    </div>
}

export default Step