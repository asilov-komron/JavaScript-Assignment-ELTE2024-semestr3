
//dig button
let dig_button = document.querySelector(".dig")

//Drawing the table
let table = document.querySelector(".table")
generateTable()
let cells = document.querySelectorAll("table td")

//All cells
let occupied_cells_coords = ['3,3', '3,2', '3,5']
let dug = []

//Oasis marker
let oasis_marker_coords = []
let oasis_coords = []
let miraj_coord = []

//Items
let item_coords = []
let found_items_cnt = 0

//Clues
let clues_coords = []
let clues_aux = ['3,3']
let clue_for_item123 = [[], [], []];


// Player 1 info
let player1_water_zapas = 6
let player1_actions_zapas = 3
let player1_exists = false
let player1_color = 'black'
let player1_position = { row: 3, col: 3 };

// Player 2 info
let player2_water_zapas = 6
let player2_actions_zapas = 3
let player2_exists = false
let player2_color = 'blue'
let player2_position = { row: 3, col: 3 };



// Player 3 info
let player3_water_zapas = 6
let player3_actions_zapas = 3
let player3_exists = false
let player3_color = 'lime'
let player3_position = { row: 3, col: 3 };


// Player 4 info
let player4_water_zapas = 6
let player4_actions_zapas = 3
let player4_exists = false
let player4_color = 'orange'
let player4_position = { row: 3, col: 3 };

//DOMs Water Zapas
let player1_water = document.querySelector("#pl1 .water p")
player1_water.textContent = player1_water_zapas

let player2_water = document.querySelector("#pl2 .water p")
player2_water.textContent = player2_water_zapas

let player3_water = document.querySelector("#pl3 .water p")
player3_water.textContent = player3_water_zapas

let player4_water = document.querySelector("#pl4 .water p")
player4_water.textContent = player4_water_zapas


//DOMs Actions Zapas
let player1_actions = document.querySelector("#pl1 .actions p")
player1_actions.textContent = player1_actions_zapas

let player2_actions = document.querySelector("#pl2 .actions p")
player2_actions.textContent = player2_actions_zapas

let player3_actions = document.querySelector("#pl3 .actions p")
player3_actions.textContent = player3_actions_zapas

let player4_actions = document.querySelector("#pl4 .actions p")
player4_actions.textContent = player4_actions_zapas







stargate_setter()
setPlayer(3, 3)
initItemsCoords()
initCluesCoords()
generateOasisMarker()

console.log(item_coords)
console.log(clues_coords)




//Dig cell EVENT LISTENER
let i = 1

