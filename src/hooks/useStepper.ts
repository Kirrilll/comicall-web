import { DependencyList, useEffect, useState } from "react";

export interface Step {
    name: string,
    label: string
}

export const useStepper = (steps: Array<Step>, resetDependencies: DependencyList) => {
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        setStepIndex(0);
    }, resetDependencies );

    return {
        stepIndex,
        isFirst: () => stepIndex == 0,
        isLast: () => stepIndex == steps.length - 1,
        togleNext: () => {
            if (stepIndex != steps.length - 1) {
                setStepIndex(stepIndex + 1);
            }
        },
        toglePrev: () => {
            if (stepIndex != 0) setStepIndex(stepIndex - 1);
        }
    }
}