const Modal = (function(){
  const inputFields = {
    subject: document.getElementById('subjects'),
    assign: document.getElementById('assName'),
    submit: document.getElementById('submitBtn'),
    assignArea: document.getElementById('assignments')
  }


  return{
    inputFields
  }

})()

const Controller = (function(Modal){

  // ---
  const inputFields = {
    subject: Modal.inputFields.subject,
    assign: Modal.inputFields.assign,
    submit: Modal.inputFields.submit,
    assignArea: Modal.inputFields.assignArea
  }

  //Rendering from Local Storage
  const renderAssign = () => {
    const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));
    inputFields.assignArea.innerHTML = '';
    localHomeworks.map(homework => {
      return inputFields.assignArea.innerHTML += `<li class=${homework.subject}><p>${homework.assign}</p><button class="delete" id=${homework.id}>X</button></li>`
    })
  }

  //Storing to Local Storage
  const storingToLocal = (homeworks) => {
    localStorage.setItem('homeworks', JSON.stringify(homeworks))
  }

  // Delegating Deleting event to List items
  const attachEventListener = () => {
    inputFields.assignArea.addEventListener('click', (e) => {
      if(e.target.classList.contains("delete")) {
        const ID = e.target.id;
        const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));
        const newHomeworks = localHomeworks.filter(homework => {
          return homework.id != ID;
        })
        storingToLocal(newHomeworks);
        renderAssign();
      }
    });
  }

  const publicAPI = {
    renderAssign,
    storingToLocal,
    attachEventListener
  }

  return publicAPI;

})(Modal);



const View = (function(Modal,Controller){

// ----
  const inputFields = {
    subject: Modal.inputFields.subject,
    assign: Modal.inputFields.assign,
    submit: Modal.inputFields.submit,
    assignArea: Modal.inputFields.assignArea
  }


  const init = () => {

    //Load from LocalStorage (if available)
    if(localStorage.getItem('homeworks')) Controller.renderAssign();

    //Attach Enter Button Event Listener
    inputFields.submit.addEventListener('click', (e) => {
      e.preventDefault();

      //Validating if something entered or not
      if(!inputFields.assign.value) return;

      // Create Homework Object
      const homework = {
        subject: inputFields.subject.value,
        assign: inputFields.assign.value,
        id: Date.now()
      }

      // Parsing Stored Homeworks from Local Storage
      const localHomeworks = JSON.parse(localStorage.getItem('homeworks'));

      // Checking whether to create or append the array.

      // if there is (Appending)
      if(localHomeworks){
        const homeworks = [homework, ...localHomeworks];
        Controller.storingToLocal(homeworks);
        Controller.renderAssign();
      }

      // if there is not (creating new array)
      else{
        const homeworks = [homework]
        Controller.storingToLocal(homeworks);
        Controller.renderAssign();
      }

      // Resetting input field
      inputFields.assign.value = '';
    });

    // Executing Delete event catcher
    Controller.attachEventListener();
  };

  return {
    init
  }
})(Modal,Controller);

View.init();
