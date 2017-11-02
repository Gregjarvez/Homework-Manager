const Controller = (function(){

 const inputFields = {
   subject: document.getElementById('subjects'),
   assign: document.getElementById('assName'),
   submit: document.getElementById('submitBtn'),
 }


return{
  inputFields
}

})()

const UI = (function(Controller){

const inputFields = {
  subject: Controller.inputFields.subject,
  assign: Controller.inputFields.assign,
  submit: Controller.inputFields.submit,
  assignArea: document.getElementById('assignments')
}

const loadAssign = () => {
  const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));
  inputFields.assignArea.innerHTML = '';
  localHomeworks.map(homework => {
    return inputFields.assignArea.innerHTML += `<li class=${homework.subject}><p>${homework.assign}</p><button class="delete" id=${homework.id}>X</button></li>`
  })
}

const init = () => {

    //Load from LocalStorage (if available)
    if(localStorage.getItem('homeworks')) loadAssign();

    inputFields.submit.addEventListener('click', (e) => {
      e.preventDefault();
      // valdate
      if(!inputFields.assign.value) return;

      // Create Homework Object
      const homework = {
        subject: inputFields.subject.value,
        assign: inputFields.assign.value,
        id: Date.now()
      }

      //Check whether to create or append the array.
      const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));

      if(localHomeworks){
        // if there is (Appending)
        const homeworks = [homework, ...localHomeworks];
        localStorage.setItem('homeworks', JSON.stringify(homeworks))
        loadAssign();
      }

      else{
        // create new array
        const homeworks = [homework]
        localStorage.setItem('homeworks', JSON.stringify(homeworks))
        loadAssign();
      }

      inputFields.assign.value = '';
    });


    // Delegating Deleting event to List items
    inputFields.assignArea.addEventListener('click', (e) => {
      if(e.target.classList.contains("delete")) {
        const ID = e.target.id;
        const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));
        const newHomeworks = localHomeworks.filter(homework => {
          return homework.id != ID;
        })
        localStorage.setItem('homeworks', JSON.stringify(newHomeworks));
        loadAssign();
      }
    });



};

return {
  init
}
})(Controller);

UI.init();
