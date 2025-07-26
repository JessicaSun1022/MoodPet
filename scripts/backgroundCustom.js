(() =>{
    const bgOptions = ['starterBackground', 'forestBG', 'beachBG'];
    const lockImg = 'backgrounds/lock.png';

    let bgIndex = 0;
    if(gameState.currentBackground){
        const i = bgOptions.indexOf(gameState.currentBackground);
        if(i>=0) bgIndex = i;
    }

    const prevBtn = document.getElementById('bg-prev');
    const nextBtn = document.getElementById('bg-next');
    const bgImg = document.getElementById('bg-image');

    function updateBg(){
        const key = bgOptions[bgIndex];
        const unlocked = gameState.unlocked.backgrounds || [];
        if(unlocked.includes(key)){
            bgImg.src = `backgrounds/${key}.png`;
            bgImg.alt = key;
        }
        else{
            bgImg.src = lockImg;
            bgImg.alt = 'Locked';
        }
        gameState.currentBackground = key;
        saveState();
    }

    prevBtn.addEventListener('click',() =>{
        bgIndex = (bgIndex - 1 + bgOptions.length) % bgOptions.length;
        updateBg();
    });
    nextBtn.addEventListener('click',() =>{
        bgIndex = (bgIndex + 1) % bgOptions.length;
        updateBg();
    });

    updateBg();

    document
        .getElementById('continue-button')
        .addEventListener('click',() =>{
            const curBg = gameState.currentBackground;
            const unlockedBg = gameState.unlocked.backgrounds || [];
            if(!unlockedBg.includes(curBg)){
                alert('That background is locked! Please select and unlocked background.');
                return;
            }
            window.location.href = 'main.html';
        });
})();