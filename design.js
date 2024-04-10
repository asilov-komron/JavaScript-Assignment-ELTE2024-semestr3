    
    
    
    
    const urlParams = new URLSearchParams(window.location.search)
    const playersNum = parseInt(urlParams.get('players'))
    const player_names = urlParams.get('names').split(",")
    const timer_num = parseInt(urlParams.get('timer'))
    //console.log("player names: " + player_names)
    //console.log("timer number : "+timer_num)
    
    //console.log("players number : "+playersNum)
    
    const overlay_lost = document.querySelector('#overlay_lost')
    const overlay_won = document.querySelector('#overlay_won')
       
       
       
   
       
       
       
       
    
    
    
    ///////////////TIMER IMPLEMENTATION
        let gameOver = false
        let victory = false
    
        const countDownMinutes = isNaN(timer_num) ? 5 : timer_num;
        const countDownDate = new Date();
        countDownDate.setMinutes(countDownDate.getMinutes() + countDownMinutes);
        const countDown = countDownDate.getTime();
        
        let x = setInterval(() => {
            let timer_p = document.querySelector('.timer_p');
            
            let now = new Date().getTime();
        
            let distance = countDown - now;
            let minutes = Math.floor(distance / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            timer_p.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
            gameOver = distance < 0 || player1_water_zapas == 0
            victory = found_items_cnt == 3

            if (gameOver) {
                clearInterval(x);
                timer_p.innerHTML = "Game Over!";
                overlay_lost.style.display = 'block'
            }
            else if(victory){
                clearInterval(x);
                timer_p.innerHTML = "Victory";
                overlay_won.style.display = 'block'
            }
        }, 1000);
        
    
    
    let back_to_menu = document.querySelector(".back_to_menu")
    
    
    
    back_to_menu.addEventListener("click", ()=>{
        window.location.href = "index.html"
    })
    
    
    
    
    
    let pl1 = document.getElementById('pl1')
    let pl2 = document.getElementById('pl2')
    let pl3 = document.getElementById('pl3')
    let pl4 = document.getElementById('pl4')
    
    switch (playersNum) {
        case 1:
            pl2.style.display = "none"
            pl3.style.display = "none"
            pl4.style.display = "none"

            player1_exists = true
            break;
            case 2:
                pl3.style.display = "none"
                pl4.style.display = "none"

                player1_exists = true
                player2_exists = true

            
                break;
    
            case 3:
                pl4.style.display = "none"

                player1_exists = true
                player2_exists = true
                player3_exists = true

            default:
                player1_exists = true
                player2_exists = true
                player3_exists = true
                player4_exists = true
                break;
    }
    
    let player_tags = document.querySelectorAll('.player_tag')
    for(let i = 0; i < player_names.length; i++){
        if(player_names[i] != '')
        player_tags[i].innerText = player_names[i]
    }
    

    if(player1_exists) pl1.style.border = `2px solid ${player1_color}`


    if(player2_exists) pl2.style.border = `2px solid ${player2_color}`
    if(player3_exists) pl3.style.border = `2px solid ${player3_color}`
    if(player4_exists) pl4.style.border = `2px solid ${player4_color}`
    
    



    
    



function goToMenu() {
    window.location.href = 'index.html'
}