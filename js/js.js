const loadAiTools=async()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`;
    const res=await fetch(url);
    const data=await res.json();
    displayAiTools(data.data.tools);
}

const displayAiTools=data=>{
    const aiContainer=document.getElementById('ai-container');
    data.slice(0,6).forEach(singleAi => {
        const {image, features}=singleAi;
        aiContainer.innerHTML += `
        <div class="col">
            <div class="card p-3 w-100">
                <img src="${image}" style="height:250px" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol id="feature-list">
                   <li>${features[0]}</li>
                   <li>${features[1]}</li>
                   <li>${features[2]?features[2]:''}</li>
                </ol>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
        `;
        
    });
}
loadAiTools();