const baseUrl="http://localhost:3000/coffees"
const dataTable=document.getElementById('data-table')


async function fetchData() {
    try {
        const response=await axios.get(baseUrl)
        addTable(response.data)
    } catch (error) {
        console.log(error);
    }
}

function addTable(data) {
    dataTable.innerHTML=''
    data.forEach(item => {
        const row=document.createElement('tr')
        row.innerHTML=`
       
            <td>${item.id}</td>
            <td>${item.product}</td>
            <td>${item.price}</td>
            <td>
            <button onclick="editPost(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });
    
}

async function createPost(){
    const productInput=document.getElementById('desc-input').value
    const priceInput=document.getElementById('name-input').value
    try {
        
        await axios.post(baseUrl,{
           
            product:productInput,
            price:priceInput
        })
        fetchData()

    } catch (error) {
        console.log(error);
    }
}

let editPosdId=null

async function editPost(postId) {
    
    try {
        const response= await axios.get(`${baseUrl}/${postId}`)
       
        const post=response.data
        
        document.getElementById('desc-input').value=post.product
   document.getElementById('name-input').value=post.price
    
    editPosdId=postId
    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    const productInput=document.getElementById('desc-input').value
    const priceInput=document.getElementById('name-input').value
    if(editPosdId){
        try {
           await axios.put(`${baseUrl}/${editPosdId}`,{
                product:productInput,
                price:priceInput
            })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

}


async function deletePost(postId) {
    try {
        
        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
}

fetchData()