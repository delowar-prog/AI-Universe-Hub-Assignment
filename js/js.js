const loadAiTools=async(limit)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res=await fetch(url);
    const data=await res.json();
    displayAiTools(data.data.tools, limit);
}

const displayAiTools=(data,limit)=>{
    const aiContainer=document.getElementById('ai-container');
    aiContainer.innerText='';
    // Display Show all btn
    if(data.length > limit){
        data=data.slice(0, limit);
         document.getElementById('btn-showAll').classList.remove('d-none');
     }else{
         document.getElementById('btn-showAll').classList.add('d-none');
     }
     //Iterate all Items
    data.forEach(singleAi => {
        console.log(singleAi)
        const {image, features, name, published_in}=singleAi;
        aiContainer.innerHTML +=`
        <div class="col">
            <div class="card p-3 w-100">
                <img src="${image}" style="height:250px" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li class="${features[2]===undefined?'d-none':''}">${features[2]}</li>
                    <li class="${features[3]===undefined?'d-none':''}">${features[3]}</li>
                    <li class="${features[4]===undefined?'d-none':''}">${features[4]}</li>
                    <li class="${features[5]===undefined?'d-none':''}">${features[5]}</li>
               </ol>
               <hr/>
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <div>
                            <h3 class="mb-3">${name}</h3>
                            <p class="fs-5"><i class="fa-solid fa-calendar-days fs-4"></i> ${published_in}</p>
                        </div>
                        <button style="border-radius:50%; padding:10px 15px;" class="fs-5 border-0 text-danger"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

//show default 6 Items
loadAiTools(6);



/*
${features.map(element =>`
<li>${element}</li>
`)}*/