'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("hello world")

  useEffect(() => {
    const fetchData = async () => {
        try {
            // 模拟调用接口
            const response = await fetch('/api/hello');
            if (!response.ok) {
                throw new Error('网络响应异常');
            }
            
            const result = await response.text();
            console.log("result"+result)
            await setData(result);
        } catch (err) {
           console.log("adf",err)
        } finally {
          console.log("end")
        }
    };

    fetchData();
}, []);

  const put = async ()=>{
    await fetch("/api/hello",{ method: 'POST'})
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <span>{data}</span>
      <button onClick={put} >click</button>
    </div>
  );
}
