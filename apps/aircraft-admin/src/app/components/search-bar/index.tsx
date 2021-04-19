import React from 'react'
import { Input } from 'antd';

const Search = ({ placeholder, allowClear, handleSearch }) => {

  return (
    <div>
      <Input.Search
        placeholder={placeholder}
        allowClear={allowClear}
        onSearch={handleSearch}
        enterButton
      />
    </div>
  )
}

export default Search
