import React from 'react'

import filter_types from '@/data/store_filter_types'
import styles from './filterBar.module.css'


function FilterButtons(filter, setFilter) {
    const arr = Object.entries(filter_types)
    return arr.map((item) => {
        return (
            <div
                className={`${filter === item[1] ? `${styles.activeFilterButton}` : `${styles.filterButton}`}`}
                onClick={() => { setFilter(item[1]) }}
                key={item[1]}
            >
                {item[1]}
            </div>
        )
    })
}

function FilterBar({ filter, setFilter }) {
    return (
        <div className={styles.filterBar}>
            {FilterButtons(filter, setFilter)}
        </div>
    )
}

export default FilterBar