dig_button.addEventListener('click', () => {
    let player_curr_coord = player1_position
    let player_curr_cell = table.querySelector(`tr:nth-child(${player_curr_coord.row}) td:nth-child(${player_curr_coord.col})`)
    let player_curr_coord_str = `${player_curr_coord.row},${player_curr_coord.col}`

    let not_dug = !dug.includes(player_curr_cell)
    let j = 1;

    let index = clues_aux.indexOf(player_curr_coord_str);
    console.log("index = " + index);

    switch (true) {
        case index < 3:
            j = 0;
            break;

        case index > 2 && index < 5:
            j = 1;
            break;

        case index > 4:
            j = 2;
            break;

        default:
            break;
    }

    console.log("j = " + j);



    let clue_1_and_2 = clues_coords[j].split(':')
    let clue_1 = clue_1_and_2[0]
    let clue_2 = clue_1_and_2[1]



    /////////////////// ITEMS
    if (item_coords.includes(player_curr_coord_str) && i < 4 && not_dug) {

        if (player_curr_coord_str == item_coords[0]) {
            if (clue_for_item123[0].length === 2) {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${1}.png")`

                player_curr_cell.style.backgroundColor = "bisque"
                player_curr_cell.style.backgroundSize = "contain"
                found_items_cnt++
                i++

                updatePlayerActionsDOM()
                updatePlayerWaterDOM()

                dug.push(player_curr_cell)
            }
            else {
                alert("Find clues first!")
            }
        }
        else if (player_curr_coord_str == item_coords[1]) {
            if (clue_for_item123[1].length === 2) {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${2}.png")`

                player_curr_cell.style.backgroundColor = "bisque"
                player_curr_cell.style.backgroundSize = "contain"
                found_items_cnt++
                i++

                updatePlayerActionsDOM()
                updatePlayerWaterDOM()

                dug.push(player_curr_cell)
            }

            else {
                alert("Find clues first!")
            }
        }


        else {
            if (clue_for_item123[2].length === 2) {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${3}.png")`


                player_curr_cell.style.backgroundColor = "bisque"
                player_curr_cell.style.backgroundSize = "contain"
                found_items_cnt++
                i++

                updatePlayerActionsDOM()
                updatePlayerWaterDOM()

                dug.push(player_curr_cell)

            }
            else {
                alert("Find clues first!")
            }
        }



    }


    ////////////////////CLUE ON X

    if (clue_1.includes(player_curr_coord_str) && !dug.includes(player_curr_coord_str)) {


        let x = clue_1.split(',')[0]
        let y = clue_1.split(',')[1]


        let item_x_and_y = item_coords[j].split(',')
        let item_x = item_x_and_y[0]
        let item_y = item_x_and_y[1]




        console.log(item_x)
        console.log(item_y)


        console.log(x)
        console.log(y)

        if (item_x == x) {
            if (item_y > 3) {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${j + 1} - clue_RIGHT.png")`
                player_curr_cell.style.backgroundSize = "contain"
                player_curr_cell.style.backgroundColor = "bisque"

                updatePlayerActionsDOM()
                updatePlayerWaterDOM()
                dug.push(player_curr_cell)

                clue_for_item123[j].push(player_curr_coord_str)

            }
            else {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${j + 1} - clue_LEFT.png")`
                player_curr_cell.style.backgroundSize = "contain"
                player_curr_cell.style.backgroundColor = "bisque"


                updatePlayerActionsDOM()
                updatePlayerWaterDOM()
                dug.push(player_curr_cell)

                clue_for_item123[j].push(player_curr_coord_str)

            }
        }


    }

    ////////////////////CLUE ON Y


    if (clue_2.includes(player_curr_coord_str) && !dug.includes(player_curr_coord_str)) {


        let x = clue_2.split(',')[0]
        let y = clue_2.split(',')[1]


        let item_x_and_y = item_coords[j].split(',')
        let item_x = item_x_and_y[0]
        let item_y = item_x_and_y[1]



        if (item_y == y) {
            if (item_x > 3) {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${j + 1} - clue_DOWN.png")`
                player_curr_cell.style.backgroundSize = "contain"
                player_curr_cell.style.backgroundColor = "bisque"

                updatePlayerActionsDOM()
                updatePlayerWaterDOM()
                dug.push(player_curr_cell)

                clue_for_item123[j].push(player_curr_coord_str)



            }
            else {
                player_curr_cell.style.backgroundImage = `url("Assets/Item ${j + 1} - clue_UP.png")`
                player_curr_cell.style.backgroundSize = "contain"
                player_curr_cell.style.backgroundColor = "bisque"


                updatePlayerActionsDOM()
                updatePlayerWaterDOM()
                dug.push(player_curr_cell)


                clue_for_item123[j].push(player_curr_coord_str)


            }

        }
    }

    //////////////////OASIS MARKERS
    if (oasis_marker_coords.includes(player_curr_coord_str)) {
        player_curr_cell.style.backgroundImage = `url("Assets/Oasis.png")`
        player_curr_cell.style.backgroundSize = "contain"
        player_curr_cell.style.backgroundColor = "bisque"
        if (player_curr_coord_str == oasis_marker_coords[0]) {
            player_curr_cell.style.backgroundImage = `url("Assets/Drought.png")`
            player_curr_cell.style.backgroundSize = "contain"
            player_curr_cell.style.backgroundColor = "bisque"

        }
        else {
            recoverWaterZapas()

        }

    }

    ///////////////HOLES

    else {


        if (player_curr_coord_str == '3,5' || player_curr_coord_str == '3,2') {
            player_curr_cell.style.backgroundImage = `url("Assets/Hole.png")`
            player_curr_cell.style.backgroundSize = "contain"
            player_curr_cell.style.backgroundColor = "bisque"
        }


        if (!occupied_cells_coords.includes(player_curr_coord_str)) {
            player_curr_cell.style.backgroundImage = `url("Assets/Hole.png")`
            player_curr_cell.style.backgroundSize = "contain"
            player_curr_cell.style.backgroundColor = "bisque"



            updatePlayerActionsDOM()
            updatePlayerWaterDOM()
            dug.push(player_curr_cell)

        }

    }

})




//Movement of player EVENT LISTENER
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        let clicked_row = parseInt(cell.parentElement.getAttribute('data-row'))
        let clicked_col = parseInt(cell.getAttribute('data-col'))

        let distance = Math.abs(clicked_row - player1_position.row) + Math.abs(clicked_col - player1_position.col)

        if (distance === 1) {
            movePlayer(clicked_row, clicked_col)
            updatePlayerActionsDOM()
            updatePlayerWaterDOM()
        }
    })
})








///////////////////////////////////////////////
function initItemsCoords() {
    let set = new Set()
    let items_num = 3
    let i = 1
    let j = 5
    while (set.size < items_num) {
        let random_coord = getItemCoord(i, j)

        if (!occupied_cells_coords.includes(random_coord)) {
            set.add(random_coord)
            i = i + 2
            j--

        }
    }

    set.forEach(coord => {
        item_coords.push(coord)
        occupied_cells_coords.push(coord)
    })

}
////////////////////////////////////////

