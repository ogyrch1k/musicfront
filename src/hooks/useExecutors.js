import {useMemo} from "react";

export const useExecutors =(executors, sort, query)=>{
    const sortedExecutors = useSortedExecutors(executors, sort);

    const sortedAndSearchedExecutors  = useMemo(() => {
        return sortedExecutors.filter(executor => executor.nameOfExecutor.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedExecutors])
    
    return sortedAndSearchedExecutors;
}

export const useSortedExecutors = (executors, sort) => {
    const sortedExecutors = useMemo(() => {
        if(sort) {
            return [...executors].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return executors;
    }, [sort, executors])

    return sortedExecutors;
}