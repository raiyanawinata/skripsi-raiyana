import React, { useMemo, useState } from 'react'
import Categories from './Categories'
import Top10BookRecommend from './Top10BookRecommend'
import Top10BookCategory from './Top10BookCategory'
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';

export default function PopularItems({ loanData }) {    
    const [topCateg, setTopCateg] = useState([]);
    const [activeCateg, setActiveCateg] = useState();

    const ResultData = useMemo(()=>{
        let computedData = [];
        if(Object.values(loanData.data).length > 0){
            computedData = loanData.data;
            const topCateg = getTopCategories(loanData.data);
            setTopCateg(topCateg);
            setActiveCateg(topCateg[0])
        }
        return computedData;
    },[loanData.data])
    

    return (
        loanData.loading ? <Spinner animation="border" role="status" />:
            loanData.message ? <AlertNotif color="danger" message={loanData.message} /> :
                Object.values(loanData.data).length > 0 ? (
                    < div className='row' >
                        <div className="col-lg-4 mb-5 mb-xl-10">
                            <Categories data={topCateg} activeCateg={activeCateg} setActiveCateg={setActiveCateg} />
                        </div>
                        <div className="col-lg-4 mb-5 mb-xl-10">
                            <Top10BookCategory activeCateg={activeCateg} loandata={ResultData}/>
                        </div>
                        <div className="col-lg-4 mb-5 mb-xl-10">
                            <Top10BookRecommend activeCateg={activeCateg} loandata={ResultData} />
                        </div>
                    </div >
                ) : ""
    )
}

const getTopCategories = (data, topN = 10) => {
    const categoryMap = {};
    data.forEach(item => {
      if (!categoryMap[item.kategori]) categoryMap[item.kategori] = 0;
      categoryMap[item.kategori] += item.total_peminjam;
    });

    const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
    return sortedCategories.slice(0, topN);
  };