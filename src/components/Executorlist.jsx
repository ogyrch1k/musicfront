import React from 'react';
import ExecutorItem from './ExecutorItem';
import {TransitionGroup, CSSTransition} from "react-transition-group";

const EexecutorList =({executors,title})=>{


    if (!executors.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Исполнители не найдены!
            </h1>
        )
    }

    return (
        <div className="executorlist" >
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            <TransitionGroup>
                {executors.map((executor, index) =>
                    <CSSTransition
                        key={executor.id}
                        timeout={500}
                        classNames="executor"
                    >
                        <ExecutorItem  number={index + 1} executor={executor} />
                    </CSSTransition>

                )}
            </TransitionGroup>
        </div>
    );
};

export default EexecutorList;