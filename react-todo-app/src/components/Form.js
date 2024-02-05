import React from 'react'

export default function Form({ handleSubmit, value, setValue }) {

  
  // 다이어리에 추가하는 부분
  const handleChange = (e) => {
    setValue(e.target.value);
  };


  return (
    <div>
      {/* 할일 목록 */}
      <form onSubmit={handleSubmit} className='flex pt-2'>
          <input
            type="text"
            name="value"
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            placeholder="나만의 할일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="전송"
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          />
        </form>
    </div>
  )
}
