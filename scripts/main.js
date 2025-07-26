(() => {
    if (!gameState.stats) {
        gameState.stats = {
            hunger: 100,
            playfulness: 100,
            hygiene: 100
        };
        saveState();
    }

    const bgImg = document.querySelector('.bg-image');
    const petImg = document.querySelector('.pet-image');
    const accImg = document.getElementById('acc-image');

    const accessoryPositions = {
        tophat: {offsetX: 0.33, offsetY: 0.05, scale: 0.8},
        bow: {offsetX: 0.35, offsetY: -0.1, scale: 0.6},
        glasses: {offsetX: 0.34, offsetY: -0.2, scale: 0.8}
    };
    
    function updateCustomizations(){
        const bgKey = gameState.currentBackground || 'starterBackground';
        const petKey = gameState.currentPet || 'dog';
        const accKey = gameState.currentAccessory || 'tophat';

        petImg.src = `pets/${petKey}.png`;
        bgImg.src = `backgrounds/${bgKey}.png`;
        if(accKey){
            accImg.src = `customization/accessories/${accKey}.png`;
            accImg.style.display = '';
        }
        else{
            accImg.style.display = 'none';
        }
    }

    function positionEverything(){
        const area = document.querySelector('.game-area').getBoundingClientRect();
        const petComputedStyle = window.getComputedStyle(petImg);
        const petWidth = parseFloat(petComputedStyle.width);
        const petHeight = petWidth;

        const petX = (area.width - petWidth) / 2;
        const petY = (area.height - petHeight) * 0.9;
        petImg.style.left = `${petX}px`;
        petImg.style.top = `${petY}px`;

        const accKey = gameState.currentAccessory || 'tophat';
        const accConfig = accessoryPositions[accKey] || accessoryPositions['tophat'];

        const accOffsetX = petWidth * accConfig.offsetX;
        const accOffsetY = petHeight * accConfig.offsetY;

        const hatX = petX + accOffsetX;
        const hatY = petY - accOffsetY;

        accImg.style.left = `${hatX}px`;
        accImg.style.top = `${hatY}px`;

        const baseScale = petWidth/300;
        const finalScale = baseScale * accConfig.scale;
        accImg.style.transform = `scale(${finalScale})`;
        accImg.style.transformOrigin = 'top left';
    }

    window.addEventListener('DOMContentLoaded', () =>{
        updateCustomizations();
        setTimeout(positionEverything, 100);
    });

    window.addEventListener('resize',positionEverything)

    petImg.addEventListener('load', positionEverything);
    accImg.addEventListener('load', positionEverything);

    const fills = {
        happiness: document.getElementById('happiness-fill'),
        hunger: document.getElementById('hunger-fill'),
        playfulness: document.getElementById('playfulness-fill'),
        hygiene: document.getElementById('hygiene-fill'),
        xp: document.getElementById('xp-fill')
    };
    
    const itemBtns = Array.from(document.querySelectorAll('.item-btn'));

    //Action definitions
    const actions = {
        feed: { hunger: +15, hygiene: -15 },
        play: { playfulness: +20, hunger: -20 },
        wash: { hygiene: +25, playfulness: -20 },
        potty: { hygiene: +10, hunger: -25}
    };
    const xpPerAction = 10;
    const xpToLevel = 100;

    function renderStats() {
        const s = gameState.stats;
        ['hunger', 'playfulness', 'hygiene'].forEach(key => {
            s[key] = Math.min(100, Math.max(0, s[key]));
        });

        const happiness = Math.round(Math.cbrt(s.hunger*s.playfulness*s.hygiene));
        gameState.stats.happiness = happiness;

        fills.hunger.style.width = `${s.hunger}%`;
        fills.playfulness.style.width = `${s.playfulness}%`;
        fills.hygiene.style.width = `${s.hygiene}%`;
        fills.happiness.style.width = `${happiness}%`;
        fills.xp.style.width = `${(gameState.xp % xpToLevel) / xpToLevel * 100}%`;
    }

    //Perform action
    function performAction(type) {
        const mods = actions[type];
        if (!mods) return;
        Object.keys(mods).forEach(stat => {
            if (gameState.stats[stat] != null) {
                gameState.stats[stat] += mods[stat];
            }
        });

        gameState.xp += xpPerAction;
        while (gameState.xp >= xpToLevel) {
            gameState.xp -= xpToLevel;
            gameState.level++;
            gameState.coins += 2;
        }
        saveState();
        updateCustomizations();
        positionEverything();
        renderStats();
    }

    itemBtns.forEach(btn => {
        const src = btn.querySelector('img').getAttribute('src');
        let type = '';
        if (src.includes('food')) type = 'feed';
        if (src.includes('ball')) type = 'play';
        if (src.includes('sponge')) type = 'wash';
        if (src.includes('toilet')) type = 'potty';
        btn.addEventListener('click', () => performAction(type));
    });

    const decayRate = { hunger: -3, playfulness: -4, hygiene: -2 };
    const decayInterval = 2500;

    //Check death
    setInterval(() => {
        Object.keys(decayRate).forEach(stat => {
            gameState.stats[stat] += decayRate[stat];
        });
        saveState();
        renderStats();
    }, decayInterval);

    setInterval(() => {
        if ((gameState.stats.happiness || 0) <= 0) {
            window.location.href = 'death.html';
        }
    }, 500);

    const [storeBtn, bgBtn, petBtn, infoBtn] = document.querySelectorAll('.sidebar .icon-btn');
    storeBtn.addEventListener('click',() => {
        window.location.href = 'shop.html';
    });
    bgBtn.addEventListener('click',() => {
        window.location.href = 'backgroundCustom.html';
    });
    petBtn.addEventListener('click',() => {
        window.location.href = 'petCustom.html';
    });
    infoBtn.addEventListener('click', () =>{
        window.location.href = 'info.html';
    });

    renderStats();
})();