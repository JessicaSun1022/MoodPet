(() =>{
    const coinAmount = document.getElementById('coin-amount');
    const exitBtn = document.getElementById('exit-btn');
    const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
    const panes = Array.from(document.querySelectorAll('.tab-pane'));
    const buyButtons = Array.from(document.querySelectorAll('.buy-btn'));

    function updateCoinDisplay(){
        coinAmount.textContent = gameState.coins;
    }

    function getItemKey(card){
        const imgSrc = card.querySelector('img').getAttribute('src');
        const name = imgSrc.split('/').pop().split('.')[0];
        return name;
    }

    function getCategoryKey(card){
        return card.closest('.tab-pane').id;
    }

    tabBtns.forEach(btn =>{
        btn.addEventListener('click', () =>{
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.tab;
            panes.forEach(p => {
                p.id === target
                    ? p.classList.remove('hidden')
                    : p.classList.add('hidden');
            });
        });
    });

    buyButtons.forEach(btn =>{
        const card = btn.closest('.item-card');
        const key = getItemKey(card);
        const category = getCategoryKey(card);
        const unlocked = gameState.unlocked[category] || [];
        if(unlocked.includes(key)){
            btn.textContent = 'Owned';
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'default';
        }
    });

    buyButtons.forEach(btn =>{
        btn.addEventListener('click', () =>{
            const card = btn.closest('.item-card');
            const costText = card.querySelector('.item-info p').textContent;
            const cost = parseInt(costText.match(/\d+/)[0], 10);
            const key = getItemKey(card);
            const category = getCategoryKey(card);

            if(gameState.coins < cost){
                return alert('Not enough coins!');
            }

            gameState.coins -= cost;
            gameState.unlocked[category] = gameState.unlocked[category] || [];
            gameState.unlocked[category].push(key);
            saveState();

            updateCoinDisplay();
            btn.textContent = 'Owned';
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'default';
        });
    });

    exitBtn.addEventListener('click', () =>{
        window.location.href = 'main.html';
    });

    updateCoinDisplay();

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
})();