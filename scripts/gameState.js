//Default
const gameState = {
    coins: 0,
    xp: 0,
    level: 1,
    unlocked: {
        pets: [],
        accessories: [],
        backgrounds: []
    }
};

const defaultUnlocked = {
    pets: ['dog'],
    accessories: ['tophat'],
    backgrounds: ['starterBackground']
};

function loadState(){
    const saved = localStorage.getItem('moodPetState');
    if(saved){
        Object.assign(gameState, JSON.parse(saved));
    }

    Object.keys(defaultUnlocked).forEach(category =>{
        defaultUnlocked[category].forEach(item => {
            if(!gameState.unlocked[category].includes(item)){
                gameState.unlocked[category].push(item);
            }
        });
    });
}

function saveState(){
    localStorage.setItem('moodPetState', JSON.stringify(gameState));
}

loadState();