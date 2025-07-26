(()=>{
    document.getElementById('retry-btn').addEventListener('click', () =>{
        gameState.stats = {
            hunger: 100,
            playfulness: 100,
            hygiene: 100
        };
        saveState();
        
        window.location.href = 'petCustom.html';
    });
})();