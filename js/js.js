const loadAiTools=async()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res=await fetch(url);
    const data=await res.json();
    displayAiTools(data.data.tools);
}

const displayAiTools=data=>{
    
}
loadAiTools();