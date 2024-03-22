import React, { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons'
import './stepcss.css'
const StepProgressBar = (props) => {
  const { steps, scrollToAnchor } = props;
  const [containerWidth, setContainerWidth] = useState(0);
  const [size, setSize] = useState(6);
  const [counts, setCounts] = useState();
  // 步骤条颜色
  const state = {
    0: '#ccc',
    1: '#1890FF',
  }

  // 计算
  const generateCounts = (totalItems) => {
    const counts = [];
    let count = size; // 第一行的条目数量

    while (totalItems > 0) {
      counts.push(count);
      totalItems -= count;
      count = count === size ? size - 1 : size; // 切换下一行的条目数量
    }

    return counts;
  }

  // 拆分
  const splitArrayByCounts = (steps, counts) => {
    const result = [];
    let startIndex = 0;
    counts?.forEach(count => {
      const chunk = steps.slice(startIndex, startIndex + count);
      if (chunk.length > 0) {
        result.push(chunk);
        startIndex += count;
      }
    });
    return result;
  }


  const renderSteps = () => {
    // 数据集
    const splitData = splitArrayByCounts(steps, counts);
    const rows = [];
    splitData.forEach((item, ind) => {
      const itemInd = item.length
      const isLastRow = ind % 2 //区分数据排布起点 0从左往右 1从右往左
      if (!(item.length == counts[ind])) {
        for (var i = 0; i < counts[ind] - itemInd; i++) {
          item.push({});
        }
      }
      if (splitData.length - 1 == ind) {
        const element = document.getElementById("step-progress-bar");
        // eslint-disable-next-line no-unused-expressions
        item.some(item => item.children) ? element.style.paddingBottom = "120px" : null;
      }
      rows.push(
        <div className={`step-row ${isLastRow ? 'step_odd' : ''}`} key={ind}>
          {renderRowSteps(item, isLastRow, ind)}
        </div>
      );
    })

    return rows;
  };

  // →  -o
  // ←  o-
  const renderRowSteps = (rowSteps, isLastRow, i) => {
    return isLastRow
      ? rowSteps
        .map((step, index) => rowSteps[rowSteps.length - 1 - index])
        .map((step, index) => (
          <div key={index} className='step-every' style={{ visibility: Object.keys(step).length ? '' : 'hidden' }}>
            <React.Fragment key={index}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <CheckCircleOutlined onClick={() => scrollToAnchor(step.id)} style={{ fontSize: '25px', color: state[step.status] }} />
                <div className="step">{step.title}</div>
                {index == rowSteps.length - 1 && <div className='right_arc' style={{ borderColor: state[step.status] }}></div>}
                {/* 如果有子集 */}
                {step.children &&
                  <div className='step_children'>
                    <div className='chil_connector' style={{ backgroundColor: state[step.children.status] }}></div>
                    <CheckCircleOutlined onClick={() => scrollToAnchor(step.id)} style={{ fontSize: '25px', color: state[step.children.status] }} />
                    <div className='chil_data'>{step.children.title}</div>
                  </div>}
              </div>
              {index < size - 1 && index != rowSteps.length - 1 && <div className="connector" style={{ backgroundColor: state[step.status] }} />}
            </React.Fragment>
          </div>
        ))
      : rowSteps.map((step, index) => (
        <div key={index} className='step-every' style={{ visibility: Object.keys(step).length ? '' : 'hidden' }}  >
          <React.Fragment key={index}>
            {index > 0 && <div className="connector" style={{ backgroundColor: state[step.status] }} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <CheckCircleOutlined onClick={() => scrollToAnchor(step.id)} style={{ fontSize: '25px', color: state[step.status] }} />
              <div className="step">{step.title}</div>
              {index == 0 && i != 0 && <div className='left_arc' style={{ borderColor: state[step.status] }}></div>}
              {/* 如果有子集 */}
              {step.children &&
                <div className='step_children'>
                  <div className='chil_connector' style={{ backgroundColor: state[step.children.status] }} ></div>
                  <CheckCircleOutlined onClick={() => scrollToAnchor(step.id)} style={{ fontSize: '25px', color: state[step.children.status] }} />
                  <div className='chil_data'>{step.children.title}</div>
                </div>}
            </div>
          </React.Fragment>
        </div>
      ));
  };

  useEffect(() => {
    
    const handleResize = () => {
      const width = document.getElementById('step-progress-bar').offsetWidth;
      setContainerWidth(width);
    };

    handleResize(); // 初始化时获取一次宽度
    window.addEventListener('resize', handleResize); // 监听窗口大小变化

    return () => window.removeEventListener('resize', handleResize); // 清理副作用
  }, []);

  useEffect(() => {
    // 根据不同的宽度设置每行展示的条目数量
    if (containerWidth >= 2000) {
      setSize(8);
    } else if (containerWidth >= 1800) {
      setSize(7);
    } else if (containerWidth >= 1500) {
      setSize(6);
    } else if (containerWidth >= 1400) {
      setSize(5);
    } else if (containerWidth >= 1200) {
      setSize(4);
    } else {
      setSize(3);
    }
  }, [containerWidth]);

  useEffect(() => {
    setCounts(generateCounts(steps.length));
  }, [size, steps])
  // className={`${sticky ? 'sticky' : ''}`}
  return <div id='step-progress-bar'> {renderSteps()} </div>;
};

export default StepProgressBar;
