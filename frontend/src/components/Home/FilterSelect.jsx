import React from 'react'

const FilterSelect = () => {
    return (
        <div className="flex items-center justify-center gap-8 text-white bg-[#714B67] px-4 py-2 rounded-full border border-gray-600">
            {/* Newest Select */}
            <select className="bg-[#714B67] text-white border-none outline-none px-2">
                <option>Newest</option>
                <option>Oldest</option>
            </select>

            {/* Unanswered Select */}
            <select className="bg-[#714B67] text-white border-none outline-none px-2">
                <option className="">Unanswered</option>
                <option className="">Answered</option>
            </select>

            {/* More Select */}
            {/* <select className="bg-[#714B67] text-white border-none outline-none px-2">
                <option>Popular</option>
            </select> */}
        </div>
    )
}

export default FilterSelect