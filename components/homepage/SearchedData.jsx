// 'use-client'
import constant from 'constant';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

function SearchedData() {


    const [searchedData, setSearchedData] = useState(
        JSON.parse(getCookie('s_data'))
    )
    return (
        <div>
            {searchedData && searchedData.length > 0 && searchedData.map((ele) => {
                return ele
            })}
        </div>
    )

}

export default SearchedData