function initCluesCoords() {

    for (let i = 0; i < item_coords.length; i++) {

        let rand_for_x;
        let rand_for_y;
        let item_tr = item_coords[i].split(',')[0]
        let item_td = item_coords[i].split(',')[1]

        let ready = false
        while (!ready) {
            if (item_td > 3) {
                rand_for_x = getRandomX(1, 3)
            }
            else {
                rand_for_x = getRandomX(4, 5)
            }



            if (item_tr > 3) {
                rand_for_y = getRandomX(1, 3)
            }
            else {
                rand_for_y = getRandomX(4, 5)
            }

            let first = `${item_tr},${rand_for_x}`
            let second = `${rand_for_y},${item_td}`
            let pair = `${item_tr},${rand_for_x}:${rand_for_y},${item_td}`

            let condition1 = !item_coords.includes(first) && !item_coords.includes(second)
            let condition2 = !clues_aux.includes(first) && !clues_aux.includes(second)

            if (condition1 && condition2) {
                clues_coords.push(pair)
                clues_aux.push(first)
                clues_aux.push(second)
                occupied_cells_coords.push(first)
                occupied_cells_coords.push(second)
                ready = true
            }


        }

    }




    //SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

}

/////////////////////////////////////
function generateTable() {
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr")
        tr.setAttribute("data-row", i + 1)
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td")
            td.setAttribute("data-col", j + 1)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}
////////////////////////////////////////////////
function getRandomPosition() {

    let coord = `${Math.floor(Math.random() * 5 + 1)},${Math.floor(Math.random() * 5 + 1)}`
    return coord


}


//////////////////////////////////////////////////



function getItemCoord(i, j) {

    // let coord = `${i},${Math.floor(Math.random()*5 +1)}`
    let coord = `${i},${j}`

    return coord

}


////////////////////////////////////////////////
function generateOasisMarker() {
    let positions = new Set();
    let imgNum = 4


    while (positions.size < imgNum) {
        let position = getRandomPosition()
        if (!occupied_cells_coords.includes(position)) {
            positions.add(position)
        }
    }


    positions.forEach(pos => {
        occupied_cells_coords.push(pos)
        oasis_marker_coords.push(pos)
        let row = pos.split(",")[0]
        let col = pos.split(",")[1]
        let tr = table.querySelector(`tr:nth-child(${parseInt(row)})`)
        let td = tr.querySelector(`td:nth-child(${parseInt(col)})`)
        td.style.backgroundColor = 'bisque'

        td.style.backgroundImage = "url('Assets/Oasis marker.png')"
        td.style.backgroundSize = "contain"

    });
}
///////////////////////////////////////////////////////

function stargate_setter() {
    let tr = table.querySelector(`tr:nth-child(${3})`)
    let td = tr.querySelector(`td:nth-child(${3})`)
    td.style.backgroundColor = 'bisque'

    td.style.backgroundImage = "url('Assets/Stargate.png')"
    td.style.backgroundSize = 'contain'
}


////////////////////////////////////////////////////////////////
function setPlayer(row, col) {
    let tr = table.querySelector(`tr:nth-child(${row})`)
    let td = tr.querySelector(`td:nth-child(${col})`)

    td.style.border = `5px ${player1_color} solid`;


    let img = document.createElement('img')
    img.src = "Assets/Player.png"
    img.style.width = "80%"
    img.style.height = "80%"
    img.style.marginLeft = "0.3rem"
    td.appendChild(img)
}


function movePlayer(row, col) {
    clearPlayerCell(player1_position.row, player1_position.col);

    player1_position.row = row;
    player1_position.col = col;

    setPlayer(row, col);
}

function clearPlayerCell(row, col) {
    let tr = table.querySelector(`tr:nth-child(${row})`)
    let td = tr.querySelector(`td:nth-child(${col})`)

    // if(isOasis(row,col)){
    // td.style.backgroundColor = "white"
    // }
    // else td.style.backgroundColor = ""

    td.style.border = "none"

    let playerImg = td.querySelector('img[src="Assets/Player.png"]');
    if (playerImg) {
        playerImg.remove();
    }

}

///////////////////////////////////////////////////////////////////

function isOasis(roww, coll) {
    let coordinate = `${roww},${coll}`
    return oasis_marker_coords.includes(coordinate)
}











function updatePlayerWaterDOM() {
    if (player1_actions_zapas == 0) {


        player1_water_zapas--
        player1_water.textContent = player1_water_zapas

        //resetting player actions to 3
        if (player1_water_zapas > 0)
            player1_actions_zapas = 3
        player1_actions.textContent = player1_actions_zapas
    }
}





function updatePlayerActionsDOM() {
    player1_actions_zapas--
    player1_actions.textContent = player1_actions_zapas
}


function recoverWaterZapas() {
    player1_water_zapas = 6
    player1_water.textContent = player1_water_zapas
}


function getRandomX(from, to) {
    let rand = from + Math.floor(Math.random() * (to - from))
    return rand
}





