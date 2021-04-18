import React from 'react'
import { Input } from 'antd';

const Search = ({ handleSearch }) => {

  return (
    <div>
      <Input.Search placeholder="Search by email" onSearch={handleSearch} enterButton />
    </div>
  )
}

export default Search
