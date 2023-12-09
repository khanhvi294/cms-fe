import React from 'react'

const BoxOverview = ({data, className, title, ...props}) => {
  return (
    <div className={`${className} rounded-md`}>
        <div className="panel p-2">
            <div className="flex justify-between">
                <div className="text-md font-semibold">{title}</div>
                <div className="dropdown">
                    <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center mt-5 ">
                <div className="text-4xl font-bold ltr:mr-3 rtl:ml-3"> </div>
                <div className="rounded-lg p-1 bg-white/30  flex flex-col ">
                    <div className="badge text-sm font-medium flex items-center ">This monthly </div>
                    <div className="badge  text-sm font-medium flex items-center  ">This weekly </div>
                    <div className="badge  text-sm font-medium flex items-center ">Today </div>
                </div>
            </div>
</div>
    </div>
  )
}

export default BoxOverview