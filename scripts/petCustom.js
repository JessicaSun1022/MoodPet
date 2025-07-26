(() =>{

    const lockImg = 'customization/pets/lock.png';

    //Pet selector
    const petOptions = ['dog','cat','frog','racoon','monkey','panda','rPanda'];
    let petIndex = 0;
    if(gameState.currentPet){
        const i = petOptions.indexOf(gameState.currentPet);
        if(i >= 0) petIndex = i;
    }
    const petPrevBtn = document.getElementById('pet-prev');
    const petNextBtn = document.getElementById('pet-next');
    const petImg = document.getElementById('pet-image');

    //Update display and check if unlocked
    function updatePet(){
        const key = petOptions[petIndex];
        const unlocked = gameState.unlocked.pets || [];
        if(unlocked.includes(key)){
            petImg.src = `customization/pets/${key}.png`;
            petImg.alt = key;
        }
        else{
            petImg.src = lockImg;
            petImg.alt = 'Locked';
        }
        gameState.currentPet = key;
        saveState();
    }

    petPrevBtn.addEventListener('click', () => {
        petIndex = (petIndex - 1 + petOptions.length) % petOptions.length;
        updatePet();
    });
    petNextBtn.addEventListener('click', () => {
        petIndex = (petIndex + 1) % petOptions.length;
        updatePet();
    });

    updatePet();

    //Accessory selector
    const accOptions = ['tophat','bow','glasses'];
    let accIndex = 0;
    if(gameState.currentAccessory){
        const i = accOptions.indexOf(gameState.currentAccessory);
        if(i >= 0) accIndex = i;
    }
    const accPrevBtn = document.getElementById('acc-prev');
    const accNextBtn = document.getElementById('acc-next');
    const accImg = document.getElementById('acc-image');

    function updateAcc(){
        const key = accOptions[accIndex];
        const unlocked = gameState.unlocked.accessories || [];
        if(unlocked.includes(key)){
            accImg.src = `customization/accessories/${key}.png`;
            accImg.alt = key;
        }
        else{
            accImg.src = lockImg;
            accImg.alt = 'Locked';
        }
        gameState.currentAccessory = key;
        saveState();
    }

    accPrevBtn.addEventListener('click',() =>{
        accIndex = (accIndex - 1 + accOptions.length) % accOptions.length;
        updateAcc();
    });
    accNextBtn.addEventListener('click',() =>{
        accIndex = (accIndex + 1) % accOptions.length;
        updateAcc();
    });

    updateAcc();

    //Gender selector
    const genderOptions = ['Female', 'Male'];
    let genderIndex = 0;
    if(gameState.currentGender){
        const i = genderOptions.indexOf(gameState.currentGender);
        if(i >= 0) genderIndex = i;
    }

    const genPrevBtn = document.getElementById('gen-prev');
    const genNextBtn = document.getElementById('gen-next');
    const genDisplay = document.getElementById('gender-display');

    function updateGender(){
        const gender = genderOptions[genderIndex];
        genDisplay.textContent = gender;
        gameState.currentGender = gender;
        saveState();
    }

    genPrevBtn.addEventListener('click', () =>{
        genderIndex = (genderIndex - 1 + genderOptions.length) % genderOptions;
        updateGender();
    });
    genNextBtn.addEventListener('click', () =>{
        genderIndex = (genderIndex + 1) % genderOptions.length;
        updateGender();
    });

    updateGender();

    document
        .getElementById('continue-button')
        .addEventListener('click', () =>{
            const curPet = gameState.currentPet;
            const unlockedPet = gameState.unlocked.pets || [];
            if(!unlockedPet.includes(curPet)){
                alert('This pet is locked! Please select an unlocked pet.');
                return;
            }

            const curAcc = gameState.currentAccessory;
            const unlockedAcc = gameState.unlocked.accessories || [];
            if(curAcc && !unlockedAcc.includes(curAcc)){
                alert('That accessory is locked! Please selecct an unlocked accessory');
                return;
            }
            
            window.location.href = 'backgroundCustom.html';
        });
})();