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
        // console.log(singleAi)
        const {id,image, features, name, published_in}=singleAi;
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
                        <button onclick="fetchDetailsById('${id}')" style="border-radius:50%; padding:10px 15px;" class="fs-5 border-0 text-danger"><i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#showDetailsModal"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
    });
    showSpinner(false);
}

//show default 6 Items
const loadBodyData=()=>{
    showSpinner(true);
    loadAiTools(6);
}
    
//show all items
document.getElementById('btn-showAll').addEventListener('click',function(){
    showSpinner(true);
    loadAiTools();  
})

// loader/spinner 
const showSpinner=isLoading=>{
    const spinner=document.getElementById('spinner');
    if(isLoading===true){
        spinner.classList.remove('d-none');
    }else{
        spinner.classList.add('d-none');
    }
}

// fetch Details by Id
const fetchDetailsById=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetailsById(data.data))
    .catch(error=>console.log(error));
}

//show Details Data by Id
const displayDetailsById=(details)=>{
    console.log(details)
    const {description,image_link,input_output_examples,accuracy,pricing, features,integrations}=details;
    //modal left description Text
    const detailsText=document.getElementById('description');
    detailsText.innerHTML=`${description}`
    //pricing
    const priceBasic=document.getElementById('price-basic').innerHTML=`${pricing[0].price===0?'No Cost/':pricing[0].price} ${pricing[0].plan}`;
    const pricePro=document.getElementById('price-pro').innerHTML=`${pricing[1].price} ${pricing[1].plan}`;
    const priceEnterprise=document.getElementById('price-enterprise').innerHTML=`${pricing[2].price} ${pricing[2].plan}`;
    //Modal Features
    const modalFeatures=document.getElementById('details-features');
    modalFeatures.innerText='';
    for(let feature in features){
        modalFeatures.innerHTML+=
        `<li>${features[feature].feature_name}</li>`;
    }
    //integrations
    const integrationsList=document.getElementById('details-integrations');
    integrationsList.innerText='';

    integrations.forEach(item=>{
        integrationsList.innerHTML+=
        `<li>${item}</li>`;
    })
    //modal right side card
    const detailsCard=document.getElementById('details-card');
    detailsCard.innerHTML=`
    <img src="${image_link[0]}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center">${input_output_examples[0].input}</h5>
      <p class="card-text text-center">${input_output_examples[0].output}</p>
      <button class="btn btn-primary position-absolute accuricy-btn ${accuracy.score===null?'d-none':''}">${accuracy.score*100}% Accouricy</button>
    </div>
    `
}

/*
${features.map(element =>`
<li>${element}</li>
`)}*/