const arr = []
const btnSave = document.querySelector('#save-button')
const btnCancel = document.querySelector('#cancel-button')
const addContact = document.querySelector('#add-contact')
const tabela = document.querySelector('#contact-list')
const modal = document.querySelector('#modal');

addContact.addEventListener('click', (e) =>{
    e.preventDefault()
    modal.style.display = 'flex'
})

btnCancel.addEventListener('click', (e)=>{
    e.preventDefault()
     modal.style.display = 'none'
})



btnSave.addEventListener('click', (e) =>{
    e.preventDefault();
    const addName = document.querySelector('#name').value.trim()
    const addPhone = document.querySelector('#phone').value.trim()
    const addEmail = document.querySelector('#email').value.trim()
    if(addName === "" || addPhone === "" || addEmail === ""){
        alert ("Campos obrigatorios!")
    }
    else{

        const contatos = {
            name: addName,
            phone: addPhone,
            email: addEmail
        };
        arr.push(contatos)
        const addInfo = document.createElement('tr')
        localStorage.setItem('contacts', JSON.stringify(arr));
        addInfo.innerHTML = `
            <td>${addName}</td>
            <td>${addPhone}</td>
            <td>${addEmail}</td>
            <td><button class="edit-btn">Editar</button> <button class="delete-btn">Excluir</button></td>
        `;
        tabela.appendChild(addInfo)

        document.querySelector('#name').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
        modal.style.display = 'none'

    }
    deleteContact();
    editContact();
    filtragemContacts()
});


function editContact(){
    const editBtn = document.querySelectorAll('.edit-btn')
    editBtn.forEach(button => {
        button.addEventListener('click', (e)=>{
            const linha = e.target.closest('tr')

            const name = linha.children[0].textContent;
            const phone = linha.children[1].textContent;
            const email = linha.children[2].textContent;

            document.querySelector('#name').value = name;
            document.querySelector('#phone').value = phone;
            document.querySelector('#email').value = email;

            modal.style.display = 'flex'
    
    })
    })
}

function deleteContact(){
    const excluirBtn = document.querySelectorAll('.delete-btn')
    excluirBtn.forEach(buttons => {
        buttons.addEventListener('click', (e) => {
            const linha = e.target.closest('tr')
            const name = linha.children[0].textContent;
            const phone = linha.children[1].textContent;
            const email = linha.children[2].textContent;

        const index = arr.findIndex(contact => contact.name === name && contact.phone === phone && contact.email === email);
            if(index > -1){
                arr.splice(index, 1)

                localStorage.setItem('contacts', JSON.stringify(arr));
            }
            linha.remove();
        }
        )
    })
}

function salvarContatos(){
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
        arr.push(...JSON.parse(savedContacts));
        arr.forEach(contact => {
            const addInfo = document.createElement('tr');
            addInfo.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td><button class="edit-btn">Editar</button> <button class="delete-btn">Excluir</button></td>
            `;
            tabela.appendChild(addInfo);
        });
    } 
}

function filtragemContacts() {
    const filtrar = document.querySelector('#search')
     
    return arr.filter(contact.name.toLowerCase().includes(name.toLowerCase()))
}
deleteContact();
editContact();
