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

//Auto unlocked items (always unlocked)
const defaultUnlocked = {
    pets: ['dog'],
    accessories: ['tophat'],
    backgrounds: ['starterBackground']
};

//Load game from save if available
function loadState(){
    const saved = localStorage.getItem('moodPetState');
    if(saved){
        Object.assign(gameState, JSON.parse(saved));
    }

    //Make sure the default items stay unlocked
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