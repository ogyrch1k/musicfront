import React, {useEffect, useRef, useState} from 'react';
import EexecutorList from '../components/Executorlist';
import {useExecutors} from '../hooks/useExecutors'
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import ExecutorService from '../API/ExecutorService';
import {useObserver} from "../hooks/useObserver";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import MySelect from "../components/UI/select/MySelect";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import ExecutorAddForm from "../components/ExecutorAddForm";
import Cookie from "js-cookie";
import ExecutorFilter from "../components/ExecutorFilter";

function Executors(){
    const [modal, setModal] = useState(false);
    const [executors, setExecutors]= useState([])
    const [executor,setExecutor] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);    
    const sortedAndSearchedExecutors = useExecutors(executors,filter.sort, filter.query);
    const lastElement = useRef();
    const role=Cookie.get('role')
    const [fetchExecutors, isExecutorsLoading, exeutorsError] = useFetching(async (page, limit) => {
        const response = await ExecutorService.getAll(page, limit);
        setExecutors([...executors, ...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit));
    })
    const[allExecutor,isLoad,err]=useFetching(async()=>{
        const request = await ExecutorService.getAllExecutor()
        setExecutor(request.data)
        return request
    })
    useObserver(lastElement, page < totalPages, isExecutorsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchExecutors(page, limit)
    }, [page, limit])

    const changePage = (page) => {
        setPage(page)
    }
    return(
        <div className="App">
             {exeutorsError &&
            <h1>Произошла ошибка ${exeutorsError}</h1>
            }
            <ExecutorFilter filter={filter}
                                  setFilter={setFilter} >

            </ExecutorFilter>
            {/*     <MySelect*/}
            {/*    value={limit}*/}
            {/*    onChange={value => setLimit(value)}*/}
            {/*    defaultValue="Кол-во элементов на странице"*/}
            {/*    options={[*/}
            {/*        {value: 5, name: '5'},*/}
            {/*        {value: 10, name: '10'},*/}
            {/*        {value: 25, name: '25'},*/}
            {/*        {value: -1, name: 'Показать все'},*/}
            {/*    ]}*/}
            {/*/>*/}

            {
                role==='admin' &&
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать
            </MyButton>}
            <MyModal visible={modal} setVisible={setModal}>
                <ExecutorAddForm/>
            </MyModal>
            <EexecutorList executors={sortedAndSearchedExecutors} title={'Исполнители'}/>

            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isExecutorsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Executors;
